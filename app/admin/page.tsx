import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import LoginForm from "./LoginForm";
import OrdersTable from "./OrdersTable";
import LogoutButton from "./LogoutButton";

async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[admin] fetch orders:", error.message);
    return [];
  }
  return data ?? [];
}

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${highlight ? "#fbbf24" : "#e0e0e0"}`,
        borderRadius: "10px",
        padding: "20px 24px",
      }}
    >
      <p
        style={{
          margin: "0 0 6px",
          fontSize: "11px",
          color: "#999",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          fontWeight: 600,
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "28px",
          fontWeight: 700,
          color: highlight ? "#d97706" : "#1a1a1a",
        }}
      >
        {value}
      </p>
    </div>
  );
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get("admin_auth")?.value === "1";

  if (!isAuth) {
    return <LoginForm />;
  }

  const orders = await getOrders();

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const revenue = orders
    .filter((o) => ["confirmed", "shipped", "delivered"].includes(o.status))
    .reduce((sum, o) => sum + (o.total ?? 0), 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e0e0e0",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "60px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: "15px",
            color: "#1a1a1a",
            letterSpacing: "0.5px",
          }}
        >
          ANAR PERFUMES —{" "}
          <span style={{ color: "#9A7235" }}>Commandes</span>
        </span>
        <LogoutButton />
      </div>

      <div
        style={{
          padding: "28px 24px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <StatCard label="Commandes totales" value={totalOrders} />
          <StatCard
            label="Chiffre d'affaires (conf. + expédiées + livrées)"
            value={`${revenue.toFixed(2)} DH`}
          />
          <StatCard
            label="En attente"
            value={pendingOrders}
            highlight={pendingOrders > 0}
          />
        </div>

        {/* Orders table */}
        <OrdersTable initialOrders={orders} />
      </div>
    </div>
  );
}
