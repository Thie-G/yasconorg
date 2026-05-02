import { NextRequest, NextResponse } from "next/server";
import { initCms } from "@/lib/cms/init";
import { getSessionUserFromRequest } from "@/lib/cms/auth";
import { canCreateOrEditContent } from "@/lib/cms/permissions";
import { getPrismaClient } from "@/lib/cms/db";
import { generateSlug } from "@/lib/cms/utils";

export async function GET(req: NextRequest) {
  try {
    await initCms();
    const prisma = getPrismaClient();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "published";
    const region = searchParams.get("region");
    const limit = Number(searchParams.get("limit")) || 50;

    const where: Record<string, unknown> = {};
    if (status !== "all") where.status = status;
    if (region && region !== "all") where.region = region;

    const items = await prisma.cmsVacancy.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { createdBy: { select: { name: true } } },
    });

    return NextResponse.json(items, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Vacancies GET error:", error);
    return NextResponse.json({ error: "Failed to fetch vacancies" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await initCms();
    const user = await getSessionUserFromRequest(req);
    if (!user || !canCreateOrEditContent(user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    if (!body.title || !body.department || !body.location || !body.region || !body.employmentType) {
      return NextResponse.json({ error: "title, department, location, region and employmentType are required" }, { status: 400 });
    }

    const prisma = getPrismaClient();
    const slug = `${generateSlug(body.title)}-${Date.now()}`;

    const item = await prisma.cmsVacancy.create({
      data: {
        title: body.title,
        slug,
        department: body.department,
        location: body.location,
        region: body.region,
        employmentType: body.employmentType,
        deadline: body.deadline ? new Date(body.deadline) : null,
        excerpt: body.excerpt ?? "",
        richContent: body.richContent ?? "",
        coverImage: typeof body.coverImage === "object" && body.coverImage?.url ? body.coverImage.url : (body.coverImage ?? null),
        applyUrl: body.applyUrl ?? null,
        status: body.status ?? "draft",
        publishedAt: body.status === "published" ? new Date() : null,
        createdById: user.id,
        updatedById: user.id,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to create vacancy";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

