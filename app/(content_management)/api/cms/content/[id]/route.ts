import { NextRequest, NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/lib/cms/auth";
import {
  CMS_CATEGORIES,
  CMS_CONTENT_TYPES,
  CMS_LEVELS,
  CMS_REGIONS,
  type CmsCategory,
  type CmsContentType,
  type CmsLevel,
  type CmsRegion,
} from "@/lib/cms/constants";
import { ensureCmsSchema, getPrismaClient } from "@/lib/cms/db";
import {
  canAccessContentScope,
  getForcedScopeForUser,
  isSuperAdmin,
} from "@/lib/cms/permissions";

function normalizeSlug(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await ensureCmsSchema();
  const client = getPrismaClient();

  const id = Number((await context.params).id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });
  }

  const existing = await client.cmsContent.findUnique({
    where: { id },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  if (!canAccessContentScope(user, { level: existing.level, region: existing.region })) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const body = (await req.json()) as {
    title?: string;
    slug?: string;
    contentType?: CmsContentType;
    category?: CmsCategory;
    level?: CmsLevel;
    region?: CmsRegion | null;
    body?: string;
  };

  const forced = getForcedScopeForUser(user);
  const nextLevel = (forced?.level ?? body.level ?? existing.level) as CmsLevel;
  const nextRegion =
    forced?.region ??
    (body.region === undefined ? existing.region : body.region === "national" ? null : body.region);

  if (!CMS_LEVELS.includes(nextLevel)) {
    return NextResponse.json({ error: "Invalid level." }, { status: 400 });
  }
  if (nextLevel === "national" && !isSuperAdmin(user)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  if (nextLevel === "regional" && (!nextRegion || nextRegion === "national")) {
    return NextResponse.json({ error: "Region is required for regional level." }, { status: 400 });
  }
  if (nextRegion && !CMS_REGIONS.includes(nextRegion)) {
    return NextResponse.json({ error: "Invalid region." }, { status: 400 });
  }

  const nextTitle = body.title?.trim() || existing.title;
  const nextSlug = body.slug ? normalizeSlug(body.slug) : existing.slug;
  const nextContentType = (body.contentType ?? existing.contentType) as CmsContentType;
  const nextCategory = (body.category ?? existing.category) as CmsCategory;
  const nextBody = body.body ?? existing.body;

  if (!CMS_CONTENT_TYPES.includes(nextContentType)) {
    return NextResponse.json({ error: "Invalid content type." }, { status: 400 });
  }
  if (!CMS_CATEGORIES.includes(nextCategory)) {
    return NextResponse.json({ error: "Invalid category." }, { status: 400 });
  }
  if (!nextSlug) {
    return NextResponse.json({ error: "Invalid slug." }, { status: 400 });
  }

  try {
    const item = await client.cmsContent.update({
      where: { id },
      data: {
        title: nextTitle,
        slug: nextSlug,
        contentType: nextContentType,
        category: nextCategory,
        level: nextLevel,
        region: nextRegion,
        body: nextBody,
        updatedById: user.id,
      },
    });
    return NextResponse.json({
      item: {
        id: item.id,
        title: item.title,
        slug: item.slug,
        content_type: item.contentType,
        category: item.category,
        level: item.level,
        region: item.region,
        body: item.body,
        created_at: item.createdAt.toISOString(),
        updated_at: item.updatedAt.toISOString(),
        created_by: item.createdById,
        updated_by: item.updatedById,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("Unique constraint failed")
        ? "Slug already exists."
        : "Failed to update content.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await ensureCmsSchema();
  const client = getPrismaClient();

  const id = Number((await context.params).id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });
  }

  const existing = await client.cmsContent.findUnique({
    where: { id },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  if (!canAccessContentScope(user, { level: existing.level, region: existing.region })) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  await client.cmsContent.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}

