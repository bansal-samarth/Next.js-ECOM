import CartPage from "./CartPage";

// Server Component — fetches data via SSR
export default async function Home() {
  // Fetch cart data server-side (SSR)
  // Use absolute URL for API route during build, and relative for dev
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  let cartData;
  try {
    const res = await fetch(`${baseUrl}/api/cart`, {
      cache: "no-store", // Force SSR on every request (no static caching)
    });
    cartData = await res.json();
  } catch {
    // Fallback mock data if API fetch fails during build
    cartData = {
      cartItems: [
        {
          product_id: 101,
          product_name: "Bamboo Toothbrush (Pack of 4)",
          product_price: 299,
          quantity: 2,
          image: "/images/bamboo-toothbrush.png",
        },
        {
          product_id: 102,
          product_name: "Reusable Cotton Produce Bags",
          product_price: 450,
          quantity: 1,
          image: "/images/cotton-bags.png",
        },
      ],
      shipping_fee: 50,
      discount_applied: 0,
    };
  }

  return <CartPage cartData={cartData} />;
}
