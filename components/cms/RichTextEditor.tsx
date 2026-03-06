"use client";

import { useState } from "react";
import { Bold, Italic, List, Link as LinkIcon } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  onImageUpload,
}: RichTextEditorProps) {
  const [uploading, setUploading] = useState(false);

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || "text";
    const newContent =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end);

    onChange(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = start + before.length + selectedText.length;
    }, 0);
  };

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file && onImageUpload) {
        try {
          setUploading(true);
          const imageUrl = await onImageUpload(file);
          insertMarkdown(`![Image](${imageUrl})`);
        } catch (error) {
          console.error("Image upload failed:", error);
          alert("Failed to upload image");
        } finally {
          setUploading(false);
        }
      }
    };

    input.click();
  };

  return (
    <div className="w-full border border-slate-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 bg-slate-100 p-3 border-b border-slate-300">
        <button
          type="button"
          onClick={() => insertMarkdown("**", "**")}
          title="Bold (Ctrl+B)"
          className="p-2 hover:bg-slate-200 rounded transition-colors"
        >
          <Bold size={18} className="text-slate-700" />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("*", "*")}
          title="Italic (Ctrl+I)"
          className="p-2 hover:bg-slate-200 rounded transition-colors"
        >
          <Italic size={18} className="text-slate-700" />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("- ")}
          title="Bullet List"
          className="p-2 hover:bg-slate-200 rounded transition-colors"
        >
          <List size={18} className="text-slate-700" />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown("[", "](url)")}
          title="Add Link"
          className="p-2 hover:bg-slate-200 rounded transition-colors"
        >
          <LinkIcon size={18} className="text-slate-700" />
        </button>
        <div className="border-l border-slate-300"></div>
        <button
          type="button"
          onClick={handleImageUpload}
          disabled={uploading}
          className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded transition-colors disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "📷 Image"}
        </button>
      </div>

      {/* Editor */}
      <textarea
        id="content-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 focus:outline-none resize-none"
        style={{ minHeight: "300px" }}
      />

      {/* Help Text */}
      <div className="bg-slate-50 p-3 border-t border-slate-200 text-xs text-slate-600">
        <p className="font-semibold mb-2">Markdown formatting:</p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <code className="bg-white px-2 py-1 rounded border border-slate-200">**bold**</code>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded border border-slate-200">*italic*</code>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded border border-slate-200"># Heading</code>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded border border-slate-200">- List item</code>
          </div>
        </div>
      </div>
    </div>
  );
}
