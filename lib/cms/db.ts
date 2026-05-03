import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { hashPassword } from "./security";
import { PrismaPg } from '@prisma/adapter-pg';

declare global {
  // Prevent multiple instances in dev (hot reload)
  var __prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL!;
  
  // In serverless, connection_limit=1 is critical
  const url = connectionString.includes('connection_limit') 
    ? connectionString 
    : `${connectionString}${connectionString.includes('?') ? '&' : '?'}connection_limit=1`;

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString: url }),
  });
}

export function getPrismaClient(): PrismaClient {
  if (process.env.NODE_ENV === 'production') {
    // In production (serverless), always create a fresh client
    // Connection pooling is handled by PgBouncer/the pooler URL
    return createPrismaClient();
  }

  // In development, reuse the singleton to avoid hot-reload exhaustion
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