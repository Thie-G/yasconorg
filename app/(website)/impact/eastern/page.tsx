"use client";
import "./eastern.css";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const ACCENT = "#1a5c1a";
const heroImages = ["/Images/Eastern1.png","/Images/Eastern2.png","/Images/Eastern3.png"];
const stats = [
  { value: 9,    suffix: "",  label: "Districts",     desc: "Under Eastern Coverage" },
  { value: 820,  suffix: "+", label: "Members",       desc: "Registered Youth" },
  { value: 1800, suffix: "+", label: "Trees Planted", desc: "Reforestation Total" },
  { value: 14,   suffix: "",  label: "Youth Clubs",   desc: "Active This Season" },
  { value: 32,   suffix: "+", label: "Activities",    desc: "Completed to Date" },
  { value: 5,    suffix: "",  label: "Key Partners",  desc: "NGOs & Government" },
];
const districts = [
  { name: "Zomba",      coordinator: "Prince Magombo",   activities: 8, trees: 400, members: 180 },
  { name: "Mangochi",   coordinator: "Prince Magombo",   activities: 7, trees: 350, members: 150 },
  { name: "Machinga",   coordinator: "Prince Magombo",   activities: 5, trees: 280, members: 120 },
  { name: "Balaka",     coordinator: "Clement Chiwambo", activities: 4, trees: 220, members: 95  },
  { name: "Phalombe",   coordinator: "Prince Magombo",   activities: 4, trees: 200, members: 88  },
  { name: "Chiradzulu", coordinator: "Rashid Mailos",    activities: 3, trees: 160, members: 75  },
  { name: "Thyolo",     coordinator: "Rashid Mailos",    activities: 3, trees: 140, members: 68  },
  { name: "Mulanje",    coordinator: "Prince Magombo",   activities: 2, trees: 110, members: 52  },
  { name: "Blantyre",   coordinator: "Prince Magombo",   activities: 2, trees: 90,  members: 48  },
];
const partners = [
  { name: "Zomba Forestry Department",      type: "Government",          image: "/Images/ZOMBA.jpg",       desc: "Collaborating on reforestation of the Zomba Plateau through joint tree nurseries and mapping of degraded areas." },
  { name: "Lake Chilwa Conservation Trust", type: "NGO",                 image: "/Images/lake chirwa.jpg", desc: "Joint wetland conservation programmes focused on buffer zone protection and community awareness along Lake Chilwa." },
  { name: "Mangochi District Council",      type: "Government",          image: "/Images/mangochi.jpg",    desc: "Providing logistical support and coordination for YASCON activities across lakeshore communities." },
  { name: "USAID Kulima Programme",         type: "Development Partner", image: "/Images/USAID.jpg",       desc: "Supporting agroforestry integration within youth-led conservation clubs to build livelihoods alongside ecology." },
  { name: "Catholic University of Malawi",  type: "Academic",            image: "/Images/chatholic.png",   desc: "Research partnership on biodiversity monitoring and environmental education in secondary schools across the region." },
];
const team = [
  {
    name: "Prince Magombo",
    initials: "PM",
    role: "Regional Coordinator (East)",
    district: "Eastern Region",
    image: "/Images/PRINCE.png",
    bio: "Prince holds a BSc in Agricultural Extension from LUANAR. He started as Area Conservation Coordinator before being promoted to lead the Eastern Region, bringing proven skills in community extension, project management and stakeholder coordination.",
  },
  {
    name: "Shalome",
    initials: "SH",
    role: "Conservation Officer",
    district: "Eastern Region",
    image: "/Images/Shalome.png",
    bio: "Shalome is a dedicated Conservation Officer supporting youth clubs and community conservation activities across the Eastern Region's districts.",
  },
];
const activities = [
  { title: "Zomba Plateau Reforestation Drive",       date: "March 2025",     district: "Zomba",    type: "Tree Planting", participants: 120, desc: "Youth clubs collaborated with the Forestry Department to plant 400 indigenous trees on degraded sections of the Zomba Plateau, targeting pine and eucalyptus-cleared areas." },
  { title: "Lake Chilwa Wetland Clean-Up",            date: "February 2025",  district: "Mangochi", type: "Clean-Up",      participants: 90,  desc: "A major litter and invasive species removal campaign along the Lake Chilwa shoreline, in partnership with fishing communities and the Lake Chilwa Conservation Trust." },
  { title: "Agroforestry Youth Workshop — Balaka",    date: "January 2025",   district: "Balaka",   type: "Workshop",      participants: 60,  desc: "A two-day training workshop introducing agroforestry practices to 60 young farmers, co-facilitated with USAID Kulima Programme." },
  { title: "School Environmental Awareness Campaign", date: "November 2024",  district: "Machinga", type: "Awareness",     participants: 200, desc: "YASCON's Eastern Region team visited 8 secondary schools in Machinga, delivering talks on deforestation, climate change and biodiversity loss." },
  { title: "Biodiversity Survey — Phalombe Plains",   date: "October 2024",   district: "Phalombe", type: "Survey",        participants: 30,  desc: "A field biodiversity survey mapping endangered plant and bird species on the Phalombe floodplains, conducted with academic support from CUNIMA researchers." },
  { title: "Mangochi Riverbank Stabilisation",        date: "September 2024", district: "Mangochi", type: "Tree Planting", participants: 75,  desc: "Targeted planting of vetiver grass and native trees along eroded riverbanks near Mangochi township to reduce sedimentation into Lake Malawi." },
];
const blogs = [
  { title: "How Youth Clubs Are Saving the Zomba Plateau",    date: "April 2025",    author: "Prince Magombo",   category: "Reforestation", readTime: "4 min read", excerpt: "The Zomba Plateau was once heavily degraded by charcoal production. Today, thanks to a network of 6 youth clubs, over 400 trees have been planted and the mountain is slowly recovering its native canopy." },
  { title: "Lake Chilwa: A Wetland Worth Fighting For",       date: "March 2025",    author: "Rashid Mailos",    category: "Wetlands",      readTime: "5 min read", excerpt: "Lake Chilwa is Africa's third-largest closed lake and home to thousands of species. YASCON's Eastern Region is partnering with fishing communities to protect this irreplaceable ecosystem." },
  { title: "Agroforestry Is Changing Lives in Balaka",        date: "February 2025", author: "Clement Chiwambo", category: "Livelihoods",   readTime: "3 min read", excerpt: "Youth in Balaka are discovering that conservation and farming are not opposites. Through YASCON's workshops, young farmers are integrating trees into their fields and seeing better harvests." },
  { title: "Behind the Scenes: Planning a Regional Clean-Up", date: "January 2025",  author: "Prince Magombo",   category: "Operations",    readTime: "4 min read", excerpt: "Organising a 90-person clean-up requires weeks of preparation. Regional Coordinator Prince Magombo shares how YASCON plans and executes major community events from scratch." },
];

const TYPE_COLORS: Record<string, string> = {
  "Tree Planting": "#1a5c1a","Clean-Up": "#1a6b8a","Workshop": "#7a5c2d","Awareness": "#8a1a6b","Survey": "#2d5a7a",
};

function Badge({ text, color }: { text: string; color: string }) {
  return <span className="px-3 py-1 rounded-sm text-xs font-bold tracking-wide" style={{ background: color + "18", color }}>{text}</span>;
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: ACCENT }}>{label}</div>
      <h2 className="text-3xl font-black text-gray-900">{title}</h2>
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
      <SectionHeader label="Collaboration" title="Our Partners" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((p, i) => (
          <div key={i} className="bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200" style={{ borderRadius: "20px" }}>
            <div className="h-40 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display="none"; (e.target as HTMLImageElement).parentElement!.innerHTML=`<div style="width:64px;height:64px;border-radius:50%;background:#0f4a1f22;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:800;color:#2d7a2d">${p.name.charAt(0)}</div>`; }} />
            </div>
            <div className="p-5">
              <Badge text={p.type} color={ACCENT} />
              <h3 className="font-bold text-gray-900 mt-3 mb-2">{p.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
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
      <SectionHeader label="Our Team" title="Meet The Eastern Region Team" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((m, i) => (
          <div key={i} className="bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5" style={{ borderRadius: "20px" }}>
            <div className="h-72 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src={m.image} alt={m.name} className="w-full h-full object-cover object-center"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = "none";
                  if (el.parentElement) el.parentElement.innerHTML = `<div style="width:80px;height:80px;border-radius:50%;background:#0f4a1f22;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:800;color:#2d7a2d">${m.initials}</div>`;
                }} />
            </div>
            <div className="p-5">
              <Badge text={m.role} color={ACCENT} />
              <h3 className="font-bold text-gray-900 mt-3 mb-1">{m.name}</h3>
              <div className="text-xs font-semibold text-gray-500 mb-3">{m.district}</div>
              <p className="text-sm text-gray-600 leading-relaxed">{m.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DistrictsPanel() {
  const top4 = [...districts].sort((a, b) => b.activities - a.activities).slice(0, 4);
  const totalActivities = districts.reduce((s, d) => s + d.activities, 0);
  const totalTrees = districts.reduce((s, d) => s + d.trees, 0);
  const totalMembers = districts.reduce((s, d) => s + d.members, 0);
  const districtImages: Record<string, string> = {
    Zomba: "/Images/zomba1.jpg", Mangochi: "/Images/mangochi1.jpg",
    Machinga: "/Images/machinga.jpg", Balaka: "/Images/balaka.jpg",
  };
  return (
    <div>
      <SectionHeader label="Coverage" title="Districts Overview" />
      <div className="grid grid-cols-3 gap-4 mb-10 p-6 rounded-2xl" style={{ background: "#1a5c1a" }}>
        {[{ label: "Total Activities", value: totalActivities },{ label: "Total Trees Planted", value: totalTrees.toLocaleString()+"+" },{ label: "Total Members", value: totalMembers }].map(({ label, value }) => (
          <div key={label} className="text-center">
            <div className="text-3xl font-black text-white">{value}</div>
            <div className="text-xs font-semibold uppercase tracking-wide mt-1" style={{ color: "#a8d8a8" }}>{label}</div>
          </div>
        ))}
      </div>
      <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: ACCENT }}>Top 4 Most Active Districts</div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {top4.map((d, i) => {
          const activityPct = Math.round((d.activities / totalActivities) * 100);
          const treesPct = Math.round((d.trees / totalTrees) * 100);
          return (
            <div key={d.name} className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5" style={{ background: "#f0faf0", border: "1.5px solid #c6e8c6" }}>
              <div className="relative h-36 w-full overflow-hidden">
                <img src={districtImages[d.name] ?? `/Images/${d.name}.jpg`} alt={d.name} className="w-full h-full object-cover"
                  onError={(e) => { const el=e.target as HTMLImageElement; el.style.display="none"; if(el.parentElement) el.parentElement.style.background="#1a5c1a"; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white z-10" style={{ background: "#1a5c1a" }}>{i+1}</div>
                <div className="absolute bottom-2 left-3 z-10">
                  <h3 className="font-black text-white text-lg leading-tight drop-shadow">{d.name}</h3>
                  <div className="text-xs text-white/75 drop-shadow">{d.coordinator}</div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-col gap-2 mb-4">
                  {([["Activities", d.activities],["Trees", d.trees.toLocaleString()],["Members", d.members]] as [string, string|number][]).map(([lbl, val]) => (
                    <div key={lbl} className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-800">{lbl}</span>
                      <span className="text-sm font-black text-gray-900">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-gray-800">Activity share</span><span className="font-semibold text-gray-900">{activityPct}%</span></div>
                  <div className="w-full h-1.5 rounded-full" style={{ background: "#d4f0d4" }}><div className="h-1.5 rounded-full" style={{ width: `${activityPct}%`, background: "#1a5c1a" }} /></div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-gray-800">Trees share</span><span className="font-semibold text-gray-900">{treesPct}%</span></div>
                  <div className="w-full h-1.5 rounded-full" style={{ background: "#d4f0d4" }}><div className="h-1.5 rounded-full" style={{ width: `${treesPct}%`, background: "#0f4a1f" }} /></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: ACCENT }}>All Districts — Full Breakdown</div>
      <div className="bg-white p-8 rounded-3xl" style={{ border: "1.5px solid #e8f5e8" }}>
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Activities count</div>
        <div className="flex items-end justify-between gap-3" style={{ height: "280px" }}>
          {[...districts].sort((a, b) => b.activities - a.activities).map((d, i) => {
            const max = Math.max(...districts.map(x => x.activities));
            const h = Math.round((d.activities / max) * 100);
            const colors = ["#0f4a1f","#1a5c1a","#245e24","#2d6e2d","#3a7e3a","#4a8e4a","#5a9e5a","#6aae6a","#7abe7a"];
            return (
              <div key={d.name} className="flex flex-col items-center flex-1 h-full justify-end group">
                <div className="w-full rounded-t-2xl rounded-b-sm transition-all duration-700 group-hover:opacity-80" style={{ height: `${h}%`, background: colors[i], minHeight: "24px" }} />
                <div className="mt-3 text-center">
                  <div className="text-xs font-black text-gray-800 leading-tight">{d.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5 hidden lg:block">{d.coordinator.split(" ")[0]}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full h-px mt-1 mb-6" style={{ background: "#e8f5e8" }} />
        <div className="grid grid-cols-9 gap-3">
          {[...districts].sort((a, b) => b.activities - a.activities).map((d) => (
            <div key={d.name} className="text-center">
              <div className="text-xs font-black text-gray-700">{d.trees}</div>
              <div className="text-xs text-gray-400">trees</div>
              <div className="text-xs font-black text-gray-700 mt-1">{d.members}</div>
              <div className="text-xs text-gray-400">mbrs</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6 mt-6 pt-5 border-t border-gray-100 text-xs text-gray-400 font-semibold">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: "#1a5c1a" }} /> Most active</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: "#7abe7a" }} /> Least active</div>
          <div className="ml-auto">Bar height = relative activity count</div>
        </div>
      </div>
    </div>
  );
}

function ActivitiesPanel() {
  const [filter, setFilter] = useState("All");
  const types = ["All", ...Array.from(new Set(activities.map(a => a.type)))];
  const filtered = filter === "All" ? activities : activities.filter(a => a.type === filter);
  const districtImages: Record<string, string> = {
    Zomba: "/Images/zomba1.jpg", Mangochi: "/Images/mangochi1.jpg",
    Machinga: "/Images/machinga.jpg", Balaka: "/Images/balaka.jpg",
    Phalombe: "/Images/image0.png", Chiradzulu: "/Images/image5.png",
  };
  return (
    <div>
      <SectionHeader label="On the Ground" title="Activities" />
      <div className="flex flex-wrap gap-2 mb-8">
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)} className="px-4 py-2 rounded-sm text-sm font-semibold transition-all duration-200"
            style={filter === t ? { background: ACCENT, color: "#fff" } : { background: "#f3f4f6", color: "#374151" }}>{t}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((a, i) => (
          <div key={i} className="bg-white overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5" style={{ borderRadius: "20px", border: "1.5px solid #e8f5e8" }}>
            <div className="relative h-44 w-full overflow-hidden">
              <img src={districtImages[a.district] ?? "/Images/Eastern1.png"} alt={a.district} className="w-full h-full object-cover"
                onError={(e) => { const el=e.target as HTMLImageElement; el.style.display="none"; if(el.parentElement) el.parentElement.style.background="#1a5c1a"; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute top-3 right-3 z-10"><Badge text={a.type} color={TYPE_COLORS[a.type] ?? ACCENT} /></div>
              <div className="absolute bottom-3 left-4 z-10"><div className="text-white text-xs font-semibold opacity-80">{a.district}</div></div>
            </div>
            <div className="p-5">
              <h3 className="font-black text-gray-900 text-base leading-snug mb-2">{a.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{a.desc}</p>
              <div className="flex flex-wrap gap-4 text-xs text-gray-400 font-semibold">
                <span>{a.date}</span><span>{a.participants} participants</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogsPanel() {
  const blogImages: Record<number, string> = { 0: "/Images/zomba1.jpg", 1: "/Images/mangochi1.jpg", 2: "/Images/balaka.jpg", 3: "/Images/machinga.jpg" };
  return (
    <div>
      <SectionHeader label="Stories" title="Blogs" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((b, i) => (
          <div key={i} className="bg-white overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5" style={{ borderRadius: "20px", border: "1.5px solid #e8f5e8" }}>
            <div className="relative h-44 w-full overflow-hidden">
              <img src={blogImages[i] ?? "/Images/Eastern1.png"} alt={b.title} className="w-full h-full object-cover"
                onError={(e) => { const el=e.target as HTMLImageElement; el.style.display="none"; if(el.parentElement) el.parentElement.style.background="#1a5c1a"; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                <Badge text={b.category} color={ACCENT} />
                <span className="text-xs text-white/80 font-semibold">{b.readTime}</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-black text-gray-900 text-lg leading-snug mb-3 group-hover:text-green-800 transition-colors">{b.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{b.excerpt}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-white shadow-sm flex-shrink-0" style={{ background: ACCENT }}>
                  <img src={team.find(t => t.name === b.author)?.image ?? ""} alt={b.author} className="w-full h-full object-cover"
                    onError={(e) => { const el=e.target as HTMLImageElement; el.style.display="none"; if(el.parentElement) el.parentElement.innerHTML=`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.65rem;font-weight:800">${b.author.charAt(0)}</div>`; }} />
                </div>
                <span>{b.author}</span><span>·</span><span>{b.date}</span>
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
      <SectionHeader label="Impact" title="Regional Statistics" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 shadow-sm text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5" style={{ borderRadius: "20px", border: "1.5px solid #e8f5e8" }}>
            <div className="text-4xl font-black mb-1 text-gray-900"><CountUp target={s.value} suffix={s.suffix} /></div>
            <div className="font-bold text-gray-900 mb-1">{s.label}</div>
            <div className="text-xs text-gray-400">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

type Tab = "partners" | "team" | "districts" | "activities" | "blogs" | "stats";
const TABS: { id: Tab; label: string }[] = [
  { id: "partners",   label: "Our Partners"       },
  { id: "team",       label: "Our Team"            },
  { id: "districts",  label: "Districts"           },
  { id: "activities", label: "Activities"          },
  { id: "blogs",      label: "Blogs"               },
  { id: "stats",      label: "Regional Statistics" },
];

export default function EasternRegionPage() {
  const [activeTab, setActiveTab] = useState<Tab>("activities");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentImage(prev => (prev + 1) % heroImages.length), 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="relative h-screen flex flex-col justify-start overflow-hidden">
        {heroImages.map((img, idx) => (
          <div key={idx} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: idx === currentImage ? 1 : 0, zIndex: idx === currentImage ? 1 : 0 }}>
            <img src={img} alt={`Eastern Region hero ${idx+1}`} className="w-full h-full object-cover object-center" />
          </div>
        ))}

        <div className="absolute top-6 right-6 flex gap-2 z-20">
          {heroImages.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentImage(idx)} className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{ background: idx === currentImage ? "#fff" : "rgba(255,255,255,0.35)", transform: idx === currentImage ? "scale(1.3)" : "scale(1)" }} />
          ))}
        </div>
        <div className="relative z-20 px-8 md:px-16 pt-20 max-w-6xl">
          <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#4ade80", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>YASCON Regional Hub</div>
          <h1 className="font-black text-white leading-none mb-5" style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)", textShadow: "0 4px 32px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.9)", letterSpacing: "-0.02em" }}>Eastern Region</h1>
          <p className="text-xl font-semibold text-white mb-3 max-w-2xl" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>Restoring ecosystems from the Shire Highlands to the shores of Lake Chilwa.</p>
          <p className="text-base text-white/80 max-w-2xl leading-relaxed mb-10" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>
            YASCON's Eastern Region brings together youth conservation clubs across Machinga, Mangochi, Balaka, Zomba, and Phalombe districts — on the frontlines of combating deforestation along Malawi's eastern escarpment.
          </p>
          <div className="flex flex-wrap gap-8">
            {stats.slice(0, 4).map((s, i) => (
              <div key={i} className="text-white">
                <div className="text-3xl font-black leading-none" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>{s.value.toLocaleString()}{s.suffix}</div>
                <div className="text-xs text-white/60 uppercase tracking-wide mt-1">{s.label}</div>
              </div>
            ))}
          </div>
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

      <div className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === "partners"   && <PartnersPanel />}
        {activeTab === "team"       && <TeamPanel />}
        {activeTab === "districts"  && <DistrictsPanel />}
        {activeTab === "activities" && <ActivitiesPanel />}
        {activeTab === "blogs"      && <BlogsPanel />}
        {activeTab === "stats"      && <StatsPanel />}
      </div>
    </div>
  );
}