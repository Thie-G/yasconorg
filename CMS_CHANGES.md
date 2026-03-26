# CMS Extension — Changes & Fix Log

## Bugs Fixed

### 1. `management/page.tsx` — Critical: Page was completely broken
**Problem:** Duplicate `type Member` declaration, leftover static array literal as orphaned code, `getManagementTeam()` was defined but never called, component was sync (not `async`), `nationalCoordinator` and `team` variables referenced but never declared.

**Fix:** Rewrote as a proper `async` Server Component. Calls `getManagementTeam()` at the top, passes data to typed card components. Added graceful empty states and null-safety for missing avatars.

---

### 2. `board/page.tsx` — Hardcoded static data, not CMS-driven
**Problem:** Page used a hardcoded `const boardMembers = [...]` array. Changes to board members required a code deployment.

**Fix:** Converted to an `async` Server Component that calls `getTeamMembers({ type: 'board', status: 'published' })`. Full empty state and avatar fallback included.

---

### 3. `teams/create/page.tsx` — Illegal `async` on a Client Component
**Problem:** Component was marked `"use client"` AND `export default async function` — Next.js forbids async Client Components. Additionally used `useState(await ...)` which is also illegal.

**Fix:** Removed `async`, replaced with `useEffect` that calls `/api/auth/me` to get the current user and pre-fill region. Full error/success toast feedback, proper loading states with `Loader2` spinner.

---

### 4. `media/create/page.tsx` — Same async Client Component bug
**Problem:** Same `async` + `"use client"` violation as teams create page.

**Fix:** Same pattern — `useEffect` for auth, proper state management.

---

### 5. `lib/cms/constants.ts` — Missing type exports
**Problem:** `CmsTeamType`, `CmsMediaType`, `CmsRegion`, `ContentStatus` types were used in multiple files but not exported from constants.

**Fix:** Added all four type exports.

---

### 6. `CmsClient.tsx` — Teams and Media tabs existed in sidebar but had no panel content
**Problem:** The sidebar showed "Teams & Board" and "Gallery & Documents" tabs, but `CmsClient.tsx` had no `{activeTab === "teams"}` or `{activeTab === "media"}` sections — clicking them showed a blank page.

**Fix:** Added full panel content for both tabs including card grid views, inline publish/unpublish, edit navigation, delete with confirmation modal, and type filtering. Also replaced `window.confirm()` for all deletes with a proper modal.

---

### 7. `api/cms/teams/route.ts` — Missing `slug` generation on POST
**Problem:** `createTeamMember` requires a `slug` field (unique constraint in schema) but the route handler never generated one.

**Fix:** Route now generates `slug = generateSlug(name) + '-' + Date.now()` for guaranteed uniqueness.

---

### 8. `lib/cms/service.ts` — `createTeamMember` missing `slug` in type signature
**Problem:** The service function signature didn't include `slug`, causing a TypeScript error when the route tried to pass it.

**Fix:** Added `slug: string` to the `createTeamMember` data parameter type.

---

### 9. DB Migration mismatch: `avatar_url` vs `avatar`, missing `slug` column
**Problem:** The initial migration SQL used `avatar_url` but the Prisma schema uses `avatar`. Also `slug` was missing from `cms_team_members` DDL.

**Fix:** Added `20260326120000_add_teams_media_fixes` migration that safely renames the column and adds the `slug` column with backfill for existing rows.

---

## New Files Added

### Dashboard Management Pages
| File | Purpose |
|------|---------|
| `dashboard/cms/teams/create/page.tsx` | Create team member (fixed) |
| `dashboard/cms/teams/manage/page.tsx` | Full teams list with inline edit/delete/publish |
| `dashboard/cms/teams/edit/[id]/page.tsx` | Edit existing team member |
| `dashboard/cms/media/create/page.tsx` | Upload gallery image or document (fixed) |
| `dashboard/cms/media/manage/page.tsx` | Full media list with inline edit/delete/publish |
| `dashboard/cms/media/edit/[id]/page.tsx` | Edit existing media item |

### Website Pages (now CMS-driven)
| File | Purpose |
|------|---------|
| `(website)/about/management/page.tsx` | Management team — now reads from DB |
| `(website)/impact/national/board/page.tsx` | Board of trustees — now reads from DB |

---

## How To Use

### Adding a Management Team Member
1. Go to Dashboard → Teams & Board tab
2. Click **Add Member**
3. Fill in: Name, Role, Team Type (`management`), Region (`national` for National Coordinator, or a specific region for regional coordinators), Bio/Focus, upload photo
4. Set Status to **Published** to show on website
5. The National Coordinator card is the first `management` member with `region = national`

### Adding a Board of Trustees Member
Same steps but set Team Type to **Board of Trustees** — these appear on `/impact/national/board`

### Gallery & Documents
1. Dashboard → Gallery & Documents tab
2. Click **Add Media**, choose Gallery Image or Document
3. Upload file, set region, publish

### Full Management
Click **Full Manager** button in the tab header for a dedicated table view with bulk status filtering, search-friendly layout, and direct edit links.

---

## Seeding Initial Team Data
Run this in your CMS dashboard or via a seed script to import the existing hardcoded team members:

```
POST /api/cms/teams
{
  "name": "Clement Chiwambo",
  "role": "Funding & Compliance Manager",
  "joined": "2025",
  "avatar": "/teampics/funding-officer.webp",
  "focus": "...",
  "teamType": "management",
  "region": "central",
  "status": "published"
}
```
Repeat for each member. The national coordinator should use `region: "national"`.
