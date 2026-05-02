"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Vacancy = {
  id: number;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  deadline: string | null;
  status: string;
};

type AlertState = { message: string; type: "success" | "error" };

const EMPLOYMENT_LABEL: Record<string, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  internship: "Internship",
  volunteer: "Volunteer",
};

export default function CareersPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);

  // CV form state
  const [form, setForm] = useState({ name: "", email: "" });
  const [cv, setCv] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);

  useEffect(() => {
    fetch("/api/cms/vacancies?status=published&limit=100")
      .then((res) => res.json())
      .then((data) => setVacancies(data))
      .catch(() => setVacancies([]))
      .finally(() => setLoading(false));
  }, []);

  const handleCvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cv) return setAlert({ message: "Please upload your CV.", type: "error" });
    setSubmitting(true);
    setAlert(null);

    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("type", "general");
    data.append("cv", cv);

    try {
      const res = await fetch("/api/upload-cv", { method: "POST", body: data });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setAlert({ message: "Something went wrong. Please try again.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const hasVacancies = vacancies.length > 0;

  return (
    <div style={{ fontFamily: "'Georgia', serif" }} className="min-h-screen bg-[#f5f2eb]">

      {/* Hero Header */}
      <div className="relative overflow-hidden bg-[#1a2e1a] px-6 py-10 text-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: [
              "radial-gradient(circle at 20% 50%, #4a7c4a 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, #2d5a2d 0%, transparent 40%)",
            ].join(", "),
          }}
        />
        <div className="relative">
          <p
            className="text-[#a8c5a0] text-sm uppercase mb-3"
            style={{ fontFamily: "sans-serif", letterSpacing: "0.3em" }}
          >
            Join Our Mission
          </p>
          <h1
            className="text-4xl font-bold text-white mb-4"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Work With YASCON
          </h1>
          <p
            className="text-[#a8c5a0] text-lg max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "sans-serif" }}
          >
            Help us protect Malawi&apos;s natural environment. We&apos;re looking
            for passionate individuals ready to make a real impact.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-10">

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[#1a2e1a] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Open Positions — only when vacancies exist */}
        {!loading && hasVacancies && (
          <div>
            <p
              className="text-xs uppercase text-[#7a6e5f] mb-5"
              style={{ fontFamily: "sans-serif", letterSpacing: "0.25em" }}
            >
              Open Positions
            </p>
            <div className="flex flex-col gap-4">
              {vacancies.map((vacancy) => (
                <Link
                  key={vacancy.id}
                  href={`/careers/${vacancy.slug}`}
                  className="group relative block bg-white rounded-2xl overflow-hidden border border-[#e2ddd5] hover:border-[#1a2e1a] hover:shadow-2xl transition-all duration-300"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1a2e1a] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  <div className="flex items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-[#1a2e1a] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <span
                          className="text-[#a8c5a0] text-lg font-bold"
                          style={{ fontFamily: "sans-serif" }}
                        >
                          {vacancy.title[0]}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h2
                            className="text-lg font-bold text-[#1a2e1a]"
                            style={{ letterSpacing: "-0.01em" }}
                          >
                            {vacancy.title}
                          </h2>
                          {vacancy.employmentType && (
                            <span
                              className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#eaf3ea] text-[#1a2e1a]"
                              style={{ fontFamily: "sans-serif" }}
                            >
                              {EMPLOYMENT_LABEL[vacancy.employmentType] || vacancy.employmentType}
                            </span>
                          )}
                        </div>
                        <p className="text-[#7a6e5f] text-sm" style={{ fontFamily: "sans-serif" }}>
                          {vacancy.department} {vacancy.location ? `· ${vacancy.location}` : ""}
                        </p>
                        {vacancy.deadline && (
                          <p className="text-[#b5a898] text-xs mt-1" style={{ fontFamily: "sans-serif" }}>
                            Deadline:{" "}
                            <span className="text-[#c0392b] font-medium">
                              {new Date(vacancy.deadline).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-[#1a2e1a] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CV Upload — only when no vacancies */}
        {!loading && !hasVacancies && (
          <div className="bg-white rounded-2xl border border-[#e2ddd5] px-8 py-10">
            <h2
              className="text-xl font-bold text-[#1a2e1a] mb-2"
              style={{ letterSpacing: "-0.01em" }}
            >
              Interested in Joining Us?
            </h2>
            <p className="text-[#7a6e5f] text-sm mb-8" style={{ fontFamily: "sans-serif" }}>
              There are no open positions at the moment. Submit your CV and we&apos;ll reach out when an opportunity becomes available.
            </p>

            {submitted ? (
              <div className="bg-[#eaf3ea] border border-[#a8c5a0] rounded-xl p-6 text-center">
                <p className="text-[#1a2e1a] text-base font-semibold mb-1">
                  CV Submitted Successfully
                </p>
                <p className="text-[#7a6e5f] text-sm" style={{ fontFamily: "sans-serif" }}>
                  We&apos;ll be in touch when a position opens up.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCvSubmit} className="space-y-5">
                <div>
                  <label
                    className="block text-sm font-medium text-[#1a2e1a] mb-1.5"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full border border-[#e2ddd5] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e1a] bg-[#f5f2eb]"
                    style={{ fontFamily: "sans-serif" }}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-[#1a2e1a] mb-1.5"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full border border-[#e2ddd5] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e1a] bg-[#f5f2eb]"
                    style={{ fontFamily: "sans-serif" }}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-[#1a2e1a] mb-1.5"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Upload CV (PDF or Word)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full border border-[#e2ddd5] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e1a] bg-[#f5f2eb]"
                    style={{ fontFamily: "sans-serif" }}
                    onChange={(e) => setCv(e.target.files?.[0] || null)}
                  />
                </div>

                {alert && (
                  <p
                    className={`text-sm ${alert.type === "error" ? "text-[#c0392b]" : "text-[#1a2e1a]"}`}
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {alert.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#1a2e1a] text-white py-3 rounded-xl font-medium hover:bg-[#2e4a2e] transition disabled:opacity-60"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {submitting ? "Submitting..." : "Submit CV"}
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}