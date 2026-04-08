"use client";

import React, { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const vacancies = [
  {
    id: "board",
    title: "Call for Board Members – YASCON",
    badge: "Governance",
    deadline: "30 April 2026",
    summary:
      "Serve on YASCON's Board of Directors and provide strategic direction, oversight, and governance to advance environmental conservation in Malawi.",
    intro: (
      <>
        <p>
          The Youth Association for Conservation of Nature and Environment
          (YASCON) is inviting qualified, experienced, and passionate individuals
          to serve on its <strong>Board of Directors</strong>.
        </p>
        <p>
          We are seeking visionary leaders committed to strengthening governance
          and advancing environmental conservation efforts in Malawi.
        </p>
      </>
    ),
    sections: [
      {
        heading: "Key Qualities",
        items: [
          "Strong leadership and strategic thinking skills",
          "Commitment to environmental conservation and youth development",
          "Integrity and good governance values",
          "Prior board or leadership experience is an added advantage",
        ],
      },
      {
        heading: "Role of Board Members",
        text: "Provide strategic direction, oversight, and support to ensure the organization achieves its mission and objectives.",
      },
    ],
    applyNote: "Submit your CV and expression of interest to:",
    email: "recruitment@yascon.org",
  },
  {
    id: "volunteer",
    title: "Call for Volunteers",
    badge: "Volunteering",
    deadline: "20 April 2026",
    summary:
      "Join YASCON's volunteer team and support impactful environmental conservation initiatives across Malawi. Postgraduate qualification required.",
    intro: (
      <p>
        YASCON invites applications from passionate and dedicated individuals to
        join our volunteer team and support environmental conservation initiatives
        across Malawi.
      </p>
    ),
    sections: [
      {
        heading: "Eligibility",
        text: "Applicants must hold a postgraduate qualification in any of the following fields:",
        items: [
          "Monitoring & Evaluation",
          "Natural Resources Management",
          "Land Administration",
          "Geography",
          "Law",
          "Human Resources Management",
        ],
      },
      {
        heading: "Key Attributes",
        items: [
          "Strong communication and interpersonal skills",
          "Ability to work independently and within a team",
          "Commitment to community development and environmental conservation",
          "High level of integrity and professionalism",
        ],
      },
      {
        heading: "What You Will Gain",
        items: [
          "Hands-on experience in your field of expertise",
          "Opportunity to contribute to impactful projects",
          "Professional networking and career development",
        ],
      },
    ],
    applyNote: "Apply by sending your CV and a short motivation letter to:",
    email: "recruitment@yascon.org",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-8 transition-colors"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 4L6 8l4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      All vacancies
    </button>
  );
}

function VacancyCard({ vacancy, onOpen }) {
  return (
    <div
      onClick={() => onOpen(vacancy.id)}
      className="group border border-gray-200 rounded-xl p-6 bg-white hover:border-gray-400 hover:shadow-sm transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <span className="inline-block text-xs font-medium bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-0.5 mb-3">
            Open
          </span>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            {vacancy.title}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-3">
            {vacancy.summary}
          </p>
          <p className="text-xs font-medium text-red-600">
            Deadline: {vacancy.deadline}
          </p>
        </div>
        <svg
          className="w-5 h-5 text-gray-300 group-hover:text-gray-500 flex-shrink-0 mt-1 transition-colors"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M7.5 5l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function VacancyDetail({ vacancy, onBack }) {
  return (
    <div className="max-w-2xl mx-auto">
      <BackButton onClick={onBack} />

      <span className="inline-block text-xs font-medium bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-0.5 mb-4">
        Open · Deadline {vacancy.deadline}
      </span>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">{vacancy.title}</h1>

      <div className="prose prose-gray max-w-none text-gray-600 mb-8 space-y-3">
        {vacancy.intro}
      </div>

      {vacancy.sections.map((section, i) => (
        <div key={i} className="mb-6">
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            {section.heading}
          </h3>
          {section.text && (
            <p className="text-gray-600 text-sm mb-2">{section.text}</p>
          )}
          {section.items && (
            <ul className="list-disc ml-5 space-y-1 text-sm text-gray-600">
              {section.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mt-8">
        <p className="text-sm text-gray-700 mb-1">
          📧 {vacancy.applyNote}
        </p>
        <a
          href={`mailto:${vacancy.email}`}
          className="text-blue-600 font-medium text-sm hover:underline"
        >
          {vacancy.email}
        </a>
        <p className="text-xs font-semibold text-red-600 mt-3">
          Deadline: {vacancy.deadline}
        </p>
      </div>
    </div>
  );
}

function SubmitCVForm({ onBack }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <BackButton onClick={onBack} />

      <div className="text-center mb-10">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          📋
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          No open positions right now
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          We're not actively recruiting at the moment, but we'd love to hear
          from you. Submit your CV and we'll reach out when a suitable
          opportunity opens up.
        </p>
      </div>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <p className="text-green-700 font-medium mb-1">
            Expression of interest received!
          </p>
          <p className="text-green-600 text-sm">
            Please also email your CV directly to{" "}
            <strong>recruitment@yascon.org</strong>. We'll be in touch when a
            suitable role opens up.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              type="text"
              required
              placeholder="Your full name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Field / area of expertise
            </label>
            <input
              type="text"
              placeholder="e.g. Natural Resources Management"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Highest qualification
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-500 transition-colors bg-white">
              <option value="">Select qualification level</option>
              <option>Postgraduate (Masters / PhD)</option>
              <option>Bachelor's degree</option>
              <option>Diploma</option>
              <option>Certificate</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brief motivation{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              rows={4}
              placeholder="Tell us why you'd like to work with YASCON..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gray-500 transition-colors resize-none"
            />
          </div>

          <p className="text-xs text-gray-400">
            Also attach your CV by emailing it to{" "}
            <a
              href="mailto:recruitment@yascon.org"
              className="text-blue-500 hover:underline"
            >
              recruitment@yascon.org
            </a>{" "}
            with your name in the subject line.
          </p>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Send expression of interest
          </button>
        </form>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CareerPage() {
  // view: "list" | "board" | "volunteer" | "submit-cv"
  const [view, setView] = useState("list");

  const openVacancy = (id) => setView(id);
  const goBack = () => setView("list");

  const activeVacancy = vacancies.find((v) => v.id === view);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* LIST VIEW */}
      {view === "list" && (
        <>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Vacancies & Opportunities</h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Explore opportunities to work with the Youth Association for
              Conservation of Nature and Environment (YASCON). Join us in
              promoting environmental conservation and sustainable development
              across Malawi.
            </p>
          </div>

          {/* Vacancy Cards */}
          <div className="space-y-4 max-w-2xl mx-auto">
            {vacancies.map((v) => (
              <VacancyCard key={v.id} vacancy={v} onOpen={openVacancy} />
            ))}
          </div>

          {/* Speculative CV — only shown when no vacancies are listed */}
          {vacancies.length === 0 && (
            <div className="max-w-2xl mx-auto mt-10 pt-8 border-t border-gray-100 flex items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                There are no open positions at the moment. Submit your CV and
                we'll keep you in mind.
              </p>
              <button
                onClick={() => setView("submit-cv")}
                className="flex-shrink-0 text-sm border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                Submit CV
              </button>
            </div>
          )}
        </>
      )}

      {/* VACANCY DETAIL VIEW */}
      {activeVacancy && (
        <VacancyDetail vacancy={activeVacancy} onBack={goBack} />
      )}

      {/* SUBMIT CV VIEW */}
      {view === "submit-cv" && <SubmitCVForm onBack={goBack} />}
    </div>
  );
}
