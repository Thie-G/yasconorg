"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TopHeader from "./TopHeader";

const navItems = [
  {
    label: "ABOUT",
    dropdown: {
      title: "About YASCON",
      links: [
        { href: "/", label: "Home" },
        { href: "/about/mission", label: "Vision & Mission" },
        { href: "/about/objectives", label: "Objectives" },
        { href: "/about/location", label: "Where We Work" },
        { href: "/about/work", label: "Our Work" },
        { href: "/about/management", label: "Our Management Team" },
        { href: "/about/our-story", label: "Our Story" },
        { href: "/contact", label: "Contact Us" },
      ],
    },
  },
  {
    label: "NATIONAL",
    dropdown: {
      title: "National Office",
      links: [
        { href: "/impact/national/board", label: "Board" },
        { href: "/about/management", label: "Management" },
        { href: "/impact/national/partners", label: "Partners" },
        { href: "/impact/national/programs", label: "Programs" },
        { href: "/impact/national/statistics", label: "Statistics" },
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
        { href: "/news/press-releases", label: "Press Releases" },
        { href: "/news/statements", label: "Statements" },
        { href: "/news/gallery", label: "Gallery" },
        { href: "/careers", label: "Careers" },
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
    <section >
   <TopHeader />
      <nav
        className={`w-full left-0 right-0  transition-all duration-300 bg-green-900  ${scrolled ? " z-9999 fixed top-0 h-20 " : "h-20"} `}
      >   
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between  transition-all duration-300`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative w-16 h-16">
              <Image
                src="/Log.png"
                alt="YASCON Logo"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <div className="hidden sm:block transition-all py-1 duration-300">
              <div
                className={`font-bold tracking-widest text-sm text-white`}
              >
                YASCON
              </div>
              <div
                className={`text-xs hidden sm:block leading-tight max-w-40 text-white/80`}
              >
                Youth Association for Conservation of Nature and Environment
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-3 ">
            {navItems.map((item, idx) => (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold tracking-[0.08em] uppercase transition-colors ${
                   "text-white hover:text-[#f4a32a]"
                   
                  } ${activeDropdown === idx ? "text-[#f4a32a]" : ""}`}
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
                  <div className="dropdown-enter absolute top-full left-1/2 mt-2 w-64 translate-x-[+25%] bg-white shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="px-4 pt-4">
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
              className="bg-[#f5a524] text-white text-sm font-bold px-6 py-2 rounded-sm shadow-lg hover:bg-[#e3910c] transition-colors"
            >
              GET INVOLVED
            </Link>
            <Link
              href="/contact"
              className={`border text-sm font-bold px-5 py-2 rounded-sm transition-all duration-200  
          border-green-700 text-white hover:bg-green-700 
              `}
            >
              CONTACT
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 ${useTransparentStyle ? "text-white" : "text-[#1a2e1a]"}`}
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
         {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu-enter fixed inset-0 z-40 bg-gray-900 pt-8 overflow-y-auto lg:hidden">
          <div className="p-6">
              {/* Mobile Logo */}
              <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative w-12 h-12">
                <Image
                  src="/Log.png"
                  alt="YASCON Logo"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <div>
                <div className="font-bold tracking-widest text-white text-sm">YASCON</div>
                <div className="text-xs text-white/60 leading-tight max-w-[160px]">
                  Youth Association for Conservation of Nature and Environment
                </div>
                </div>
                </div>
             <button
            className={`lg:hidden p-2 ${useTransparentStyle ? "text-white" : "text-[#1a2e1a]"}`}
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
                href="/tickets"
                className="text-center bg-[#f5a524] text-white py-3 rounded-sm font-bold hover:bg-[#e3910c] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Buy Tickets
              </Link>
              <Link
                href="/contact"
                className="text-center border border-white text-white py-3 rounded-sm font-bold hover:bg-white/10 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
      </nav>

    </section>
  );
}
