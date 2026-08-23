import { useState } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

const starterProducts = [
  {
    id: 1,
    name: 'Blueberry Croissant',
    description: 'Flaky butter croissant filled with sweet blueberry filling.',
    price: 7.5,
    category: 'Pastries',
    image: heroImg,
    available: true,
  },
  {
    id: 2,
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake finished with chocolate buttercream.',
    price: 42,
    category: 'Cakes',
    image: heroImg,
    available: true,
  },
  {
    id: 3,
    name: 'Vanilla Berry Cake',
    description: 'Vanilla cake layered with fresh berries and cream.',
    price: 38,
    category: 'Cakes',
    image: heroImg,
    available: true,
  },
  {
    id: 4,
    name: 'Cinnamon Roll',
    description: 'Soft cinnamon roll finished with vanilla glaze.',
    price: 6,
    category: 'Pastries',
    image: heroImg,
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
            {product.available ? 'View Item' : 'Unavailable'}
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

function App() {
  const [products, setProducts] = useState(starterProducts)

  const removeProduct = (productId) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    )
  }

  return (
    <div className="site">
      <header className="site-header">
        <a className="brand" href="#home">
          <div className="logo-placeholder">B</div>

          <div>
            <span className="brand-name">BAKERY NAME</span>
            <span className="brand-tagline">small batch bakery</span>
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
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <span className="eyebrow">SMALL BATCH · LIMITED DROPS</span>

            <h1>
              Freshly baked.
              <span>Made to be remembered.</span>
            </h1>

            <p>
              Seasonal pastries and desserts made in small batches.
              Browse the current menu and be first to hear about the next drop.
            </p>

            <div className="hero-actions">
              <a href="#menu" className="primary-button">
                Explore the menu
              </a>

              <a href="#drops" className="secondary-button">
                Get early access
              </a>
            </div>
          </div>

          <div className="hero-image-container">
            <img
              src={heroImg}
              alt="Selection of freshly baked pastries"
              className="hero-image"
            />
          </div>
        </section>

        <section className="early-access" id="drops">
          <div>
            <span className="eyebrow">NEXT DROP</span>
            <h2>Be first in line.</h2>

            <p>
              Join the list for early access to limited bakery drops,
              seasonal items, and special releases.
            </p>
          </div>

          <form
            className="email-form"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="drop-email" className="sr-only">
              Email address
            </label>

            <input
              id="drop-email"
              type="email"
              placeholder="you@example.com"
              required
            />

            <button type="submit">Join the list</button>
          </form>
        </section>

        <section className="catalog-section" id="menu">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE MENU</span>
              <h2>Current favorites</h2>
            </div>

            <p>
              Small-batch treats made for this week's menu.
            </p>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-number">01</div>

          <div>
            <span className="eyebrow">ABOUT THE BAKERY</span>

            <h2>Made thoughtfully, shared generously.</h2>

            <p>
              This section can eventually tell the story of the baker,
              the inspiration behind the business, and what makes each
              drop special.
            </p>
          </div>
        </section>

        <section className="reviews-section" id="reviews">
          <div className="section-heading">
            <div>
              <span className="eyebrow">REVIEWS</span>
              <h2>What people are saying</h2>
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
          <span className="eyebrow">DEVELOPMENT SANDBOX</span>

          <h2>Product data test</h2>

          <p>
            This is temporary. It lets you practice deleting objects
            from React state before building the real owner dashboard.
          </p>

          <div className="admin-product-list">
            {products.map((product) => (
              <div className="admin-product" key={product.id}>
                <span>{product.name}</span>

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
          <span className="eyebrow">STAY CONNECTED</span>

          <h2>Don't miss the next drop.</h2>

          <p>
            Follow the bakery or join the list for new menus,
            special drops, and future events.
          </p>

          <a href="mailto:hello@example.com">
            hello@example.com
          </a>
        </section>
      </main>

      <footer>
        <span>© 2026 Bakery Name</span>
        <span>Made with care.</span>
      </footer>
    </div>
  )
}

export default App