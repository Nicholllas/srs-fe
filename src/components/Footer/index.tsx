"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/logo/srs.png"
                  alt="Small Room Soul Logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Small Room Soul
              </span>
            </Link>
            <p className="text-gray-600">
              Platform tiket konser terbaik untuk pengalaman musik tak
              terlupakan. Temukan dan beli tiket konser favoritmu dengan mudah.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 transition hover:text-[#ec1b21]"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 transition hover:text-[#ec1b21]"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 transition hover:text-[#ec1b21]"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 transition hover:text-[#ec1b21]"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/concerts"
                  className="text-gray-600 transition hover:text-[#ec1b21]"
                >
                  Konser Terdekat
                </Link>
              </li>
              <li>
                <Link
                  href="/artists"
                  className="text-gray-600 transition hover:text-[#ec1b21]"
                >
                  Artis Populer
                </Link>
              </li>
              <li>
                <Link
                  href="/venues"
                  className="text-gray-600 transition hover:text-[#ec1b21]"
                >
                  Venue
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-600 transition hover:text-[#ec1b21]"
                >
                  Berita Konser
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 transition hover:text-[#ec1b21]"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 transition hover:text-[#ec1b21]"
                >
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 transition hover:text-[#ec1b21]"
                >
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 transition hover:text-[#ec1b21]"
                >
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Newsletter</h3>
            <p className="text-gray-600">
              Dapatkan info konser terbaru langsung ke email Anda
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Alamat email Anda"
                className="text-gray-600 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#ec1b21] focus:outline-none"
                required
              />
              <button
                type="submit"
                className="rounded-lg bg-[#ec1b21] px-4 py-2 text-white transition hover:bg-[#c5161b]"
              >
                Berlangganan
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-200 pt-8 md:flex-row">
          <p className="text-sm text-gray-500">
            © {currentYear} Small Room Soul. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <Link
              href="/terms"
              className="text-sm text-gray-500 transition hover:text-[#ec1b21]"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-500 transition hover:text-[#ec1b21]"
            >
              Privacy
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-gray-500 transition hover:text-[#ec1b21]"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
