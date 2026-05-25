import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { supabase } from "@/lib/supabase";

// ─── Rate limiter: 5 requests per 10 minutes per IP ──────────────────────────
const rateLimiter = new RateLimiterMemory({ points: 5, duration: 600 });

// ─── Zod schema ───────────────────────────────────────────────────────────────
const OrderItemSchema = z.object({
  name: z.string().min(1),
  size: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

const OrderSchema = z.object({
  orderId: z.string().min(1),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .transform((s) => s.replace(/\s/g, ""))
    .pipe(z.string().regex(/^0[67]\d{8}$/, "Invalid Moroccan phone number")),
  city: z.string().min(1, "City is required"),
  address: z.string().min(3, "Address is required"),
  note: z.string().optional().default(""),
  items: z.array(OrderItemSchema).min(1, "Order must contain at least 1 item"),
  subtotal: z.number().nonnegative(),
  deliveryFee: z.number().nonnegative(),
  total: z.number().positive(),
  website: z.string().optional(), // honeypot — must be empty
});

type OrderPayload = z.infer<typeof OrderSchema>;

// ─── WhatsApp URL builder ─────────────────────────────────────────────────────
function buildWhatsAppUrl(payload: OrderPayload): string {
  const { orderId, fullName, phone, city, address, note, items, subtotal, deliveryFee, total } =
    payload;

  const itemLines = items
    .map((i) => `${i.name} x${i.quantity} — ${(i.price * i.quantity).toFixed(2)} DH`)
    .join("\n");

  const deliveryLine = deliveryFee === 0 ? "Gratuite" : `${deliveryFee} DH`;

  const message = [
    `Nouvelle commande Anar #${orderId}`,
    "",
    `Client: ${fullName}`,
    `Tel: ${phone}`,
    `Ville: ${city}`,
    `Adresse: ${address}`,
    "",
    "Commande:",
    itemLines,
    "",
    `Sous-total: ${subtotal.toFixed(2)} DH`,
    `Livraison: ${deliveryLine}`,
    `TOTAL: ${total.toFixed(2)} DH`,
    "",
    `Note: ${note?.trim() || "Aucune"}`,
  ].join("\n");

  const number = (process.env.NEXT_PUBLIC_OWNER_WHATSAPP ?? "").replace(/[^0-9]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// ─── Email HTML builder ───────────────────────────────────────────────────────
function buildEmailHtml(payload: OrderPayload): string {
  const { orderId, fullName, phone, city, address, note, items, subtotal, deliveryFee, total } =
    payload;

  const date = new Date().toLocaleDateString("fr-MA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const itemRows = items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #EFE9E3;font-size:14px;color:#1A0D08;">
          ${i.name} <span style="color:#7A6558;font-size:12px;">(${i.size})</span>
        </td>
        <td style="padding:8px 12px;border-bottom:1px solid #EFE9E3;font-size:14px;color:#1A0D08;text-align:center;">${i.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #EFE9E3;font-size:14px;color:#9A7235;font-weight:600;text-align:right;">
          ${(i.price * i.quantity).toFixed(2)} DH
        </td>
      </tr>`
    )
    .join("");

  const deliveryDisplay =
    deliveryFee === 0
      ? '<span style="color:#059669;font-weight:600;">Gratuite</span>'
      : `${deliveryFee} DH`;

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F9F8F6;font-family:system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9F8F6;padding:40px 16px;">
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #D4C5BB;">
        <tr>
          <td style="background:linear-gradient(135deg,#9A7235 0%,#B08A3A 100%);padding:32px 40px;text-align:center;">
            <p style="margin:0 0 4px;color:#F9F8F6;font-size:11px;letter-spacing:4px;text-transform:uppercase;opacity:0.8;">Nouvelle Commande</p>
            <h1 style="margin:0;color:#F9F8F6;font-size:28px;font-weight:700;letter-spacing:2px;">ANAR PERFUMES</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;border-bottom:1px solid #EFE9E3;background:#FDFCFB;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0 0 4px;color:#7A6558;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Numéro de commande</p>
                  <p style="margin:0;color:#9A7235;font-size:22px;font-weight:700;">#${orderId}</p>
                </td>
                <td style="text-align:right;">
                  <p style="margin:0 0 4px;color:#7A6558;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Date</p>
                  <p style="margin:0;color:#1A0D08;font-size:13px;">${date}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;border-bottom:1px solid #EFE9E3;">
            <p style="margin:0 0 14px;color:#7A6558;font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Informations client</p>
            <table cellpadding="0" cellspacing="0" style="width:100%;">
              <tr>
                <td style="padding:4px 0;color:#7A6558;font-size:13px;width:100px;">Nom</td>
                <td style="padding:4px 0;color:#1A0D08;font-size:13px;font-weight:600;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#7A6558;font-size:13px;">Téléphone</td>
                <td style="padding:4px 0;color:#1A0D08;font-size:13px;font-weight:600;">${phone}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#7A6558;font-size:13px;">Ville</td>
                <td style="padding:4px 0;color:#1A0D08;font-size:13px;font-weight:600;">${city}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#7A6558;font-size:13px;">Adresse</td>
                <td style="padding:4px 0;color:#1A0D08;font-size:13px;font-weight:600;">${address}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;border-bottom:1px solid #EFE9E3;">
            <p style="margin:0 0 14px;color:#7A6558;font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Articles commandés</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #EFE9E3;border-radius:8px;overflow:hidden;">
              <thead>
                <tr style="background:#F9F8F6;">
                  <th style="padding:10px 12px;font-size:11px;color:#7A6558;text-align:left;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Produit</th>
                  <th style="padding:10px 12px;font-size:11px;color:#7A6558;text-align:center;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Qté</th>
                  <th style="padding:10px 12px;font-size:11px;color:#7A6558;text-align:right;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Prix</th>
                </tr>
              </thead>
              <tbody>${itemRows}</tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-bottom:1px solid #EFE9E3;background:#FDFCFB;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:4px 0;color:#7A6558;font-size:13px;">Sous-total</td>
                <td style="padding:4px 0;color:#1A0D08;font-size:13px;text-align:right;">${subtotal.toFixed(2)} DH</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#7A6558;font-size:13px;">Livraison</td>
                <td style="padding:4px 0;font-size:13px;text-align:right;">${deliveryDisplay}</td>
              </tr>
              <tr>
                <td style="padding:12px 0 4px;color:#1A0D08;font-size:16px;font-weight:700;border-top:2px solid #D4C5BB;">Total</td>
                <td style="padding:12px 0 4px;color:#9A7235;font-size:20px;font-weight:700;text-align:right;border-top:2px solid #D4C5BB;">${total.toFixed(2)} DH</td>
              </tr>
            </table>
          </td>
        </tr>
        ${
          note?.trim()
            ? `
        <tr>
          <td style="padding:20px 40px;border-bottom:1px solid #EFE9E3;">
            <p style="margin:0 0 8px;color:#7A6558;font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Note client</p>
            <p style="margin:0;color:#1A0D08;font-size:13px;line-height:1.6;background:#F9F8F6;padding:12px 16px;border-radius:8px;border-left:3px solid #9A7235;">${note}</p>
          </td>
        </tr>`
            : ""
        }
        <tr>
          <td style="padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#9A7235;font-size:13px;font-weight:600;letter-spacing:1px;">ANAR PERFUMES</p>
            <p style="margin:4px 0 0;color:#7A6558;font-size:12px;">anarperfumes.ma</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Rate limiting by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous";

  try {
    await rateLimiter.consume(ip);
  } catch {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Parse body
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Zod validation
  const parsed = OrderSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ success: false }, { status: 422 });
  }

  const payload = parsed.data;

  // Honeypot — silently reject bots
  if (payload.website) {
    return NextResponse.json({ success: true, orderId: payload.orderId, whatsappUrl: "" });
  }

  // Resolve user_id from Authorization header (guest orders are allowed — user_id stays null)
  let userId: string | null = null;
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const { data: { user } } = await supabase.auth.getUser(token);
    userId = user?.id ?? null;
  }

  // 1. Save to Supabase
  try {
    const { error } = await supabase.from("orders").insert({
      order_number: payload.orderId,
      customer_name: payload.fullName,
      phone: payload.phone,
      city: payload.city,
      address: payload.address,
      note: payload.note ?? "",
      items: payload.items,
      subtotal: payload.subtotal,
      delivery_fee: payload.deliveryFee,
      total: payload.total,
      status: "pending",
      user_id: userId,
    });
    if (error) {
      console.error("[orders] Supabase insert error:", error.message);
    }
  } catch (dbErr) {
    console.error("[orders] Supabase unexpected error:", dbErr);
  }

  // 2. Send email
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error: emailError } = await resend.emails.send({
      from: "Anar Perfumes <onboarding@resend.dev>",
      to: process.env.OWNER_EMAIL ?? "",
      subject: `Nouvelle commande Anar #${payload.orderId}`,
      html: buildEmailHtml(payload),
    });
    if (emailError) {
      console.error("[orders] Resend error:", emailError);
    }
  } catch (emailErr) {
    console.error("[orders] Email unexpected error:", emailErr);
  }

  // 3. Build WhatsApp URL
  const whatsappUrl = buildWhatsAppUrl(payload);

  return NextResponse.json({ success: true, orderId: payload.orderId, whatsappUrl });
}
