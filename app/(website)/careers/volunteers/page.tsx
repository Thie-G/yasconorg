"use client";

import { useState } from "react";

const hasVacancy = true; // Set to false when no vacancy is posted

export default function VolunteerVacancy() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", cv: null as File | null });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.cv) return;
    setSubmitted(true);
  };

  if (!hasVacancy) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="border rounded-lg p-8 shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-2">Volunteer Applications</h2>
          <p className="text-gray-500 mb-6">
            There are no open volunteer positions at the moment. You can still submit
            your CV and we will reach out when an opportunity becomes available.
          </p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <p className="text-green-700 text-lg font-medium">✅ CV Submitted Successfully!</p>
              <p className="text-gray-500 mt-1 text-sm">We'll be in touch when a position opens up.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload CV (PDF)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setForm({ ...form, cv: e.target.files?.[0] || null })}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1a2e1a] text-white py-2 rounded-lg font-medium hover:bg-[#2e4a2e] transition"
              >
                Submit CV
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 mt-40 text-center rounded-lg">
      <p className="font-semibold text-red-600">
        The Application Deadline has Passed
      </p>
    </div>
  );

}

