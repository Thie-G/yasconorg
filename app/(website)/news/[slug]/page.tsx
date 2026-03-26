"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from "@/lib/cms/utils";
import { BeatLoader } from "react-spinners";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  richContent: string;
  coverImage: string | null;
  region: string;
  status: PublishStatus;
  publishedAt: string;
  createdBy: {
    name: string;
  };
}

type PublishStatus = 'draft' | 'published' | 'archived';

interface PageProps {
  params: { slug: string };
}

export default function NewsSlugPage({ params }: PageProps) {
  const { slug } = params;

  const { data: news, isLoading, error } = useQuery({
    queryKey: ['news', slug],
    queryFn: async () => {
      const response = await fetch(`/api/cms/news/${slug}`);
      if (!response.ok) throw new Error('News not found');
      const data = await response.json();
      return data as NewsItem;
    },
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f7f3ea] pt-0.5">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <BeatLoader
            color="#1a2e1a"
            loading={true}
           className='mb-2'
          />
          <p>Loading news...</p>
        </div>
      </main>
    );
  }

  if (error || !news) {
    return (
      <main className="min-h-screen bg-[#f7f3ea] pt-0.5">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">News not found</h1>
          <Link href="/news" className="text-green-600 hover:text-green-700 font-semibold">
            ← Back to Newsroom
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ea] pt-0.5">
      {/* Hero Cover */}
      {news.coverImage && (
        <div className="relative h-96 md:h-[500px]">
          <Image
            src={news.coverImage}
            alt={news.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}

      <article className="max-w-4xl mx-auto px-6 md:px-8 pb-24 md:pb-32">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#6a7a6a] mb-6 pt-8">
          <span>YASCON-{news.region.toUpperCase()}</span>
          <span>•</span>
          <time>{formatDate(news.publishedAt)}</time>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a2e1a] leading-tight mb-6">
          {news.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-[#4a5a4a] mb-12 leading-relaxed max-w-3xl">
          {news.excerpt}
        </p>

        {/* Rich Content */}
        <div 
          className="prose prose-headings:text-[#1a2e1a] prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-p:text-lg prose-a:text-green-700 prose-strong:font-semibold prose-blockquote:border-l-green-600 prose-blockquote:text-slate-700 max-w-none"
          dangerouslySetInnerHTML={{ __html: news.richContent }} 
        />

        {/* Back Link */}
        <div className="mt-16 pt-12 border-t border-[#ede8d8]">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold text-lg"
          >
            ← Back to Newsroom
          </Link>
        </div>
      </article>
    </main>
  );
}
