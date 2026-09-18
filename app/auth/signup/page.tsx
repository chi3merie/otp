"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const result = signup({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      password,
    });
    setLoading(false);

    if (result.success) {
      router.push("/customer");
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <main className="auth-main">
      <div className="auth-shell">
        <div className="auth-info">
          <Link className="brand" href="/" aria-label="Pharmacy home">
            <span className="brand-mark">+</span>
            <span>Chiemerie Medicals</span>
          </Link>
          <h1>Create your customer account</h1>
          <p>
            Sign up to manage prescriptions, track orders, and get personalized
            care from our pharmacy team.
          </p>
          <ul className="auth-benefits">
            <li>Fast prescription refills</li>
            <li>Same-day delivery tracking</li>
            <li>Personalized health reminders</li>
            <li>Order history &amp; receipts</li>
          </ul>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <h2>Sign up</h2>
          <p className="auth-subtitle">Create an account to get started</p>

          {error && <div className="auth-error">{error}</div>}

          <div className="field-group">
            <label htmlFor="name">Full name *</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="field-group">
            <label htmlFor="email">Email address *</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="field-group">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              type="tel"
              placeholder="(234) 000-000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
          </div>

          <div className="field-group">
            <label htmlFor="address">Delivery address</label>
            <input
              id="address"
              type="text"
              placeholder="Your home or office address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="street-address"
            />
          </div>

          <div className="field-group">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              minLength={6}
            />
          </div>

          <div className="field-group">
            <label htmlFor="confirmPassword">Confirm password *</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              minLength={6}
            />
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="auth-redirect">
            Already have an account?{" "}
            <Link href="/auth/login">Log in</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
