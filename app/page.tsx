"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import AuthStatus from "./auth-status";
import {
  careSteps,
  categories,
  products,
  promos,
  services,
  testimonials,
} from "./data";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<Record<number, number>>({ 1: 1, 3: 1 });

  const visibleProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }

    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const cartItems = products.filter((product) => cart[product.id]);
  const subtotal = cartItems.reduce(
    (total, product) => total + product.price * cart[product.id],
    0
  );

  function addToCart(productId: number) {
    setCart((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }));
  }

  function changeQuantity(productId: number, amount: number) {
    setCart((current) => {
      const nextQuantity = (current[productId] ?? 0) + amount;
      const nextCart = { ...current };

      if (nextQuantity <= 0) {
        delete nextCart[productId];
      } else {
        nextCart[productId] = nextQuantity;
      }

      return nextCart;
    });
  }

  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="#top" aria-label="MediNest Pharmacy home">
          <span className="brand-mark">+</span>
          <span>Chiemerie Medicals</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#shop">Shop</a>
          <Link href="/all">All products</Link>
          <a href="#services">Services</a>
          <a href="#delivery">Delivery</a>
          <a href="#visit">Visit</a>
        </nav>
        <a className="header-action cart-link" href="#cart">
          Cart ({cartItems.length})
        </a>
        <AuthStatus />
      </header>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Open today 8 AM - 10 PM</p>
          <h1>Your pharmacy, ready online.</h1>
          <p>
            Refill prescriptions, shop trusted health essentials, and get
            same-day delivery from a care team that knows the neighborhood.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#shop">
              Shop essentials
            </a>
            <a className="secondary-button" href="#delivery">
              Refill prescription
            </a>
          </div>
        </div>

        <div className="hero-panel" aria-label="Featured pharmacy services">
          <div>
            <span className="panel-label">Next delivery window</span>
            <strong>45-60 min</strong>
          </div>
          <div>
            <span className="panel-label">Licensed support</span>
            <strong>Pharmacist on call</strong>
          </div>
          <div>
            <span className="panel-label">Prescriptions filled</span>
            <strong>128 today</strong>
          </div>
        </div>
      </section>

      <section id="services" className="service-strip" aria-label="Services">
        {services.map((service) => (
          <article key={service}>
            <span aria-hidden="true">+</span>
            <p>{service}</p>
          </article>
        ))}
      </section>

      <section className="promo-section" aria-label="Store promotions">
        {promos.map((promo) => (
          <article key={promo.title}>
            <span>Offer</span>
            <h3>{promo.title}</h3>
            <p>{promo.detail}</p>
          </article>
        ))}
      </section>

      <section id="shop" className="catalog-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Health essentials</p>
            <h2>Shop popular pharmacy picks</h2>
          </div>
          <Link className="secondary-button view-all-button" href="/all">
            View all products
          </Link>
        </div>

        <div className="category-tabs" aria-label="Product categories">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "active" : ""}
              type="button"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {visibleProducts.map((product) => (
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
                  <button type="button" onClick={() => addToCart(product.id)}>
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="delivery" className="delivery-section">
        <div>
          <p className="eyebrow">Pickup and delivery</p>
          <h2>Refills without the waiting room.</h2>
          <p>
            Send refill requests, choose curbside pickup, or schedule home
            delivery with medication notes and privacy-first handoff.
          </p>
        </div>
        <form className="refill-form">
          <label>
            Prescription number
            <input type="text" placeholder="RX-204871" />
          </label>
          <label>
            Phone number
            <input type="tel" placeholder="(234) 9134394832" />
          </label>
          <button type="button">Request refill</button>
        </form>
      </section>

      <section className="care-section" aria-label="Prescription care process">
        <div>
          <p className="eyebrow">How refills work</p>
          <h2>Medication care with fewer loose ends.</h2>
        </div>
        <div className="care-steps">
          {careSteps.map((step, index) => (
            <article key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="trust-section" aria-label="Customer stories">
        <div>
          <p className="eyebrow">Trusted locally</p>
          <h2>Real care, not just a counter.</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name}>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>{testimonial.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="cart" className="cart-section">
        <div className="cart-copy">
          <p className="eyebrow">Current cart</p>
          <h2>Ready for checkout</h2>
          <p>
            This demo keeps the cart in your browser session. Connect checkout
            and inventory when you are ready to sell live.
          </p>
        </div>

        <aside className="cart-panel" aria-label="Shopping cart">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            cartItems.map((product) => (
              <div className="cart-row" key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <span>${product.price.toFixed(2)} each</span>
                </div>
                <div className="quantity-controls">
                  <button
                    type="button"
                    aria-label={`Remove one ${product.name}`}
                    onClick={() => changeQuantity(product.id, -1)}
                  >
                    -
                  </button>
                  <span>{cart[product.id]}</span>
                  <button
                    type="button"
                    aria-label={`Add one ${product.name}`}
                    onClick={() => changeQuantity(product.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
          <div className="cart-total">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <button className="checkout-button" type="button">
            Continue to checkout
          </button>
        </aside>
      </section>

      <footer id="visit" className="site-footer">
        <div>
          <a className="brand" href="#top" aria-label="MediNest Pharmacy home">
            <span className="brand-mark">+</span>
            <span>MediNest</span>
          </a>
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
