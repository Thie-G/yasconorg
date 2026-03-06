"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatDate } from "@/lib/cms/utils";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  coverImage: string | null;
  publishedAt: string;
  slug: string;
}

interface NewsDisplayProps {
  region: string;
  limit?: number;
}

export default function NewsDisplay({
  region,
  limit = 3,
}: NewsDisplayProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `/api/cms/news?region=${region}&status=published`
        );
        if (response.ok) {
          const data = await response.json();
          setNews(data.slice(0, limit));
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [region, limit]);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  if (news.length === 0) {
    return <div className="text-center py-8 text-gray-500">No news available</div>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-6">
      {news.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
        >
          {item.coverImage && (
            <div className="relative w-full h-40">
              <Image
                src={item.coverImage}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-5">
            <p className="text-xs font-semibold text-green-700">
              {formatDate(item.publishedAt)}
            </p>
            <p className="font-semibold text-[#1a2e1a] mt-2 line-clamp-2">
              {item.title}
            </p>
            <p className="text-sm text-[#2e3d35] mt-2 line-clamp-3">
              {item.excerpt}
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
