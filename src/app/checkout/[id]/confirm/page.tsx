"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Concert, concerts } from "@/lib/concerts";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function ConfirmCheckoutPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const [concert, setConcert] = useState<Concert | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderNumber, setOrderNumber] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [total, setTotal] = useState(0);

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

    // Generate random order number
    const randomOrderNum = `SR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(randomOrderNum);

    // Get quantity and total from localStorage or default
    const storedQuantity = localStorage.getItem("ticketQuantity") ?? "1";
    const quantity = parseInt(storedQuantity);
    setTicketQuantity(quantity);

    const ticketPrice = foundConcert.price;
    const subtotal = ticketPrice * quantity;
    const serviceFee = 5000 * quantity;
    const orderTotal = subtotal + serviceFee;
    setTotal(orderTotal);

    setConcert(foundConcert);
    setLoading(false);
  }, [id, router]);

  if (loading || !concert) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading order confirmation...
      </div>
    );
  }

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
            <li className="font-medium text-gray-900">Confirmation</li>
          </ol>
        </nav>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Left column - Confirmation details */}
          <div className="lg:w-2/3">
            <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Order Confirmed!
              </h1>
              <p className="text-gray-600">
                Thank you for your purchase. Your order number is{" "}
                <span className="font-semibold">{orderNumber}</span>
              </p>
              <p className="text-gray-600">
                We&apos;ve sent the details to your email.
              </p>
            </div>

            {/* Order summary */}
            <div className="mb-8 rounded-xl border border-gray-200 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number</span>
                  <span className="font-medium">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">Bank Transfer</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Paid</span>
                  <span className="font-medium text-[#ec1b21]">
                    {formatRupiah(total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Event details */}
            <div className="mb-8 rounded-xl border border-gray-200 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Event Details
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
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="font-medium">Tickets:</span>{" "}
                    {ticketQuantity} x {formatRupiah(concert.price)}
                  </div>
                </div>
              </div>
            </div>

            {/* Next steps */}
            <div className="rounded-xl border border-gray-200 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                What&apos;s Next?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Check Your Email
                    </h3>
                    <p className="text-sm text-gray-600">
                      We&apos;ve sent your e-ticket to your registered email
                      address. Please check your inbox (and spam folder if you
                      don&apos;t see it).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Prepare for the Event
                    </h3>
                    <p className="text-sm text-gray-600">
                      Bring your e-ticket (printed or on your phone) and a valid
                      ID to the venue. Doors open 1 hour before the show.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Enjoy the Show!
                    </h3>
                    <p className="text-sm text-gray-600">
                      We hope you have a great time at the concert. Share your
                      experience with us using #SmallRoomSoul.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Help & Support */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Need Help?
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  If you have any questions about your order, please contact our
                  customer support team.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                >
                  Contact Support
                </Button>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Your Tickets
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  You can view and manage your tickets in your account.
                </p>
                <Link href="/account/tickets">
                  <Button className="w-full bg-[#ec1b21] text-white hover:bg-[#c5161b]">
                    View My Tickets
                  </Button>
                </Link>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Explore More Events
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Check out other exciting events happening soon.
                </p>
                <Link href="/concerts">
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                  >
                    Browse Events
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
