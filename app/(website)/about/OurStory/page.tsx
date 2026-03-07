const stories = [
  {
    title: "",
    description:
      "Youth Association for Conservation of Nature and Environment (YASCON) was established in 2025 in response to the growing impacts of climate change, environmental degradation, and biodiversity loss affecting vulnerable communities. The organization mobilizes young people as key agents of change in advancing sustainable development and climate resilience. Its work is aligned with the 2030 Agenda for Sustainable Development, with a focus on SDG 13 (Climate Action), SDG 15 (Life on Land), and SDG 6 (Clean Water and Sanitation).",
  },
  {
    title: "",
    description:
      "YASCON’s theory of change is grounded in the premise that strengthening youth capacity and leadership leads to improved environmental outcomes and increased community resilience. Through environmental education, community-based conservation, and nature-based solutions, the organization delivers measurable outputs that contribute to ecosystem restoration, climate change mitigation, and climate adaptation. Since its establishment, YASCON has implemented tree planting and ecosystem restoration initiatives in communities across Mangochi, Lilongwe, and Mzuzu, translating global goals into tangible local impact.",
  },
  {
    title: "",
    description:
      "By working closely with communities, local authorities, and strategic partners, YASCON promotes local ownership, sustainability, and accountability of its interventions. The organization integrates monitoring, evaluation, and learning systems to inform adaptive management and align programs with national and international climate priorities, contributing to long-term environmental sustainability and a climate-resilient future.",
  },
];

export default function Story() {
  return (
    <section id="story" className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 mt-16 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Our Story
          </h2>
          <div className="w-11 h-[3px] bg-[#d4a017] mt-5  rounded-sm" />

          {stories.map((story, idx) => (
            <p key={idx} className="mt-4 text-md text-gray-600">
              {story.description}
            </p>
          ))}
        </div>

        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
          <img
            src="/hero/hero4.png"
            alt="Our team"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
