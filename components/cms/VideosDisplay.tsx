"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatDate } from "@/lib/cms/utils";

interface VideoItem {
  id: number;
  title: string;
  excerpt: string;
  coverImage: string | null;
  videoUrl: string;
  publishedAt: string;
  slug: string;
}

interface VideosDisplayProps {
  region: string;
  limit?: number;
}

export default function VideosDisplay({
  region,
  limit = 3,
}: VideosDisplayProps) {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `/api/cms/videos?region=${region}&status=published`
        );
        if (response.ok) {
          const data = await response.json();
          setVideos(data.slice(0, limit));
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [region, limit]);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  if (videos.length === 0) {
    return <div className="text-center py-8 text-gray-500">No videos available</div>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-6">
      {videos.map((video) => (
        <div
          key={video.id}
          className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
        >
          <div className="relative w-full h-40 bg-gray-900">
            {video.coverImage ? (
              <Image
                src={video.coverImage}
                alt={video.title}
                fill
                className="object-cover group-hover:opacity-75 transition-opacity"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM4 9h12M4 13h12" />
                </svg>
              </div>
            )}
            <button className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/60 transition-colors">
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </button>
          </div>
          <div className="p-5">
            <p className="text-xs font-semibold text-green-700">
              {formatDate(video.publishedAt)}
            </p>
            <p className="font-semibold text-[#1a2e1a] mt-2 line-clamp-2">
              {video.title}
            </p>
            <p className="text-sm text-[#2e3d35] mt-2 line-clamp-3">
              {video.excerpt}
            </p>
            <button className="text-sm font-semibold text-green-700 mt-3">
              Watch
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
