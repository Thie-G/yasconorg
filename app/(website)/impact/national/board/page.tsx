"use client";

import Image from "next/image";

const boardMembers = [
  {
    name: "Mwai Mtayamanja",
    role: "National Coordinator",
    image: "/teampics/national-coordinator.png",
    bio: "Leads the board and ensures the organization follows its mission and vision.",
  },
  {
    name: "Clement Chiwambo",
    role: "Funding & Compliance Manager",
    image: "/teampics/funding-officer.png",
    bio: "Clement, an economist from Lilongwe University of Agriculture and Natural Resources, holds a Bachelor of Science Degree in Agricultural Economics. He initially served as a Conservation Coordinator when he successfully led and implemented YASCON's conservation activities in Balaka District.Clement brings to the organization strong skills in policy analysis, research, data analysis and rural development. He is a proven mobiliser, team worker and communicator.",
  },
  {
    name: "Rashid Mailos",
    role: "Extension Methodologies Manager",
    image: "/teampics/extensions-officer.png",
    bio: "Rashid holds a Bachelor of Science Degree in Agricultural Extension from Lilongwe University of Agriculture and Natural Resources and a certification in GIS.He initially served as an Area Conservation Coordinator when he successfully led and implemented YASCON's conservation activities in Chiradzulu District.Rashid brings to the organisation proven execution of extension methods, tools and techniques in rural and community development. He is also skilled in project planning, training and facilitation.",
  },
  {
    name: "Salomy Chivunga",
    role: "Public Relations & Events Manager",
    image: "/teampics/public-relations.png",
    bio: "She is responsible for building and maintaining a positive image of an organization and organizing events that promote its activities and goals. She manages communication between the organization and the public, including the media, partners, and the community. works to strengthen relationships with stakeholders, handles public inquiries, and ensures that all events run smoothly and represent the organization professionally.",
  },
  {
    name: "Mussa John Witness",
    role: "Media Relations Manager",
    image: "/teampics/mediarelations.png",
    bio: "He is responsible for building and maintaining good relationships with journalists, reporters, and media houses such as newspapers, television, radio, and online platforms. He help share the organization’s news, events, and achievements with the public through the media.He  writes press releases, organizes press conferences, and responds to media inquiries. He also monitor how the organization is presented in the media and help protect the organization’s reputation.",
  },
];

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 mt-20">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-800">Board of Directors</h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Meet the leadership team guiding our organization’s vision, strategy,
          and governance.
        </p>
      </div>

      {/* Board Grid */}
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto">
        {boardMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center"
          >
            <div className="relative w-28 h-28 mx-auto mb-4">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="rounded-full object-cover"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              {member.name}
            </h3>

            <p className="text-blue-600 text-sm font-medium">{member.role}</p>

            <p className="text-gray-500 text-sm mt-3">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
