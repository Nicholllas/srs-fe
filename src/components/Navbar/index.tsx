"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Konser", href: "/concerts" },
    { name: "Tentang", href: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur-md transition-all duration-300 ${
        isScrolled ? "border-gray-200" : "border-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-[#ec1b21]"
                    : "text-gray-600 hover:text-[#ec1b21]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/signin"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#ec1b21]"
            >
              Masuk
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-[#ec1b21] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#c5161b]"
            >
              Daftar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle menu"
            className="rounded-full p-2 text-gray-600 hover:text-[#ec1b21] md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-full z-50 border-t border-gray-200 bg-white shadow-lg md:hidden">
            <div className="container px-4 py-3">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`rounded-lg px-4 py-3 text-sm font-medium ${
                      pathname === link.href
                        ? "bg-[#ec1b21]/10 text-[#ec1b21]"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
                <Link
                  href="/signin"
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Masuk
                </Link>
                <Link
                  href="/signup"
                  className="flex-1 rounded-lg bg-[#ec1b21] px-4 py-3 text-center text-sm font-medium text-white hover:bg-[#c5161b]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Daftar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
