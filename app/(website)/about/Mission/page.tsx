"use client";
import Image from "next/image";
import Link from "next/link";

const profiles = [
  {
    title: "OUR VISION",
    description:
      "A world where young people lead in protecting, restoring, and sustaining nature and the environment for present and future generations.",
    image: "/hero/hero5.png",
    href: "#",
  },
  {
    title: "OUR MISSION",
    description:
      "To empower youth to engage in nature and environmental conservation through education, advocacy, community action, and sustainable practices.",
    image: "/hero/hero4.png",
    href: "#",
  },
  {
    title: "CORE VALUES",
    description:
      "Youth Empowerment, Environmental Education, Climate Action, and Biodiversity Protection ",
    image: "/hero/hero.png",
    href: "#",
  },
];

export default function MissionStatement() {
  return (
    <section id="profile" className="py-5 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 mt-22">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4a017]">
            - Profile -
          </span>

          <h2 className="text-3xl md:text-5xl font-bold  mt-3 mb-4 ">
            MISSION STATEMENT
          </h2>

          <p className="text-base text-[#4a5a4a] max-w-2xl mx-auto text-center">
            We believe the future of our planet lies in the hands of today’s
            youth. At the heart of our work is a commitment to inspire, educate,
            and empower young people to become active stewards of the
            environment. Through community action, innovation, and sustainable
            practices, we nurture a generation that understands the value of
            nature and takes responsibility for protecting it. By uniting youth
            voices with environmental conservation efforts, we are building
            resilient communities and a greener, more sustainable future for
            all.
          </p>
          <div className="w-11 h-[3px] bg-[#d4a017] mt-5 mx-auto rounded-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {profiles.map((profile, idx) => (
            <div key={idx} className="group block">
              <div className="max-w-lg rounded overflow-hidden shadow-lg brightness-70 hover:brightness-50 transition duration-300 rounded-lg bg-green shadow-md p-6 border-t-4 border-green-500 border-solid p-4">
                <img
                  className="w-full"
                  src={profile.image}
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4 hover:shadow-lg transition duration-300 ">
                  <div>
                    <Link
                      href={profile.href}
                      className="text-xl font-semibold text-gray-900 mb-3 block hover:text-green-700 transition-colors"
                    >
                      {profile.title}
                    </Link>
                  </div>
                  <p className="text-md text-gray-700 text-base ">
                    {profile.description}
                  </p>
                </div>
                <div className="px-2 pt-1 pb-2 bg-green-400 rounded-lg bg-green shadow-md p-6"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12"></div>
      </div>
    </section>
  );
}
