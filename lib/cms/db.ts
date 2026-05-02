import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { hashPassword } from "./security";

declare global {
  var __prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  return new PrismaClient();
}

export function getPrismaClient(): PrismaClient {
  if (process.env.NODE_ENV === 'production') {
    return createPrismaClient();
  }
  if (!global.__prisma) {
    global.__prisma = createPrismaClient();
  }
  return global.__prisma;
}

export async function ensureCmsSchema() {
  const client = getPrismaClient();
  await ensureBootstrapAdmin(client);
}

async function ensureBootstrapAdmin(client: PrismaClient) {
  const email = process.env.CMS_SUPERADMIN_EMAIL;
  const password = process.env.CMS_SUPERADMIN_PASSWORD;
  const name = process.env.CMS_SUPERADMIN_NAME ?? "CMS Super Admin";

  if (!email || !password) return;

  const existing = await client.cmsUser.findUnique({ where: { email } });
  if (existing) return;

  await client.cmsUser.create({
    data: {
      name,
      email,
      passwordHash: hashPassword(password),
      role: "super_admin",
      region: "national",
    },
  });
}
