import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <p className="eyebrow">404 — Page not found</p>
      <h1>We couldn&apos;t find that page.</h1>
      <p>
        The link may be outdated or the product may no longer be available.
        Try browsing the full catalog instead.
      </p>
      <div className="hero-actions">
        <Link className="primary-button" href="/">
          Back to home
        </Link>
        <Link className="secondary-button" href="/all">
          All products
        </Link>
      </div>
    </main>
  );
}