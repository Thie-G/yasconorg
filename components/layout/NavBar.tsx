"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "ABOUT",
    dropdown: {
      title: "About YASCON",
      links: [
        { href: "/", label: "Home" },
        { href: "/#story", label: "Our Story" },
        { href: "/#profile", label: "Mission & Vision" },
        { href: "/#objective", label: "Objectives" },
        { href: "/contact", label: "Contact Us" },
      ],
    },
  },
  {
    label: "NATIONAL",
    dropdown: {
      title: "National Office",
      links: [
        { href: "/work", label: "Our Work" },
        { href: "/programs", label: "National Programs" },
        { href: "/partners", label: "National Partners" },
        { href: "/stats", label: "National Statistical Data" },
      ],
    },
  },
  {
    label: "REGIONS",
    dropdown: {
      title: "Regional Hubs",
      links: [
        { href: "/impact/northern", label: "Northern Region" },
        { href: "/impact/central", label: "Central Region" },
        { href: "/impact/southern", label: "Southern Region" },
        { href: "/impact/eastern", label: "Eastern Region" },
      ],
    },
  },
  {
    label: "NEWSROOM",
    dropdown: {
      title: "Stay Informed",
      links: [
        { href: "/news", label: "National News" },
        { href: "/news/regions", label: "Regional Stories" },
        { href: "/news/videos", label: "Videos" },
      ],
    },
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHome = pathname === "/";
  const useTransparentStyle = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (idx: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(idx);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          useTransparentStyle ? "bg-transparent " : "bg-white shadow-md"
        } `}
      >
        {/* Top info bar */}
        {/* {!scrolled && (
          <div className=" text-white text-xs py-4 px-4 hidden md:block">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex gap-6">
                <span>📞 +265 (0) 885284321</span>
                <span>✉ yasconmw@outlook.com</span>
              </div>
              <div className="flex gap-4 items-center">
                <a href="https://web.facebook.com/nyascon" target="_blank" rel="noreferrer" className="hover:text-[#d4a017] transition-colors">
                  Facebook
                </a>
                <span className="text-white/30">|</span>
                <a href="#newsletter" className="hover:text-[#d4a017] transition-colors">
                  Get Updates
                </a>
              </div>
            </div>
          </div>
        )}  */}

        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between ${scrolled ? "h-16" : "h-20"} transition-all duration-300`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="hidden items-center gap-3 shrink-0  sm:flex"
          >
            <div className="relative w-16 h-16 ">
              <Image
                src="/yascon-logo.png"
                alt="YASCON Logo"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <div className={`hidden sm:block transition-all duration-300`}>
              <div
                className={`font-bold tracking-widest ${useTransparentStyle ? "text-white text-sm" : "text-green-600 text-sm"}`}
              >
                YASCON
              </div>
              <div
                className={`text-xs ${useTransparentStyle ? "text-white/80" : "text-gray-500"} leading-tight max-w-[160px]`}
              >
                Youth Conservation Malawi
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden lg:flex items-center gap-1 `}>
            {navItems.map((item, idx) => (
              <div
                key={idx}
                className={`relative`}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold tracking-wide nav-link transition-colors ${
                    useTransparentStyle ? "text-white " : "text-gray-800 "
                  } ${activeDropdown === idx ? "bg-green-600 rounded-t-md" : ""}`}
                >
                  {item.label}
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === idx ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown */}
                {activeDropdown === idx && (
                  <div className="dropdown-enter absolute top-full left-1/2 mt-2 w-64 translate-x-[+25%] bg-white  shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className=" px-4 pt-4">
                      <p className="text-gray-800 text-xs font-bold uppercase tracking-widest">
                        {item.dropdown.title}
                      </p>
                    </div>
                    <div className="py-2">
                      {item.dropdown.links.map((link, li) => (
                        <Link
                          key={li}
                          href={link.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f0fdf4] hover:text-green-700 hover:pl-6 transition-all duration-150 border-b border-gray-300 last:border-0"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/get-involved"
              className={`border-2 text-sm font-bold px-5 py-2 rounded-full transition-all duration-200 ${
                useTransparentStyle
                  ? "border-white text-white hover:bg-white hover:text-green-700"
                  : "border-green-600 text-green-600 hover:bg-green-700 hover:text-white"
              }`}
            >
              GET INVOLVED
            </Link>
            <Link
              href="/donate"
              className="bg-yellow-600 text-white text-sm font-bold px-6 py-2 rounded-full hover:bg-yellow-700 transition-colors shadow-lg"
            >
              DONATE
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 ${useTransparentStyle ? "text-white" : "text-[#1a2e1a]"} `}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <div
              className={`w-6 h-0.5 mb-1.5 transition-all ${useTransparentStyle ? "bg-white" : "bg-[#1a2e1a]"} ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <div
              className={`w-6 h-0.5 mb-1.5 transition-all ${useTransparentStyle ? "bg-white" : "bg-[#1a2e1a]"} ${mobileOpen ? "opacity-0" : ""}`}
            />
            <div
              className={`w-6 h-0.5 transition-all ${useTransparentStyle ? "bg-white" : "bg-[#1a2e1a]"} ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu-enter fixed inset-0 z-40 bg-gray-900 pt-8  overflow-y-auto lg:hidden">
          <div className="p-6">
            {navItems.map((item, idx) => (
              <div key={idx} className="border-b border-white/10 pb-4 mb-4">
                <p className="text-[#d4a017] font-bold uppercase tracking-widest text-xs mb-3">
                  {item.label}
                </p>
                {item.dropdown.links.map((link, li) => (
                  <Link
                    key={li}
                    href={link.href}
                    className="block text-white/80 hover:text-white py-2 text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="flex flex-col gap-3 mt-6">
              <Link
                href="/get-involved"
                className="text-center border-2 border-white text-white py-3 rounded-full font-bold hover:bg-white hover:text-green-700 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Get Involved
              </Link>
              <Link
                href="/donate"
                className="text-center bg-yellow-600 text-white py-3 rounded-full font-bold hover:bg-yellow-700 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
