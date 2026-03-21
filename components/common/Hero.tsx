"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const slides = [
   {
    bg: "/hero/hero1.png",
    label: "Welcome to YASCON",
    heading: "Protecting Nature,Empowering Malawi's Youth",
    sub: "YASCON unites young Malawians in grassroots conservation — planting trees, restoring ecosystems, and championing environmental stewardship for future generations.",
    cta1: { label: "Join the Movement", href: "/get-involved" },
    cta2: { label: "Learn More →", href: "/about" },
  },
  {
    bg: "/hero/hero2.png",
    label: "National Tree Planting Season 2026",
    heading: "Together, Let's Grow a Greener Future",
    sub: "Every youth club across all 28 districts is called to lead tree-planting activities. The real impact happens when we act locally — starting this week.",
    cta1: { label: "Get Involved", href: "/get-involved" },
    cta2: { label: "Our Work →", href: "/work" },
  },
  {
    bg: "/hero/hero2.png",
    label: "Youth Conservation Programs",
    heading: "The Most Energetic Force of Conservation",
    sub: "From biodiversity conservation to climate action, YASCON's nationwide network of youth clubs drives measurable environmental impact across Malawi.",
    cta1: { label: "Our Programs", href: "/programs" },
    cta2: { label: "Read Stories →", href: "/news" },
  },

];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(idx);
      setTimeout(() => setIsAnimating(false), 1200);
    },
    [isAnimating],
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo],
  );

  useEffect(() => {
    const t = setTimeout(next, 6000);
    return () => clearTimeout(t);
  }, [current, next]);

  return (
    <section className="relative w-full min-h-screen  overflow-hidden">
      {slides.map((slide, i) => (
        <div key={i} className={`slide ${i === current ? "active" : ""}`}>
          <div
            className="slide-bg absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url('${slide.bg}')` }}
          />
          <div className="slide-overlay bg-black/35 absolute inset-0" />

          {i === current && (
            <div className="relative inset-0 flex items-center justify-center z-10 pt-8 pb-24">
              <div className="w-full max-w-6xl px-6 sm:px-10 text-center">
               

                <h1
                  className="slide-h1 text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-2xl mb-6"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {slide.heading}
                </h1>

                <p className="slide-sub max-w-3xl mx-auto text-lg sm:text-xl text-white/90 leading-relaxed mb-10">
                  {slide.sub}
                </p>

                <div className="slide-btns flex flex-wrap justify-center gap-4 sm:gap-5">
                  <Link href={slide.cta1.href}>
                    <span className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold uppercase tracking-wide bg-[#f5a524] text-white rounded-sm shadow-lg shadow-[rgba(0,0,0,0.28)] hover:bg-[#e3910c] transition-colors duration-200">
                      {slide.cta1.label}
                    </span>
                  </Link>
                  <Link href={slide.cta2.href}>
                    <span className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold uppercase tracking-wide border border-white/70 text-white rounded-sm hover:bg-white/10 transition-all duration-200">
                      {slide.cta2.label}
                    </span>
                  </Link>
                </div>
              </div>
                <div className="absolute z-20 flex gap-2 bottom-14 left-1/2 -translate-x-1/2">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slider-dot ${i === current ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
            </div>
          )}
        </div>

      ))}

    
    </section>
  );
}
