"use client";

import { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import { generateSlug } from "@/lib/cms/utils";
import Image from "next/image";
import { Upload } from "lucide-react";

export interface VacancyFormData {
  id?: number;
  title: string;
  slug: string;
  department: string;
  location: string;
  region: string;
  employmentType: string;
  deadline: string;
  excerpt: string;
  richContent: string;
  coverImage: string;
  applyUrl: string;
  status: string;
}

interface VacancyFormProps {
  onSubmit: (data: VacancyFormData) => Promise<void>;
  isLoading?: boolean;
  initialData?: Partial<VacancyFormData> & { id?: number };
  regions: string[];
  mode?: "create" | "edit";
}

const EMPLOYMENT_TYPES = [
  { value: "full_time",  label: "Full-time"  },
  { value: "part_time",  label: "Part-time"  },
  { value: "contract",   label: "Contract"   },
  { value: "internship", label: "Internship" },
  { value: "volunteer",  label: "Volunteer"  },
];

export default function VacancyForm({
  onSubmit,
  isLoading = false,
  initialData,
  regions,
  mode = "create",
}: VacancyFormProps) {
  const [formData, setFormData] = useState<VacancyFormData>({
    id:             initialData?.id,
    title:          initialData?.title          || "",
    slug:           initialData?.slug           || "",
    department:     initialData?.department     || "",
    location:       initialData?.location       || "",
    region:         initialData?.region         || regions[0] || "national",
    employmentType: initialData?.employmentType || "full_time",
    deadline:       initialData?.deadline       || "",
    excerpt:        initialData?.excerpt        || "",
    richContent:    initialData?.richContent    || "",
    coverImage:     initialData?.coverImage     || "",
    applyUrl:       initialData?.applyUrl       || "",
    status:         initialData?.status         || "draft",
  });

  const [coverPreview, setCoverPreview] = useState<string | null>(initialData?.coverImage || null);
  const [uploading, setUploading]       = useState(false);
  const [slugLocked, setSlugLocked]     = useState(!!initialData?.slug);

  useEffect(() => {
    if (!initialData) return;
    setFormData({
      id:             initialData.id,
      title:          initialData.title          || "",
      slug:           initialData.slug           || "",
      department:     initialData.department     || "",
      location:       initialData.location       || "",
      region:         initialData.region         || regions[0] || "national",
      employmentType: initialData.employmentType || "full_time",
      deadline:       initialData.deadline       || "",
      excerpt:        initialData.excerpt        || "",
      richContent:    initialData.richContent    || "",
      coverImage:     initialData.coverImage     || "",
      applyUrl:       initialData.applyUrl       || "",
      status:         initialData.status         || "draft",
    });
    setCoverPreview(initialData.coverImage || null);
    setSlugLocked(!!initialData.slug);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData?.id]);

  const set = (key: keyof VacancyFormData, val: string) =>
    setFormData((prev) => ({ ...prev, [key]: val }));

  const handleTitleChange = (val: string) => {
    set("title", val);
    if (!slugLocked) set("slug", generateSlug(val));
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload/image", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url;
  };

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await handleImageUpload(file);
      set("coverImage", url);
      setCoverPreview(url);
    } catch { alert("Cover image upload failed"); }
    finally { setUploading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.department || !formData.location || !formData.excerpt || !formData.richContent)
      return alert("Please fill in all required fields.");
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="e.g. Programme Officer – Northern Region"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        {formData.title && (
          <p className="text-xs text-slate-500 mt-1">Slug: {formData.slug}</p>
        )}
      </div>

      {/* Department + Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Department *</label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => set("department", e.target.value)}
            placeholder="e.g. Programmes"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Location *</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="e.g. Lilongwe, Malawi"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* Region + Employment Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Region *</label>
          <select
            value={formData.region}
            onChange={(e) => set("region", e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {regions.map((r) => (
              <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Employment Type</label>
          <select
            value={formData.employmentType}
            onChange={(e) => set("employmentType", e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {EMPLOYMENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Deadline + Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Application Deadline</label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => set("deadline", e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => set("status", e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Cover Image */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Cover Image</label>
        <div className="flex flex-col gap-3">
          {coverPreview && (
            <div className="relative w-full h-40 rounded-lg overflow-hidden">
              <Image src={coverPreview} alt="Cover" fill className="object-cover" />
              <button
                type="button"
                onClick={() => { setCoverPreview(null); set("coverImage", ""); }}
                className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          )}
          <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 cursor-pointer transition-colors">
            <Upload size={18} className="text-slate-400" />
            <input type="file" accept="image/*" onChange={handleCoverChange} disabled={uploading} className="hidden" />
            <span className="text-sm text-slate-600">{uploading ? "Uploading…" : "Click to upload cover image"}</span>
          </label>
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Excerpt * <span className="text-xs font-normal text-slate-500">(max 300 chars — shown on listing cards)</span>
        </label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          placeholder="Brief summary of the role shown on the careers listing page."
          maxLength={300}
          rows={3}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        <p className="text-xs text-slate-500 mt-1">{formData.excerpt.length}/300</p>
      </div>

      {/* Full Job Description */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Job Description * <span className="text-xs font-normal text-slate-500">(WYSIWYG — saved as HTML)</span>
        </label>
        <RichTextEditor
          value={formData.richContent}
          onChange={(html) => set("richContent", html)}
          onImageUpload={handleImageUpload}
          placeholder="Write the full job description here — responsibilities, requirements, what we offer…"
        />
      </div>

      {/* Apply URL */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">External Apply URL</label>
        <input
          type="url"
          value={formData.applyUrl}
          onChange={(e) => set("applyUrl", e.target.value)}
          placeholder="https://forms.example.com/apply  (leave blank to use built-in form)"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4 border-t border-slate-200">
        <button
          type="submit"
          disabled={isLoading || uploading}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 font-semibold transition-colors"
        >
          {isLoading ? "Saving…" : mode === "edit" ? "Update Vacancy" : "Create Vacancy"}
        </button>
        <button
          type="reset"
          onClick={() => {
            setFormData({
              id: undefined, title: "", slug: "", department: "", location: "",
              region: regions[0], employmentType: "full_time", deadline: "",
              excerpt: "", richContent: "", coverImage: "", applyUrl: "", status: "draft",
            });
            setCoverPreview(null);
            setSlugLocked(false);
          }}
          className="px-6 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 font-semibold text-slate-700"
        >
          Reset
        </button>
      </div>
    </form>
  );
}