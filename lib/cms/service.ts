/**
 * CMS Service Layer
 * Centralised data access with in-process cache (revalidated per ISR cycle).
 * All public website reads go through here. Dashboard writes invalidate cache.
 */

import { getPrismaClient } from "./db";

// ─── Simple in-process cache ───────────────────────────────────────────────
type CacheEntry<T> = { data: T; expiresAt: number };
const cache = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 min

function getCache<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) { cache.delete(key); return null; }
  return entry.data;
}

function setCache<T>(key: string, data: T, ttlMs = DEFAULT_TTL_MS) {
  cache.set(key, { data, expiresAt: Date.now() + ttlMs });
}

export function invalidateCache(prefix?: string) {
  if (!prefix) { cache.clear(); return; }
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) cache.delete(key);
  }
}

// ─── Types ─────────────────────────────────────────────────────────────────
export type ContentStatus = "draft" | "published" | "archived";
export type ContentRegion = "national" | "northern" | "central" | "southern" | "eastern";

export interface ListOptions {
  region?: ContentRegion | "all";
  status?: ContentStatus | "all";
  limit?: number;
  skip?: number;
}

// ─── News ──────────────────────────────────────────────────────────────────
export async function getNews(opts: ListOptions = {}) {
  const key = `news:${JSON.stringify(opts)}`;
  const cached = getCache<unknown[]>(key);
  if (cached) return cached;

  const prisma = getPrismaClient();
  const where: Record<string, unknown> = {};
  if (opts.region && opts.region !== "all") where.region = opts.region;
  where.status = opts.status && opts.status !== "all" ? opts.status : "published";

  const data = await prisma.cmsNews.findMany({
    where,
    include: { createdBy: { select: { id: true, name: true } } },
    orderBy: { publishedAt: "desc" },
    take: opts.limit ?? 50,
    skip: opts.skip ?? 0,
  });

  setCache(key, data);
  return data;
}

export async function getNewsBySlug(slug: string) {
  const key = `news:slug:${slug}`;
  const cached = getCache<unknown>(key);
  if (cached) return cached;

  const prisma = getPrismaClient();
  const data = await prisma.cmsNews.findFirst({
    where: { slug, status: "published" },
    include: { createdBy: { select: { name: true } } },
  });

  if (data) setCache(key, data);
  return data;
}

export async function getNewsById(id: number) {
  const prisma = getPrismaClient();
  return prisma.cmsNews.findUnique({
    where: { id },
    include: { createdBy: { select: { name: true } } },
  });
}

export async function createNews(data: {
  title: string; slug: string; excerpt: string; richContent: string;
  coverImage?: string | null; region: ContentRegion; status: ContentStatus;
  createdById: number;
}) {
  const prisma = getPrismaClient();
  const result = await prisma.cmsNews.create({
    data: {
      ...data,
      publishedAt: data.status === "published" ? new Date() : null,
      updatedById: data.createdById,
    },
  });
  invalidateCache("news:");
  return result;
}

export async function updateNews(id: number, data: Partial<{
  title: string; slug: string; excerpt: string; richContent: string;
  coverImage: string | null; region: ContentRegion; status: ContentStatus;
}>, updatedById: number) {
  const prisma = getPrismaClient();
  const existing = await prisma.cmsNews.findUnique({ where: { id } });
  const wasPublished = existing?.status !== "published" && data.status === "published";
  const result = await prisma.cmsNews.update({
    where: { id },
    data: {
      ...data,
      updatedById,
      ...(wasPublished ? { publishedAt: new Date() } : {}),
      updatedAt: new Date(),
    },
  });
  invalidateCache("news:");
  return result;
}

export async function deleteNews(id: number) {
  const prisma = getPrismaClient();
  await prisma.cmsNews.delete({ where: { id } });
  invalidateCache("news:");
}

// ─── Announcements ─────────────────────────────────────────────────────────
export async function getAnnouncements(opts: ListOptions = {}) {
  const key = `announcements:${JSON.stringify(opts)}`;
  const cached = getCache<unknown[]>(key);
  if (cached) return cached;

  const prisma = getPrismaClient();
  const where: Record<string, unknown> = {};
  if (opts.region && opts.region !== "all") where.region = opts.region;
  where.status = opts.status && opts.status !== "all" ? opts.status : "published";

  const data = await prisma.cmsAnnouncement.findMany({
    where,
    include: { createdBy: { select: { id: true, name: true } } },
    orderBy: { publishedAt: "desc" },
    take: opts.limit ?? 50,
    skip: opts.skip ?? 0,
  });

  setCache(key, data);
  return data;
}

export async function getAnnouncementById(id: number) {
  const prisma = getPrismaClient();
  return prisma.cmsAnnouncement.findUnique({
    where: { id },
    include: { createdBy: { select: { name: true } } },
  });
}

export async function createAnnouncement(data: {
  title: string; slug: string; excerpt: string; richContent: string;
  coverImage?: string | null; region: ContentRegion; status: ContentStatus;
  createdById: number;
}) {
  const prisma = getPrismaClient();
  const result = await prisma.cmsAnnouncement.create({
    data: {
      ...data,
      publishedAt: data.status === "published" ? new Date() : null,
      updatedById: data.createdById,
    },
  });
  invalidateCache("announcements:");
  return result;
}

export async function updateAnnouncement(id: number, data: Partial<{
  title: string; slug: string; excerpt: string; richContent: string;
  coverImage: string | null; region: ContentRegion; status: ContentStatus;
}>, updatedById: number) {
  const prisma = getPrismaClient();
  const existing = await prisma.cmsAnnouncement.findUnique({ where: { id } });
  const wasPublished = existing?.status !== "published" && data.status === "published";
  const result = await prisma.cmsAnnouncement.update({
    where: { id },
    data: {
      ...data,
      updatedById,
      ...(wasPublished ? { publishedAt: new Date() } : {}),
      updatedAt: new Date(),
    },
  });
  invalidateCache("announcements:");
  return result;
}

export async function deleteAnnouncement(id: number) {
  const prisma = getPrismaClient();
  await prisma.cmsAnnouncement.delete({ where: { id } });
  invalidateCache("announcements:");
}

// ─── Blogs ─────────────────────────────────────────────────────────────────
export async function getBlogs(opts: ListOptions = {}) {
  const key = `blogs:${JSON.stringify(opts)}`;
  const cached = getCache<unknown[]>(key);
  if (cached) return cached;

  const prisma = getPrismaClient();
  const where: Record<string, unknown> = {};
  if (opts.region && opts.region !== "all") where.region = opts.region;
  where.status = opts.status && opts.status !== "all" ? opts.status : "published";

  const data = await prisma.cmsBlog.findMany({
    where,
    include: { createdBy: { select: { id: true, name: true } } },
    orderBy: { publishedAt: "desc" },
    take: opts.limit ?? 50,
    skip: opts.skip ?? 0,
  });

  setCache(key, data);
  return data;
}

export async function getBlogById(id: number) {
  const prisma = getPrismaClient();
  return prisma.cmsBlog.findUnique({
    where: { id },
    include: { createdBy: { select: { name: true } } },
  });
}

export async function getBlogBySlug(slug: string) {
  const prisma = getPrismaClient();
  return prisma.cmsBlog.findFirst({
    where: { slug, status: "published" },
    include: { createdBy: { select: { name: true } } },
  });
}

export async function createBlog(data: {
  title: string; slug: string; excerpt: string; richContent: string;
  coverImage?: string | null; region: ContentRegion; status: ContentStatus;
  createdById: number;
}) {
  const prisma = getPrismaClient();
  const result = await prisma.cmsBlog.create({
    data: {
      ...data,
      publishedAt: data.status === "published" ? new Date() : null,
      updatedById: data.createdById,
    },
  });
  invalidateCache("blogs:");
  return result;
}

export async function updateBlog(id: number, data: Partial<{
  title: string; slug: string; excerpt: string; richContent: string;
  coverImage: string | null; region: ContentRegion; status: ContentStatus;
}>, updatedById: number) {
  const prisma = getPrismaClient();
  const existing = await prisma.cmsBlog.findUnique({ where: { id } });
  const wasPublished = existing?.status !== "published" && data.status === "published";
  const result = await prisma.cmsBlog.update({
    where: { id },
    data: {
      ...data,
      updatedById,
      ...(wasPublished ? { publishedAt: new Date() } : {}),
      updatedAt: new Date(),
    },
  });
  invalidateCache("blogs:");
  return result;
}

export async function deleteBlog(id: number) {
  const prisma = getPrismaClient();
  await prisma.cmsBlog.delete({ where: { id } });
  invalidateCache("blogs:");
}

// ─── Press Briefings ───────────────────────────────────────────────────────
export async function getPressBriefings(opts: ListOptions = {}) {
  const key = `briefings:${JSON.stringify(opts)}`;
  const cached = getCache<unknown[]>(key);
  if (cached) return cached;

  const prisma = getPrismaClient();
  const where: Record<string, unknown> = {};
  if (opts.region && opts.region !== "all") where.region = opts.region;
  where.status = opts.status && opts.status !== "all" ? opts.status : "published";

  const data = await prisma.cmsPressBreifing.findMany({
    where,
    include: { createdBy: { select: { id: true, name: true } } },
    orderBy: { publishedAt: "desc" },
    take: opts.limit ?? 50,
    skip: opts.skip ?? 0,
  });

  setCache(key, data);
  return data;
}

export async function getPressBriefingById(id: number) {
  const prisma = getPrismaClient();
  return prisma.cmsPressBreifing.findUnique({
    where: { id },
    include: { createdBy: { select: { name: true } } },
  });
}

export async function createPressBriefing(data: {
  title: string; slug: string; excerpt: string; richContent: string;
  coverImage?: string | null; region: ContentRegion; status: ContentStatus;
  createdById: number;
}) {
  const prisma = getPrismaClient();
  const result = await prisma.cmsPressBreifing.create({
    data: {
      ...data,
      publishedAt: data.status === "published" ? new Date() : null,
      updatedById: data.createdById,
    },
  });
  invalidateCache("briefings:");
  return result;
}

export async function updatePressBriefing(id: number, data: Partial<{
  title: string; slug: string; excerpt: string; richContent: string;
  coverImage: string | null; region: ContentRegion; status: ContentStatus;
}>, updatedById: number) {
  const prisma = getPrismaClient();
  const existing = await prisma.cmsPressBreifing.findUnique({ where: { id } });
  const wasPublished = existing?.status !== "published" && data.status === "published";
  const result = await prisma.cmsPressBreifing.update({
    where: { id },
    data: {
      ...data,
      updatedById,
      ...(wasPublished ? { publishedAt: new Date() } : {}),
      updatedAt: new Date(),
    },
  });
  invalidateCache("briefings:");
  return result;
}

export async function deletePressBriefing(id: number) {
  const prisma = getPrismaClient();
  await prisma.cmsPressBreifing.delete({ where: { id } });
  invalidateCache("briefings:");
}

// ─── Videos ────────────────────────────────────────────────────────────────
// ─── Videos ────────────────────────────────────────────────────────────────
export async function getVideos(opts: ListOptions = {}) {
  const key = `videos:${JSON.stringify(opts)}`;
  const cached = getCache<unknown[]>(key);
  if (cached) return cached;

  const prisma = getPrismaClient();
  const where: Record<string, unknown> = {};
  if (opts.region && opts.region !== "all") where.region = opts.region;
  where.status = opts.status && opts.status !== "all" ? opts.status : "published";

  const data = await prisma.cmsVideo.findMany({
    where,
    include: { createdBy: { select: { id: true, name: true } } },
    orderBy: { publishedAt: "desc" },
    take: opts.limit ?? 50,
    skip: opts.skip ?? 0,
  });

  setCache(key, data);
  return data;
}

export async function getVideoById(id: number) {
  const prisma = getPrismaClient();
  return prisma.cmsVideo.findUnique({
    where: { id },
    include: { createdBy: { select: { name: true } } },
  });
}

export async function createVideo(data: {
  title: string; slug: string; excerpt: string; richContent: string;
  coverImage?: string | null; videoUrl: string; videoDuration?: number | null;
  region: ContentRegion; status: ContentStatus; createdById: number;
}) {
  const prisma = getPrismaClient();
  const result = await prisma.cmsVideo.create({
    data: {
      ...data,
      publishedAt: data.status === "published" ? new Date() : null,
      updatedById: data.createdById,
    },
  });
  invalidateCache("videos:");
  return result;
}

export async function updateVideo(id: number, data: Partial<{
  title: string; slug: string; excerpt: string; richContent: string;
  coverImage: string | null; videoUrl: string; videoDuration: number | null;
  region: ContentRegion; status: ContentStatus;
}>, updatedById: number) {
  const prisma = getPrismaClient();
  const existing = await prisma.cmsVideo.findUnique({ where: { id } });
  const wasPublished = existing?.status !== "published" && data.status === "published";
  const result = await prisma.cmsVideo.update({
    where: { id },
    data: {
      ...data,
      updatedById,
      ...(wasPublished ? { publishedAt: new Date() } : {}),
      updatedAt: new Date(),
    },
  });
  invalidateCache("videos:");
  return result;
}

export async function deleteVideo(id: number) {
  const prisma = getPrismaClient();
  await prisma.cmsVideo.delete({ where: { id } });
  invalidateCache("videos:");
}

// ─── Team Members ──────────────────────────────────────────────────────────
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  joined?: string | null;
  avatar: string | null;
  focus: string;
  teamType: 'management' | 'board';
  region: ContentRegion | null;
  status: ContentStatus;
  publishedAt: string | null;
  createdBy: { name: string };
}

export async function getTeamMembers(opts: ListOptions & { type?: 'management' | 'board' | 'all' } = {}) {
  const key = `teams:${JSON.stringify(opts)}`;
  const cached = getCache<TeamMember[]>(key);
  if (cached) return cached as TeamMember[];

  const prisma = getPrismaClient();
  const where: Record<string, unknown> = {};
  if (opts.region && opts.region !== "all") where.region = opts.region;
  if (opts.type && opts.type !== "all") where.teamType = opts.type;
  where.status = opts.status && opts.status !== "all" ? opts.status : "published";

  const data = await prisma.cmsTeamMember.findMany({
    where,
    include: { createdBy: { select: { id: true, name: true } } },
    orderBy: { publishedAt: "desc" },
    take: opts.limit ?? 50,
    skip: opts.skip ?? 0,
  });

  setCache(key, data);
  return data as TeamMember[];
}

export async function getTeamMemberById(id: number) {
  const prisma = getPrismaClient();
  return prisma.cmsTeamMember.findUnique({
    where: { id },
    include: { createdBy: { select: { name: true } } },
  });
}

export async function createTeamMember(data: {
  name: string;
  slug: string;
  role: string;
  joined?: string | null;
  avatar?: string | null;
  focus: string;
  teamType: 'management' | 'board';
  region?: ContentRegion | null;
  status: ContentStatus;
  createdById: number;
}) {
  const prisma = getPrismaClient();
  const result = await prisma.cmsTeamMember.create({
    data: {
      ...data,
      publishedAt: data.status === "published" ? new Date() : null,
      updatedById: data.createdById,
    },
  });
  invalidateCache("teams:");
  return result;
}

export async function updateTeamMember(id: number, data: Partial<{
  name: string;
  role: string;
  joined: string | null;
  avatar: string | null;
  focus: string;
  teamType: 'management' | 'board';
  region: ContentRegion | null;
  status: ContentStatus;
}>, updatedById: number) {
  const prisma = getPrismaClient();
  const existing = await prisma.cmsTeamMember.findUnique({ where: { id } });
  const wasPublished = existing?.status !== "published" && data.status === "published";
  const result = await prisma.cmsTeamMember.update({
    where: { id },
    data: {
      ...data,
      updatedById,
      ...(wasPublished ? { publishedAt: new Date() } : {}),
      updatedAt: new Date(),
    },
  });
  invalidateCache("teams:");
  return result;
}

export async function deleteTeamMember(id: number) {
  const prisma = getPrismaClient();
  await prisma.cmsTeamMember.delete({ where: { id } });
  invalidateCache("teams:");
}

// ─── Media Items (Gallery/Documents) ───────────────────────────────────────
export interface MediaItem {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  mediaType: 'gallery' | 'document';
  fileUrl: string;
  coverImage: string | null;
  region: ContentRegion | null;
  status: ContentStatus;
  publishedAt: string | null;
  createdBy: { name: string };
}

export async function getMediaItems(opts: ListOptions & { type?: 'gallery' | 'document' | 'all' } = {}) {
  const key = `media:${JSON.stringify(opts)}`;
  const cached = getCache<MediaItem[]>(key);
  if (cached) return cached as MediaItem[];

  const prisma = getPrismaClient();
  const where: Record<string, unknown> = {};
  if (opts.region && opts.region !== "all") where.region = opts.region;
  if (opts.type && opts.type !== "all") where.mediaType = opts.type;
  where.status = opts.status && opts.status !== "all" ? opts.status : "published";

  const data = await prisma.cmsMediaItem.findMany({
    where,
    include: { createdBy: { select: { id: true, name: true } } },
    orderBy: { publishedAt: "desc" },
    take: opts.limit ?? 50,
    skip: opts.skip ?? 0,
  });

  setCache(key, data);
  return data as MediaItem[];
}

export async function getMediaItemById(id: number) {
  const prisma = getPrismaClient();
  return prisma.cmsMediaItem.findUnique({
    where: { id },
    include: { createdBy: { select: { name: true } } },
  });
}

export async function createMediaItem(data: {
  title: string;
  slug: string;
  description?: string | null;
  mediaType: 'gallery' | 'document';
  fileUrl: string;
  coverImage?: string | null;
  region?: ContentRegion | null;
  status: ContentStatus;
  createdById: number;
}) {
  const prisma = getPrismaClient();
  const result = await prisma.cmsMediaItem.create({
    data: {
      ...data,
      publishedAt: data.status === "published" ? new Date() : null,
      updatedById: data.createdById,
    },
  });
  invalidateCache("media:");
  return result;
}

export async function updateMediaItem(id: number, data: Partial<{
  title: string;
  slug: string;
  description: string | null;
  mediaType: 'gallery' | 'document';
  fileUrl: string;
  coverImage: string | null;
  region: ContentRegion | null;
  status: ContentStatus;
}>, updatedById: number) {
  const prisma = getPrismaClient();
  const existing = await prisma.cmsMediaItem.findUnique({ where: { id } });
  const wasPublished = existing?.status !== "published" && data.status === "published";
  const result = await prisma.cmsMediaItem.update({
    where: { id },
    data: {
      ...data,
      updatedById,
      ...(wasPublished ? { publishedAt: new Date() } : {}),
      updatedAt: new Date(),
    },
  });
  invalidateCache("media:");
  return result;
}

export async function deleteMediaItem(id: number) {
  const prisma = getPrismaClient();
  await prisma.cmsMediaItem.delete({ where: { id } });
  invalidateCache("media:");
}

// ─── Hero Slides (stored as CmsContent with contentType=blog, category=announcement) ──
export interface HeroSlide {
  id: string;
  label: string;
  heading: string;
  sub: string;
  bg: string;
  cta1Label: string;
  cta1Href: string;
  cta2Label: string;
  cta2Href: string;
  order: number;
  active: boolean;
}

const HERO_SLUG = "hero-slides-config";

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const key = "hero:slides";
  const cached = getCache<HeroSlide[]>(key);
  if (cached) return cached;

  const prisma = getPrismaClient();
  try {
    const record = await prisma.cmsContent.findUnique({ where: { slug: HERO_SLUG } });
    if (!record?.body) return [];
    const slides: HeroSlide[] = JSON.parse(record.body);
    const active = slides.filter((s) => s.active).sort((a, b) => a.order - b.order);
    setCache(key, active, 2 * 60 * 1000);
    return active;
  } catch {
    return [];
  }
}

export async function saveHeroSlides(slides: HeroSlide[], userId: number) {
  const prisma = getPrismaClient();
  const body = JSON.stringify(slides);
  const existing = await prisma.cmsContent.findUnique({ where: { slug: HERO_SLUG } });
  if (existing) {
    await prisma.cmsContent.update({
      where: { slug: HERO_SLUG },
      data: { body, updatedById: userId },
    });
  } else {
    await prisma.cmsContent.create({
      data: {
        title: "Hero Slides Configuration",
        slug: HERO_SLUG,
        contentType: "blog",
        category: "announcement",
        level: "national",
        body,
        createdById: userId,
        updatedById: userId,
      },
    });
  }
  invalidateCache("hero:");
}

