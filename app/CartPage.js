"use client";

import { useCheckout } from "@/context/CheckoutContext";
import CartSummary from "@/components/CartSummary";
import ShippingForm from "@/components/ShippingForm";
import PaymentConfirm from "@/components/PaymentConfirm";
import OrderSuccess from "@/components/OrderSuccess";
import StepIndicator from "@/components/StepIndicator";

export default function CartPage({ cartData }) {
  const { currentStep, orderPlaced } = useCheckout();

  // After order is placed, show success screen
  if (orderPlaced) {
    return <OrderSuccess />;
  }

  return (
    <>
      <StepIndicator currentStep={currentStep} />
      {currentStep === 1 && <CartSummary initialCartData={cartData} />}
      {currentStep === 2 && <ShippingForm />}
      {currentStep === 3 && <PaymentConfirm />}
    </>
  );
}
