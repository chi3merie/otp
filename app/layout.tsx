import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";

export const metadata: Metadata = {
  title: "MediNest Pharmacy",
  description:
    "A neighborhood pharmacy storefront for prescriptions, wellness products, delivery, and pharmacist support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
