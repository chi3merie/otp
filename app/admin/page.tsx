"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { products } from "../data";

const categoryFilters = ["All", ...new Set(products.map((product) => product.category))];

const summaryCards = [
  { label: "Products", value: "8", tone: "accent" },
  { label: "Categories", value: "6", tone: "warm" },
  { label: "Pending refills", value: "14", tone: "muted" },
  { label: "Monthly sales", value: "$18.4k", tone: "accent" },
];

const alerts = [
  { title: "Low stock", detail: "Vitamin C and Amoxicillin need restocking by Friday." },
  { title: "Delivery window", detail: "Same-day dispatch is running 12 minutes behind schedule." },
  { title: "Review required", detail: "Two customer refill notes need pharmacist confirmation." },
];

const recentOrders = [
  { id: "#2048", customer: "Amina K.", total: "$32.48", status: "Packed" },
  { id: "#2049", customer: "Nnamdi I.", total: "$18.90", status: "Out for delivery" },
  { id: "#2050", customer: "Lola T.", total: "$54.20", status: "Ready for pickup" },
];

export default function AdminPage() {
  const [storeOpen, setStoreOpen] = useState(true);
  const [autoRefill, setAutoRefill] = useState(true);
  const [priorityMode, setPriorityMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }

    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="admin-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="MediNest Pharmacy home">
          <span className="brand-mark">+</span>
          <span>MediNest</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/all">Products</Link>
          <Link href="/#services">Services</Link>
          <Link href="/admin">Admin</Link>
        </nav>

        <button className="header-action" type="button">
          Save changes
        </button>
      </header>

      <section className="admin-hero">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Control your pharmacy storefront</h1>
        </div>

        <div className="admin-hero-meta">
          <span className="status-pill success">Live store</span>
          <time>Updated 8 minutes ago</time>
        </div>
      </section>

      <section className="admin-summary" aria-label="Store summary">
        {summaryCards.map((item) => (
          <article key={item.label} className={`stat-card ${item.tone}`}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="admin-shell">
        <div className="admin-column">
          <article className="admin-panel">
            <div className="panel-header">
              <h2>Quick controls</h2>
              <span className="tiny-label">Store status</span>
            </div>

            <div className="toggle-list">
              <label className="toggle-row">
                <span>
                  <strong>Store open</strong>
                  <small>Accept online orders and pickup requests</small>
                </span>
                <input
                  type="checkbox"
                  checked={storeOpen}
                  onChange={() => setStoreOpen((value) => !value)}
                />
              </label>

              <label className="toggle-row">
                <span>
                  <strong>Auto refill reminders</strong>
                  <small>Queue messages for returning customers</small>
                </span>
                <input
                  type="checkbox"
                  checked={autoRefill}
                  onChange={() => setAutoRefill((value) => !value)}
                />
              </label>

              <label className="toggle-row">
                <span>
                  <strong>Priority dispatch</strong>
                  <small>Move urgent medications to front of delivery queue</small>
                </span>
                <input
                  type="checkbox"
                  checked={priorityMode}
                  onChange={() => setPriorityMode((value) => !value)}
                />
              </label>
            </div>
          </article>

          <article className="admin-panel">
            <div className="panel-header">
              <h2>Inventory</h2>
              <button className="text-button" type="button">
                Add product
              </button>
            </div>

            <div className="filter-pills" aria-label="Inventory categories">
              {categoryFilters.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={activeCategory === category ? "active" : ""}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="admin-product-list">
              {visibleProducts.map((product) => (
                <div className="product-row" key={product.id}>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.category}</span>
                  </div>
                  <div className="product-meta">
                    <span>{product.price.toFixed(2)}</span>
                    <em>{product.badge}</em>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="admin-column">
          <article className="admin-panel">
            <div className="panel-header">
              <h2>Site alerts</h2>
              <span className="tiny-label warning">Needs review</span>
            </div>

            <div className="alert-list">
              {alerts.map((alert) => (
                <article key={alert.title} className="alert-item">
                  <strong>{alert.title}</strong>
                  <p>{alert.detail}</p>
                </article>
              ))}
            </div>
          </article>

          <article className="admin-panel">
            <div className="panel-header">
              <h2>Recent orders</h2>
              <button className="text-button" type="button">
                Export
              </button>
            </div>

            <div className="order-list">
              {recentOrders.map((order) => (
                <div className="order-row" key={order.id}>
                  <div>
                    <strong>{order.id}</strong>
                    <span>{order.customer}</span>
                  </div>
                  <div className="order-meta">
                    <strong>{order.total}</strong>
                    <span>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
