"use client";

import { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { generateSlug } from "@/lib/cms/utils";
import Image from "next/image";
import { Upload } from "lucide-react";

interface UnifiedContentFormProps {
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  initialData?: any;
  regions: string[];
}

const CONTENT_TYPES = [
  { value: "announcement", label: "Announcement" },
  { value: "news", label: "News" },
  { value: "press_briefing", label: "Press Briefing" },
  { value: "blog", label: "Blog" },
  { value: "video", label: "Video" },
];

export default function UnifiedContentForm({
  onSubmit,
  isLoading = false,
  initialData,
  regions,
}: UnifiedContentFormProps) {
  const [contentType, setContentType] = useState(
    initialData?.contentType || "news"
  );
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    richContent: initialData?.richContent || "",
    region: initialData?.region || regions[0],
    status: initialData?.status || "draft",
    coverImage: initialData?.coverImage || "",
    videoUrl: initialData?.videoUrl || "",
  });

  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialData?.coverImage || null
  );
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file: File): Promise<string> => {
    const formDataObj = new FormData();
    formDataObj.append("file", file);

    const response = await fetch("/api/upload/image", {
      method: "POST",
      body: formDataObj,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.url;
  };

  const handleCoverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setUploading(true);
        const imageUrl = await handleImageUpload(file);
        setFormData({ ...formData, coverImage: imageUrl });
        setCoverPreview(imageUrl);
      } catch (error) {
        console.error("Cover image upload failed:", error);
        alert("Failed to upload cover image");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleVideoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setUploading(true);
        const formDataObj = new FormData();
        formDataObj.append("file", file);

        const response = await fetch("/api/upload/video", {
          method: "POST",
          body: formDataObj,
        });

        if (!response.ok) {
          throw new Error("Failed to upload video");
        }

        const data = await response.json();
        setFormData({ ...formData, videoUrl: data.url });
      } catch (error) {
        console.error("Video upload failed:", error);
        alert("Failed to upload video");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.excerpt || !formData.richContent) {
      alert("Please fill in all required fields");
      return;
    }

    if (contentType === "video" && !formData.videoUrl) {
      alert("Please upload a video");
      return;
    }

    await onSubmit({ ...formData, contentType });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Content Type */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Content Type *
          </label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {CONTENT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Region */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Region *
          </label>
          <select
            value={formData.region}
            onChange={(e) =>
              setFormData({ ...formData, region: e.target.value })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region.charAt(0).toUpperCase() + region.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter content title"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        {formData.title && (
          <p className="text-xs text-slate-500 mt-1">
            Slug: {generateSlug(formData.title)}
          </p>
        )}
      </div>

      {/* Cover Image */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Cover Image
        </label>
        <div className="flex flex-col gap-4">
          {coverPreview && (
            <div className="relative w-full h-48">
              <Image
                src={coverPreview}
                alt="Cover preview"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors">
            <Upload size={20} className="text-slate-400" />
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              disabled={uploading}
              className="hidden"
            />
            <span className="text-sm text-slate-600">{uploading ? "Uploading..." : "Click to upload cover image"}</span>
          </label>
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Excerpt * <span className="text-xs font-normal text-slate-500">(max 200 characters)</span>
        </label>
        <textarea
          value={formData.excerpt}
          onChange={(e) =>
            setFormData({ ...formData, excerpt: e.target.value })
          }
          placeholder="Brief summary of the content"
          maxLength={200}
          rows={2}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <p className="text-xs text-slate-500 mt-1">
          {formData.excerpt.length}/200 characters
        </p>
      </div>

      {/* Rich Content Editor */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Content * <span className="text-xs font-normal text-slate-500">(Rich text editor)</span>
        </label>
        <RichTextEditor
          value={formData.richContent}
          onChange={(content) =>
            setFormData({ ...formData, richContent: content })
          }
          onImageUpload={handleImageUpload}
          placeholder="Write your detailed content here..."
        />
      </div>

      {/* Video Upload (only for video type) */}
      {contentType === "video" && (
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Video Upload * <span className="text-xs font-normal text-slate-500">(Max 100MB)</span>
          </label>
          {formData.videoUrl ? (
            <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="text-emerald-700 font-semibold">✓ Video uploaded</div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, videoUrl: "" })}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700 border border-red-300 rounded transition-colors"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors">
              <Upload size={20} className="text-slate-400" />
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                disabled={uploading}
                className="hidden"
                required
              />
              <span className="text-sm text-slate-600">{uploading ? "Uploading video..." : "Click to upload video file"}</span>
            </label>
          )}
        </div>
      )}

      {/* Submit Buttons */}
      <div className="flex gap-4 pt-6 border-t border-slate-200">
        <button
          type="submit"
          disabled={isLoading || uploading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 font-semibold transition-colors"
        >
          {isLoading ? "Saving..." : initialData ? "Update" : "Create"}
        </button>
        <button
          type="reset"
          className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-semibold transition-colors text-slate-700"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
