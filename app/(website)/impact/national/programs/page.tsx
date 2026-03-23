import React from "react";

type Activity = {
  id: number;
  name: string;
};

type Program = {
  id: number;
  title: string;
  description: string;
  image: string;
  activities: Activity[];
};

const programs: Program[] = [
  {
    id: 1,
    title: "Research and Development",
    description: "Empowering young people with skills and mentorship.",
    image: "/Images/balaka.jpg",
    activities: [
      { id: 1, name: "Baseline Surveys" },
      { id: 2, name: "Species Surveys" },
      { id: 3, name: "Social Economic Surveys" },
      { id: 4, name: "Technology Trials" },
      { id: 5, name: "Project Implementation Support Provision" },
      { id: 6, name: "Soil and Water Quality Monitoring" },
      { id: 7, name: "Data Archiving" },
    ],
  },
  {
    id: 2,
    title: "Stakeholder Engagement",
    description: "Promoting Stakeholder wellness.",
    image: "/Images/balaka.jpg",
    activities: [
      { id: 1, name: "Annual general Meetings" },
      { id: 2, name: "Quarterly Meetings" },
    ],
  },
  {
    id: 3,
    title: "Conservation Campaigns",
    description: "Protecting and preserving our environment.",
    image: "/Images/balaka.jpg",
    activities: [
      { id: 1, name: "Clean-up campaigns" },
      { id: 2, name: "Football bonanza" },
      { id: 3, name: "Netball bonanza" },
      { id: 4, name: "Conservation walks" },
      { id: 5, name: "Digital Advocacy" },
    ],
  },
  {
    id: 4,
    title: "Conservation Education",
    description: "Channels of communication in preserving our environment.",
    image: "/Images/balaka.jpg",
    activities: [
      { id: 1, name: "Conservation Clubs" },
      { id: 2, name: "Conservation talks" },
      { id: 3, name: "Nature Camps" },
      { id: 4, name: "Park Visits" },
      { id: 5, name: "Mountain Hikes" },
      { id: 6, name: "Waste to Wealth Workshops" },
      { id: 7, name: "Conservation TV" },
    ],
  },
  {
    id: 5,
    title: "Reforestation & Afforestation",
    description: "preserving Environment through planting trees",
    image: "/Images/balaka.jpg",
    activities: [
      { id: 1, name: "Tree Nursery Establishment" },
      { id: 2, name: "Tree Planting" },
      { id: 3, name: "Village Forest Establishment" },
      { id: 4, name: "Tree Planting" },
      { id: 5, name: "Village Forest Area Establishment" },
      { id: 6, name: "Village Forest Regeneration management" },
      { id: 7, name: "Riverbank protection" },
    ],
  },
  {
    id: 6,
    title: "Skills Development",
    description: "Learning Technical Skills",
    image: "/Images/balaka.jpg",
    activities: [
      { id: 1, name: "Eco-Construction" },
      { id: 2, name: "Climate-Smart Livestock Production" },
      { id: 3, name: "Climate-Smart Agronomy" },
      { id: 4, name: "Tailoring" },
      { id: 5, name: "Fashion Design" },
      { id: 6, name: "Capentry" },
      { id: 7, name: "Joinery" },
      { id: 8, name: "Bricklaying" },
      { id: 9, name: "Plumbing" },
      { id: 10, name: "hairdressing" },
      { id: 11, name: "Welding" },
    ],
  },
  {
    id: 7,
    title: "Enterprise Development",
    description: "Developing Enterprise Skills",
    image: "/Images/balaka.jpg",
    activities: [
      { id: 1, name: "Livestock Production" },
      { id: 2, name: "Mushroom Production" },
      { id: 3, name: "Apiculture" },
      { id: 4, name: "Horticultural Production" },
      { id: 5, name: "Agroforestry Workshops" },
    ],
  },
  {
    id: 8,
    title: "Ecosystem Restoration",
    description: "Restoring the Ecosystem",
    image: "/Images/balaka.jpg",
    activities: [
      { id: 1, name: "Watershed & catchment Rehabilitation" },
      { id: 2, name: "Gully reclaimation" },
      { id: 3, name: "Invasive Species Eradication" },
    ],
  },
  {
    id: 9,
    title: "Biodiversity Conservation",
    description:
      "Protecting species to prevent extinction and maintain a healthy, balanced planet",
    image: "/Images/balaka.jpg",
    activities: [
      { id: 1, name: "Bio-blitz events" },
      { id: 2, name: "Pollinator Protection" },
      { id: 3, name: "Indigenous Species recovery" },
    ],
  },
  {
    id: 10,
    title: "Tourism Development",
    description: "Promoting the Tourism Activities",
    image: "/Images/balaka.jpg",
    activities: [
      { id: 1, name: "Ecotourism Camps" },
      { id: 2, name: "Nature Trails" },
      { id: 3, name: "Ecotourism Guiding" },
      { id: 4, name: "Craft & souvenir training" },
      { id: 5, name: "Cultural trekking" },
    ],
  },
  {
    id: 11,
    title: "Conservation Policing",
    description: "making Policies to conserve Nature",
    image: "/Images/balaka.jpg",
    activities: [
      { id: 1, name: "Community Scouting" },
      { id: 2, name: "Conservation Hotline" },
      { id: 3, name: "Conflict Resolution Training" },
    ],
  },
];

export default function Programs() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Our Programs</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {program.title}
              </h2>

              <p className="text-gray-600 mb-4">{program.description}</p>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Activities
                </h3>

                <ul className="space-y-2">
                  {program.activities.map((activity) => (
                    <li
                      key={activity.id}
                      className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                      <span className="text-gray-700">{activity.name}</span>
                      <span className="text-xs text-blue-500 font-medium">
                        View
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
