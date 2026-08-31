import Image from "next/image";
import Link from "next/link";

import { products } from "../data";

export default function AllProductsPage() {
  return (
    <main className="all-products-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="MediNest Pharmacy home">
          <span className="brand-mark">+</span>
          <span>MediNest</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/#shop">Shop</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#delivery">Delivery</Link>
        </nav>
        <Link className="header-action" href="/#cart">
          Cart
        </Link>
      </header>

      <section className="all-products-hero">
        <div>
          <p className="eyebrow">Everyday essentials</p>
          <h1>All pharmacy products</h1>
        </div>
        <Link className="secondary-button" href="/">
          Back to home
        </Link>
      </section>

      <section className="catalog-section all-products-section">
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <Link
                className="product-image"
                href={`/products/${product.id}`}
                aria-label={`View ${product.name}`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={520}
                  height={360}
                />
                <span>{product.badge}</span>
              </Link>
              <div className="product-content">
                <p>{product.category}</p>
                <h3>
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <span>{product.description}</span>
                <div className="product-footer">
                  <strong>${product.price.toFixed(2)}</strong>
                  <Link
                    className="product-view-link"
                    href={`/products/${product.id}`}
                  >
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
