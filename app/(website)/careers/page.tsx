import React from "react";

export default function CareerPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* PAGE HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Vacancies & Opportunities</h1>
        <p className="text-gray-600">
          Explore opportunities to work with the Youth Association for
          Conservation of Nature and Environment (YASCON). Join us in promoting
          environmental conservation and sustainable development across Malawi.
        </p>
      </div>

      {/* VACANCIES CONTAINER */}
      <div className="space-y-10">

        {/* BOARD MEMBERS VACANCY */}
        <div className="border rounded-lg p-8 shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-4">
            CALL FOR BOARD MEMBERS – YASCON
          </h2>

          <p className="text-gray-700 mb-4">
            The Youth Association for Conservation of Nature and Environment
            (YASCON) is inviting qualified, experienced, and passionate
            individuals to serve on its <strong>Board of Directors</strong>.
          </p>

          <p className="text-gray-700 mb-6">
            We are seeking visionary leaders committed to strengthening
            governance and advancing environmental conservation efforts in
            Malawi.
          </p>

          <h3 className="text-xl font-semibold mb-3">Key Qualities</h3>

          <ul className="list-disc ml-6 text-gray-700 mb-6">
            <li>Strong leadership and strategic thinking skills</li>
            <li>Commitment to environmental conservation and youth development</li>
            <li>Integrity and good governance values</li>
            <li>Prior board or leadership experience is an added advantage</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Role of Board Members</h3>

          <p className="text-gray-700 mb-6">
            Provide strategic direction, oversight, and support to ensure the
            organization achieves its mission and objectives.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="mb-2">
              📧 Submit your <strong>CV</strong> and{" "}
              <strong>expression of interest</strong> to:
            </p>

            <p className="text-blue-600 font-medium mb-3">
              recruitment@yascon.org
            </p>

            <p className="font-semibold text-red-600">
              Deadline: 30 April 2026
            </p>
          </div>
        </div>

        {/* VOLUNTEERS VACANCY */}
        <div className="border rounded-lg p-8 shadow-sm bg-white">

          <h2 className="text-2xl font-semibold mb-4">
            CALL FOR VOLUNTEERS
          </h2>

          <p className="text-gray-700 mb-6">
            The Youth Association for Conservation of Nature and Environment
            (YASCON) invites applications from passionate and dedicated
            individuals to join our volunteer team and support environmental
            conservation initiatives across Malawi.
          </p>

          <h3 className="text-xl font-semibold mb-3">Eligibility</h3>

          <p className="mb-3 text-gray-700">
            Applicants must hold a postgraduate qualification in any of the
            following fields:
          </p>

          <ul className="list-disc ml-6 text-gray-700 mb-6">
            <li>Monitoring & Evaluation</li>
            <li>Natural Resources Management</li>
            <li>Land Administration</li>
            <li>Geography</li>
            <li>Law</li>
            <li>Human Resources Management</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Key Attributes</h3>

          <ul className="list-disc ml-6 text-gray-700 mb-6">
            <li>Strong communication and interpersonal skills</li>
            <li>Ability to work independently and within a team</li>
            <li>Commitment to community development and environmental conservation</li>
            <li>High level of integrity and professionalism</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">What You Will Gain</h3>

          <ul className="list-disc ml-6 text-gray-700 mb-6">
            <li>Hands-on experience in your field of expertise</li>
            <li>Opportunity to contribute to impactful projects</li>
            <li>Professional networking and career development</li>
          </ul>

          <div className="bg-gray-100 p-6 rounded-lg">

            <p className="mb-2">
              📧 Apply by sending your <strong>CV</strong> and a{" "}
              <strong>short motivation letter</strong> to:
            </p>

            <p className="text-blue-600 font-medium mb-3">
              recruitment@yascon.org
            </p>

            <p className="font-semibold text-red-600">
              Deadline: 20 April 2026
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}