import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { hashPassword } from "./security";
import { PrismaPg} from '@prisma/adapter-pg';



let prisma: PrismaClient | null = null;

export function getPrismaClient() {
  if (!prisma) {
   prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
})
  }
  return prisma;
}

export async function ensureCmsSchema() {
  const client = getPrismaClient();
  await ensureBootstrapAdmin(client);
}

async function ensureBootstrapAdmin(client: PrismaClient) {
  const email = process.env.CMS_SUPERADMIN_EMAIL;
  const password = process.env.CMS_SUPERADMIN_PASSWORD;
  const name = process.env.CMS_SUPERADMIN_NAME ?? "CMS Super Admin";

  if (!email || !password) {
    return;
  }

  const existing = await client.cmsUser.findUnique({
    where: { email },
  });

  if (existing) {
    return;
  }

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

