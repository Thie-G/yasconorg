import { NextRequest, NextResponse } from "next/server";
import { initCms } from "@/lib/cms/init";
import { getSessionUserFromRequest } from "@/lib/cms/auth";
import { canCreateOrEditContent } from "@/lib/cms/permissions";
import { getPrismaClient } from "@/lib/cms/db";
import { revalidatePath } from "next/cache";

const VACANCY_PAGES = ["/careers", "/dashboard/cms/vacancy/manage"];

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initCms();
    const { id } = await params;
    const numericId = parseInt(id);
    if (isNaN(numericId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    const prisma = getPrismaClient();
    const item = await prisma.cmsVacancy.findUnique({ where: { id: numericId }, include: { createdBy: { select: { name: true } } } });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch (error) {
    console.error("Vacancy GET error:", error);
    return NextResponse.json({ error: "Failed to fetch vacancy" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initCms();
    const user = await getSessionUserFromRequest(req);
    if (!user || !canCreateOrEditContent(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const numericId = parseInt(id);
    if (isNaN(numericId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    const body = await req.json();
    const prisma = getPrismaClient();
    const existing = await prisma.cmsVacancy.findUnique({ where: { id: numericId } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const wasPublished = existing.status !== "published" && body.status === "published";
    const updated = await prisma.cmsVacancy.update({
      where: { id: numericId },
      data: {
        ...body,
        deadline: body.deadline ? new Date(body.deadline) : null,
        publishedAt: wasPublished ? new Date() : undefined,
        updatedById: user.id,
        updatedAt: new Date(),
      },
    });
    VACANCY_PAGES.forEach((p) => revalidatePath(p));
    return NextResponse.json(updated);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to update vacancy";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initCms();
    const user = await getSessionUserFromRequest(req);
    if (!user || !canCreateOrEditContent(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const numericId = parseInt(id);
    if (isNaN(numericId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    const prisma = getPrismaClient();
    const existing = await prisma.cmsVacancy.findUnique({ where: { id: numericId } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await prisma.cmsVacancy.delete({ where: { id: numericId } });
    VACANCY_PAGES.forEach((p) => revalidatePath(p));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Vacancy DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete vacancy" }, { status: 500 });
  }
}
