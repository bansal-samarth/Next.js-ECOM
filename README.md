# 🌿 Ecoyaan Checkout Flow

A premium, full-featured checkout flow built for the **Ecoyaan Frontend Engineering Interview**. This project demonstrates proficiency with **React**, **Next.js SSR (App Router)**, **state management**, **form validation**, and **responsive UI design**.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![Deployed](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

---

## ✨ Features

### Core Requirements
- **Server-Side Rendering (SSR)**: Cart data fetched server-side using Next.js App Router Server Components with `fetch()` and `cache: 'no-store'`
- **3-Step Checkout Flow**: Cart → Shipping → Payment → Success
- **State Management**: React Context API + `useReducer` for predictable state across steps
- **Form Validation**: Real-time inline validation for all shipping fields
- **Responsive Design**: Mobile-first, works beautifully from 375px to full desktop

### Extra Features (Beyond Requirements)
| Feature | Description |
|---------|-------------|
| 🌙 **Dark/Light Theme** | Persistent toggle with smooth CSS transitions |
| 📍 **PIN → City Auto-fill** | Smart UX, auto-populates City & State from PIN code |
| 🎉 **Confetti Animation** | Pure CSS confetti on order success (zero libraries) |
| 🌍 **Eco-Impact Summary** | Shows trees saved, plastic reduced — ties into Ecoyaan's mission |
| 💎 **Glassmorphism UI** | Modern frosted-glass cards and backdrop-filter effects |
| 🔒 **Trust Badges** | SSL, secure payments, easy returns, eco-packaging |
| ⚡ **Micro-animations** | Smooth transitions, hover effects, staggered loading |
| 💳 **Payment Methods** | UPI, Card, and COD options with animated radio selection |
| 🔄 **Processing Overlay** | Simulated payment processing with spinner |

---

## 🏗️ Architecture

```
app/
├── layout.js          → Root layout (SSR metadata, CheckoutProvider, Header, Footer)
├── page.js            → Server Component: fetches cart via SSR
├── CartPage.js        → Client Component: multi-step flow orchestrator
├── api/cart/route.js   → Mock API route (GET /api/cart)
├── globals.css         → Full design system (CSS variables, animations, responsive)
components/
├── Header.jsx          → Logo, theme toggle, cart badge
├── StepIndicator.jsx   → Animated 3-step progress bar
├── CartSummary.jsx     → Product list + order summary
├── ShippingForm.jsx    → Address form with validation + PIN auto-fill
├── PaymentConfirm.jsx  → Payment method selection + order review
├── OrderSuccess.jsx    → Success screen with confetti + eco-impact
├── EcoImpact.jsx       → Sustainability metrics card
├── TrustBadges.jsx     → Security trust indicators
├── Confetti.jsx        → CSS-only confetti animation
└── Footer.jsx          → Simple footer
context/
└── CheckoutContext.jsx → Context API + useReducer state management
```

### Key Architectural Decisions

1. **App Router over Pages Router**: Modern Next.js patterns with Server/Client component separation
2. **Server Component for SSR**: `app/page.js` is a Server Component that fetches data at request time — the cart HTML is fully rendered server-side, verifiable in page source
3. **Context + useReducer over Redux**: Simpler for this scope, no extra dependencies, predictable state transitions with action types
4. **CSS Variables over Tailwind**: Full design system with custom properties, enabling seamless dark/light theme switching via `data-theme` attribute
5. **No external animation libraries**: All animations are pure CSS — confetti, transitions, micro-interactions — keeping the bundle minimal

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm** 9+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/ecoyaan-checkout.git
cd ecoyaan-checkout

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

- **Next.js 14** (App Router, Server Components)
- **React 19**
- **Vanilla CSS** (Custom Properties, Keyframe Animations)
- **Google Fonts** (Inter + Outfit)

---

Built with 💚 by [Your Name] for the Ecoyaan Frontend Engineering Interview
