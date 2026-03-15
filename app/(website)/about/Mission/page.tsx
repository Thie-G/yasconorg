"use client";
import Image from "next/image";

const profiles = [
  {
    title: "OUR VISION",
    description:
      "A world where young people lead in protecting, restoring, and sustaining nature and the environment for present and future generations.",
    image: "/hero/mission1.jpg",
  },
  {
    title: "OUR MISSION",
    description:
      "To empower youth to engage in nature and environmental conservation through education, advocacy, community action, and sustainable practices.",

    image: "/hero/hero4.png",
  },
  {
    title: "CORE VALUES",
    description:
      "Youth Empowerment, Environmental Education, Climate Action, and Biodiversity Protection.",
    image: "/hero/mission3.jpg",
  },
];

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-white mt-20">
      <section className="bg-[#1a2e1a] text-white py-16 px-4 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d4a017]">
          — Profile —
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
          Mission Statement
        </h1>
        <p className="text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
          We believe the future of our planet lies in the hands of today's
          youth. At the heart of our work is a commitment to inspire, educate,
          and empower young people to become active stewards of the environment.
        </p>
        <div className="w-11 h-[3px] bg-[#d4a017] mt-6 mx-auto rounded-sm" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profiles.map((profile, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow bg-white"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={profile.image}
                  alt={profile.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white font-bold text-lg tracking-wide">
                    {profile.title}
                  </span>
                </div>
              </div>
              <div className="p-6 border-t-4 border-green-500">
                <p className="text-gray-700 leading-relaxed">
                  {profile.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
