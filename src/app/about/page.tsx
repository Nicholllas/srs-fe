"use client";

import { Ticket, Users, Star } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="bg-white text-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-[#ec1b21]/30 bg-[#ec1b21]/10 px-4 py-2 text-sm">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-[#ec1b21]"></span>
            <span>Tentang Kami</span>
          </div>
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-4">
            Lebih Dari Sekadar Tiket Konser
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Kami menghubungkan penggemar musik dengan pengalaman live terbaik
            melalui platform pemesanan tiket konser terpercaya di Indonesia.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative mb-16 aspect-video w-full overflow-hidden rounded-xl border border-gray-200 shadow-lg">
          <Image
            src="/images/about/concert-crowd.jpg"
            alt="Concert crowd"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
        </div>

        {/* Features Section */}
        <div className="mb-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ec1b21]">
              <Ticket className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Tiket Terjamin</h3>
            <p className="text-gray-600">
              Setiap tiket yang dipesan melalui platform kami 100% asli dan
              terverifikasi langsung oleh penyelenggara.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ec1b21]">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Pengalaman Pengguna</h3>
            <p className="text-gray-600">
              Proses pemesanan yang cepat dan mudah, dengan dukungan pelanggan
              24/7 untuk semua kebutuhan konser Anda.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ec1b21]">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Akses Eksklusif</h3>
            <p className="text-gray-600">
              Memberikan akses khusus ke presale, meet & greet, dan pengalaman
              VIP lainnya untuk member setia kami.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 shadow-lg">
            <Image
              src="/images/about/logo.png"
              alt="Founders"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Cerita Kami</h2>
            <p className="mb-4 text-lg text-gray-600">
              Didirikan pada tahun 2020 oleh sekelompok pecinta musik yang
              frustasi dengan sistem penjualan tiket konvensional, kami
              berkomitmen untuk menciptakan platform yang adil dan transparan
              untuk penggemar musik.
            </p>
            <p className="mb-4 text-lg text-gray-600">
              Dengan teknologi terbaru dan jaringan luas dengan penyelenggara
              konser, kami telah membantu lebih dari 500.000 penggemar
              mendapatkan tiket untuk konser favorit mereka.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[#ec1b21]"></div>
              <div>
                <h4 className="font-bold">Tim Small Room Soul</h4>
                <p className="text-sm text-gray-500">Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 rounded-xl border border-gray-200 bg-gray-50 p-12 text-center">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <div className="text-4xl font-bold text-[#ec1b21] md:text-5xl">
                50+
              </div>
              <p className="text-gray-600">Konser Setiap Bulan</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#ec1b21] md:text-5xl">
                500K+
              </div>
              <p className="text-gray-600">Pengguna Aktif</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#ec1b21] md:text-5xl">
                98%
              </div>
              <p className="text-gray-600">Kepuasan Pengguna</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#ec1b21] md:text-5xl">
                24/7
              </div>
              <p className="text-gray-600">Dukungan Pelanggan</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Tim Kami
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Andi Wijaya",
                role: "CEO & Founder",
                image: "/images/team/ceo.jpg",
              },
              {
                name: "Budi Santoso",
                role: "CTO",
                image: "/images/team/budi.jpg",
              },
              {
                name: "Citra Dewi",
                role: "Head of Marketing",
                image: "/images/team/citra.jpg",
              },
              {
                name: "Dian Pratama",
                role: "Customer Support",
                image: "/images/team/dian.jpg",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative mx-auto mb-4 aspect-square w-32 overflow-hidden rounded-full border border-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
