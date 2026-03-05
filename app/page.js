import CartPage from "./CartPage";
import { cartData } from "@/lib/mockData";

// Server Component — demonstrates SSR data fetching
// Data is fetched/resolved server-side before the page is sent to the client.
// In a real app, this would fetch from a database or external API.
// Using a shared data module to simulate async SSR data resolution.

export const dynamic = "force-dynamic"; // Ensure SSR on every request (not statically generated)

export default async function Home() {
  // Simulate async data fetching (as if calling an external API/database)
  const data = await new Promise((resolve) => {
    setTimeout(() => resolve(cartData), 100);
  });

  // Pass SSR-fetched data to the client component
  return <CartPage cartData={data} />;
}
