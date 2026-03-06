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
import { getForcedScopeForUser, isSuperAdmin } from "@/lib/cms/permissions";

function isValidEnumValue<T extends readonly string[]>(
  values: T,
  value: string | null | undefined
): value is T[number] {
  return !!value && values.includes(value);
}

function normalizeSlug(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET(req: NextRequest) {
  const user = await getSessionUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureCmsSchema();
  const client = getPrismaClient();

  const params = req.nextUrl.searchParams;
  const where: any = {};

  const search = params.get("search");
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
    ];
  }

  const contentType = params.get("contentType");
  if (isValidEnumValue(CMS_CONTENT_TYPES, contentType)) {
    where.contentType = contentType;
  }

  const category = params.get("category");
  if (isValidEnumValue(CMS_CATEGORIES, category)) {
    where.category = category;
  }

  const scope = getForcedScopeForUser(user);
  if (scope) {
    where.level = scope.level;
    where.region = scope.region;
  } else {
    const level = params.get("level");
    if (isValidEnumValue(CMS_LEVELS, level)) {
      where.level = level;
    }
    const region = params.get("region");
    if (isValidEnumValue(CMS_REGIONS, region) && region !== "national") {
      where.region = region;
    }
  }

  const items = await client.cmsContent.findMany({
    where,
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({
    items: items.map((item: any) => ({
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
    })),
  });
}

export async function POST(req: NextRequest) {
  const user = await getSessionUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureCmsSchema();
  const client = getPrismaClient();

  const body = (await req.json()) as {
    title?: string;
    slug?: string;
    contentType?: CmsContentType;
    category?: CmsCategory;
    level?: CmsLevel;
    region?: CmsRegion | null;
    body?: string;
  };

  const title = body.title?.trim();
  const contentType = body.contentType;
  const category = body.category;
  const bodyText = body.body?.trim() ?? "";

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (!contentType || !CMS_CONTENT_TYPES.includes(contentType)) {
    return NextResponse.json({ error: "Invalid content type." }, { status: 400 });
  }
  if (!category || !CMS_CATEGORIES.includes(category)) {
    return NextResponse.json({ error: "Invalid category." }, { status: 400 });
  }

  const forcedScope = getForcedScopeForUser(user);
  const level: CmsLevel = forcedScope?.level ?? body.level ?? "regional";
  const region: CmsRegion | null =
    forcedScope?.region ?? (body.region && body.region !== "national" ? body.region : null);

  if (!CMS_LEVELS.includes(level)) {
    return NextResponse.json({ error: "Invalid level." }, { status: 400 });
  }

  if (level === "regional" && (!region || region === "national")) {
    return NextResponse.json(
      { error: "Regional content must have a valid region." },
      { status: 400 }
    );
  }

  if (level === "national" && !isSuperAdmin(user)) {
    return NextResponse.json(
      { error: "Only super admins can create national content." },
      { status: 403 }
    );
  }

  const slug = normalizeSlug(body.slug || title);
  if (!slug) {
    return NextResponse.json({ error: "Invalid slug." }, { status: 400 });
  }

  try {
    const item = await client.cmsContent.create({
      data: {
        title,
        slug,
        contentType,
        category,
        level,
        region,
        body: bodyText,
        createdById: user.id,
        updatedById: user.id,
      },
    });

    return NextResponse.json(
      {
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
      },
      { status: 201 }
    );
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("Unique constraint failed")
        ? "Slug already exists."
        : "Failed to create content.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

