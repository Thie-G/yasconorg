import Image from "next/image";
import Link from "next/link";

type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: "Press Release" | "Blog" | "Impact Story";
  image: string;
  author: string;
};

const featuredStory: NewsItem = {
  slug: "tree-planting-season-2026",
  title: "Launch of the National Tree Planting Season: Our Call to Action",
  excerpt:
    "YASCON joined national stakeholders in launching the 2026 tree planting season, mobilizing youth clubs across Malawi to restore degraded landscapes.",
  date: "January 16, 2026",
  tag: "Press Release",
  image: "/our-work/work1.avif",
  author: "YASCON Communications",
};

const stories: NewsItem[] = [
  {
    slug: "Social Enterprise training",
    title: "YASCON attending two days Social Enterprise training ",
    excerpt:
      "On March 10th and 11th, YASCON has been attending a Social Enterprise Training at Crossroads Hotel in Blantyre.The two day Social Enterprise training was organized by the Council for Non-Governmental Organizations in Malawi (CONGOMA) and the NGO- Regulatory Authority (NGORA).",
    date: "March 11, 2026",
    tag: "Blog",
    image: "/our-work/work4.jpg",
    author: "National Office Team",
  },
  {
    slug: "youth-clubs-theatre",
    title: "Youth Clubs Across Malawi Embrace Conservation Theatre",
    excerpt:
      "Through drama and creative arts, youth clubs are communicating urgent environmental messages in local communities.",
    date: "February 10, 2026",
    tag: "Blog",
    image: "/our-work/work5.jpg",
    author: "Field Programs Team",
  },
  {
    slug: "chipata-forest-restoration",
    title: "How Chipata Community Forest Was Restored in 6 Months",
    excerpt:
      "A youth-led restoration plan transformed a degraded hillside into a thriving community forest.",
    date: "January 28, 2026",
    tag: "Impact Story",
    image: "/our-work/work3.avif",
    author: "Regional Coordinator",
  },
  {
    slug: "district-climate-dialogues",
    title: "District Climate Dialogues Expand to 12 New Youth Clubs",
    excerpt:
      "YASCON facilitators hosted climate adaptation dialogues focused on practical local action plans.",
    date: "February 22, 2026",
    tag: "Press Release",
    image: "/our-work/work1.avif",
    author: "YASCON Secretariat",
  },
  {
    slug: "schools-green-innovation",
    title: "School Eco-Clubs Pilot Green Innovation Challenges",
    excerpt:
      "Students designed low-cost conservation solutions, from tree nursery systems to recycling campaigns.",
    date: "February 1, 2026",
    tag: "Blog",
    image: "/our-work/work2.avif",
    author: "Education Unit",
  },
  {
    slug: "wetland-guardians",
    title: "Wetland Guardians Program Reaches Lakeshore Communities",
    excerpt:
      "Community outreach sessions in wetland zones are helping youth protect biodiversity hotspots.",
    date: "January 9, 2026",
    tag: "Impact Story",
    image: "/our-work/work3.avif",
    author: "Regional Hub Team",
  },
  {
    slug: "national-youth-conservation-week",
    title: "National Youth Conservation Week Announced for March",
    excerpt:
      "The annual campaign will unite youth clubs, district offices, and partners for nationwide field activities.",
    date: "February 26, 2026",
    tag: "Press Release",
    image: "/our-work/work1.avif",
    author: "Programs Directorate",
  },
];

const categories = [
  { label: "All Stories", count: stories.length + 1 },
  { label: "Press Releases", count: [featuredStory, ...stories].filter((s) => s.tag === "Press Release").length },
  { label: "Blogs", count: [featuredStory, ...stories].filter((s) => s.tag === "Blog").length },
  { label: "Impact Stories", count: [featuredStory, ...stories].filter((s) => s.tag === "Impact Story").length },
];

function Tag({ value }: { value: NewsItem["tag"] }) {
  const styles: Record<NewsItem["tag"], string> = {
    "Press Release": "bg-[#1a2e1a] text-white",
    Blog: "bg-[#2d4a2d] text-white",
    "Impact Story": "bg-[#d4a017] text-[#0f1a0f]",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-sm ${styles[value]}`}>
      {value}
    </span>
  );
}

export default function NewsroomPage() {
  return (
    <main className="bg-[#f7f3ea] pt-24">
      <section className="bg-[#1a2e1a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d4a017]">Newsroom</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 max-w-3xl leading-tight">
            Stories, Press Releases, and Youth Conservation Updates
          </h1>
          <p className="mt-5 text-white/80 max-w-2xl text-base">
            Follow YASCON&apos;s latest activities across Malawi, from policy announcements to grassroots impact stories.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white border border-[#ede8d8] rounded-md overflow-hidden shadow-sm">
              <div className="relative h-64 md:h-80">
                <Image src={featuredStory.image} alt={featuredStory.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              </div>
              <div className="p-6 md:p-8">
                <Tag value={featuredStory.tag} />
                <h2 className="mt-4 text-2xl md:text-3xl font-bold text-[#1a2e1a] leading-tight">
                  {featuredStory.title}
                </h2>
                <p className="mt-4 text-[#4a5a4a] leading-relaxed">{featuredStory.excerpt}</p>
                <div className="mt-5 text-sm text-[#6a7a6a]">
                  <span>{featuredStory.date}</span>
                  <span className="mx-2">|</span>
                  <span>{featuredStory.author}</span>
                </div>
                <Link
                  href={`/news/${featuredStory.slug}`}
                  className="inline-block mt-6 bg-green-600 text-white font-semibold px-6 py-3 rounded-sm hover:bg-green-700 transition-colors"
                >
                  Read full story
                </Link>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="bg-white border border-[#ede8d8] rounded-md p-6">
              <h3 className="text-lg font-bold text-[#1a2e1a]">Browse by Category</h3>
              <ul className="mt-5 space-y-3">
                {categories.map((item) => (
                  <li key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-[#2e3d35]">{item.label}</span>
                    <span className="bg-[#f2f6f3] text-[#1a2e1a] font-semibold px-2 py-1 rounded-sm">
                      {item.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16 md:pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#1a2e1a]">Recent Stories</h2>
          <div className="w-12 h-[3px] bg-[#d4a017] rounded-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <article
              key={story.slug}
              className="bg-white border border-[#ede8d8] rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-52">
                <Image src={story.image} alt={story.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <Tag value={story.tag} />
                <h3 className="mt-3 text-xl font-bold text-[#1a2e1a] leading-snug">{story.title}</h3>
                <p className="mt-3 text-sm text-[#4a5a4a] leading-relaxed">{story.excerpt}</p>
                <div className="mt-4 text-xs text-[#6a7a6a]">
                  <span>{story.date}</span>
                  <span className="mx-2">|</span>
                  <span>{story.author}</span>
                </div>
                <Link href={`/news/${story.slug}`} className="inline-block mt-4 text-green-700 font-semibold text-sm hover:text-green-800">
                  Continue reading →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
