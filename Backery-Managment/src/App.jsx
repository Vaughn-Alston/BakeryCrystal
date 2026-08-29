// src/App.jsx

import { useEffect, useMemo, useState } from 'react'
import heroImg from './assets/hero.png'
import logoImg from './assets/logo.png'
import './App.css'

/* ------------------------------------------------------------------ */
/* BRAND — swap this one line any time to change the logo everywhere   */
/* (header, footer, and the scrolling marquee all pull from this).     */
/* ------------------------------------------------------------------ */
const LOGO_SRC = logoImg
const INSTAGRAM_URL = 'https://instagram.com/cristissweets'
const TIKTOK_URL = 'https://tiktok.com/@cristissweets'

const starterProducts = [
  {
    id: 1,
    name: 'Classic Chip',
    description: 'Our original brown-butter chocolate chip, crisp edges and a soft center.',
    price: 4.5,
    category: 'Classic Cookies',
    image: heroImg,
    available: true,
    ingredients: 'Flour, butter, brown sugar, cane sugar, eggs, semi-sweet chocolate chips, vanilla extract, baking soda, sea salt.',
    allergens: 'Contains wheat, dairy, and eggs. Made in a kitchen that also handles tree nuts and peanuts.',
    nutrition: { calories: 320, fat: '16g', sugar: '22g', serving: '1 cookie (85g)' },
  },
  {
    id: 2,
    name: 'Double Sugar',
    description: 'Vanilla bean sugar cookie rolled in raw sugar for extra crunch.',
    price: 4,
    category: 'Classic Cookies',
    image: heroImg,
    available: true,
    ingredients: 'Flour, butter, cane sugar, raw turbinado sugar, eggs, vanilla bean, baking powder, sea salt.',
    allergens: 'Contains wheat, dairy, and eggs.',
    nutrition: { calories: 290, fat: '13g', sugar: '20g', serving: '1 cookie (80g)' },
  },
  {
    id: 3,
    name: 'Oreo Stuffed',
    description: 'Chocolate cookie dough wrapped around a whole Oreo and cream filling.',
    price: 6,
    category: 'Stuffed Cookies',
    image: heroImg,
    available: true,
    ingredients: 'Flour, cocoa powder, butter, brown sugar, cane sugar, eggs, chocolate sandwich cookies, vanilla extract, baking soda.',
    allergens: 'Contains wheat, dairy, eggs, and soy.',
    nutrition: { calories: 410, fat: '20g', sugar: '31g', serving: '1 cookie (110g)' },
  },
  {
    id: 4,
    name: 'Birthday Stuffed',
    description: 'Funfetti dough stuffed with vanilla frosting and rainbow sprinkles.',
    price: 6,
    category: 'Stuffed Cookies',
    image: heroImg,
    available: false,
    ingredients: 'Flour, butter, cane sugar, eggs, rainbow sprinkles, vanilla frosting, vanilla extract, baking powder.',
    allergens: 'Contains wheat, dairy, eggs, and soy.',
    nutrition: { calories: 430, fat: '21g', sugar: '34g', serving: '1 cookie (110g)' },
  },
  {
    id: 5,
    name: "S'mores Loaded",
    description: 'Graham-studded dough loaded with chocolate chunks and toasted marshmallow.',
    price: 6.5,
    category: 'Loaded Cookies',
    image: heroImg,
    available: true,
    ingredients: 'Flour, graham cracker crumbs, butter, brown sugar, eggs, chocolate chunks, marshmallow, vanilla extract, baking soda.',
    allergens: 'Contains wheat, dairy, and eggs.',
    nutrition: { calories: 450, fat: '22g', sugar: '35g', serving: '1 cookie (115g)' },
  },
  {
    id: 6,
    name: 'Salted Caramel Loaded',
    description: 'Brown sugar dough loaded with caramel bits and flaky sea salt.',
    price: 6.5,
    category: 'Loaded Cookies',
    image: heroImg,
    available: true,
    ingredients: 'Flour, butter, brown sugar, eggs, caramel bits, flaky sea salt, vanilla extract, baking soda.',
    allergens: 'Contains wheat, dairy, and eggs.',
    nutrition: { calories: 440, fat: '21g', sugar: '33g', serving: '1 cookie (115g)' },
  },
]

const starterReviews = [
  { id: 1, name: 'Jordan M.', rating: 5, text: 'Everything tasted fresh and the cookies disappeared immediately.' },
  { id: 2, name: 'Alex R.', rating: 5, text: 'The stuffed cookies looked incredible and tasted even better.' },
  { id: 3, name: 'Taylor S.', rating: 4, text: 'Beautiful presentation, great flavors, and easy pickup.' },
]

const cookieBases = [
  { id: 'chocolate-chip', label: 'Chocolate Chip', className: 'base-chocolate-chip', swatch: '#d9a76c' },
  { id: 'oreo', label: 'Oreo', className: 'base-oreo', swatch: '#4b2d24' },
  { id: 'vanilla', label: 'Vanilla', className: 'base-vanilla', swatch: '#f4eddf' },
  { id: 'sugar', label: 'Sugar Cookie', className: 'base-sugar', swatch: '#e9deca' },
]

const mixIns = [
  { id: 'mms', label: "M&M's", price: 0.75, colors: ['#d0392b', '#f2b632', '#3f7d4f', '#2f6fb0', '#e07a2c'], shape: 'dot', positions: [[22, 28], [68, 20], [40, 45], [78, 55], [15, 62], [55, 72], [30, 80]] },
  { id: 'reeses', label: "Reese's Pieces", price: 0.75, colors: ['#e8952f', '#f4c14a'], shape: 'dot', positions: [[30, 22], [60, 30], [20, 48], [72, 42], [45, 62], [65, 75], [18, 78]] },
  { id: 'blueberries', label: 'Blueberries', price: 0.9, colors: ['#3a4a8a', '#4c5fae'], shape: 'dot', positions: [[25, 35], [55, 25], [70, 50], [38, 68], [60, 78], [18, 55]] },
  { id: 'chunks', label: 'Chocolate Chunks', price: 0.6, colors: ['#4b2d24', '#3d2b24'], shape: 'chunk', positions: [[24, 24], [66, 26], [42, 40], [20, 66], [72, 62], [48, 78]] },
  { id: 'sprinkles', label: 'Sprinkles', price: 0.5, colors: ['#92cfe8', '#d0392b', '#f2b632', '#fffdf8'], shape: 'sprinkle', positions: [[20, 30, 20], [35, 20, -30], [55, 24, 45], [72, 32, -10], [28, 55, 60], [48, 62, -50], [66, 68, 15], [80, 48, -25], [15, 75, 40], [60, 80, -15]] },
  { id: 'caramel', label: 'Caramel Bits', price: 0.6, colors: ['#c9862f', '#b5721f'], shape: 'chunk', positions: [[30, 30], [62, 22], [75, 58], [22, 60], [50, 72]] },
]

const drizzles = [
  { id: 'none', label: 'None', price: 0, color: null },
  { id: 'chocolate', label: 'Chocolate', price: 0.75, color: '#4b2d24' },
  { id: 'caramel', label: 'Caramel', price: 0.75, color: '#c9862f' },
  { id: 'white', label: 'White', price: 0.75, color: '#fffdf8' },
]

const basePrice = 5

const faqItems = [
  {
    q: 'Do your cookies contain allergens?',
    a: 'Yes — every cookie is baked with wheat, dairy, and eggs, and most contain soy. All of our baking happens in a home kitchen that also handles tree nuts and peanuts, so we cannot guarantee any item is free of cross-contact. Full allergen notes are listed on each cookie\u2019s detail page. If you have a serious allergy, please reach out before ordering.',
  },
  {
    q: 'Do you ship cookies, or is it pickup only?',
    a: 'Right now we\u2019re pickup and local farmers-market drops only — check the Pickup Schedule section for our next city and time. We\u2019re looking into local delivery and shipping for the future, so join the email list to hear when that launches.',
  },
  {
    q: 'How far in advance should I order?',
    a: 'Because everything is baked in small batches, we recommend ordering at least 48 hours ahead for pickup, and earlier for larger or custom orders. Market drops are first-come, first-served while supplies last.',
  },
  {
    q: 'How should I store my cookies, and how long do they stay fresh?',
    a: 'Store cookies in an airtight container at room temperature for up to 5 days, or freeze for up to 2 months. Stuffed and loaded cookies taste best within the first 3 days.',
  },
  {
    q: 'Can I request a custom flavor or build my own?',
    a: 'Absolutely — use the Build Your Own Cookie section to mix a base, mix-ins, and a drizzle. For larger custom or event orders, message us directly through the contact section.',
  },
  {
    q: 'Are your cookies made in a licensed kitchen?',
    a: 'Yes, all baking is done in compliance with local cottage food / home-bakery regulations. Reach out if you\u2019d like more detail for an event or wholesale order.',
  },
]

/* ------------------------------- helpers ------------------------------- */

function BrandIcon({ size = 52, className = '' }) {
  return (
    <div className={`brand-icon ${className}`} style={{ width: size, height: size }}>
      <img src={LOGO_SRC} alt="Cristi's Sweets logo" />
    </div>
  )
}

function useCountdown(targetDate) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const diff = Math.max(0, targetDate.getTime() - now.getTime())
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, isPast: diff <= 0 }
}

function nextUpcoming(events) {
  const now = new Date()
  const upcoming = events
    .map((event) => ({ ...event, dateObj: new Date(event.date) }))
    .filter((event) => event.dateObj.getTime() > now.getTime())
    .sort((a, b) => a.dateObj - b.dateObj)

  return upcoming[0] || null
}

/* ------------------------------ components ------------------------------ */

function EmailCaptureModal({ onClose, onSubmit }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    onSubmit(email)
    setSubmitted(true)
    setTimeout(onClose, 1400)
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <BrandIcon size={64} className="modal-icon" />

        <h3>Get the first bite.</h3>
        <p>
          Join the list for drop alerts, market locations, and new
          menus before anyone else.
        </p>

        {submitted ? (
          <p className="success-message">You're on the list — see you soon!</p>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <button type="submit">Notify me</button>
          </form>
        )}

        <button type="button" className="modal-skip" onClick={onClose}>
          No thanks, take me to the site
        </button>
      </div>
    </div>
  )
}

function StickyJoinBar({ joined, onSubmit, dismissed, onDismiss }) {
  const [email, setEmail] = useState('')

  if (dismissed || joined) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    onSubmit(email)
    setEmail('')
  }

  return (
    <div className="sticky-join-bar">
      <span className="sticky-join-text">
        <BrandIcon size={22} className="sticky-join-icon" />
        Join the club — get drop alerts before they sell out.
      </span>

      <form className="sticky-join-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-label="Email address"
          required
        />
        <button type="submit">Join</button>
      </form>

      <button
        type="button"
        className="sticky-join-close"
        onClick={onDismiss}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  )
}

function ProductCard({ product, onView, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="cookie-stamp">
          <img src={LOGO_SRC} alt="" />
        </div>
        {!product.available && <span className="sold-out-badge">Sold Out</span>}
      </div>

      <div className="product-content">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-footer">
          <strong>${product.price.toFixed(2)}</strong>

          <div className="product-footer-actions">
            <button
              type="button"
              disabled={!product.available}
              onClick={() => onView(product.id)}
            >
              {product.available ? 'View Treat' : 'Unavailable'}
            </button>

            {product.available && (
              <button
                type="button"
                className="quick-add"
                onClick={() => onAddToCart({ product, qty: 1, note: '' })}
              >
                + Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

function ProductDetailPage({ product, onBack, onAddToCart }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return null
  }

  const handleAdd = () => {
    onAddToCart({ product, qty, note: '' })
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <section className="product-detail-page">
      <button type="button" className="text-link back-link" onClick={onBack}>
        <span>←</span> Back to the menu
      </button>

      <div className="product-detail-layout">
        <div className="product-detail-image-frame">
          <img src={product.image} alt={product.name} />
          {!product.available && <span className="sold-out-badge">Sold Out</span>}
        </div>

        <div className="product-detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="product-detail-description">{product.description}</p>
          <strong className="product-detail-price">${product.price.toFixed(2)}</strong>

          <div className="product-detail-block">
            <h4>Ingredients</h4>
            <p>{product.ingredients}</p>
          </div>

          <div className="product-detail-block">
            <h4>Allergens</h4>
            <p>{product.allergens}</p>
          </div>

          <div className="product-detail-block">
            <h4>Nutrition</h4>
            <ul className="nutrition-list">
              <li><span>Serving size</span><span>{product.nutrition.serving}</span></li>
              <li><span>Calories</span><span>{product.nutrition.calories}</span></li>
              <li><span>Fat</span><span>{product.nutrition.fat}</span></li>
              <li><span>Sugar</span><span>{product.nutrition.sugar}</span></li>
            </ul>
          </div>

          {product.available ? (
            <div className="product-detail-actions">
              <div className="qty-stepper">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)}>+</button>
              </div>

              <button type="button" className="primary-button" onClick={handleAdd}>
                Add {qty} to cart — ${(product.price * qty).toFixed(2)}
              </button>

              {added && <p className="success-message">Added to your cart.</p>}
            </div>
          ) : (
            <p className="success-message">Currently sold out — check back soon.</p>
          )}
        </div>
      </div>
    </section>
  )
}

function CartDrawer({ open, items, onClose, onRemove, total }) {
  return (
    <div className={open ? 'cart-drawer open' : 'cart-drawer'}>
      <div className="cart-drawer-header">
        <h3>Your cart</h3>
        <button type="button" onClick={onClose} aria-label="Close cart">×</button>
      </div>

      {items.length === 0 ? (
        <p className="cart-empty">Nothing in here yet — go find a treat.</p>
      ) : (
        <div className="cart-items">
          {items.map((item) => (
            <div className="cart-item" key={item.cartId}>
              <img src={item.product.image} alt={item.product.name} />
              <div className="cart-item-info">
                <span>{item.product.name}</span>
                <small>Qty {item.qty} · ${(item.product.price * item.qty).toFixed(2)}</small>
              </div>
              <button type="button" onClick={() => onRemove(item.cartId)} aria-label="Remove">
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-drawer-footer">
        <div className="cart-total-row">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
        <button type="button" className="primary-button" disabled={items.length === 0}>
          Checkout
        </button>
        <p className="cart-note">
          Checkout is in progress — for now this saves your order so it's
          ready when it goes live.
        </p>
      </div>
    </div>
  )
}

function CookieMarquee() {
  return (
    <div className="cookie-marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>FRESH BAKES</span>
        <BrandIcon size={28} className="mini-cookie" />
        <span>SMALL BATCH</span>
        <BrandIcon size={28} className="mini-cookie" />
        <span>SWEET MOMENTS</span>
        <BrandIcon size={28} className="mini-cookie" />
        <span>FRESH BAKES</span>
        <BrandIcon size={28} className="mini-cookie" />
        <span>SMALL BATCH</span>
        <BrandIcon size={28} className="mini-cookie" />
        <span>SWEET MOMENTS</span>
        <BrandIcon size={28} className="mini-cookie" />
      </div>
    </div>
  )
}

function CookiePreview({ base, activeMixIns, drizzle }) {
  const drizzleStyle = drizzle.color ? { '--drizzle-color': drizzle.color } : undefined

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
                  style={{ top: `${top}%`, left: `${left}%`, background: color, transform: `translate(-50%, -50%) rotate(${rotate}deg)` }}
                />
              )
            }

            if (mixIn.shape === 'chunk') {
              return (
                <span
                  key={`${mixIn.id}-${index}`}
                  className="topping-dot topping-chunk"
                  style={{ top: `${top}%`, left: `${left}%`, background: color }}
                />
              )
            }

            return (
              <span
                key={`${mixIn.id}-${index}`}
                className="topping-dot topping-round"
                style={{ top: `${top}%`, left: `${left}%`, background: color }}
              />
            )
          }),
        )}

        {drizzle.color && <span className="drizzle-overlay" style={drizzleStyle} />}
      </div>
    </div>
  )
}

function CookieBuilder({ onAddToCart }) {
  const [baseId, setBaseId] = useState(cookieBases[0].id)
  const [selectedMixIns, setSelectedMixIns] = useState(['mms'])
  const [drizzleId, setDrizzleId] = useState('none')
  const [added, setAdded] = useState(false)

  const base = cookieBases.find((option) => option.id === baseId)
  const drizzle = drizzles.find((option) => option.id === drizzleId)
  const activeMixIns = mixIns.filter((mixIn) => selectedMixIns.includes(mixIn.id))

  const total = useMemo(() => {
    const mixInTotal = activeMixIns.reduce((sum, mixIn) => sum + mixIn.price, 0)
    return basePrice + mixInTotal + drizzle.price
  }, [activeMixIns, drizzle])

  const toggleMixIn = (id) => {
    setSelectedMixIns((current) =>
      current.includes(id) ? current.filter((mixInId) => mixInId !== id) : [...current, id],
    )
  }

  const summaryName = `${base.label}${
    activeMixIns.length > 0 ? ` + ${activeMixIns.map((m) => m.label).join(', ')}` : ''
  }${drizzle.id !== 'none' ? ` + ${drizzle.label} Drizzle` : ''}`

  const handleAdd = () => {
    onAddToCart({
      product: {
        id: `custom-${Date.now()}`,
        name: `Custom: ${summaryName}`,
        price: total,
        image: heroImg,
      },
      qty: 1,
      note: summaryName,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
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
        <p>One cookie, endless combinations. Pick a base, load it up, finish with a drizzle.</p>
      </div>

      <div className="builder-layout">
        <div className="builder-preview">
          <CookiePreview base={base} activeMixIns={activeMixIns} drizzle={drizzle} />

          <div className="builder-summary">
            <span className="builder-summary-label">Your cookie</span>
            <p className="builder-summary-name">{summaryName}</p>

            <div className="builder-summary-footer">
              <strong>${total.toFixed(2)}</strong>
              <button type="button" onClick={handleAdd}>Add to cart</button>
            </div>
            {added && <p className="success-message">Added to your cart.</p>}
          </div>
        </div>

        <div className="builder-controls">
          <div className="builder-step">
            <span className="builder-step-title"><em>Step 1</em> Choose your base</span>
            <div className="builder-options">
              {cookieBases.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={option.id === baseId ? 'base-option active' : 'base-option'}
                  onClick={() => setBaseId(option.id)}
                >
                  <span className="option-swatch" style={{ background: option.swatch }} />
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="builder-step">
            <span className="builder-step-title"><em>Step 2</em> Add your mix-ins</span>
            <div className="builder-options">
              {mixIns.map((mixIn) => (
                <button
                  key={mixIn.id}
                  type="button"
                  className={selectedMixIns.includes(mixIn.id) ? 'mixin-option active' : 'mixin-option'}
                  onClick={() => toggleMixIn(mixIn.id)}
                >
                  <span className="option-swatch" style={{ background: mixIn.colors[0] }} />
                  {mixIn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="builder-step">
            <span className="builder-step-title"><em>Step 3</em> Finish with a drizzle</span>
            <div className="builder-options">
              {drizzles.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={option.id === drizzleId ? 'drizzle-option active' : 'drizzle-option'}
                  onClick={() => setDrizzleId(option.id)}
                >
                  {option.color && <span className="option-swatch" style={{ background: option.color }} />}
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

function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <div className="review-avatar">{review.name.charAt(0)}</div>
      <div>
        <h3>{review.name}</h3>
        <div className="stars" aria-label={`${review.rating} out of 5 stars`}>
          {'★'.repeat(review.rating)}
          {'☆'.repeat(5 - review.rating)}
        </div>
        <p>{review.text}</p>
      </div>
    </article>
  )
}

// Edit this array with your real market dates — format: 'YYYY-MM-DDTHH:mm:ss'
const pickupEvents = [
  { id: 1, city: 'Burbank, CA', location: 'Burbank Farmers Market', date: '2026-08-30T09:00:00' },
  { id: 2, city: 'Pasadena, CA', location: 'Villa Parke Community Market', date: '2026-09-06T10:00:00' },
  { id: 3, city: 'Los Angeles, CA', location: 'Silver Lake Night Market', date: '2026-09-13T17:00:00' },
]

function PickupSchedule() {
  const next = nextUpcoming(pickupEvents)
  const countdown = useCountdown(next ? next.dateObj : new Date())

  return (
    <section className="pickup-section" id="pickup">
      <div className="section-heading">
        <div>
          <span className="eyebrow">FIND US IN PERSON</span>
          <h2>
            Pickup &amp;
            <span>market drops.</span>
          </h2>
        </div>
        <p>We pop up around the city — here's where to find fresh cookies next.</p>
      </div>

      {next ? (
        <div className="pickup-next-card">
          <div className="pickup-countdown">
            <div><strong>{countdown.days}</strong><span>days</span></div>
            <div><strong>{countdown.hours}</strong><span>hrs</span></div>
            <div><strong>{countdown.minutes}</strong><span>min</span></div>
            <div><strong>{countdown.seconds}</strong><span>sec</span></div>
          </div>

          <div className="pickup-next-info">
            <span className="eyebrow">NEXT STOP</span>
            <h3>{next.city}</h3>
            <p>{next.location}</p>
            <p className="pickup-date">
              {next.dateObj.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              {' · '}
              {next.dateObj.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
            </p>
          </div>
        </div>
      ) : (
        <p>No upcoming markets scheduled yet — check back soon.</p>
      )}

      <div className="pickup-list">
        {pickupEvents.map((event) => {
          const eventDate = new Date(event.date)
          return (
            <div className="pickup-list-item" key={event.id}>
              <div>
                <strong>{event.city}</strong>
                <small>{event.location}</small>
              </div>
              <span>
                {eventDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                {' · '}
                {eventDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function SocialSection() {
  return (
    <section className="social-section" id="social">
      <span className="eyebrow">FOLLOW ALONG</span>
      <h2>
        Come say hi
        <span>on socials.</span>
      </h2>
      <p>Behind-the-scenes bakes, market announcements, and new drops first.</p>

      <div className="social-links">
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="social-link">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4.2" />
            <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
          </svg>
          Instagram
        </a>

        <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="social-link">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M16.5 3c.4 2.2 1.9 3.7 4.1 3.9v2.7c-1.5 0-2.9-.5-4.1-1.3v6.4c0 3.3-2.6 5.8-5.9 5.8-3.2 0-5.8-2.6-5.8-5.8s2.6-5.8 5.8-5.8c.4 0 .7 0 1 .1v2.8a3 3 0 1 0 2.2 2.9V3h2.7Z" />
          </svg>
          TikTok
        </a>
      </div>
    </section>
  )
}

function FaqPage({ onBack }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="faq-page">
      <button type="button" className="text-link back-link" onClick={onBack}>
        <span>←</span> Back to the menu
      </button>

      <div className="section-heading">
        <div>
          <span className="eyebrow">GOOD TO KNOW</span>
          <h2>
            Frequently
            <span>asked.</span>
          </h2>
        </div>
        <p>Allergies, shipping, storage, and everything else people ask us.</p>
      </div>

      <div className="faq-list">
        {faqItems.map((item, index) => {
          const open = openIndex === index
          return (
            <div className={open ? 'faq-item open' : 'faq-item'} key={item.q}>
              <button
                type="button"
                className="faq-question"
                onClick={() => setOpenIndex(open ? -1 : index)}
              >
                {item.q}
                <span>{open ? '−' : '+'}</span>
              </button>
              {open && <p className="faq-answer">{item.a}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* --------------------------------- app --------------------------------- */

function App() {
  const [products] = useState(starterProducts)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const [page, setPage] = useState('home') // 'home' | 'product' | 'faq'
  const [selectedProductId, setSelectedProductId] = useState(null)

  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const [joined, setJoined] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [stickyDismissed, setStickyDismissed] = useState(false)

  useEffect(() => {
    const seen = window.localStorage.getItem('cristis-modal-seen')
    const alreadyJoined = window.localStorage.getItem('cristis-joined')
    if (alreadyJoined) setJoined(true)
    if (!seen && !alreadyJoined) {
      const timer = setTimeout(() => setShowModal(true), 600)
      return () => clearTimeout(timer)
    }
  }, [])

  const closeModal = () => {
    setShowModal(false)
    window.localStorage.setItem('cristis-modal-seen', 'true')
  }

  const handleJoin = (email) => {
    // Hook this up to your email provider (Mailchimp, Klaviyo, etc.)
    console.log('New subscriber:', email)
    setJoined(true)
    window.localStorage.setItem('cristis-joined', 'true')
  }

  const categories = ['All', ...new Set(starterProducts.map((product) => product.category))]

  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory
    const query = searchQuery.trim().toLowerCase()
    const matchesSearch =
      query.length === 0 ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })

  const selectedProduct = products.find((product) => product.id === selectedProductId)

  const goToProduct = (id) => {
    setSelectedProductId(id)
    setPage('product')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goHome = () => {
    setPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToFaq = () => {
    setPage('faq')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const addToCart = ({ product, qty, note }) => {
    setCart((current) => [
      ...current,
      { cartId: `${product.id}-${Date.now()}`, product, qty, note },
    ])
    setCartOpen(true)
  }

  const removeFromCart = (cartId) => {
    setCart((current) => current.filter((item) => item.cartId !== cartId))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className="site">
      {showModal && <EmailCaptureModal onClose={closeModal} onSubmit={handleJoin} />}

      <StickyJoinBar
        joined={joined}
        dismissed={stickyDismissed}
        onSubmit={handleJoin}
        onDismiss={() => setStickyDismissed(true)}
      />

      <div className="top-stripes" />

      <header className="site-header">
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); goHome() }}>
          <BrandIcon />
          <div>
            <span className="brand-name">CRISTI'S SWEETS</span>
            <span className="brand-tagline">small batch bakery</span>
          </div>
        </a>

        <nav className="navigation" aria-label="Main navigation">
          <a href="#home" onClick={(event) => { event.preventDefault(); goHome() }}>Home</a>
          <a href="#menu" onClick={(event) => { event.preventDefault(); goHome(); }}>Menu</a>
          <a href="#build" onClick={(event) => { event.preventDefault(); goHome(); }}>Build Your Own</a>
          <a href="#pickup" onClick={(event) => { event.preventDefault(); goHome(); }}>Pickup</a>
          <a href="#about" onClick={(event) => { event.preventDefault(); goHome(); }}>About</a>
          <a href="#reviews" onClick={(event) => { event.preventDefault(); goHome(); }}>Reviews</a>
          <button type="button" className="nav-faq-link" onClick={goToFaq}>FAQ</button>
        </nav>

        <div className="header-actions">
          <button type="button" className="cart-button" onClick={() => setCartOpen(true)}>
            Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          <a className="header-order-button" href="#menu" onClick={(event) => { event.preventDefault(); goHome() }}>
            Order treats
          </a>
        </div>
      </header>

      <main>
        {page === 'product' && selectedProduct && (
          <ProductDetailPage product={selectedProduct} onBack={goHome} onAddToCart={addToCart} />
        )}

        {page === 'faq' && <FaqPage onBack={goHome} />}

        {page === 'home' && (
          <>
            <section className="hero-section" id="home">
              <div className="hero-cookie cookie-one" aria-hidden="true"><span /><span /><span /></div>
              <div className="hero-cookie cookie-two" aria-hidden="true"><span /><span /><span /></div>

              <div className="hero-copy">
                <span className="eyebrow">SMALL BATCH · LIMITED DROPS</span>
                <h1>
                  Freshly baked.
                  <span>Made to be remembered.</span>
                </h1>
                <p>Seasonal cookies made in small batches with a little nostalgia and a lot of butter.</p>

                <div className="hero-actions">
                  <a href="#menu" className="primary-button" onClick={(event) => event.preventDefault()}>Explore the menu</a>
                  <a href="#build" className="secondary-button">Build your own</a>
                </div>

                <div className="hero-note">
                  <div className="small-cookie"><span /><span /><span /></div>
                  <p>New menu drops every week.</p>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-image-frame">
                  <img src={heroImg} alt="Selection of freshly baked cookies" className="hero-image" />
                  <div className="hero-sticker"><span>BAKED</span><strong>FRESH</strong><span>DAILY</span></div>
                </div>
                <div className="hero-caption">
                  <span>01</span>
                  <p>Hand-finished cookies made for slow mornings and special occasions.</p>
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
                <p>Small-batch cookies made for this week's menu. Quantities are limited.</p>
              </div>

              <div className="catalog-search">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search the menu..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  aria-label="Search the menu"
                />
              </div>

              <div className="category-filter">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={activeCategory === category ? 'category-button active' : 'category-button'}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="product-grid">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onView={goToProduct} onAddToCart={addToCart} />
                ))}
                {visibleProducts.length === 0 && (
                  <p>No cookies match "{searchQuery}" — try another search.</p>
                )}
              </div>
            </section>

            <section className="stripe-break">
              <div className="stripe-copy">
                <span>COOKIES</span><span>CHUNKS</span><span>CHIPS</span><span>GOOD DAYS</span>
              </div>
            </section>

            <CookieBuilder onAddToCart={addToCart} />

            <PickupSchedule />

            <section className="early-access" id="drops">
              <div className="early-access-copy">
                <span className="eyebrow">NEXT DROP</span>
                <h2>
                  Good things
                  <span>go quickly.</span>
                </h2>
                <p>Join the list for early access to seasonal menus, limited bakery drops, and special releases.</p>
              </div>

              <div className="drop-card">
                <div className="drop-cookie">
                  <div className="cookie-bite" />
                  <span className="chip chip-one" /><span className="chip chip-two" /><span className="chip chip-three" /><span className="chip chip-four" /><span className="chip chip-five" />
                </div>

                <form
                  className="email-form"
                  onSubmit={(event) => {
                    event.preventDefault()
                    const email = event.target.elements['drop-email'].value
                    if (!email.trim()) return
                    handleJoin(email)
                    event.target.reset()
                  }}
                >
                  <label htmlFor="drop-email">Email address</label>
                  <div className="email-input-row">
                    <input id="drop-email" name="drop-email" type="email" placeholder="you@example.com" required />
                    <button type="submit">Join list</button>
                  </div>
                  {joined && <p className="success-message">You're on the list. Save room for dessert.</p>}
                </form>
              </div>
            </section>

            <section className="about-section" id="about">
              <div className="about-number"><span>01</span></div>

              <div className="about-copy">
                <span className="eyebrow">ABOUT THE BAKERY</span>
                <h2>
                  A neighborhood bakery with
                  <span>a playful side.</span>
                </h2>
                <p>
                  Made thoughtfully, shared generously. Our menu changes with
                  the seasons and each cookie is prepared in small batches
                  for better flavor, texture, and freshness.
                </p>
                <button type="button" className="text-link" onClick={goToFaq}>
                  Read our FAQ<span>→</span>
                </button>
              </div>

              <div className="about-decoration">
                <div className="cookie-stack">
                  <div className="stack-cookie cookie-a"><i /><i /><i /></div>
                  <div className="stack-cookie cookie-b"><i /><i /><i /></div>
                  <div className="stack-cookie cookie-c"><i /><i /><i /></div>
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
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </section>

            <SocialSection />

            <section className="contact-section" id="contact">
              <div className="contact-cookie"><span /><span /><span /><span /></div>
              <span className="eyebrow">STAY CONNECTED</span>
              <h2>
                Don't miss the
                <span>next batch.</span>
              </h2>
              <p>Follow the bakery or join our mailing list for new menus, seasonal drops, and future events.</p>
              <a href="mailto:hello@example.com">hello@example.com</a>
            </section>
          </>
        )}
      </main>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        total={cartTotal}
      />
      {cartOpen && <div className="cart-scrim" onClick={() => setCartOpen(false)} />}

      <footer>
        <div className="footer-brand">
          <BrandIcon size={34} className="footer-logo" />
          <span>Cristi's Sweets</span>
        </div>
        <span>© 2026 Cristi's Sweets</span>
        <span>Made with butter + care.</span>
      </footer>
    </div>
  )
}

export default App
