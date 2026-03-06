import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getPrismaClient } from "./db";
import { CMS_SESSION_COOKIE, type CmsUserRecord } from "./constants";
import {
  generateSessionToken,
  hashSessionToken,
  verifyPassword,
} from "./security";

const SESSION_DAYS = 7;

export async function authenticateUser(email: string, password: string) {
  const client = getPrismaClient();
  const normalizedEmail = email.toLowerCase().trim();

  const user = await client.cmsUser.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    return null;
  }

  if (!verifyPassword(password, user.passwordHash)) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    region: user.region,
    created_at: user.createdAt.toISOString(),
  } satisfies CmsUserRecord;
}

export async function createSession(userId: number) {
  const client = getPrismaClient();
  const token = generateSessionToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await client.cmsSession.create({
    data: {
      tokenHash,
      userId,
      expiresAt,
    },
  });

  return { token, expiresAt };
}

export async function invalidateSession(token: string) {
  const client = getPrismaClient();
  const tokenHash = hashSessionToken(token);

  await client.cmsSession.deleteMany({
    where: { tokenHash },
  });
}

export async function getSessionUserByToken(token: string) {
  const client = getPrismaClient();
  const tokenHash = hashSessionToken(token);

  const session = await client.cmsSession.findUnique({
    where: { tokenHash },
    include: {
      user: true,
    },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  const user = session.user;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    region: user.region,
    created_at: user.createdAt.toISOString(),
  } satisfies CmsUserRecord;
}

export async function getSessionUserFromRequest(req: NextRequest) {
  const token = req.cookies.get(CMS_SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }
  return getSessionUserByToken(token);
}

export async function getCurrentDashboardUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CMS_SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }
  return getSessionUserByToken(token);
}

export function attachSessionCookie(
  response: NextResponse,
  token: string,
  expiresAt: Date
) {
  response.cookies.set(CMS_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(CMS_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}
