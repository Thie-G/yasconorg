"use client";
import Image from "next/image";
import Link from "next/link";

const works = [
  { title: "Biodiversity Conservation", description: "Protecting Malawi's rich biodiversity by safeguarding forest reserves, conserving native species, and restoring degraded ecosystems through youth-led field programs.", image: "/our-work/work1.avif", href: "/work/conservation", num: "01" },
  { title: "Tree Planting Campaigns", description: "Mobilizing youth clubs across all 28 districts to plant indigenous trees, combat deforestation, and restore watersheds critical to Malawi's water and food security.", image: "/our-work/work2.avif", href: "/work/tree-planting", num: "02" },
  { title: "Environmental Education", description: "Equipping young people with conservation knowledge through school programs, community workshops, and hands-on environmental learning experiences.", image: "/our-work/work3.avif", href: "/work/education", num: "03" },
  { title: "Community Development", description: "Building sustainable livelihoods by integrating environmental stewardship with community development, ensuring conservation benefits reach local families.", image: "/our-work/work1.avif", href: "/work/community", num: "04" },
  { title: "Climate Action", description: "Advocating for climate justice, raising awareness about climate change impacts on Malawi, and empowering youth to become climate champions.", image: "/our-work/work2.avif", href: "/work/climate", num: "05" },
  { title: "Research & Monitoring", description: "Conducting grassroots environmental research, monitoring ecosystem health, and generating data that informs conservation policy at national level.", image: "/our-work/work3.avif", href: "/work/research", num: "06" },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-white mt-20">
      <section className="bg-[#1a2e1a] text-white py-16 px-4 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d4a017]">
          — What We Do —
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Our Work</h1>
        <p className="text-white/80 max-w-2xl mx-auto text-base">
          From tree planting campaigns to biodiversity conservation, YASCON leads
          youth-driven environmental initiatives across all districts of Malawi.
        </p>
        <div className="w-11 h-[3px] bg-[#d4a017] mt-6 mx-auto rounded-sm" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work, idx) => (
            <div key={idx} className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 bg-white">
              <div className="relative h-48 overflow-hidden">
                <Image src={work.image} alt={work.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,18,10,0.7)] to-transparent" />
                <span className="absolute top-4 left-4 text-4xl font-black text-white/20">{work.num}</span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-[#1a2e1a] mb-3">{work.title}</h3>
                <p className="text-sm text-[#6a7a6a] mb-4 leading-relaxed">{work.description}</p>
                <Link href={work.href} className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors">
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}