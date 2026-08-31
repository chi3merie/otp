import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { products } from "../../data";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

// Look up a product by its numeric id. Returns undefined when the id
// is not numeric or does not match any product.
function findProduct(id: string) {
  const productId = Number(id);
  if (!Number.isInteger(productId)) {
    return undefined;
  }

  return products.find((product) => product.id === productId);
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = findProduct(id);

  if (!product) {
    return { title: "Product not found — MediNest Pharmacy" };
  }

  return {
    title: `${product.name} — MediNest Pharmacy`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = findProduct(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(
    (candidate) =>
      candidate.category === product.category && candidate.id !== product.id
  );

  return (
    <main className="product-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="MediNest Pharmacy home">
          <span className="brand-mark">+</span>
          <span>MediNest</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/all">All products</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#delivery">Delivery</Link>
        </nav>
        <Link className="header-action" href="/#cart">
          Cart
        </Link>
      </header>

      <section className="product-detail-section">
        <p className="breadcrumbs">
          <Link href="/">Home</Link> / <Link href="/all">Products</Link> /{" "}
          <span>{product.name}</span>
        </p>

        <div className="product-detail">
          <div className="product-image product-detail-image">
            <Image
              src={product.image}
              alt={product.name}
              width={880}
              height={620}
              priority
            />
            <span>{product.badge}</span>
          </div>

          <div className="product-detail-content">
            <p>{product.category}</p>
            <h1>{product.name}</h1>
            <span>{product.description}</span>
            <strong className="product-detail-price">
              ${product.price.toFixed(2)}
            </strong>
            <div className="product-detail-actions">
              <button className="primary-button" type="button">
                Add to cart
              </button>
              <Link className="secondary-button" href="/all">
                Browse more products
              </Link>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="related-products">
            <h2>More in {product.category}</h2>
            <div className="product-grid">
              {relatedProducts.map((related) => (
                <Link
                  className="product-card"
                  key={related.id}
                  href={`/products/${related.id}`}
                >
                  <div className="product-image">
                    <Image
                      src={related.image}
                      alt={related.name}
                      width={520}
                      height={360}
                    />
                    <span>{related.badge}</span>
                  </div>
                  <div className="product-content">
                    <p>{related.category}</p>
                    <h3>{related.name}</h3>
                    <span>{related.description}</span>
                    <div className="product-footer">
                      <strong>${related.price.toFixed(2)}</strong>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <footer className="site-footer">
        <div>
          <Link className="brand" href="/" aria-label="MediNest Pharmacy home">
            <span className="brand-mark">+</span>
            <span>MediNest</span>
          </Link>
          <p>74 Willow Market Street, ABJ</p>
          <p>(234) 9132040932</p>
        </div>
        <div className="hours-grid">
          <span>Mon-Fri</span>
          <strong>8 AM - 10 PM</strong>
          <span>Saturday</span>
          <strong>9 AM - 8 PM</strong>
          <span>Sunday</span>
          <strong>10 AM - 6 PM</strong>
        </div>
      </footer>
    </main>
  );
}