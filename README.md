# 🌿 Ecoyaan Checkout Flow

A premium, full-featured checkout flow built for the **Ecoyaan Frontend Engineering Interview**. This project demonstrates proficiency with **React**, **Next.js SSR (App Router)**, **state management**, **form validation**, and **responsive UI design**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![CSS](https://img.shields.io/badge/Styling-Vanilla_CSS-264de4?logo=css3)
![Deployed](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

🔗 **Live Demo**: [https://next-js-ecom-mu.vercel.app](https://next-js-ecom-mu.vercel.app)

🔗 **JSON API**: [https://next-js-ecom-mu.vercel.app/api/cart](https://next-js-ecom-mu.vercel.app/api/cart)

---

## ✨ Features

### Core Requirements (All Met)
- **Server-Side Rendering (SSR)**: Cart data resolved server-side via an async Server Component with `dynamic = 'force-dynamic'`
- **Mock API**: `GET /api/cart` route returns cart JSON with simulated 300ms delay
- **3-Step Checkout Flow**: Cart → Shipping → Payment → Success
- **State Management**: React Context API + `useReducer` (12 typed actions) for predictable state
- **Form Validation**: Real-time inline validation on all shipping fields (email regex, 10-digit phone, required fields)
- **Responsive Design**: Mobile-first, three breakpoints (375px → 768px → desktop)

### Extra Features (Beyond Requirements)
| Feature | Description |
|---------|-------------|
| 🌙 **Dark/Light Theme** | Persistent toggle with smooth CSS transitions |
| 🎉 **Confetti Animation** | Pure CSS confetti on order success (zero libraries) |
| 🌍 **Eco-Impact Summary** | Trees saved, plastic reduced, CO₂ offset — ties into Ecoyaan's mission |
| 💎 **Glassmorphism UI** | Modern frosted-glass cards with backdrop-filter |
| 🔒 **Trust Badges** | SSL, secure payments, easy returns, eco-packaging indicators |
| ⚡ **Micro-animations** | Smooth transitions, hover effects, staggered loading throughout |
| 💳 **Payment Methods** | UPI, Card, and COD options with animated radio selection |
| 🔄 **Processing Overlay** | Simulated payment processing animation before success |
| ➕➖ **Quantity Controls** | Increment/decrement quantity with auto-remove at zero |
| ❤️ **Wishlist** | Heart icon toggle with heartbeat animation |
| 🔖 **Save for Later** | Move items between cart and saved list, with move-to-cart |
| 💾 **State Persistence** | Full checkout state persisted in localStorage — survives page reloads |
| ↻ **Reset Checkout** | Header button with confirmation modal to clear everything |

---

## 🏗️ Architecture

```
lib/
└── mockData.js         → Shared mock data (single source of truth)
app/
├── layout.js           → Root layout (SSR metadata, CheckoutProvider, Header, Footer)
├── page.js             → Server Component: async SSR data resolution
├── CartPage.js         → Client Component: multi-step flow orchestrator
├── api/cart/route.js   → Mock API route (GET /api/cart)
├── globals.css         → Full design system (1740+ lines: tokens, animations, responsive)
components/
├── Header.jsx          → Logo, theme toggle, reset button, cart count badge
├── StepIndicator.jsx   → Animated 3-step progress bar
├── CartSummary.jsx     → Cart items with qty controls, wishlist, save-for-later
├── ShippingForm.jsx    → Address form with validation + PIN auto-fill
├── PaymentConfirm.jsx  → Payment method selection + order review
├── OrderSuccess.jsx    → Success screen with confetti + eco-impact
├── EcoImpact.jsx       → Sustainability metrics card
├── TrustBadges.jsx     → Security trust indicators
├── Confetti.jsx        → CSS-only confetti animation
└── Footer.jsx          → Footer
context/
└── CheckoutContext.jsx → Context API + useReducer (12 actions) + localStorage persistence
```

### Key Architectural Decisions

1. **App Router + Server Components**: Modern Next.js patterns with clear server/client component separation
2. **SSR via Async Server Component**: `page.js` is a Server Component that resolves data server-side using `dynamic = 'force-dynamic'` — verifiable in page source (Ctrl+U)
3. **Shared Data Module**: `lib/mockData.js` is imported by both the API route and Server Component — single source of truth, avoids the self-fetch anti-pattern
4. **Context + useReducer over Redux**: Simpler for this scope, zero external deps, predictable state transitions with typed action dispatches
5. **CSS Variables over Tailwind**: Custom design system with CSS custom properties, enabling seamless dark/light theme switching via `data-theme` attribute
6. **No External Animation Libraries**: All animations (confetti, heartbeat, shimmer, transitions) are pure CSS — keeps bundle size minimal
7. **localStorage Persistence**: State hydrated on mount, saved on every change — provides a seamless UX across page reloads

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **npm** 9+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/bansal-samarth/Next.js-ECOM.git
cd Next.js-ECOM

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repo at [vercel.com/new](https://vercel.com/new) for automatic deployments.

---

## 🧪 Verifying SSR

To confirm Server-Side Rendering is working:

1. Start the dev server: `npm run dev`
2. Open `http://localhost:3000`
3. **View Page Source** (Ctrl+U) — you'll see the cart product data (`Bamboo Toothbrush`, `Reusable Cotton Produce Bags`) rendered in the initial HTML, confirming SSR

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|-----------|---------|
| > 768px | Two-column: main content + sidebar |
| ≤ 768px | Single column, stacked layout |
| ≤ 480px | Compact card layout, optimized touch targets |

---

## 🛠️ Tech Stack

- **Next.js 16** (App Router, Server Components)
- **React 19**
- **Vanilla CSS** (Custom Properties, Keyframe Animations)
- **Google Fonts** (Inter + Outfit)

---

Built with 💚 by **Samarth Bansal** for the Ecoyaan Frontend Engineering Interview