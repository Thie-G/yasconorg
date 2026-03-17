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
    <div className="grid md:grid-cols-3 gap-6 mt-4 mb-4 px-6">

      {videos.map((video) => (
        <div
          key={video.id}
          className="flex flex-col  border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
        >
          <div className=" w-full  bg-gray-900">
            {video?.videoUrl && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Video</h3>
                <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
                  <video
                    controls
                    className="absolute top-0 left-0 w-full h-full"
                    poster={video.coverImage || undefined}
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              )}
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
              Watch  full Video
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
