"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Ticket, Filter } from "lucide-react";
import { concerts } from "@/lib/concerts";

const categories = ["semua", "international", "kpop", "festival", "lokal"];

export default function ConcertsPage() {
  const [activeCategory, setActiveCategory] = useState("semua");

  const filteredConcerts =
    activeCategory === "semua"
      ? concerts
      : concerts.filter(
          (concert) =>
            concert.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <section className="bg-white text-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-[#ec1b21]/30 bg-[#ec1b21]/10 px-4 py-2 text-sm">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-[#ec1b21]"></span>
            <span>Konser Mendatang</span>
          </div>
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-4">
            Temukan Konser Favoritmu
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Jelajahi berbagai pilihan konser terbaik dari berbagai genre musik
            dan dapatkan pengalaman live musik yang tak terlupakan.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
            <Filter className="mr-2 h-4 w-4 text-[#ec1b21]" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-[#ec1b21] text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-[#ec1b21]/30 hover:text-[#ec1b21]"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Concert Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {filteredConcerts.map((concert) => (
              <motion.div
                key={concert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={concert.imageUrl}
                    alt={concert.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                  <div className="absolute top-4 right-4 rounded-full bg-[#ec1b21] px-3 py-1 text-xs font-medium text-white capitalize">
                    {concert.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{concert.title}</h3>
                  <p className="mb-4 text-gray-600 line-clamp-2">
                    {concert.description}
                  </p>

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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredConcerts.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Ticket className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              Tidak ada konser yang tersedia
            </h3>
            <p className="text-gray-600">
              Maaf, saat ini tidak ada konser dalam kategori ini. Coba kategori
              lain atau periksa kembali nanti.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
