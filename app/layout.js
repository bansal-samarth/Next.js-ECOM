import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckoutProvider } from "@/context/CheckoutContext";

export const metadata = {
  title: "Ecoyaan | Sustainable Shopping Checkout",
  description:
    "Shop sustainable, eco-friendly products at Ecoyaan. Bamboo toothbrushes, reusable bags, and more — delivered with love for the planet.",
  keywords: "ecoyaan, sustainable, eco-friendly, checkout, bamboo, reusable",
  openGraph: {
    title: "Ecoyaan | Sustainable Shopping Checkout",
    description: "Shop sustainable, eco-friendly products at Ecoyaan.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CheckoutProvider>
          <Header />
          <main className="container page-wrapper">{children}</main>
          <Footer />
        </CheckoutProvider>
      </body>
    </html>
  );
}
