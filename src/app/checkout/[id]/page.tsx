"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Concert, concerts } from "@/lib/concerts";
import Header from "@/components/checkout/header";
import Breadcrumb from "@/components/checkout/breadcrumb";
import CustomerInfoForm from "@/components/checkout/customerInfoForm";
import EventSummary from "@/components/checkout/eventSummary";
import TicketSelection from "@/components/checkout/ticketSelection";
import PaymentMethod from "@/components/checkout/paymentMethod";
import OrderSummary from "@/components/checkout/orderSummary";
import TermsAndConditions from "@/components/checkout/termsAndConditions";
import CheckoutButton from "@/components/checkout/checkoutButton";

export default function CheckoutPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const [concert, setConcert] = useState<Concert | null>(null);
  const [loading, setLoading] = useState(true);

  // State management
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("bank");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
  });

  const formatRupiah = (value: number) =>
    value.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    const foundConcert = concerts.find((c) => String(c.id) === id);

    if (!foundConcert) {
      alert("Concert not found!");
      router.push("/");
      return;
    }

    setConcert(foundConcert);
    setLoading(false);
  }, [id, router]);

  if (loading || !concert) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading concert details...
      </div>
    );
  }

  const ticketPrice = concert.price;
  const subtotal = ticketPrice * ticketQuantity;
  const serviceFee = 5000 * ticketQuantity;
  const total = subtotal + serviceFee;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 10) return;
    setTicketQuantity(newQuantity);
  };

  const handleFileChange = (file: File | null) => {
    setPaymentProof(file);
  };

  const handleCheckout = () => {
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    if (!customerInfo.name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!customerInfo.email.trim()) {
      alert("Please enter your email");
      return;
    } else if (!/^\S+@\S+\.\S+$/.test(customerInfo.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!customerInfo.whatsappNumber.trim()) {
      alert("Please enter your WhatsApp number");
      return;
    }

    if (
      (selectedPayment === "qr" || selectedPayment === "bank") &&
      !paymentProof
    ) {
      alert(
        `Please upload payment proof for ${
          selectedPayment === "qr" ? "QR Code" : "Bank Transfer"
        } payment.`
      );
      return;
    }

    // Save data to localStorage
    localStorage.setItem("ticketQuantity", ticketQuantity.toString());
    localStorage.setItem("customerName", customerInfo.name);
    localStorage.setItem("customerEmail", customerInfo.email);
    localStorage.setItem("customerWhatsApp", customerInfo.whatsappNumber);

    // Redirect to confirmation page
    router.push(`/checkout/${id}/confirm`);
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="container mx-auto my-8 max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb concert={concert} />

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Left column - Order details */}
          <div className="lg:w-2/3">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
              Complete your order
            </h1>

            <CustomerInfoForm
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
            />

            <EventSummary concert={concert} />

            <TicketSelection
              ticketPrice={concert.price}
              ticketQuantity={ticketQuantity}
              formatRupiah={formatRupiah}
              handleQuantityChange={handleQuantityChange}
            />

            <PaymentMethod
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              paymentProof={paymentProof}
              handleFileChange={handleFileChange}
              total={total}
              formatRupiah={formatRupiah}
            />

            <TermsAndConditions
              agreedToTerms={agreedToTerms}
              setAgreedToTerms={setAgreedToTerms}
            />

            <CheckoutButton
              agreedToTerms={agreedToTerms}
              total={total}
              formatRupiah={formatRupiah}
              handleCheckout={handleCheckout}
            />
          </div>

          {/* Right column - Order summary */}
          <div className="lg:w-1/3">
            <OrderSummary
              ticketQuantity={ticketQuantity}
              subtotal={subtotal}
              serviceFee={serviceFee}
              total={total}
              formatRupiah={formatRupiah}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
