"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatDate } from "@/lib/cms/utils";

interface BlogItem {
  id: number;
  title: string;
  excerpt: string;
  coverImage: string | null;
  publishedAt: string;
  slug: string;
}

interface BlogsDisplayProps {
  region: string;
  limit?: number;
}

export default function BlogsDisplay({
  region,
  limit = 3,
}: BlogsDisplayProps) {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `/api/cms/blogs?region=${region}&status=published`
        );
        if (response.ok) {
          const data = await response.json();
          setBlogs(data.slice(0, limit));
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [region, limit]);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  if (blogs.length === 0) {
    return <div className="text-center py-8 text-gray-500">No blogs available</div>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-6">
      {blogs.map((post) => (
        <div
          key={post.id}
          className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
        >
          {post.coverImage && (
            <div className="relative w-full h-40">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-5">
            <p className="text-xs font-semibold text-green-700">
              {formatDate(post.publishedAt)}
            </p>
            <p className="font-semibold text-[#1a2e1a] mt-2 line-clamp-2">
              {post.title}
            </p>
            <p className="text-sm text-[#2e3d35] mt-2 line-clamp-3">
              {post.excerpt}
            </p>
            <button className="text-sm font-semibold text-green-700 mt-3">
              Read more
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
