"use client";
import Image from "next/image";

const objectives = [
  { num: "01", description: "Protection of nature and the environment through advocacy and policy influence." },
  { num: "02", description: "Restoration of 500,000 hectares of degraded landscapes by 2063 through sustainable innovation and research." },
  { num: "03", description: "Conservation of nature and the environment through community action and education of 5,000 youth clubs by 2063." },
  { num: "04", description: "Creation of 3 million green jobs for the youth by 2063." },
];

export default function ObjectivesPage() {
  return (
    <main className="min-h-screen bg-white mt-20">
      <section className="bg-[#1a2e1a] text-white py-16 px-4 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d4a017]">
          — What We Stand For —
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Key Objectives</h1>
        <div className="w-11 h-[3px] bg-[#d4a017] mt-4 mx-auto rounded-sm" />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-xl overflow-hidden shadow-lg md:flex bg-white border border-gray-100">
          <div className="md:w-1/3 relative min-h-64">
            <Image src="/hero/hero1.png" alt="YASCON in Action" fill className="object-cover brightness-75" />
          </div>
          <div className="p-8 md:w-2/3">
            <h2 className="text-2xl font-bold text-[#1a2e1a] mb-6">Our Strategic Objectives</h2>
            <ol className="space-y-6">
              {objectives.map((obj, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <span className="text-3xl font-black text-[#d4a017]/40 leading-none min-w-[40px]">{obj.num}</span>
                  <p className="text-gray-700 leading-relaxed pt-1">{obj.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}