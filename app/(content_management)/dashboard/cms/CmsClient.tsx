"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardSidebar from "@/components/cms/DashboardSidebar";
import UnifiedContentForm from "@/components/cms/UnifiedContentForm";
import { type CmsUserRecord } from "@/lib/cms/constants";
import { FileText, MapPin, User, CheckCircle, Trash2, Edit } from "lucide-react";

interface ContentItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  contentType: string;
  region: string;
  status: string;
  updatedAt: string;
  createdBy: { name: string };
}

type Props = {
  initialUser: CmsUserRecord;
};

const REGIONS = ["central", "northern", "southern", "eastern", "national"];

export default function CmsClient({ initialUser }: Props) {
  const [user, setUser] = useState(initialUser);
  const [activeTab, setActiveTab] = useState("overview");
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  const [users, setUsers] = useState<CmsUserRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter state
  const [contentTypeFilter, setContentTypeFilter] = useState("all");

  // User creation
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState<"regional_admin" | "super_admin">("regional_admin");
  const [newUserRegion, setNewUserRegion] = useState(REGIONS[0]);

  const canManageUsers = useMemo(() => user.role === "super_admin", [user.role]);

  useEffect(() => {
    void refreshMe();
    void refreshContent();
    if (canManageUsers) {
      void refreshUsers();
    }
  }, [canManageUsers]);

  useEffect(() => {
    filterContent();
  }, [allContent, contentTypeFilter]);

  async function refreshMe() {
    const res = await fetch("/api/auth/me");
    if (!res.ok) {
      window.location.href = "/dashboard/login";
      return;
    }
    const data = (await res.json()) as { user: CmsUserRecord };
    setUser(data.user);
  }

  async function refreshContent() {
    setLoading(true);
    try {
      // Fetch all content types
      const [announcementsRes, newsRes, briefingsRes, videosRes, blogsRes] = await Promise.all([
        fetch("/api/cms/announcements"),
        fetch("/api/cms/news"),
        fetch("/api/cms/press-briefings"),
        fetch("/api/cms/videos"),
        fetch("/api/cms/blogs"),
      ]);

      const announcements = announcementsRes.ok ? await announcementsRes.json() : [];
      const news = newsRes.ok ? await newsRes.json() : [];
      const briefings = briefingsRes.ok ? await briefingsRes.json() : [];
      const videos = videosRes.ok ? await videosRes.json() : [];
      const blogs = blogsRes.ok ? await blogsRes.json() : [];

      const allItems: ContentItem[] = [
        ...announcements.map((item: any) => ({ ...item, contentType: "announcement" })),
        ...news.map((item: any) => ({ ...item, contentType: "news" })),
        ...briefings.map((item: any) => ({ ...item, contentType: "press_briefing" })),
        ...videos.map((item: any) => ({ ...item, contentType: "video" })),
        ...blogs.map((item: any) => ({ ...item, contentType: "blog" })),
      ];

      setAllContent(allItems);
    } catch (error) {
      setMessage("Failed to load content");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  function filterContent() {
    if (contentTypeFilter === "all") {
      setFilteredContent(allContent);
    } else {
      setFilteredContent(allContent.filter((item) => item.contentType === contentTypeFilter));
    }
  }

  async function refreshUsers() {
    const res = await fetch("/api/cms/users");
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Unable to load users.");
      setMessageType("error");
      return;
    }
    setUsers(data.items || []);
  }

  async function handleContentSubmit(data: any) {
    setIsSubmitting(true);
    try {
      const endpoint = `/api/cms/${getEndpointForType(data.contentType)}`;
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        setMessage(result.error || "Failed to save content");
        setMessageType("error");
        return;
      }

      setMessage(
        editingId
          ? "Content updated successfully!"
          : "Content created successfully!"
      );
      setMessageType("success");
      setEditingId(null);
      await refreshContent();
    } catch (error) {
      setMessage("An error occurred while saving content");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  function getEndpointForType(type: string): string {
    const typeMap: Record<string, string> = {
      announcement: "announcements",
      news: "news",
      press_briefing: "press-briefings",
      blog: "blogs",
      video: "videos",
    };
    return typeMap[type] || "news";
  }

  async function deleteContent(id: number, type: string) {
    if (!window.confirm("Are you sure you want to delete this content?")) return;

    try {
      const endpoint = `/api/cms/${getEndpointForType(type)}/${id}`;
      const response = await fetch(endpoint, { method: "DELETE" });

      if (!response.ok) {
        setMessage("Failed to delete content");
        setMessageType("error");
        return;
      }

      setMessage("Content deleted successfully!");
      setMessageType("success");
      await refreshContent();
    } catch (error) {
      setMessage("An error occurred while deleting content");
      setMessageType("error");
    }
  }

  async function createUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/cms/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
          role: newUserRole,
          region: newUserRegion,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Failed to create user");
        setMessageType("error");
        return;
      }

      setNewUserName("");
      setNewUserEmail("");
      setNewUserPassword("");
      setNewUserRole("regional_admin");
      setNewUserRegion(REGIONS[0]);
      setMessage("User created successfully!");
      setMessageType("success");
      await refreshUsers();
    } catch (error) {
      setMessage("An error occurred while creating user");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/dashboard/login";
  }

  return (
    <div className="flex min-h-screen  bg-slate-50">
      {/* Sidebar */}
      <DashboardSidebar
        user={user}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={logout}
        canManageUsers={canManageUsers}
      />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-8">
        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              messageType === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
            <p className="text-slate-600 mb-8">Content management overview and statistics</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Content", value: allContent.length, icon: FileText, color: "bg-blue-50 border-blue-200" },
                { label: "Your Region", value: user.region.toUpperCase(), icon: MapPin, color: "bg-emerald-50 border-emerald-200" },
                { label: "Your Role", value: user.role.replace("_", " "), icon: User, color: "bg-purple-50 border-purple-200" },
                { label: "Status", value: "Active", icon: CheckCircle, color: "bg-emerald-50 border-emerald-200" },
              ].map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={idx}
                    className={`border rounded-lg p-6 ${stat.color}`}
                  >
                    <IconComponent className="text-blue-600 mb-3" size={24} />
                    <p className="text-xs text-slate-600 mb-2">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Create Content Tab */}
        {activeTab === "create" && (
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Create New Content</h1>
            <div className="bg-white border border-slate-200 rounded-lg p-8">
              <UnifiedContentForm
                regions={REGIONS}
                onSubmit={handleContentSubmit}
                isLoading={isSubmitting}
              />
            </div>
          </div>
        )}

        {/* Manage Content Tab */}
        {activeTab === "manage" && (
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Manage Content</h1>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Filter by Type
              </label>
              <select
                value={contentTypeFilter}
                onChange={(e) => setContentTypeFilter(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Content</option>
                <option value="announcement">Announcements</option>
                <option value="news">News</option>
                <option value="press_briefing">Press Briefings</option>
                <option value="blog">Blogs</option>
                <option value="video">Videos</option>
              </select>
            </div>

            {loading ? (
              <p className="text-slate-600">Loading content...</p>
            ) : filteredContent.length === 0 ? (
              <p className="text-slate-600">No content found.</p>
            ) : (
              <div className="space-y-4">
                {filteredContent.map((item) => (
                  <div
                    key={`${item.contentType}-${item.id}`}
                    className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                            {item.contentType.replace("_", " ").toUpperCase()}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.status === "published"
                                ? "bg-emerald-100 text-emerald-700"
                                : item.status === "draft"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {item.status.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{item.excerpt}</p>
                        <p className="text-xs text-slate-500 mt-2">
                          Region: <span className="font-semibold">{item.region}</span> • By{" "}
                          <span className="font-semibold">{item.createdBy.name}</span> •{" "}
                          {new Date(item.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                          <Edit size={18} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deleteContent(item.id, item.contentType)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                        >
                          <Trash2 size={18} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Manage Users</h1>

            {/* Create User Form */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Create New User</h2>
              <form onSubmit={createUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  required
                  placeholder="Full Name"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  required
                  placeholder="Email"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as "regional_admin" | "super_admin")}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="regional_admin">Regional Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
                <select
                  value={newUserRegion}
                  onChange={(e) => setNewUserRegion(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {REGIONS.map((region) => (
                    <option key={region} value={region}>
                      {region.charAt(0).toUpperCase() + region.slice(1)}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="md:col-span-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 font-semibold transition-colors"
                >
                  {isSubmitting ? "Creating..." : "Create User"}
                </button>
              </form>
            </div>

            {/* Users List */}
            <div className="bg-white border border-slate-200 rounded-lg p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">All Users</h2>
              {users.length === 0 ? (
                <p className="text-slate-600">No users found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-slate-300">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Region</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((row) => (
                        <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4">{row.name}</td>
                          <td className="py-3 px-4">{row.email}</td>
                          <td className="py-3 px-4 capitalize">{row.role.replace("_", " ")}</td>
                          <td className="py-3 px-4 capitalize">{row.region}</td>
                          <td className="py-3 px-4">
                            {new Date(row.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

