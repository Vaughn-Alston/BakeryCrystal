# BakeryCrystal – Phase 1: Authentication and Role Architecture

This project is being built in small, intentional phases. We are not jumping straight to a full storefront + admin dashboard. The first phase establishes the guardrails that make the rest of the project secure, scalable, and reusable.

## Why this phase exists

The biggest architectural risk in small-business commerce apps is not a missing button; it is incorrect trust boundaries.

If we build the customer and owner flows separately, or if the UI decides who is allowed to do what, we create a fragile app that works until someone discovers a bypass. The correct pattern is:

- one auth system: Supabase Auth
- one user identity: the authenticated Supabase user
- one application role model: customer or owner
- rules enforced in the database and server-side logic, not only in the browser

This phase focuses on that foundation.

## Architectural decisions for phase 1

### 1) One auth system
We use Supabase Auth for every user, including both customers and owners. We do not create a separate bakery customer auth system or owner auth system.

This matters because it keeps identity, password reset flows, session management, and security updates aligned with a single platform.

### 2) Role-based access is a separate concern
The frontend may use the user role to route UI, but the database and application logic must enforce access. That is the difference between a demo and a production-ready architecture.

We store app-specific profile state separately from the Supabase auth user record. The `profiles` table contains fields such as `role`, `first_name`, `last_name`, and `created_at`.

### 3) Build reusable patterns before bakery-specific features
We want reusable concepts like `Product`, `Cart`, `Order`, `Profile`, `Role`, and `OrderStatus`. We should avoid bakery-specific naming early, unless it is truly domain-specific business logic.

This phase intentionally introduces generic patterns that can later support restaurants, salons, or local retail shops.

## Current repository state

This repo currently contains the static storefront prototype. That is fine as a starting visual mock, but it should not be mistaken for production architecture.

The first real engineering step is to separate:

- auth/client setup
- profile and role logic
- authorization helpers
- future data services

## Phase 1 deliverables added

The project now includes a minimal foundation for the next steps:

- `src/lib/supabase.js` – shared Supabase client configured via environment variables
- `src/features/auth/roles.js` – explicit `customer` and `owner` role constants
- `src/features/auth/profile.js` – helpers to read the current user profile and enforce owner access
- `.env.example` – required environment variable names for local setup

## How this fits into the roadmap

### Phase 1 – foundation
- define auth and role model
- ensure database authorization shape is correct
- create secure client/service boundaries

### Phase 2 – profiles and product catalog
- make `profiles` table and RLS policies
- define product schema and admin CRUD
- create reusable product service layer

### Phase 3 – cart and checkout
- persistent cart ownership by authenticated user
- totals, validations, and order conversion
- guest-to-user transition strategy

### Phase 4 – order lifecycle
- order states
- fulfillment data
- owner dashboard permissions

### Phase 5 – rewards and business logic
- loyalty points calculation
- redemption rules
- business reporting

## Required local setup

Copy `.env.example` to `.env.local` and fill in the real values from your Supabase project:

```bash
cp .env.example .env.local
```

Then add:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Never expose service-role credentials in the browser or commit them to the repository.

## Next recommended step

The next step is not “build the storefront login page.”

The next step is:

1. create the database schema in Supabase
2. define the `profiles` table and RLS policies
3. create a `role` check pattern for owner-only access
4. then build the customer-facing auth screens

That keeps the system honest and protectively layered.
