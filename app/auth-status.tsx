"use client";

import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function AuthStatus() {
  const { customer } = useAuth();

  if (customer) {
    return (
      <Link className="header-action" href="/customer">
        {customer.name.split(" ")[0]}
      </Link>
    );
  }

  return (
    <div className="auth-actions">
      <Link className="header-action login-link" href="/auth/login">
        Log in
      </Link>
      <Link className="header-action signup-link" href="/auth/signup">
        Sign up
      </Link>
    </div>
  );
}
