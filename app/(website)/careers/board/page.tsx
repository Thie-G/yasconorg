"use client";

import { useState } from "react";

const hasVacancy = true; // Set to false when no vacancy is posted

export default function BoardVacancy() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "" });
  const [cv, setCv] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cv) return setError("Please upload your CV.");
    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("type", "board");
    data.append("cv", cv);

    const res = await fetch("/api/upload-cv", { method: "POST", body: data });

    if (res.ok) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  if (!hasVacancy) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="border rounded-lg p-8 shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-2">Board Member Applications</h2>
          <p className="text-gray-500 mb-6">
            There are no open board vacancies at the moment. You can still submit
            your CV and we will reach out when a position becomes available.
          </p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <p className="text-green-700 text-lg font-medium">✅ CV Submitted Successfully!</p>
              <p className="text-gray-500 mt-1 text-sm">
                We'll be in touch when a position opens up.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload CV (PDF or Word)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setCv(e.target.files?.[0] || null)}
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a2e1a] text-white py-2 rounded-lg font-medium hover:bg-[#2e4a2e] transition disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit CV"}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="border rounded-lg p-8 shadow-sm bg-white">
        <h2 className="text-2xl font-semibold mb-4">CALL FOR BOARD MEMBERS – YASCON</h2>

        <p className="text-gray-700 mb-4">
          The Youth Association for Conservation of Nature and Environment (YASCON) is inviting
          qualified, experienced, and passionate individuals to serve on its{" "}
          <strong>Board of Directors</strong>.
        </p>

        <p className="text-gray-700 mb-6">

          We are seeking visionary leaders committed to strengthening governance
          and advancing environmental conservation efforts in Malawi.Those with
          Masters or PhD are encouraged to express interest.
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
          Provide strategic direction, oversight, and support to ensure the organization
          achieves its mission and objectives.
        </p>

        <div className="bg-gray-100 p-6 rounded-lg">
          <p className="mb-2">
            📧 Submit your <strong>CV</strong> and <strong>expression of interest</strong> to:
          </p>
          <p className="text-blue-600 font-medium mb-3">recruitment@yascon.org</p>
          <p className="font-semibold text-red-600">Deadline: 30 April 2026</p>
        </div>
      </div>
    </div>
  );
}