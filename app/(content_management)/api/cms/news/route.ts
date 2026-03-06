import { NextRequest, NextResponse } from "next/server";
import { getPrismaClient, ensureCmsSchema } from "@/lib/cms/db";
import { getSessionUserFromRequest } from "@/lib/cms/auth";
import { canManageUsers} from "@/lib/cms/permissions";
import { generateSlug } from "@/lib/cms/utils";

export async function GET(req: NextRequest) {
  try {
    await ensureCmsSchema();
    const client = getPrismaClient();
    
    const { searchParams } = new URL(req.url);
    const region = searchParams.get("region");
    const status = searchParams.get("status") || "published";

    const where: any = {};
    if (region && region !== "all") {
      where.region = region;
    }
    if (status !== "all") {
      where.status = status;
    }

    const news = await client.cmsNews.findMany({
      where,
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { publishedAt: "desc" },
      take: 50,
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error("News fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureCmsSchema();
    const user = await getSessionUserFromRequest(req);

    if (!user || !canManageUsers(user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const client = getPrismaClient();

    const slug = generateSlug(body.title);
    const existingSlug = await client.cmsNews.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return NextResponse.json(
        { error: "Slug already exists. Title must be unique." },
        { status: 400 }
      );
    }

    const newsItem = await client.cmsNews.create({
      data: {
        title: body.title,
        slug,
        excerpt: body.excerpt,
        richContent: body.richContent,
        coverImage: body.coverImage.url || null,
        region: body.region,
        status: body.status || "draft",
        publishedAt: body.status === "published" ? new Date() : null,
        createdById: user.id,
        updatedById: user.id,
      },
    });

    return NextResponse.json(newsItem, { status: 201 });
  } catch (error) {
    console.error("News creation error:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}
