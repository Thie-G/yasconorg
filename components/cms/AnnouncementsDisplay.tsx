"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatDate } from "@/lib/cms/utils";

interface AnnouncementItem {
  id: number;
  title: string;
  excerpt: string;
  coverImage: string | null;
  publishedAt: string;
  slug: string;
}

interface AnnouncementsDisplayProps {
  region: string;
  limit?: number;
}

export default function AnnouncementsDisplay({
  region,
  limit = 5,
}: AnnouncementsDisplayProps) {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          `/api/cms/announcements?region=${region}&status=published`
        );
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data.slice(0, limit));
        }
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [region, limit]);

  if (loading) return <div className="text-center py-4">Loading...</div>;

  if (announcements.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 mt-6">
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className="flex gap-4 p-4 border border-orange-200 bg-orange-50 rounded-lg hover:shadow-md transition-shadow"
        >
          {announcement.coverImage && (
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={announcement.coverImage}
                alt={announcement.title}
                fill
                className="object-cover rounded"
              />
            </div>
          )}
          <div className="flex-1">
            <p className="text-xs font-semibold text-orange-600 mb-1">
              {formatDate(announcement.publishedAt)}
            </p>
            <p className="font-semibold text-[#1a2e1a] line-clamp-2">
              {announcement.title}
            </p>
            <p className="text-sm text-[#2e3d35] mt-2 line-clamp-2">
              {announcement.excerpt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
