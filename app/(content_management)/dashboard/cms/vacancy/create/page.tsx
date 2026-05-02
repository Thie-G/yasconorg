"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, CheckCircle, AlertCircle, X } from "lucide-react";
import VacancyForm, { VacancyFormData } from "@/components/cms/VacancyForm";

type AlertState = { message: string; type: "success" | "error" };

export default function VacancyCreatePage() {
  const router = useRouter();
  const [initialRegion, setInitialRegion] = useState<string>("national");
  const [loadingUser, setLoadingUser]     = useState(true);
  const [isLoading, setIsLoading]         = useState(false);
  const [alert, setAlert]                 = useState<AlertState | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((u) => {
        if (u?.region) setInitialRegion(u.region);
      })
      .catch(() => router.replace("/dashboard/login"))
      .finally(() => setLoadingUser(false));
  }, [router]);

  const showAlert = (message: string, type: "success" | "error") => {
    setAlert({ message, type });
    if (type === "success") {
      setTimeout(() => router.push("/dashboard/cms/vacancy/manage"), 1800);
    }
  };

  const handleSubmit = async (data: VacancyFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/cms/vacancies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Create failed");
      showAlert("Vacancy created successfully!", "success");
    } catch (err) {
      showAlert(err instanceof Error ? err.message : "Error creating vacancy", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-slate-300" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 text-sm transition"
        >
          <ArrowLeft size={16} /> Back to Vacancies
        </button>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">Post New Vacancy</h1>
        <p className="text-slate-500 text-sm mb-8">
          Create a job posting that will appear on the public careers page.
        </p>

        {alert && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              alert.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {alert.type === "success"
              ? <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
              : <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />}
            <span className="text-sm font-medium">{alert.message}</span>
            <button onClick={() => setAlert(null)} className="ml-auto flex-shrink-0 opacity-60 hover:opacity-100">
              <X size={16} />
            </button>
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <VacancyForm
            initialData={{ region: initialRegion }}
            regions={["national", "northern", "central", "southern", "eastern"]}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            mode="create"
          />
        </div>
      </div>
    </div>
  );
}
