"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { customer, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !customer) {
      router.push("/auth/login");
    }
  }, [customer, loading, router]);

  if (loading) {
    return (
      <main className="auth-main">
        <div className="auth-loading">Loading...</div>
      </main>
    );
  }

  if (!customer) {
    return (
      <main className="auth-main">
        <div className="auth-loading">Redirecting to login...</div>
      </main>
    );
  }

  return <>{children}</>;
}
