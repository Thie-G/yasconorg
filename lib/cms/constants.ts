export const CMS_SESSION_COOKIE = "cms_session";

export interface CmsUserRecord {
  id: number;
  name: string;
  email: string;
  role: "super_admin" | "regional_admin";
  region: "national" | "northern" | "central" | "southern" | "eastern";
  created_at: string;
}

export type CmsRegion = "national" | "northern" | "central" | "southern" | "eastern";
export type ContentStatus = "draft" | "published" | "archived";
export type CmsTeamType = "management" | "board";
export type CmsMediaType = "gallery" | "document";

export const CMS_ROLES = ["super_admin", "regional_admin"] as const;
export const CMS_REGIONS = ["national", "northern", "central", "southern", "eastern"] as const;
export type CmsRole = typeof CMS_ROLES[number];
