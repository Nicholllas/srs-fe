"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Concert, concerts } from "@/lib/concerts";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Banknote, QrCode } from "lucide-react";

export default function CheckoutPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const [concert, setConcert] = useState<Concert | null>(null);
  const [loading, setLoading] = useState(true);

  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("credit");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // State untuk simpan file bukti bayar
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  // State untuk inputan baru
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

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
      router.push("/"); // navigasi ke homepage jika tidak ketemu
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
    if (newQuantity < 1) return;
    if (newQuantity > 10) return;
    setTicketQuantity(newQuantity);
  };

  // Fungsi handle file upload bukti bayar
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
    }
  };

  const handleCheckout = () => {
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    // Validasi inputan baru
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!whatsappNumber.trim()) {
      alert("Please enter your WhatsApp number");
      return;
    }

    // Validasi untuk semua metode pembayaran yang membutuhkan bukti transfer
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

    // Simpan data ke localStorage
    localStorage.setItem("ticketQuantity", ticketQuantity.toString());
    localStorage.setItem("customerName", name);
    localStorage.setItem("customerEmail", email);
    localStorage.setItem("customerWhatsApp", whatsappNumber);

    // Redirect ke halaman konfirmasi
    router.push(`/checkout/${id}/confirm`);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="border-b bg-white py-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <h1 className="text-xl font-bold text-[#ec1b21]">
              Small Room Soul
            </h1>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="hidden h-8 w-8 rounded-full bg-gray-200 sm:block"></div>
            <span className="hidden text-sm font-medium sm:block">
              John Doe
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto my-8 max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          <ol className="flex flex-wrap items-center space-x-1">
            <li>
              <Link href="#" className="hover:text-gray-700 hover:underline">
                Home
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <Link href="#" className="hover:text-gray-700 hover:underline">
                {concert.city}
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <Link
                href={`/concerts/${concert.id}`}
                className="hover:text-gray-700 hover:underline"
              >
                {concert.title}
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li className="font-medium text-gray-900">Checkout</li>
          </ol>
        </nav>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Left column - Order details */}
          <div className="lg:w-2/3">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
              Complete your order
            </h1>

            {/* Customer Information */}
            <div className="mb-8 rounded-xl border border-gray-200 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Customer Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[#ec1b21] focus:outline-none focus:ring-1 focus:ring-[#ec1b21] text-gray-700"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-gray-700 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[#ec1b21] focus:outline-none focus:ring-1 focus:ring-[#ec1b21]"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="whatsapp"
                    className="mb-1 block text-sm font-medium text-gray-900"
                  >
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="text-gray-700 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[#ec1b21] focus:outline-none focus:ring-1 focus:ring-[#ec1b21]"
                    placeholder="6281234567890"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-900">
                    Kami akan mengirimkan invoice dan tiket melalui Whatsapp
                  </p>
                </div>
              </div>
            </div>

            {/* Event summary */}
            <div className="mb-8 rounded-xl border border-gray-200 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Event Summary
              </h2>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={concert.imageUrl}
                    alt={concert.title}
                    width={120}
                    height={120}
                    className="h-24 w-24 object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {concert.title}
                  </h3>
                  <p className="text-gray-600">by {concert.artist}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{concert.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span>
                      {concert.venue}, {concert.city}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket selection */}
            <div className="mb-8 rounded-xl border border-gray-200 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Ticket Selection
              </h2>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                        General Admission
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500">
                        {formatRupiah(concert.price)}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              handleQuantityChange(ticketQuantity - 1)
                            }
                            className="h-8 w-8 rounded-l border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
                          >
                            -
                          </button>
                          <div className="flex h-8 w-12 items-center justify-center border-t border-b border-gray-300 bg-white text-sm">
                            {ticketQuantity}
                          </div>
                          <button
                            onClick={() =>
                              handleQuantityChange(ticketQuantity + 1)
                            }
                            className="h-8 w-8 rounded-r border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment method */}
            <div className="mb-8 rounded-xl border border-gray-200 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Payment Method
              </h2>
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="payment-bank"
                  className="flex cursor-pointer items-center gap-4 rounded border border-gray-300 p-4"
                >
                  <input
                    type="radio"
                    id="payment-bank"
                    name="payment"
                    checked={selectedPayment === "bank"}
                    onChange={() => setSelectedPayment("bank")}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <Banknote className="h-5 w-5 text-gray-900" />
                  <span className="text-black">Bank Transfer</span>
                </label>

                <label
                  htmlFor="payment-qr"
                  className="flex cursor-pointer items-center gap-4 rounded border border-gray-300 p-4"
                >
                  <input
                    type="radio"
                    id="payment-qr"
                    name="payment"
                    checked={selectedPayment === "qr"}
                    onChange={() => setSelectedPayment("qr")}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <QrCode className="h-5 w-5 text-gray-600" />
                  <span className="text-black">QR Code</span>
                </label>
              </div>

              {/* Bank Transfer details - Modern Design */}
              {selectedPayment === "bank" && (
                <div className="mt-6 rounded-xl bg-gray-50 p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ec1b21] text-white">
                      <Banknote className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Bank Transfer
                    </h3>
                  </div>

                  {/* Bank Card Design */}
                  <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="bg-gradient-to-r from-[#ec1b21] to-[#ff6b6b] p-4">
                      <div className="flex justify-between text-white">
                        <span className="text-sm font-medium">BCA</span>
                        <span className="text-xs">Virtual Account</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4 space-y-3">
                        <div>
                          <p className="text-xs text-gray-500">
                            Account Number
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="font-mono text-lg font-bold tracking-wider text-gray-900">
                              1234 5678 9012
                            </p>
                            <button
                              className="text-[#ec1b21] hover:text-[#c5161b]"
                              aria-label="Delete"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  x="9"
                                  y="9"
                                  width="13"
                                  height="13"
                                  rx="2"
                                  ry="2"
                                ></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Account Name</p>
                          <p className="font-medium text-gray-900">
                            Small Room Soul
                          </p>
                        </div>
                      </div>
                      <div className="rounded-md bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Transfer Amount</p>
                        <p className="text-lg font-bold text-[#ec1b21]">
                          {formatRupiah(total)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Modern File Upload */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-gray-900">
                        Upload Payment Proof
                      </h4>
                      <p className="text-xs text-gray-500">
                        Upload screenshot of your bank transfer confirmation
                      </p>
                    </div>

                    <label
                      htmlFor="payment-proof"
                      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed ${
                        paymentProof
                          ? "border-green-300 bg-green-50"
                          : "border-gray-300 hover:border-gray-400"
                      } p-6 transition-colors`}
                    >
                      {paymentProof ? (
                        <div className="text-center">
                          <svg
                            className="mx-auto h-10 w-10 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          <p className="mt-2 text-sm font-medium text-gray-900">
                            {paymentProof.name}
                          </p>
                          <p className="mt-1 text-xs text-green-600">
                            Upload successful
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <svg
                            className="mx-auto h-10 w-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <div className="mt-2 flex text-sm text-gray-600">
                            <span className="font-medium text-[#ec1b21]">
                              Click to upload
                            </span>
                            <span className="pl-1">or drag and drop</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, PDF up to 5MB
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        id="payment-proof"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    {paymentProof && (
                      <button
                        onClick={() => setPaymentProof(null)}
                        className="w-full rounded-md bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                      >
                        Change File
                      </button>
                    )}
                  </div>

                  {/* Payment Instructions */}
                  <div className="mt-6 rounded-lg bg-blue-50 p-4">
                    <h4 className="mb-2 text-sm font-medium text-blue-800">
                      Payment Instructions
                    </h4>
                    <ul className="space-y-2 text-xs text-blue-700">
                      <li className="flex items-start gap-2">
                        <svg
                          className="h-4 w-4 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Transfer the exact amount shown above</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          className="h-4 w-4 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Payment will be verified within 1 hour</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          className="h-4 w-4 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          Tickets will be sent via email after verification
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* QR Code Payment - Modern Design */}
              {selectedPayment === "qr" && (
                <div className="mt-6 rounded-xl bg-gray-50 p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ec1b21] text-white">
                      <QrCode className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      QRIS Payment
                    </h3>
                  </div>

                  {/* QR Code Card */}
                  <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col items-center">
                      <div className="mb-4 rounded-lg border-4 border-white p-2 shadow-lg">
                        <Image
                          src="/images/payment/qr-sample.jpeg"
                          alt="QRIS Payment Code"
                          width={200}
                          height={200}
                          className="h-48 w-48 object-contain"
                        />
                      </div>

                      <div className="w-full rounded-md bg-gray-50 p-3 text-center">
                        <p className="text-xs text-gray-500">Payment Amount</p>
                        <p className="text-lg font-bold text-[#ec1b21]">
                          {formatRupiah(total)}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <button className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="9"
                              y="9"
                              width="13"
                              height="13"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                          Copy QR Code
                        </button>
                        <button className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                          Download QR
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Modern File Upload */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-gray-900">
                        Upload Payment Proof
                      </h4>
                      <p className="text-xs text-gray-500">
                        Upload screenshot of your successful payment
                      </p>
                    </div>

                    <label
                      htmlFor="payment-proof"
                      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed ${
                        paymentProof
                          ? "border-green-300 bg-green-50"
                          : "border-gray-300 hover:border-gray-400"
                      } p-6 transition-colors`}
                    >
                      {paymentProof ? (
                        <div className="text-center">
                          <svg
                            className="mx-auto h-10 w-10 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          <p className="mt-2 text-sm font-medium text-gray-900">
                            {paymentProof.name}
                          </p>
                          <p className="mt-1 text-xs text-green-600">
                            Upload successful
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <svg
                            className="mx-auto h-10 w-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <div className="mt-2 flex text-sm text-gray-600">
                            <span className="font-medium text-[#ec1b21]">
                              Click to upload
                            </span>
                            <span className="pl-1">or drag and drop</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, PDF up to 5MB
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        id="payment-proof"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    {paymentProof && (
                      <button
                        onClick={() => setPaymentProof(null)}
                        className="w-full rounded-md bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                      >
                        Change File
                      </button>
                    )}
                  </div>

                  {/* Payment Instructions */}
                  <div className="mt-6 rounded-lg bg-blue-50 p-4">
                    <h4 className="mb-2 text-sm font-medium text-blue-800">
                      Payment Instructions
                    </h4>
                    <ul className="space-y-2 text-xs text-blue-700">
                      <li className="flex items-start gap-2">
                        <svg
                          className="h-4 w-4 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          Scan the QR code using your mobile banking app
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          className="h-4 w-4 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Payment will be processed instantly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          className="h-4 w-4 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Save your payment confirmation screenshot</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="mb-8 flex items-center gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
                className="h-4 w-4 cursor-pointer rounded border-gray-300 text-red-600 focus:ring-red-600"
              />
              <label htmlFor="terms" className="cursor-pointer">
                I agree to the{" "}
                <Link href="#" className="text-red-600 underline">
                  terms and conditions
                </Link>
                .
              </label>
            </div>

            <Button
              disabled={!agreedToTerms}
              onClick={handleCheckout}
              variant="outline"
              className="w-full bg-[#ec1b21] px-6 text-base font-semibold text-white shadow-md hover:bg-[#c5161b]"
              size="lg"
            >
              Place Order - {formatRupiah(total)}
            </Button>
          </div>

          {/* Right column - Order summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 rounded-xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Order Summary
              </h2>
              <div className="flex justify-between text-sm text-gray-600">
                <div>Tickets ({ticketQuantity})</div>
                <div>{formatRupiah(subtotal)}</div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <div>Service Fee</div>
                <div>{formatRupiah(serviceFee)}</div>
              </div>
              <hr className="my-4 border-gray-300" />
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <div>Total</div>
                <div>{formatRupiah(total)}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
