import Image from "next/image";
import Link from "next/link";

const programs = [
  {
    title: "National Youth Tree Planting Campaign",
    date: "June 2025",
    location: "Mangochi, Lilongwe, Mzuzu",
    impact:
      "Over 5,000 trees planted by youth volunteers to support climate change mitigation and restore degraded land.",
  },
  {
    title: "Youth Climate Awareness & Environmental Education Program",
    date: "August 2025",
    location: "Blantyre",
    impact:
      "Reached 300+ students with training on climate change, waste management, and sustainable living practices.",
  },
  {
    title: "Community Clean-Up & Plastic Waste Reduction Campaign",
    date: "September 2025",
    location: "Lilongwe, Mzuzu, Mangochi, Zomba",
    impact:
      "Collected over 1.5 tons of plastic waste and mobilized youth groups to promote recycling and cleaner communities.",
  },
  {
    title: "Youth for Biodiversity Conservation Initiative",
    date: "November 2025",
    location: "Rumphi, Ntcheu, Mwanza",
    impact:
      "Engaged 150 youth in biodiversity protection activities including tree nursery development and conservation training.",
  },
];

export default function NationalPage() {
  return (
    <main className="pt-24">
      <section id="partners" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-[#1a2e1a]">Our Partners</h2>
        <p className="text-[#2e3d35] mt-3">
          National partners supporting Nature and Environmental conservation.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {[
            {
              partner: "Ministry of Natural Resources and Climate Change",
              description:
                "Supports national environmental policies, climate action programs, and conservation initiatives.",
            },
            {
              partner: "Non-governmental Organizations",
              description:
                "Provides funding and technical support for environmental conservation projects.",
            },
            {
              partner: "Department of Forestry",
              description:
                "Provides funding and technical support for environmental conservation projects.",
            },
            {
              partner:
                "Coordination union for the REhabilitation of the Environment",
              description:
                "A network of NGOs working on environmental protection and advocacy.",
            },
          ].map((item) => (
            <div
              key={item.partner}
              className="border border-gray-200 rounded-lg p-5 bg-white"
            >
              <p className="font-semibold text-[#1a2e1a]">{item.partner}</p>
              <p className="text-sm text-[#2e3d35] mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="programs" className="bg-[#f7f3ea]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-[#1a2e1a]">Programs</h2>
          <p className="text-[#2e3d35] mt-3">
            Programs carried Out by the YASCON Youth across Malawi
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {programs.map((program) => (
              <div
                key={program.title}
                className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between text-xs text-[#2e3d35]">
                  <span className="font-semibold">{program.date}</span>
                  <span className="px-2 py-1 rounded-full bg-[#f2f6f3]">
                    {program.location}
                  </span>
                </div>
                <p className="text-lg font-semibold text-[#1a2e1a] mt-3">
                  {program.title}
                </p>
                <p className="text-sm text-[#2e3d35] mt-2">{program.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
