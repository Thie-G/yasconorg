import React from "react";
import Link from "next/link";
import { Section } from "lucide-react";

const Objectives = [
  {
    title: "Youth Empowerment & Leadership",
    description:
      "Equip young people with knowledge, skills, and leadership opportunities to actively participate in environmental conservation and climate action.",
  },
  {
    title: "Environmental Education & Awareness",
    description:
      "Promote environmental literacy through workshops, school programs, campaigns, and digital platforms that raise awareness of climate change, biodiversity, and sustainability.",
  },
  {
    title: "Climate Action & Sustainability",
    description:
      "Support youth-led initiatives that promote climate resilience, renewable energy awareness, and sustainable use of natural resources.",
  },
  {
    title: "Partnerships & Collaboration",
    description:
      "Build strong partnerships with schools, communities, government institutions, NGOs, and the private sector to strengthen conservation impact.",
  },
  {
    title: "Biodiversity Protection",
    description:
      "Encourage the protection of ecosystems, wildlife, and natural habitats through advocacy, conservation projects, and responsible environmental practices.",
  },
];

export default function Objective() {
  return (
    <section id="objective" className="mt-24 ">
      <div>
        <h2 className="text-2xl md:text-4xl font-bold text-[#1a2e1a] text-center mb-4 ">
          KEY OBJECTIVES
        </h2>
        <div className="w-17 h-[2px] bg-[#d4a017] mt-2 mx-auto rounded-sm" />

        <div className="max-w-6xl mx-auto my-6 bg-white rounded-xl overflow-hidden md:flex ">
          <div className="md:w-1/4 lg:brightness-50 md:brightness:60 ">
            <img
              className="h-full w-full object-cover"
              src="../hero/hero1.png"
              alt="Yascon in Action"
            />
          </div>

          <div className="p-8 md:w-3/4">
            {Objectives.map((Objective, idx) => (
              <div key={idx} className="group block list-disk pb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  <Link
                    href="#"
                    className="text-l font-bold text-gray-900 mb-3 block hover:text-green-700 transition-colors"
                  >
                    {Objective.title}
                  </Link>
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {Objective.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
