import Image from "next/image";
import Link from "next/link";

export default function team() {
  return (
    <main className="mt-20">
      <section className="bg-[#f2f6f3]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-[#1a2e1a]">Management</h2>
          <p className="text-[#2e3d35] mt-3">National Level</p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              {
                name: "Mwai Mtayamanja",
                role: "National Coordinator",
                focus: "",
                avatar: "/avatars/avatar-1.svg",
              },
              {
                name: "Clement Chiwambo",
                role: "Funding & Compliance Manager",
                focus: "",
                avatar: "/avatars/avatar-2.svg",
              },
              {
                name: "Rashid Mailos",
                role: "Extension Methodologies Manager",
                focus: "",
                avatar: "/avatars/avatar-3.svg",
              },
              {
                name: "Salomy Chivunga",
                role: "Public Relations & Events Manager",
                focus: "",
                avatar: "/avatars/avatar-3.svg",
              },
              {
                name: "Mussa John Witness",
                role: "Media Relations Manager",
                focus: "",
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
                  <p className="text-sm text-[#2e3d35] mt-4">{member.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      ;
      <section className="bg-[#f2f6f3]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-[#1a2e1a]">Coordinators</h2>
          <p className="text-[#2e3d35] mt-3">Regional level</p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              {
                name: "Martha Megan Phiri",
                role: "Regional Coordinator",
                focus: "Northern Region",
                avatar: "/avatars/avatar-1.svg",
              },
              {
                name: "Chisomo Nyirenda",
                role: "Regional Coordinator",
                focus: "Central Region",
                avatar: "/avatars/avatar-2.svg",
              },
              {
                name: "Prince Magombo",
                role: "Regional Coordinator",
                focus: "Eastern Region.",
                avatar: "/avatars/avatar-3.svg",
              },
              {
                name: "Bridget Namakhwa",
                role: "Regional Coordinator",
                focus: "Southern Region",
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
                  <p className="text-sm text-[#2e3d35] mt-4">{member.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      ;
   
    </main>
  );
}
