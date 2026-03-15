"use client";

import { useState, useEffect, useRef } from "react";

const ACCENT = "#b8860b";
const heroImages = ["/Images/Eastern1.png", "/Images/Eastern2.png", "/Images/Eastern3.jpg"];

const stats = [
  { value: 6,    suffix: "",  label: "Districts",     desc: "Under Eastern Coverage" },
  { value: 1100, suffix: "+", label: "Members",       desc: "Registered Youth" },
  { value: 7800, suffix: "+", label: "Trees Planted", desc: "Reforestation Total" },
  { value: 20,   suffix: "",  label: "Youth Clubs",   desc: "Active This Season" },
  { value: 48,   suffix: "+", label: "Activities",    desc: "Completed to Date" },
  { value: 6,    suffix: "",  label: "Key Partners",  desc: "NGOs & Government" },
];

const districts = [
  { name: "Zomba",    coordinator: "Thoko Banda",    activities: 14, trees: 2100, members: 270 },
  { name: "Mangochi", coordinator: "Isaac Phiri",    activities: 12, trees: 1800, members: 240 },
  { name: "Machinga", coordinator: "Thoko Banda",    activities: 9,  trees: 1400, members: 190 },
  { name: "Balaka",   coordinator: "Grace Mwale",    activities: 7,  trees: 1100, members: 165 },
  { name: "Phalombe", coordinator: "Isaac Phiri",    activities: 4,  trees: 850,  members: 135 },
  { name: "Mulanje",  coordinator: "Grace Mwale",    activities: 2,  trees: 550,  members: 100 },
];

const partners = [
  { name: "Zomba City Council",                 type: "Government",         image: "/Images/Eastern1.png", desc: "Urban greening and school tree-planting in partnership with Zomba City Council across all wards." },
  { name: "Chancellor College (UNIMA)",         type: "Academic",           image: "/Images/Eastern2.png", desc: "Research collaboration on land-use change and biodiversity assessment in the Eastern highlands." },
  { name: "Lake Chilwa Basin Climate Change",   type: "Development Partner",image: "/Images/Eastern333.jpg", desc: "Co-implementing wetland restoration and community resilience programmes around Lake Chilwa." },
  { name: "WWF Malawi – Eastern Programme",     type: "International NGO",  image: "/Images/Eastern1.png", desc: "Capacity building for biodiversity monitoring and wetland conservation in Mangochi and Zomba." },
  { name: "Department of Forestry – East",      type: "Government",         image: "/Images/Eastern2.png", desc: "Seedling supply and technical guidance for catchment reforestation in Machinga and Balaka." },
  { name: "Concern Universal Malawi",           type: "NGO",                image: "/Images/Eastern33.jpg", desc: "Community-based natural resource management training and livelihoods integration in Phalombe." },
];

const team = [
  { name: "Prince Magombo",  initials: "PM", role: "Regional Coordinator (East)", district: "Eastern Region", image: "/teampics/eastern-coordinator.png", bio: "Prince holds a Bachelor of Science Degree in Agricultural Extension from Lilongwe University of Agriculture and Natural Resources.He initially served as an Area Conservation Coordinator when he successfully led and implemented YASCON's conservation activities in the Eastern region of Malawi." },
  //{ name: "Isaac Phiri",  initials: "IP", role: "Programs Lead",               district: "Mangochi",       image: "/Images/avatar-east-2.png", bio: "Isaac coordinates wetland conservation and school eco-club programmes across Mangochi and Phalombe, with a focus on Lake Malawi's eastern shoreline communities." },
  //{ name: "Grace Mwale",  initials: "GM", role: "Community Liaison",           district: "Balaka",         image: "/Images/avatar-east-3.png", bio: "Grace manages district outreach and volunteer coordination in Balaka and Mulanje, building grassroots ownership of conservation programmes." },
];

const activities = [
  { title: "Lake Chilwa Wetland Restoration",     date: "Feb 2025", district: "Zomba",    type: "Tree Planting", participants: 180, desc: "Youth clubs planted 2,100 trees along Lake Chilwa's shrinking shoreline to stabilise wetland edges and restore bird habitat." },
  { title: "Mangochi Lakeshore Awareness Drive",  date: "Apr 2025", district: "Mangochi", type: "Awareness",     participants: 240, desc: "Community awareness on illegal fishing, plastic pollution, and wetland protection across 14 Lake Malawi lakeshore villages." },
  { title: "Zomba Plateau Reforestation",         date: "Jun 2025", district: "Zomba",    type: "Tree Planting", participants: 160, desc: "1,800 indigenous tree seedlings planted across degraded sections of the Zomba Plateau with support from UNIMA forestry students." },
  { title: "Machinga Climate Resilience Workshop",date: "Aug 2025", district: "Machinga", type: "Workshop",      participants: 120, desc: "120 youth and community leaders trained on climate-smart agriculture and natural resource management in flood-prone Machinga." },
  { title: "Balaka River Clean-Up",               date: "Sep 2025", district: "Balaka",   type: "Clean-Up",      participants: 95,  desc: "Major riverbank clean-up along the Shire River tributary targeting plastic waste and invasive water plants in Balaka." },
  { title: "Eastern Region Conservation Summit",  date: "Nov 2025", district: "Zomba",    type: "Workshop",      participants: 260, desc: "Annual gathering of all 20 Eastern Region club coordinators to review statistics and plan the upcoming conservation season." },
];

const whereWeWork = [
  { district: "Zomba",    description: "Home to the iconic Zomba Plateau — YASCON coordinates reforestation and youth eco-clubs focused on protecting this UNESCO-recognised landscape.", highlight: "2,100 trees planted" },
  { district: "Mangochi", description: "Eastern Lake Malawi shoreline — wetland conservation and community awareness around fishing villages and lakeshore communities.", highlight: "14 villages reached" },
  { district: "Machinga", description: "Flood-prone lowland district — climate resilience training and natural resource management are YASCON's primary focus here.", highlight: "Climate resilience hub" },
  { district: "Balaka",   description: "Located on the Shire River corridor — riverbank clean-ups and riparian reforestation protect water quality for downstream communities.", highlight: "River restoration" },
  { district: "Phalombe", description: "Flanked by Mulanje Mountain — conservation work focuses on buffer zone protection and biodiversity awareness with mountain communities.", highlight: "Buffer zone work" },
  { district: "Mulanje",  description: "UNESCO-listed Mulanje Massif — YASCON supports patrol activities and rare species monitoring on Africa's highest peak south of Kilimanjaro.", highlight: "Massif conservation" },
];

const ourWork = [
  { title: "Wetland Conservation",      icon: "🦢", desc: "Protecting Lake Chilwa and Lake Malawi's eastern wetlands through riparian planting, shoreline stabilisation, and community awareness." },
  { title: "Plateau Reforestation",     icon: "🌳", desc: "Restoring degraded sections of the Zomba Plateau and Mulanje Massif buffer zones through indigenous tree planting." },
  { title: "Climate Resilience",        icon: "🌦️", desc: "Training communities in flood-prone Machinga and Balaka on climate-smart farming and natural resource management." },
  { title: "Biodiversity Monitoring",   icon: "🔬", desc: "Youth ranger teams conduct seasonal surveys tracking bird populations, wetland species, and vegetation cover across Eastern districts." },
  { title: "River Corridor Protection", icon: "💧", desc: "Riverbank clean-ups and riparian reforestation along Shire River tributaries to protect water quality and reduce sedimentation." },
  { title: "Mountain Conservation",     icon: "⛰️", desc: "Supporting patrol and monitoring activities on the Mulanje Massif — Africa's highest mountain south of Kilimanjaro." },
];

const TYPE_COLORS: Record<string, string> = {
  "Tree Planting": "#2d7a2d", "Clean-Up": "#1a6b8a", "Workshop": "#7a5c2d", "Awareness": "#8a1a6b", "Survey": "#2d5a7a",
};

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm"
      style={{ background: color + "22", color, border: `1px solid ${color}55` }}>{text}</span>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl md:text-4xl font-bold text-[#0f1a0f] leading-tight">{title}</h2>
      <div className="w-12 h-[3px] mt-3 rounded-full" style={{ background: ACCENT }} />
    </div>
  );
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = Date.now();
        const tick = () => { const p = Math.min((Date.now() - t0) / 2000, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function PartnersPanel() {
  return (
    <div>
      <SectionHeader title="Our Regional Partners" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((p, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).parentElement!.innerHTML = `<div style="width:64px;height:64px;border-radius:50%;background:${ACCENT}22;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:800;color:${ACCENT}">${p.name.charAt(0)}</div>`; }} />
            </div>
            <div className="p-6">
              <Badge text={p.type} color={ACCENT} />
              <h3 className="font-bold text-[#0f1a0f] text-lg mt-3 mb-2">{p.name}</h3>
              <p className="text-sm text-[#2e3d35] leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamPanel() {
  return (
    <div>
      <SectionHeader title="Meet The Eastern Region Team" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((m, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-72 bg-gray-100 flex items-center justify-center overflow-hidden">
              <img src={m.image} alt={m.name} className="w-full h-full object-cover object-center"
                onError={(e) => { const el = e.target as HTMLImageElement; el.style.display = "none"; if (el.parentElement) el.parentElement.innerHTML = `<div style="width:80px;height:80px;border-radius:50%;background:${ACCENT}22;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:800;color:${ACCENT}">${m.initials}</div>`; }} />
            </div>
            <div className="p-6">
              <Badge text={m.role} color={ACCENT} />
              <h3 className="font-bold text-[#0f1a0f] text-lg mt-3 mb-1">{m.name}</h3>
              <div className="text-xs font-semibold text-gray-500 mb-3">{m.district}</div>
              <p className="text-sm text-[#2e3d35] leading-relaxed">{m.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DistrictsPanel() {
  const totalActivities = districts.reduce((s, d) => s + d.activities, 0);
  const totalTrees = districts.reduce((s, d) => s + d.trees, 0);
  const totalMembers = districts.reduce((s, d) => s + d.members, 0);
  return (
    <div>
      <SectionHeader title="Districts Overview" />
      <div className="grid grid-cols-3 gap-4 mb-10 p-6 rounded-2xl" style={{ background: ACCENT }}>
        {[{ label: "Total Activities", value: totalActivities }, { label: "Total Trees Planted", value: totalTrees.toLocaleString() + "+" }, { label: "Total Members", value: totalMembers }].map(({ label, value }) => (
          <div key={label} className="text-center">
            <div className="text-3xl font-black text-white">{value}</div>
            <div className="text-xs font-semibold uppercase tracking-wide mt-1" style={{ color: "#fdf0b0" }}>{label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {districts.map((d, i) => {
          const actPct = Math.round((d.activities / totalActivities) * 100);
          return (
            <div key={d.name} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ border: "1.5px solid #e8d9a0" }}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-[#0f1a0f] text-xl">{d.name}</h3>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: ACCENT }}>{i + 1}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">{d.coordinator}</p>
                <div className="space-y-2">
                  {[["Activities", d.activities], ["Trees Planted", d.trees.toLocaleString()], ["Members", d.members]].map(([lbl, val]) => (
                    <div key={String(lbl)} className="flex justify-between text-sm">
                      <span className="text-gray-600">{lbl}</span>
                      <span className="font-bold text-[#0f1a0f]">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1"><span className="text-gray-500">Activity share</span><span>{actPct}%</span></div>
                  <div className="w-full h-2 rounded-full" style={{ background: "#f0e8c8" }}><div className="h-2 rounded-full" style={{ width: `${actPct}%`, background: ACCENT }} /></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WhereWeWorkPanel() {
  return (
    <div>
      <SectionHeader title="Where We Work" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {whereWeWork.map((w, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ border: "1.5px solid #e8d9a0" }}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-black text-[#0f1a0f] text-xl">{w.district}</h3>
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: ACCENT + "22", color: ACCENT }}>{w.highlight}</span>
            </div>
            <p className="text-sm text-[#2e3d35] leading-relaxed">{w.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OurWorkPanel() {
  return (
    <div>
      <SectionHeader title="Our Work" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ourWork.map((w, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ border: "1.5px solid #e8d9a0" }}>
            <div className="text-4xl mb-4">{w.icon}</div>
            <h3 className="font-bold text-[#0f1a0f] text-lg mb-2">{w.title}</h3>
            <p className="text-sm text-[#2e3d35] leading-relaxed">{w.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivitiesPanel() {
  const [filter, setFilter] = useState("All");
  const types = ["All", ...Array.from(new Set(activities.map(a => a.type)))];
  const filtered = filter === "All" ? activities : activities.filter(a => a.type === filter);
  return (
    <div>
      <SectionHeader title="Regional Activities" />
      <div className="flex flex-wrap gap-2 mb-8">
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)} className="px-4 py-2 rounded-sm text-sm font-semibold transition-all duration-200"
            style={filter === t ? { background: ACCENT, color: "#fff" } : { background: "#f3f4f6", color: "#374151" }}>{t}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((a, i) => (
          <div key={i} className="bg-white overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5" style={{ borderRadius: "20px", border: "1.5px solid #f0e8c8" }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Badge text={a.type} color={TYPE_COLORS[a.type] ?? ACCENT} />
                <span className="text-xs font-semibold text-gray-400">{a.district}</span>
              </div>
              <h3 className="font-black text-[#0f1a0f] text-base leading-snug mb-2">{a.title}</h3>
              <p className="text-sm text-[#2e3d35] leading-relaxed mb-4">{a.desc}</p>
              <div className="flex flex-wrap gap-4 text-xs text-gray-400 font-semibold pt-4 border-t border-gray-100">
                <span>{a.date}</span><span>{a.participants} participants</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsPanel() {
  return (
    <div>
      <SectionHeader title="Eastern Region — By the Numbers" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 shadow-sm text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5" style={{ borderRadius: "20px", border: "1.5px solid #f0e8c8" }}>
            <div className="text-4xl font-bold mb-2" style={{ color: ACCENT }}><CountUp target={s.value} suffix={s.suffix} /></div>
            <div className="font-semibold text-[#0f1a0f] text-sm uppercase tracking-wide mb-1">{s.label}</div>
            <div className="text-xs text-gray-500">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

type Tab = "districts" | "whereWeWork" | "ourWork" | "activities" | "stats" | "team" | "partners";
const TABS: { id: Tab; label: string }[] = [
  { id: "districts",   label: "Districts"          },
  { id: "whereWeWork", label: "Where We Work"       },
  { id: "ourWork",     label: "Our Work"            },
  { id: "activities",  label: "Regional Activities" },
  { id: "stats",       label: "Regional Statistics" },
  { id: "team",        label: "Our Team"            },
  { id: "partners",    label: "Our Partners"        },
];

export default function EasternRegionPage() {
  const [activeTab, setActiveTab] = useState<Tab>("activities");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentImage(prev => (prev + 1) % heroImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      <div className="relative w-full h-svh min-h-[600px] overflow-hidden">
        {heroImages.map((img, idx) => (
          <div key={idx} className={`slide ${idx === currentImage ? "active" : ""}`}>
            <div className="slide-bg" style={{ backgroundImage: `url('${img}')` }} />
            <div className="slide-overlay" />
            {idx === currentImage && (
              <div className="relative inset-0 flex items-center z-10 pt-24">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
                  <div className="max-w-2xl">
                    <div className="slide-label mb-5">
                      <span className="inline-flex items-center gap-2 font-bold uppercase px-5 py-2.5"
                        style={{
                          background: "#c8961e",
                          color: "#fff",
                          borderRadius: "3px",
                          boxShadow: "0 4px 16px rgba(200,150,30,0.4)",
                          letterSpacing: "0.18em",
                          fontSize: "13px",
                        }}>
                        <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                        YASCON Regional Hub
                      </span>
                    </div>
                    <h1 className="slide-h1 text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] mb-6">Eastern Region</h1>
                    <p className="slide-sub mb-9 leading-relaxed" style={{ color: "rgba(255,255,255,.75)", fontSize: "clamp(15px, 1.6vw, 17px)", maxWidth: "520px" }}>
                      YASCON's Eastern Region covers Zomba, Mangochi, Machinga, Balaka, Phalombe and Mulanje — protecting wetlands, the Zomba Plateau, and the iconic Mulanje Massif from deforestation and climate impacts.
                    </p>
                    <div className="slide-btns flex flex-wrap gap-8">
                      {stats.slice(0, 4).map((s, i) => (
                        <div key={i} className="text-white">
                          <div className="text-3xl sm:text-4xl font-bold leading-none">{s.value.toLocaleString()}{s.suffix}</div>
                          <div className="text-xs uppercase tracking-widest mt-1" style={{ color: "rgba(255,255,255,.55)" }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="absolute z-20 flex gap-2" style={{ bottom: "120px", left: "50%", transform: "translateX(-50%)" }}>
          {heroImages.map((_, idx) => (
            <button key={idx} className={`slider-dot ${idx === currentImage ? "active" : ""}`} onClick={() => setCurrentImage(idx)} aria-label={`Slide ${idx + 1}`} />
          ))}
        </div>
      </div>

      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex overflow-x-auto scrollbar-hide px-4">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200 flex-shrink-0"
              style={activeTab === tab.id ? { borderColor: ACCENT, color: ACCENT } : { borderColor: "transparent", color: "#111" }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "districts"   && <DistrictsPanel />}
        {activeTab === "whereWeWork" && <WhereWeWorkPanel />}
        {activeTab === "ourWork"     && <OurWorkPanel />}
        {activeTab === "activities"  && <ActivitiesPanel />}
        {activeTab === "stats"       && <StatsPanel />}
        {activeTab === "team"        && <TeamPanel />}
        {activeTab === "partners"    && <PartnersPanel />}
      </div>
    </div>
  );
}