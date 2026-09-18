"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function CustomerDashboard() {
  const { customer, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <main className="customer-main">
      <header className="customer-header">
        <div className="customer-header-inner">
          <Link className="brand" href="/" aria-label="Pharmacy home">
            <span className="brand-mark">+</span>
            <span>Chiemerie Medicals</span>
          </Link>
          <nav className="customer-nav">
            <span className="customer-greeting">
              Hi, {customer?.name.split(" ")[0]}
            </span>
            <button className="logout-button" onClick={handleLogout} type="button">
              Log out
            </button>
          </nav>
        </div>
      </header>

      <section className="customer-hero">
        <div className="customer-hero-copy">
          <p className="eyebrow">Customer dashboard</p>
          <h1>Welcome, {customer?.name}</h1>
          <p>
            Manage your prescriptions, track orders, and update your details —
            all in one place.
          </p>
        </div>
      </section>

      <section className="customer-grid">
        <div className="customer-card">
          <h3>Profile information</h3>
          <div className="detail-row">
            <span>Full name</span>
            <strong>{customer?.name}</strong>
          </div>
          <div className="detail-row">
            <span>Email</span>
            <strong>{customer?.email}</strong>
          </div>
          <div className="detail-row">
            <span>Phone</span>
            <strong>{customer?.phone ?? "Not provided"}</strong>
          </div>
          <div className="detail-row">
            <span>Address</span>
            <strong>{customer?.address ?? "Not provided"}</strong>
          </div>
        </div>

        <div className="customer-card">
          <h3>Quick actions</h3>
          <ul className="action-list">
            <li>
              <Link href="/#shop" className="action-link">
                <span className="action-icon" aria-hidden="true">+</span>
                <div>
                  <strong>Shop products</strong>
                  <span>Browse health essentials and wellness items</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/all" className="action-link">
                <span className="action-icon" aria-hidden="true">≡</span>
                <div>
                  <strong>All products</strong>
                  <span>View the full product catalogue</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/#delivery" className="action-link">
                <span className="action-icon" aria-hidden="true">↗</span>
                <div>
                  <strong>Refill prescription</strong>
                  <span>Request a refill for your medication</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/#cart" className="action-link">
                <span className="action-icon" aria-hidden="true">🛒</span>
                <div>
                  <strong>View cart</strong>
                  <span>Continue to checkout</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        <div className="customer-card">
          <h3>Account status</h3>
          <div className="status-badge active">
            Active customer account
          </div>
          <p>
            Your account is active. You can place orders, request prescription
            refills, and enjoy same-day delivery from our pharmacy.
          </p>
        </div>

        <div className="customer-card">
          <h3>Need help?</h3>
          <p>
            Reach out to our care team for support with orders, prescriptions,
            or account questions.
          </p>
          <div className="contact-info">
            <span>(234) 9132040932</span>
            <span>74 Willow Market Street, ABJ</span>
          </div>
        </div>
      </section>
    </main>
  );
}
