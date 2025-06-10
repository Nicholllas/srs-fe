"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Calendar, MapPin, Ticket } from "lucide-react";

const slides = [
  {
    image: "/images/hero/coldplay.jpg",
    title: "Coldplay: Music of the Spheres World Tour",
    desc: "Nikmati malam penuh bintang dengan lagu-lagu terbaik Coldplay langsung di Jakarta!",
    cta: "Beli Tiket Sekarang",
    date: "15 November 2023",
    venue: "GBK Stadium, Jakarta",
    price: "Rp 5.000.000",
  },
  {
    image: "/images/hero/blackpink.jpg",
    title: "Blackpink: Born Pink World Tour",
    desc: "Girlband fenomenal asal Korea kembali ke Indonesia dengan konsep pertunjukan spektakuler",
    cta: "Beli Tiket Sekarang",
    date: "10 Desember 2023",
    venue: "Stadion Madya Gelora Bung Karno",
    price: "Rp 6.000.000",
  },
  {
    image: "/images/hero/javajazz.jpg",
    title: "Java Jazz Festival 2024",
    desc: "Festival jazz terbesar di Asia dengan puluhan artis internasional dan lokal",
    cta: "Beli Tiket Sekarang",
    date: "2-4 Maret 2024",
    venue: "Jakarta International Expo",
    price: "Rp 3.500.000",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const { image, title, desc, cta, date, venue, price } = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-white text-gray-900">
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#ec1b21]/30 bg-[#ec1b21]/10 px-4 py-2 text-sm">
              <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-[#ec1b21]"></span>
              <span>Konser Akan Datang</span>
            </div>

            <h1 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p className="mx-auto max-w-lg text-lg text-gray-600 md:text-xl lg:mx-0">
              {desc}
            </p>

            <div className="mx-auto max-w-md space-y-4 text-left lg:mx-0">
              <div className="flex items-center">
                <Calendar className="mr-3 h-5 w-5 text-[#ec1b21]" />
                <span className="text-gray-600">{date}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-3 h-5 w-5 text-[#ec1b21]" />
                <span className="text-gray-600">{venue}</span>
              </div>
              <div className="flex items-center">
                <Ticket className="mr-3 h-5 w-5 text-[#ec1b21]" />
                <span className="text-gray-600">{price}</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/tickets"
                className="inline-flex items-center rounded-lg bg-[#ec1b21] px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-[#c5161b] hover:shadow-lg hover:shadow-[#ec1b21]/30"
              >
                {cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-gray-200 shadow-lg">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Navigation Arrows */}
            <div className="absolute right-6 bottom-6 left-6 flex justify-between">
              <button
                onClick={prevSlide}
                className="rounded-full bg-white/80 p-3 transition hover:bg-white/90"
                aria-label="Previous slide"
              >
                <ArrowLeft className="h-6 w-6 text-gray-900" />
              </button>
              <button
                onClick={nextSlide}
                className="rounded-full bg-white/80 p-3 transition hover:bg-white/90"
                aria-label="Next slide"
              >
                <ArrowRight className="h-6 w-6 text-gray-900" />
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="mt-8 flex justify-center space-x-2 lg:justify-start">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-6 bg-[#ec1b21]" : "w-3 bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
