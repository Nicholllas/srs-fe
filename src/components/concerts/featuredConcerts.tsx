"use client";

import { ArrowRight, Calendar, MapPin, Ticket } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const featuredConcerts = [
  {
    id: 1,
    image: "/images/hero/coldplay.jpg",
    title: "Coldplay: Music of the Spheres World Tour",
    date: "15 November 2023",
    venue: "GBK Stadium, Jakarta",
    price: "Rp 5.000.000",
    category: "International",
  },
  {
    id: 2,
    image: "/images/hero/blackpink.jpg",
    title: "Blackpink: Born Pink World Tour",
    date: "10 Desember 2023",
    venue: "Stadion Madya Gelora Bung Karno",
    price: "Rp 6.000.000",
    category: "K-Pop",
  },
  {
    id: 3,
    image: "/images/hero/javajazz.jpg",
    title: "Java Jazz Festival 2024",
    date: "2-4 Maret 2024",
    venue: "Jakarta International Expo",
    price: "Rp 3.500.000",
    category: "Festival",
  },
];

export default function FeaturedConcerts() {
  return (
    <section className="bg-white py-16 text-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <div className="mb-4 inline-flex items-center rounded-full border border-[#ec1b21]/30 bg-[#ec1b21]/10 px-4 py-2 text-sm">
              <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-[#ec1b21]"></span>
              <span>Konser Unggulan</span>
            </div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Rekomendasi Konser Terbaik
            </h2>
          </div>
          <Link
            href="/concert"
            className="mt-4 inline-flex items-center font-medium text-[#ec1b21] hover:text-[#c5161b] md:mt-0"
          >
            Lihat Semua Konser <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Concert Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredConcerts.map((concert) => (
            <div
              key={concert.id}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={concert.image}
                  alt={concert.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                <div className="absolute top-4 right-4 rounded-full bg-[#ec1b21] px-3 py-1 text-xs font-medium text-white">
                  {concert.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold line-clamp-2">
                  {concert.title}
                </h3>

                <div className="mb-6 space-y-3">
                  <div className="flex items-center">
                    <Calendar className="mr-3 h-5 w-5 text-[#ec1b21]" />
                    <span className="text-gray-700">{concert.date}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-3 h-5 w-5 text-[#ec1b21]" />
                    <span className="text-gray-700">{concert.venue}</span>
                  </div>
                  <div className="flex items-center">
                    <Ticket className="mr-3 h-5 w-5 text-[#ec1b21]" />
                    <span className="font-medium text-gray-900">
                      {concert.price}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/concerts/${concert.id}`}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-[#ec1b21] px-6 py-3 font-medium text-white transition-all hover:bg-[#c5161b] hover:shadow-md"
                >
                  Beli Tiket
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
