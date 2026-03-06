import Image from "next/image";
import Link from "next/link";
import NewsDisplay from "@/components/cms/NewsDisplay";
import BlogsDisplay from "@/components/cms/BlogsDisplay";
import VideosDisplay from "@/components/cms/VideosDisplay";
import AnnouncementsDisplay from "@/components/cms/AnnouncementsDisplay";

const quickLinks = [
  { href: "/impact/central#announcements", label: "Announcements" },
  { href: "/impact/central#partners", label: "Our Partners" },
  { href: "/impact/central#team", label: "Our Team" },
  { href: "/impact/central#districts", label: "Districts" },
  { href: "/impact/central#activities", label: "Activities" },
  { href: "/impact/central#news", label: "News" },
  { href: "/impact/central#videos", label: "Videos" },
  { href: "/impact/central#blogs", label: "Blogs" },
  { href: "/impact/central#stats", label: "Regional Statistical Data" },
];

export default function CentralRegionPage() {
  return (
    <main className="pt-24">
      <section className="bg-[#f7f3ea]">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <p className="text-xs font-semibold tracking-[0.3em] text-green-700">
            IMPACT
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mt-3">
            Central Region
          </h1>
          <p className="text-[#2e3d35] mt-4 max-w-2xl">
            A snapshot of YASCON&apos;s conservation efforts across the Central
            Region, highlighting partnerships, district-level programs, and
            ongoing youth-led initiatives.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold border border-[#1a2e1a] text-[#1a2e1a] rounded-full hover:bg-[#1a2e1a] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section id="announcements" className="max-w-6xl mx-auto px-6 py-12 border-b-2 border-orange-200">
        <h2 className="text-2xl font-bold text-[#1a2e1a]">Latest Announcements</h2>
        <p className="text-[#2e3d35] mt-3">
          Important announcements and updates from Central Region.
        </p>
        <AnnouncementsDisplay region="central" limit={3} />
      </section>

      <section id="partners" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-[#1a2e1a]">Our Partners</h2>
        <p className="text-[#2e3d35] mt-3">
          Regional partners supporting conservation education, tree-planting,
          and biodiversity protection in the Central Region.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {["District Councils", "Community Organizations", "Local Schools"].map(
            (item) => (
              <div
                key={item}
                className="border border-gray-200 rounded-lg p-5 bg-white"
              >
                <p className="font-semibold text-[#1a2e1a]">{item}</p>
                <p className="text-sm text-[#2e3d35] mt-2">
                  They collaborate with YASCON to implement conservation programs, mobilize
                </p>
              </div>
            )
          )}
        </div>
      </section>

      <section id="team" className="bg-[#f2f6f3]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-[#1a2e1a]">Our Team</h2>
          <p className="text-[#2e3d35] mt-3">
            Conservation coordinators and youth leaders driving Central Region
            programs.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              {
                name: "Agnes Phiri",
                role: "Regional Coordinator",
                focus: "Community conservation strategy and partner relations.",
                avatar: "/avatars/avatar-1.svg",
              },
              {
                name: "Kelvin Banda",
                role: "Programs Lead",
                focus: "Youth climate education and school outreach.",
                avatar: "/avatars/avatar-2.svg",
              },
              {
                name: "Ruth Mbewe",
                role: "Community Liaison",
                focus: "District engagement and volunteer mobilization.",
                avatar: "/avatars/avatar-3.svg",
              },
            ].map((member) => (
              <div
                key={member.name}
                className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={72}
                      height={72}
                      className="rounded-full border border-gray-200"
                    />
                    <div>
                      <p className="text-lg font-semibold text-[#1a2e1a]">
                        {member.name}
                      </p>
                      <p className="text-sm font-semibold text-green-700 mt-1">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[#2e3d35] mt-4">
                    {member.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="districts" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-[#1a2e1a]">Districts</h2>
        <p className="text-[#2e3d35] mt-3">
          District chapters actively coordinating conservation activities.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          {["Lilongwe", "Dedza", "Kasungu", "Ntcheu", "Salima"].map((name) => (
            <span
              key={name}
              className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-full"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      <section id="activities" className="bg-[#f7f3ea]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-[#1a2e1a]">Activities</h2>
          <p className="text-[#2e3d35] mt-3">
            Some of the conservation activities completed by regional coordinators.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {[
              {
                title: "Peri-Urban Tree Planting Drive",
                date: "Mar 2024",
                location: "Lilongwe",
                impact: "4,800 seedlings planted with 12 school clubs.",
              },
              {
                title: "Waste Sorting Awareness Week",
                date: "Jun 2024",
                location: "Dedza",
                impact: "1,250 households reached through door-to-door demos.",
              },
              {
                title: "Wetland Restoration Volunteer Day",
                date: "Aug 2024",
                location: "Salima",
                impact: "3 km of shoreline cleared and replanted.",
              },
              {
                title: "Youth Climate Leadership Workshop",
                date: "Oct 2024",
                location: "Kasungu",
                impact: "160 youth leaders trained on climate advocacy.",
              },
            ].map((activity) => (
              <div
                key={activity.title}
                className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between text-xs text-[#2e3d35]">
                  <span className="font-semibold">{activity.date}</span>
                  <span className="px-2 py-1 rounded-full bg-[#f2f6f3]">
                    {activity.location}
                  </span>
                </div>
                <p className="text-lg font-semibold text-[#1a2e1a] mt-3">
                  {activity.title}
                </p>
                <p className="text-sm text-[#2e3d35] mt-2">
                  {activity.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blogs" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-[#1a2e1a]">Blogs</h2>
        <p className="text-[#2e3d35] mt-3">
          Stories and updates from Central Region initiatives.
        </p>
        <BlogsDisplay region="central" limit={3} />
      </section>

      <section id="news" className="bg-[#f7f3ea]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-[#1a2e1a]">News</h2>
          <p className="text-[#2e3d35] mt-3">
            Latest news from the Central Region.
          </p>
          <NewsDisplay region="central" limit={3} />
        </div>
      </section>

      <section id="videos" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-[#1a2e1a]">Videos</h2>
        <p className="text-[#2e3d35] mt-3">
          Video content from Central Region conservation activities.
        </p>
        <VideosDisplay region="central" limit={3} />
      </section>

      <section id="stats" className="bg-[#1a2e1a] text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold">Regional Statistical Data</h2>
          <p className="text-white/80 mt-3">
            Key indicators for conservation impact and community engagement in
            the Central Region.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              { value: "120K+", label: "Trees Planted" },
              { value: "38", label: "Active District Clubs" },
              { value: "9,400", label: "Youth Reached" },
            ].map((stat) => (
              <div key={stat.label} className="stat-tile">
                <p className="text-2xl font-bold text-[#e8b820]">
                  {stat.value}
                </p>
                <p className="text-sm text-white/80 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
