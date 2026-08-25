// src/App.jsx

import { useState } from 'react'
// import heroImg from './assets/hero.png'
import './App.css'

const starterProducts = [
  {
    id: 1,
    name: 'Blueberry Croissant',
    description: 'Flaky butter croissant filled with sweet blueberry filling.',
    price: 7.5,
    category: 'Pastries',
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3qobHNrlUiQBp0LkDxTHH5cVyHTWfO_8GqrIlb_bSa3aYMXU2fc8XvpYQ&s=10",
    available: true,
  },
  {
    id: 2,
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake finished with chocolate buttercream.',
    price: 42,
    category: 'Cakes',
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbSTB_I-dhyT_QxiFK16h5iU-7DHQqitqDV2SYYeDmGA&s=10",
    available: true,
  },
  {
    id: 3,
    name: 'Vanilla Berry Cake',
    description: 'Vanilla cake layered with fresh berries and cream.',
    price: 38,
    category: 'Cakes',
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ15r9XGQVfmo39gN2JddjrSdCdTILmMwpArBK2COhX3g&s=10",
    available: true,
  },
  {
    id: 4,
    name: 'Cinnamon Roll',
    description: 'Soft cinnamon roll finished with vanilla glaze.',
    price: 6,
    category: 'Pastries',
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9vRUBQYiLdNDMOm313IC5Vq29dCUsUAUlU8D-BMjWIQ&s=10",
    available: false,
  },
]

const starterReviews = [
  {
    id: 1,
    name: 'Jordan M.',
    rating: 5,
    text: 'Everything tasted fresh and the pastries disappeared immediately.',
  },
  {
    id: 2,
    name: 'Alex R.',
    rating: 5,
    text: 'The cake looked incredible and tasted even better.',
  },
  {
    id: 3,
    name: 'Taylor S.',
    rating: 4,
    text: 'Beautiful presentation, great flavors, and easy pickup.',
  },
]

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <div className="cookie-stamp">B</div>

        {!product.available && (
          <span className="sold-out-badge">Sold Out</span>
        )}
      </div>

      <div className="product-content">
        <span className="product-category">{product.category}</span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="product-footer">
          <strong>${product.price.toFixed(2)}</strong>

          <button disabled={!product.available}>
            {product.available ? 'View Treat' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  )
}

function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <div className="review-avatar">
        {review.name.charAt(0)}
      </div>

      <div>
        <h3>{review.name}</h3>

        <div
          className="stars"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {'★'.repeat(review.rating)}
          {'☆'.repeat(5 - review.rating)}
        </div>

        <p>{review.text}</p>
      </div>
    </article>
  )
}

function CookieMarquee() {
  return (
    <div className="cookie-marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>FRESH BAKES</span>
        <span className="mini-cookie">●</span>
        <span>SMALL BATCH</span>
        <span className="mini-cookie">●</span>
        <span>SWEET MOMENTS</span>
        <span className="mini-cookie">●</span>
        <span>FRESH BAKES</span>
        <span className="mini-cookie">●</span>
        <span>SMALL BATCH</span>
        <span className="mini-cookie">●</span>
        <span>SWEET MOMENTS</span>
        <span className="mini-cookie">●</span>
      </div>
    </div>
  )
}

function App() {
  const [products, setProducts] = useState(starterProducts)
  const [activeCategory, setActiveCategory] = useState('All')
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const categories = [
    'All',
    ...new Set(starterProducts.map((product) => product.category)),
  ]

  const visibleProducts =
    activeCategory === 'All'
      ? products
      : products.filter((product) => product.category === activeCategory)

  const removeProduct = (productId) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    )
  }

  const handleEmailSubmit = (event) => {
    event.preventDefault()

    if (!email.trim()) return

    setJoined(true)
    setEmail('')
  }

  return (
    <div className="site">
      <div className="top-stripes" />

      <header className="site-header">
        <a className="brand" href="#home">
          <div className="logo-cookie">
            <span>B</span>
            <i />
            <i />
            <i />
          </div>

          <div>
            <span className="brand-name">BAKERY NAME</span>
            <span className="brand-tagline">
              small batch bakery
            </span>
          </div>
        </a>

        <nav className="navigation" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#drops">Drops</a>
          <a href="#about">About</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="header-order-button" href="#menu">
          Order treats
        </a>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-cookie cookie-one" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="hero-cookie cookie-two" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="hero-copy">
            <span className="eyebrow">
              SMALL BATCH · LIMITED DROPS
            </span>

            <h1>
              Freshly baked.
              <span>Made to be remembered.</span>
            </h1>

            <p>
              Seasonal pastries, cakes, and desserts made in small
              batches with a little nostalgia and a lot of butter.
            </p>

            <div className="hero-actions">
              <a href="#menu" className="primary-button">
                Explore the menu
              </a>

              <a href="#drops" className="secondary-button">
                Get early access
              </a>
            </div>

            <div className="hero-note">
              <div className="small-cookie">
                <span />
                <span />
                <span />
              </div>

              <p>
                New menu drops every week.
              </p>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-frame">
              <img
                src={"https://cdn1.harryanddavid.com/wcsstore/HarryAndDavid/images/catalog/18_7609_30RA_09ex.jpg"}
                alt="Selection of freshly baked pastries"
                className="hero-image"
              />

              <div className="hero-sticker">
                <span>BAKED</span>
                <strong>FRESH</strong>
                <span>DAILY</span>
              </div>
            </div>

            <div className="hero-caption">
              <span>01</span>

              <p>
                Hand-finished pastries made for slow mornings and
                special occasions.
              </p>
            </div>
          </div>
        </section>

        <CookieMarquee />

        <section className="catalog-section" id="menu">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE MENU</span>

              <h2>
                Pick your
                <span>favorite.</span>
              </h2>
            </div>

            <p>
              Small-batch treats made for this week's menu.
              Quantities are limited.
            </p>
          </div>

          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  activeCategory === category
                    ? 'category-button active'
                    : 'category-button'
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

        <section className="stripe-break">
          <div className="stripe-copy">
            <span>COOKIES</span>
            <span>PASTRIES</span>
            <span>CAKES</span>
            <span>GOOD DAYS</span>
          </div>
        </section>

        <section className="early-access" id="drops">
          <div className="early-access-copy">
            <span className="eyebrow">NEXT DROP</span>

            <h2>
              Good things
              <span>go quickly.</span>
            </h2>

            <p>
              Join the list for early access to seasonal menus,
              limited bakery drops, and special releases.
            </p>
          </div>

          <div className="drop-card">
            <div className="drop-cookie">
              <div className="cookie-bite" />

              <span className="chip chip-one" />
              <span className="chip chip-two" />
              <span className="chip chip-three" />
              <span className="chip chip-four" />
              <span className="chip chip-five" />
            </div>

            <form
              className="email-form"
              onSubmit={handleEmailSubmit}
            >
              <label htmlFor="drop-email">
                Email address
              </label>

              <div className="email-input-row">
                <input
                  id="drop-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />

                <button type="submit">
                  Join list
                </button>
              </div>

              {joined && (
                <p className="success-message">
                  You're on the list. Save room for dessert.
                </p>
              )}
            </form>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-number">
            <span>01</span>
          </div>

          <div className="about-copy">
            <span className="eyebrow">ABOUT THE BAKERY</span>

            <h2>
              A neighborhood bakery with
              <span>a playful side.</span>
            </h2>

            <p>
              Made thoughtfully, shared generously. Our menu
              changes with the seasons and each bake is prepared
              in small batches for better flavor, texture, and
              freshness.
            </p>

            <a href="#contact" className="text-link">
              Meet the bakery
              <span>→</span>
            </a>
          </div>

          <div className="about-decoration">
            <div className="cookie-stack">
              <div className="stack-cookie cookie-a">
                <i />
                <i />
                <i />
              </div>

              <div className="stack-cookie cookie-b">
                <i />
                <i />
                <i />
              </div>

              <div className="stack-cookie cookie-c">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </section>

        <section className="reviews-section" id="reviews">
          <div className="section-heading">
            <div>
              <span className="eyebrow">KIND WORDS</span>

              <h2>
                Baked with love.
                <span>Reviewed with crumbs.</span>
              </h2>
            </div>
          </div>

          <div className="reviews-row">
            {starterReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
              />
            ))}
          </div>
        </section>

        <section className="admin-demo">
          <div>
            <span className="eyebrow">
              DEVELOPMENT SANDBOX
            </span>

            <h2>Product data test</h2>

            <p>
              Temporary controls for practicing React state.
            </p>
          </div>

          <div className="admin-product-list">
            {products.map((product) => (
              <div
                className="admin-product"
                key={product.id}
              >
                <div>
                  <span>{product.name}</span>
                  <small>{product.category}</small>
                </div>

                <button
                  type="button"
                  onClick={() => removeProduct(product.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-cookie">
            <span />
            <span />
            <span />
            <span />
          </div>

          <span className="eyebrow">STAY CONNECTED</span>

          <h2>
            Don't miss the
            <span>next batch.</span>
          </h2>

          <p>
            Follow the bakery or join our mailing list for new
            menus, seasonal drops, and future events.
          </p>

          <a href="mailto:hello@example.com">
            hello@example.com
          </a>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <div className="logo-cookie footer-logo">
            <span>B</span>
          </div>

          <span>Bakery Name</span>
        </div>

        <span>© 2026 Bakery Name</span>

        <span>Made with butter + care.</span>
      </footer>
    </div>
  )
}

export default App