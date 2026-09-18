"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    const result = login({ email: email.trim(), password });
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
          <h1>Welcome back</h1>
          <p>
            Log in to access your prescriptions, track deliveries, and manage
            your pharmacy account.
          </p>
          <ul className="auth-benefits">
            <li>View active prescriptions</li>
            <li>Track your delivery in real time</li>
            <li>Manage refill schedules</li>
            <li>Access order history</li>
          </ul>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <h2>Log in</h2>
          <p className="auth-subtitle">Access your customer account</p>

          {error && <div className="auth-error">{error}</div>}

          <div className="field-group">
            <label htmlFor="email">Email address</label>
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p className="auth-redirect">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
