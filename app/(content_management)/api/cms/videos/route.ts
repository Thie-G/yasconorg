import { NextRequest, NextResponse } from "next/server";
import { getPrismaClient, ensureCmsSchema } from "@/lib/cms/db";
import { getSessionUserFromRequest } from "@/lib/cms/auth";
import {  canManageUsers } from "@/lib/cms/permissions";
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

    const videos = await client.cmsVideo.findMany({
      where,
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { publishedAt: "desc" },
      take: 50,
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error("Video fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
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

    if (!body.videoUrl) {
      return NextResponse.json(
        { error: "Video URL is required" },
        { status: 400 }
      );
    }

    const slug = generateSlug(body.title);
    const existingSlug = await client.cmsVideo.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return NextResponse.json(
        { error: "Slug already exists. Title must be unique." },
        { status: 400 }
      );
    }

    const video = await client.cmsVideo.create({
      data: {
        title: body.title,
        slug,
        excerpt: body.excerpt,
        richContent: body.richContent,
        coverImage: body.coverImage || null,
        videoUrl: body.videoUrl,
        videoDuration: body.videoDuration || null,
        region: body.region,
        status: body.status || "draft",
        publishedAt: body.status === "published" ? new Date() : null,
        createdById: user.id,
        updatedById: user.id,
      },
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error("Video creation error:", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}
