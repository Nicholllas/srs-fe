"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";

import {
  Calendar,
  MapPin,
  ArrowLeft,
  Star,
  ChevronDown,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { concerts } from "@/lib/concerts";

export default function ConcertDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const concert = concerts.find((c) => String(c.id) === id);

  if (!concert) return notFound();

  return (
    <div className="bg-white pt-[80px] min-h-screen">
      {/* Padding top 80px disesuaikan untuk navbar fixed */}

      <main className="container mx-auto mt-6 mb-20 max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-4">
          <Button
            variant="outline"
            className="-ml-2 px-2 py-1 text-sm border-[#ec1b21] bg-white text-[#ec1b21] hover:bg-[#ec1b21] hover:text-white"
            onClick={() => router.push("/concerts")}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Image banner */}
        <div className="relative mb-6 overflow-hidden rounded-xl shadow-md">
          <Image
            src={concert.bannerUrl}
            alt={concert.title}
            width={1200}
            height={400}
            className="h-48 w-full object-cover sm:h-64"
            priority
          />
          <Button className="absolute right-4 bottom-4 bg-[#ec1b21] text-xs font-semibold text-white shadow-lg hover:bg-[#c5161b]">
            View all pictures (20)
          </Button>
        </div>

        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-gray-500">
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
            <li className="max-w-xs truncate font-medium text-gray-900">
              {concert.title}
            </li>
          </ol>
        </nav>

        {/* Title and artist */}
        <div className="mb-6">
          <h1 className="mb-1 text-3xl font-bold text-gray-900">
            {concert.title}
          </h1>
          <p className="text-lg text-gray-600">by {concert.artist}</p>
        </div>

        {/* Location and date */}
        <div className="mb-6 space-y-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 pt-0.5">
              <MapPin className="h-5 w-5 text-[#ec1b21]" />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-800">
                {concert.venue}
              </p>
              <p className="text-sm text-gray-500">{concert.address}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 pt-0.5">
              <Calendar className="h-5 w-5 text-[#ec1b21]" />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-800">
                {concert.date}
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{concert.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price and buy button */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-base font-semibold text-gray-700">
            From {concert.price}
          </div>
          <Link href={`/checkout/${concert.id}`} passHref>
            <Button className="h-12 bg-[#ec1b21] px-6 text-base font-semibold text-white shadow-md hover:bg-[#c5161b]">
              Buy Tickets
            </Button>
          </Link>
        </div>

        {/* Share buttons */}
        <div className="mb-8">
          <h3 className="mb-3 text-sm font-semibold tracking-wider text-gray-700 uppercase">
            Share this event
          </h3>
          <div className="flex items-center space-x-2">
            {[
              {
                icon: <Facebook className="h-5 w-5 text-white" />,
                name: "Facebook",
                bg: "bg-[#1877F2]", // Facebook blue
              },
              {
                icon: <Twitter className="h-5 w-5 text-white" />,
                name: "Twitter",
                bg: "bg-[#1DA1F2]", // Twitter blue
              },
              {
                icon: <MessageCircle className="h-5 w-5 text-white" />,
                name: "WhatsApp",
                bg: "bg-[#25D366]", // WhatsApp green
              },
              {
                icon: <Linkedin className="h-5 w-5 text-white" />,
                name: "LinkedIn",
                bg: "bg-[#0077B5]", // LinkedIn blue
              },
              {
                icon: <Mail className="h-5 w-5 text-white" />,
                name: "Email",
                bg: "bg-[#EA4335]", // Gmail red
              },
            ].map((social) => (
              <Button
                key={social.name}
                variant="ghost"
                size="icon"
                className={`h-10 w-10 rounded-full ${social.bg} hover:opacity-90`}
                aria-label={`Share on ${social.name}`}
              >
                {social.icon}
              </Button>
            ))}
          </div>
        </div>

        {/* About this concert */}
        <section className="mb-10">
          <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900">
            About this concert
          </h2>
          <p className="mb-3 leading-relaxed text-gray-700">
            {concert.description}
          </p>
          <Link
            href="#"
            className="inline-flex items-center font-medium text-[#ec1b21] hover:underline"
          >
            Read more
            <ChevronDown className="ml-1 h-4 w-4" />
          </Link>
        </section>

        {/* Benefits section */}
        <section className="mb-10 rounded-xl bg-gray-50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            When you book on TicketApp
          </h3>
          <ul className="space-y-3">
            {[
              "You'll receive e-Ticket instantly",
              "Secure payment with multiple options",
              "Customer support available 24/7",
              "Mobile ticket accepted",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="mt-0.5 flex-shrink-0">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ec1b21]">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <span className="ml-3 text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Rules and policy */}
        <section className="mb-10">
          <h3 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900">
            Rules and policy
          </h3>
          <div className="prose prose-sm text-gray-700">
            <p className="font-medium">GENERAL RULES:</p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                Organizers have the right to inspect bags, clothing, and/or
                other belongings at the entrance.
              </li>
              <li>
                No professional cameras or recording devices allowed without
                permission.
              </li>
              <li>No outside food or beverages permitted.</li>
              <li>No smoking in the venue.</li>
            </ol>
          </div>
          <Link
            href="#"
            className="mt-3 inline-flex items-center font-medium text-[#ec1b21] hover:underline"
          >
            View full policy
            <ChevronDown className="ml-1 h-4 w-4" />
          </Link>
        </section>

        {/* Organizer section */}
        <section className="mb-10 rounded-xl border border-gray-200 p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Event organizer
          </h3>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src={concert.organizerImage}
                alt={concert.organizer}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full border-2 border-[#ec1b21] object-cover"
              />
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {concert.organizer}
                </p>
                <p className="text-sm text-gray-500">
                  {concert.followers} followers · {concert.eventsCount} events
                </p>
                <div className="mt-1 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(concert.rating)
                          ? "fill-current text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {concert.rating.toFixed(1)} rating
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                className="border-[#ec1b21] bg-white text-[#ec1b21] hover:bg-[#ec1b21] hover:text-white"
              >
                View profile
              </Button>

              <Button className="bg-[#ec1b21] hover:bg-[#c5161b] text-white">
                Follow
              </Button>
            </div>
          </div>
        </section>

        {/* Similar concerts */}
        <section className="mb-10">
          <h3 className="mb-6 pb-2 text-xl font-semibold text-gray-900">
            Similar concerts
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="group cursor-pointer transition-all duration-200"
              >
                <div className="mb-2 h-32 w-full overflow-hidden rounded-lg bg-gray-200 transition-all duration-300 group-hover:opacity-90"></div>
                <p className="truncate text-sm font-semibold text-gray-900 group-hover:text-[#ec1b21]">
                  Similar Concert {item}
                </p>
                <p className="text-xs text-gray-500">From {concert.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
