"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { ChevronDown, ChevronRight } from "lucide-react";

type OrderItem = {
  name: string;
  size: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  city: string;
  address: string;
  note: string;
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: string;
  created_at: string;
};

function formatDate(dateString: string) {
  const d = new Date(dateString);
  const day   = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year  = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, "0");
  const mins  = d.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${mins}`;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "En attente" },
  { value: "confirmed", label: "Confirmé" },
  { value: "shipped", label: "Expédié" },
  { value: "delivered", label: "Livré" },
];

const STATUS_STYLES: Record<string, { background: string; color: string }> = {
  pending:   { background: "#fef3c7", color: "#92400e" },
  confirmed: { background: "#dbeafe", color: "#1e40af" },
  shipped:   { background: "#ede9fe", color: "#5b21b6" },
  delivered: { background: "#d1fae5", color: "#065f46" },
};

const th: React.CSSProperties = {
  padding: "12px 14px",
  textAlign: "left",
  fontSize: "11px",
  fontWeight: 600,
  color: "#666",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  whiteSpace: "nowrap",
};

const td: React.CSSProperties = {
  padding: "12px 14px",
  verticalAlign: "middle",
};

export default function OrdersTable({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [updating, setUpdating] = useState<Set<string>>(new Set());
  const [flash, setFlash] = useState<Record<string, "success" | "error">>({});

  function toggleRow(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function showFlash(id: string, type: "success" | "error") {
    setFlash((prev) => ({ ...prev, [id]: type }));
    setTimeout(() => {
      setFlash((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 2000);
  }

  async function handleStatusChange(orderId: string, status: string) {
    setUpdating((prev) => new Set(prev).add(orderId));
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status } : o))
        );
        showFlash(orderId, "success");
      } else {
        showFlash(orderId, "error");
      }
    } catch {
      showFlash(orderId, "error");
    } finally {
      setUpdating((prev) => {
        const next = new Set(prev);
        next.delete(orderId);
        return next;
      });
    }
  }

  if (orders.length === 0) {
    return (
      <div style={{
        background: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        padding: "60px",
        textAlign: "center",
        color: "#aaa",
        fontSize: "15px",
      }}>
        Aucune commande pour l'instant.
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "10px", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ background: "#f8f9fa", borderBottom: "1px solid #e0e0e0" }}>
            <th style={th}>#</th>
            <th style={th}>Date</th>
            <th style={th}>Client</th>
            <th style={th}>Téléphone</th>
            <th style={th}>Ville</th>
            <th style={th}>Total</th>
            <th style={th}>Statut</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const isOpen = expanded.has(order.id);
            const statusStyle = STATUS_STYLES[order.status] ?? STATUS_STYLES.pending;
            const waPhone = order.phone.replace(/[^0-9]/g, "");
            const date = order.created_at ? formatDate(order.created_at) : "—";

            const rowBg =
              flash[order.id] === "success" ? "#f0fdf4"
              : flash[order.id] === "error"   ? "#fef2f2"
              : isOpen                         ? "#fafafa"
              : "#fff";

            return (
              <React.Fragment key={order.id}>
                {/* Main row */}
                <tr
                  onClick={() => toggleRow(order.id)}
                  style={{
                    borderBottom: isOpen ? "none" : "1px solid #f0f0f0",
                    cursor: "pointer",
                    background: rowBg,
                    transition: "background 0.25s",
                  }}
                >
                  <td style={td}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 600, color: "#9A7235", whiteSpace: "nowrap" }}>
                      {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      {order.order_number}
                    </span>
                  </td>
                  <td style={{ ...td, color: "#666", fontSize: "13px", whiteSpace: "nowrap" }}>{date}</td>
                  <td style={{ ...td, fontWeight: 500, color: "#1a1a1a" }}>{order.customer_name}</td>
                  <td style={{ ...td, color: "#555", fontFamily: "monospace", fontSize: "13px" }}>{order.phone}</td>
                  <td style={{ ...td, color: "#555" }}>{order.city}</td>
                  <td style={{ ...td, fontWeight: 700, color: "#1a1a1a", whiteSpace: "nowrap" }}>
                    {order.total != null ? order.total.toFixed(2) : "—"} DH
                  </td>

                  {/* Status dropdown — stop click from expanding row */}
                  <td style={td} onClick={(e) => e.stopPropagation()}>
                    <select
                      value={order.status}
                      disabled={updating.has(order.id)}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        border: "none",
                        ...statusStyle,
                        fontWeight: 600,
                        fontSize: "12px",
                        cursor: updating.has(order.id) ? "not-allowed" : "pointer",
                        outline: "none",
                        appearance: "none",
                        WebkitAppearance: "none",
                      }}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </td>

                  {/* WhatsApp button — stop click from expanding row */}
                  <td style={td} onClick={(e) => e.stopPropagation()}>
                    <a
                      href={`https://wa.me/${waPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`WhatsApp ${order.customer_name}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "#25D366",
                        color: "#fff",
                        textDecoration: "none",
                        flexShrink: 0,
                      }}
                    >
                      <FaWhatsapp size={16} />
                    </a>
                  </td>
                </tr>

                {/* Expanded detail row */}
                {isOpen && (
                  <tr style={{ borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
                    <td colSpan={8} style={{ padding: "4px 14px 20px 46px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", paddingTop: "12px" }}>
                        {/* Items */}
                        <div>
                          <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                            Articles
                          </p>
                          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            {(order.items ?? []).map((item, i) => (
                              <p key={i} style={{ margin: 0, fontSize: "13px", color: "#333" }}>
                                {item.name}{" "}
                                <span style={{ color: "#888" }}>({item.size}) ×{item.quantity}</span>
                                {" — "}
                                <span style={{ color: "#9A7235", fontWeight: 600 }}>
                                  {(item.price * item.quantity).toFixed(2)} DH
                                </span>
                              </p>
                            ))}
                          </div>
                        </div>

                        {/* Address + Note */}
                        <div>
                          <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                            Adresse
                          </p>
                          <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#333" }}>
                            {order.address}, {order.city}
                          </p>
                          {order.note?.trim() && (
                            <>
                              <p style={{ margin: "0 0 6px", fontSize: "11px", fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                Note client
                              </p>
                              <p style={{ margin: 0, fontSize: "13px", color: "#555", fontStyle: "italic" }}>
                                {order.note}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
