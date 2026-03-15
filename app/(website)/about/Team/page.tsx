import Image from "next/image";

const management = [
  { name: "Mwai Mtayamanja", role: "National Coordinator", avatar: "/teampics/national-coordinator.png" },
  { name: "Clement Chiwambo", role: "Funding & Compliance Manager", avatar: "/teampics/funding-officer.png" },
  { name: "Rashid Mailos", role: "Extension Methodologies Manager", avatar: "/teampics/extensions-officer.png" },
  { name: "Salomy Chivunga", role: "Public Relations & Events Manager", avatar: "/teampics/public-relations.png" },
  { name: "Mussa John Witness", role: "Media Relations Manager", avatar: "/teampics/mediarelations.png" },
];

const coordinators = [
  { name: "Martha Megan Phiri", role: "Regional Coordinator", focus: "Northern Region", avatar: "/teampics/northern-coordinator.png" },
  { name: "Chisomo Nyirenda", role: "Regional Coordinator", focus: "Central Region", avatar: "/teampics/central-coordinator.png" },
  { name: "Prince Magombo", role: "Regional Coordinator", focus: "Eastern Region", avatar: "/teampics/eastern-coordinator.png" },
  { name: "Bridget Namakhwa", role: "Regional Coordinator", focus: "Southern Region", avatar: "/teampics/southern-coordinator.png" },
];

function MemberCard({ name, role, focus, avatar }: { name: string; role: string; focus?: string; avatar: string }) {
  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-lg transition-shadow">
      <div className="p-5 flex items-center gap-4">
        <Image src={avatar} alt={name} width={72} height={72} className="rounded-full border border-gray-200" />
        <div>
          <p className="text-lg font-semibold text-[#1a2e1a]">{name}</p>
          <p className="text-sm font-semibold text-green-700 mt-1">{role}</p>
          {focus && <p className="text-sm text-[#2e3d35] mt-1">{focus}</p>}
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#f2f6f3] mt-20">
      <section className="bg-[#1a2e1a] text-white py-16 px-4 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d4a017]">
          — The People Behind YASCON —
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Our Team</h1>
        <div className="w-11 h-[3px] bg-[#d4a017] mt-4 mx-auto rounded-sm" />
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-[#1a2e1a]">Management</h2>
        <p className="text-[#2e3d35] mt-1 mb-6">National Level</p>
        <div className="grid md:grid-cols-3 gap-6">
          {management.map((m) => <MemberCard key={m.name} {...m} />)}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-[#1a2e1a]">Coordinators</h2>
        <p className="text-[#2e3d35] mt-1 mb-6">Regional Level</p>
        <div className="grid md:grid-cols-3 gap-6">
          {coordinators.map((m) => <MemberCard key={m.name} {...m} />)}
        </div>
      </section>

    </main>
  );
}