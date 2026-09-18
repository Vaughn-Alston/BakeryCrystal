// src/App.jsx

import { useMemo, useState } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

const starterProducts = [
  {
    id: 1,
    name: 'Classic Chip',
    description: 'Our original brown-butter chocolate chip, crisp edges and a soft center.',
    price: 4.5,
    category: 'Classic Cookies',
    image: heroImg,
    available: true,
  },
  {
    id: 2,
    name: 'Double Sugar',
    description: 'Vanilla bean sugar cookie rolled in raw sugar for extra crunch.',
    price: 4,
    category: 'Classic Cookies',
    image: heroImg,
    available: true,
  },
  {
    id: 3,
    name: 'Oreo Stuffed',
    description: 'Chocolate cookie dough wrapped around a whole Oreo and cream filling.',
    price: 6,
    category: 'Stuffed Cookies',
    image: heroImg,
    available: true,
  },
  {
    id: 4,
    name: 'Birthday Stuffed',
    description: 'Funfetti dough stuffed with vanilla frosting and rainbow sprinkles.',
    price: 6,
    category: 'Stuffed Cookies',
    image: heroImg,
    available: false,
  },
  {
    id: 5,
    name: "S'mores Loaded",
    description: 'Graham-studded dough loaded with chocolate chunks and toasted marshmallow.',
    price: 6.5,
    category: 'Loaded Cookies',
    image: heroImg,
    available: true,
  },
  {
    id: 6,
    name: 'Salted Caramel Loaded',
    description: 'Brown sugar dough loaded with caramel bits and flaky sea salt.',
    price: 6.5,
    category: 'Loaded Cookies',
    image: heroImg,
    available: true,
  },
]

const starterReviews = [
  {
    id: 1,
    name: 'Jordan M.',
    rating: 5,
    text: 'Everything tasted fresh and the cookies disappeared immediately.',
  },
  {
    id: 2,
    name: 'Alex R.',
    rating: 5,
    text: 'The stuffed cookies looked incredible and tasted even better.',
  },
  {
    id: 3,
    name: 'Taylor S.',
    rating: 4,
    text: 'Beautiful presentation, great flavors, and easy pickup.',
  },
]

const cookieBases = [
  {
    id: 'chocolate-chip',
    label: 'Chocolate Chip',
    className: 'base-chocolate-chip',
    swatch: '#d9a76c',
  },
  {
    id: 'oreo',
    label: 'Oreo',
    className: 'base-oreo',
    swatch: '#4b2d24',
  },
  {
    id: 'vanilla',
    label: 'Vanilla',
    className: 'base-vanilla',
    swatch: '#f4eddf',
  },
  {
    id: 'sugar',
    label: 'Sugar Cookie',
    className: 'base-sugar',
    swatch: '#e9deca',
  },
]

// Hand-placed positions per topping so every combination scatters
// naturally across the same cookie without ever overlapping perfectly.
const mixIns = [
  {
    id: 'mms',
    label: "M&M's",
    price: 0.75,
    colors: ['#d0392b', '#f2b632', '#3f7d4f', '#2f6fb0', '#e07a2c'],
    shape: 'dot',
    positions: [
      [22, 28], [68, 20], [40, 45], [78, 55], [15, 62], [55, 72], [30, 80],
    ],
  },
  {
    id: 'reeses',
    label: "Reese's Pieces",
    price: 0.75,
    colors: ['#e8952f', '#f4c14a'],
    shape: 'dot',
    positions: [
      [30, 22], [60, 30], [20, 48], [72, 42], [45, 62], [65, 75], [18, 78],
    ],
  },
  {
    id: 'blueberries',
    label: 'Blueberries',
    price: 0.9,
    colors: ['#3a4a8a', '#4c5fae'],
    shape: 'dot',
    positions: [
      [25, 35], [55, 25], [70, 50], [38, 68], [60, 78], [18, 55],
    ],
  },
  {
    id: 'chunks',
    label: 'Chocolate Chunks',
    price: 0.6,
    colors: ['#4b2d24', '#3d2b24'],
    shape: 'chunk',
    positions: [
      [24, 24], [66, 26], [42, 40], [20, 66], [72, 62], [48, 78],
    ],
  },
  {
    id: 'sprinkles',
    label: 'Sprinkles',
    price: 0.5,
    colors: ['#92cfe8', '#d0392b', '#f2b632', '#fffdf8'],
    shape: 'sprinkle',
    positions: [
      [20, 30, 20], [35, 20, -30], [55, 24, 45], [72, 32, -10],
      [28, 55, 60], [48, 62, -50], [66, 68, 15], [80, 48, -25],
      [15, 75, 40], [60, 80, -15],
    ],
  },
  {
    id: 'caramel',
    label: 'Caramel Bits',
    price: 0.6,
    colors: ['#c9862f', '#b5721f'],
    shape: 'chunk',
    positions: [
      [30, 30], [62, 22], [75, 58], [22, 60], [50, 72],
    ],
  },
]

const drizzles = [
  { id: 'none', label: 'None', price: 0, color: null },
  { id: 'chocolate', label: 'Chocolate', price: 0.75, color: '#4b2d24' },
  { id: 'caramel', label: 'Caramel', price: 0.75, color: '#c9862f' },
  { id: 'white', label: 'White', price: 0.75, color: '#fffdf8' },
]

const basePrice = 5

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

function CookiePreview({ base, activeMixIns, drizzle }) {
  const drizzleStyle = drizzle.color
    ? { '--drizzle-color': drizzle.color }
    : undefined

  return (
    <div className="cookie-preview-frame">
      <div className={`cookie-preview ${base.className}`}>
        {activeMixIns.map((mixIn) =>
          mixIn.positions.map(([top, left, rotate], index) => {
            const color = mixIn.colors[index % mixIn.colors.length]

            if (mixIn.shape === 'sprinkle') {
              return (
                <span
                  key={`${mixIn.id}-${index}`}
                  className="topping-dot topping-sprinkle"
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    background: color,
                    transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                  }}
                />
              )
            }

            if (mixIn.shape === 'chunk') {
              return (
                <span
                  key={`${mixIn.id}-${index}`}
                  className="topping-dot topping-chunk"
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    background: color,
                  }}
                />
              )
            }

            return (
              <span
                key={`${mixIn.id}-${index}`}
                className="topping-dot topping-round"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  background: color,
                }}
              />
            )
          }),
        )}

        {drizzle.color && (
          <span className="drizzle-overlay" style={drizzleStyle} />
        )}
      </div>
    </div>
  )
}

function CookieBuilder() {
  const [baseId, setBaseId] = useState(cookieBases[0].id)
  const [selectedMixIns, setSelectedMixIns] = useState(['mms'])
  const [drizzleId, setDrizzleId] = useState('none')

  const base = cookieBases.find((option) => option.id === baseId)
  const drizzle = drizzles.find((option) => option.id === drizzleId)
  const activeMixIns = mixIns.filter((mixIn) =>
    selectedMixIns.includes(mixIn.id),
  )

  const total = useMemo(() => {
    const mixInTotal = activeMixIns.reduce(
      (sum, mixIn) => sum + mixIn.price,
      0,
    )
    return basePrice + mixInTotal + drizzle.price
  }, [activeMixIns, drizzle])

  const toggleMixIn = (id) => {
    setSelectedMixIns((current) =>
      current.includes(id)
        ? current.filter((mixInId) => mixInId !== id)
        : [...current, id],
    )
  }

  return (
    <section className="builder-section" id="build">
      <div className="section-heading">
        <div>
          <span className="eyebrow">MAKE IT YOURS</span>

          <h2>
            Build your own
            <span>cookie.</span>
          </h2>
        </div>

        <p>
          One cookie, endless combinations. Pick a base, load it up,
          finish with a drizzle.
        </p>
      </div>

      <div className="builder-layout">
        <div className="builder-preview">
          <CookiePreview
            base={base}
            activeMixIns={activeMixIns}
            drizzle={drizzle}
          />

          <div className="builder-summary">
            <span className="builder-summary-label">Your cookie</span>
            <p className="builder-summary-name">
              {base.label}
              {activeMixIns.length > 0
                ? ` + ${activeMixIns.map((m) => m.label).join(', ')}`
                : ''}
              {drizzle.id !== 'none' ? ` + ${drizzle.label} Drizzle` : ''}
            </p>

            <div className="builder-summary-footer">
              <strong>${total.toFixed(2)}</strong>
              <button type="button">Add to cart</button>
            </div>
          </div>
        </div>

        <div className="builder-controls">
          <div className="builder-step">
            <span className="builder-step-title">
              <em>Step 1</em> Choose your base
            </span>

            <div className="builder-options">
              {cookieBases.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={
                    option.id === baseId
                      ? 'base-option active'
                      : 'base-option'
                  }
                  onClick={() => setBaseId(option.id)}
                >
                  <span
                    className="option-swatch"
                    style={{ background: option.swatch }}
                  />
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="builder-step">
            <span className="builder-step-title">
              <em>Step 2</em> Add your mix-ins
            </span>

            <div className="builder-options">
              {mixIns.map((mixIn) => (
                <button
                  key={mixIn.id}
                  type="button"
                  className={
                    selectedMixIns.includes(mixIn.id)
                      ? 'mixin-option active'
                      : 'mixin-option'
                  }
                  onClick={() => toggleMixIn(mixIn.id)}
                >
                  <span
                    className="option-swatch"
                    style={{ background: mixIn.colors[0] }}
                  />
                  {mixIn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="builder-step">
            <span className="builder-step-title">
              <em>Step 3</em> Finish with a drizzle
            </span>

            <div className="builder-options">
              {drizzles.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={
                    option.id === drizzleId
                      ? 'drizzle-option active'
                      : 'drizzle-option'
                  }
                  onClick={() => setDrizzleId(option.id)}
                >
                  {option.color && (
                    <span
                      className="option-swatch"
                      style={{ background: option.color }}
                    />
                  )}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
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
          <a href="#build">Build Your Own</a>
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
              Seasonal cookies made in small batches with a little
              nostalgia and a lot of butter.
            </p>

            <div className="hero-actions">
              <a href="#menu" className="primary-button">
                Explore the menu
              </a>

              <a href="#build" className="secondary-button">
                Build your own
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
                src={heroImg}
                alt="Selection of freshly baked cookies"
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
                Hand-finished cookies made for slow mornings and
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
              Small-batch cookies made for this week's menu.
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
            <span>CHUNKS</span>
            <span>CHIPS</span>
            <span>GOOD DAYS</span>
          </div>
        </section>

        <CookieBuilder />

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
              changes with the seasons and each cookie is prepared
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
