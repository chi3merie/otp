"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const queueItems = [
  { id: "Q-104", name: "Amina K.", reason: "Prescription refill", wait: "6 min", priority: "High" },
  { id: "Q-105", name: "Nnamdi I.", reason: "Pickup confirmation", wait: "12 min", priority: "Normal" },
  { id: "Q-106", name: "Grace S.", reason: "Insurance review", wait: "18 min", priority: "High" },
  { id: "Q-107", name: "Lola T.", reason: "Product question", wait: "9 min", priority: "Normal" },
];

const taskList = [
  { label: "Confirm same-day delivery slots", status: "Ready" },
  { label: "Review pharmacy alerts", status: "Needs review" },
  { label: "Update homepage promos", status: "Scheduled" },
  { label: "Reconcile stock count", status: "In progress" },
];

const websiteSettings = [
  { label: "Website live", description: "Customers can browse and order", on: true },
  { label: "Delivery booking", description: "Enable same-day delivery form", on: true },
  { label: "Flash promotion", description: "Show limited offer banner", on: false },
  { label: "Auto reminder emails", description: "Send refill reminder texts", on: true },
];

export default function DeskManagerPage() {
  const [settings, setSettings] = useState(websiteSettings);
  const [showOnlyHighPriority, setShowOnlyHighPriority] = useState(false);

  const filteredQueue = useMemo(() => {
    if (!showOnlyHighPriority) {
      return queueItems;
    }

    return queueItems.filter((item) => item.priority === "High");
  }, [showOnlyHighPriority]);

  function toggleSetting(index: number) {
    setSettings((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, on: !item.on } : item
      )
    );
  }

  return (
    <main className="deskmanager-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="MediNest Pharmacy home">
          <span className="brand-mark">+</span>
          <span>MediNest</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/all">Products</Link>
          <Link href="/#services">Services</Link>
        </nav>

        <button className="header-action" type="button">
          Publish update
        </button>
      </header>

      <section className="deskmanager-header">
        <div>
          <p className="eyebrow">Desk manager</p>
          <h1>Front desk control center</h1>
        </div>

        <div className="deskmanager-meta">
          <span className="status-pill success">9 staff online</span>
          <time>Today · 9:14 AM</time>
        </div>
      </section>

      <section className="deskmanager-summary" aria-label="Desk summary">
        <article className="stat-card accent">
          <span>Customers waiting</span>
          <strong>26</strong>
        </article>
        <article className="stat-card warm">
          <span>Tickets open</span>
          <strong>14</strong>
        </article>
        <article className="stat-card muted">
          <span>Avg. response</span>
          <strong>4 min</strong>
        </article>
        <article className="stat-card accent">
          <span>Orders today</span>
          <strong>128</strong>
        </article>
      </section>

      <section className="deskmanager-grid">
        <div className="deskmanager-column">
          <article className="admin-panel">
            <div className="panel-header">
              <h2>Queue monitor</h2>
              <label className="inline-toggle">
                <input
                  type="checkbox"
                  checked={showOnlyHighPriority}
                  onChange={() => setShowOnlyHighPriority((value) => !value)}
                />
                <span>High priority</span>
              </label>
            </div>

            <div className="queue-list">
              {filteredQueue.map((item) => (
                <div className="queue-item" key={item.id}>
                  <div>
                    <strong>{item.id}</strong>
                    <span>{item.name}</span>
                  </div>
                  <div className="queue-details">
                    <small>{item.reason}</small>
                    <em>{item.wait}</em>
                  </div>
                  <span
                    className={
                      item.priority === "High" ? "priority-badge high" : "priority-badge"
                    }
                  >
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="admin-panel">
            <div className="panel-header">
              <h2>Today&apos;s tasks</h2>
              <button className="text-button" type="button">
                Add task
              </button>
            </div>

            <div className="task-list">
              {taskList.map((task) => (
                <div className="task-row" key={task.label}>
                  <span>{task.label}</span>
                  <strong>{task.status}</strong>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="deskmanager-column">
          <article className="admin-panel">
            <div className="panel-header">
              <h2>Website controls</h2>
              <span className="tiny-label">Live</span>
            </div>

            <div className="settings-list">
              {settings.map((setting, index) => (
                <label className="toggle-row" key={setting.label}>
                  <span>
                    <strong>{setting.label}</strong>
                    <small>{setting.description}</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={setting.on}
                    onChange={() => toggleSetting(index)}
                  />
                </label>
              ))}
            </div>
          </article>

          <article className="admin-panel">
            <div className="panel-header">
              <h2>Service snapshot</h2>
            </div>

            <div className="snapshot-list">
              <div className="snapshot-row">
                <span>Pickup queue</span>
                <strong>12 active</strong>
              </div>
              <div className="snapshot-row">
                <span>Delivery riders</span>
                <strong>4 on shift</strong>
              </div>
              <div className="snapshot-row">
                <span>Refund requests</span>
                <strong>3 pending</strong>
              </div>
              <div className="snapshot-row">
                <span>Reviews waiting</span>
                <strong>9 new</strong>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
