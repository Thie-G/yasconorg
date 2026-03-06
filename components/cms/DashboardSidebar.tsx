"use client";

import { CmsUserRecord } from "@/lib/cms/constants";
import { useState } from "react";
import { Menu, X, BarChart3, Plus, FileText, Users, LogOut } from "lucide-react";

interface SidebarProps {
  user: CmsUserRecord;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  canManageUsers: boolean;
}

export default function DashboardSidebar({
  user,
  activeTab,
  onTabChange,
  onLogout,
  canManageUsers,
}: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "create", label: "Create Content", icon: Plus },
    { id: "manage", label: "Manage Content", icon: FileText },
    ...(canManageUsers ? [{ id: "users", label: "Users", icon: Users }] : []),
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-40 md:hidden bg-slate-700 text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white transform transition-transform md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } z-30 md:z-20 overflow-y-auto`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Brand/Header */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-100">CMS Admin</h2>
            <p className="text-xs text-slate-400 mt-1">Content Management</p>
          </div>

          {/* User Info */}
          <div className="mb-8 pb-6 border-b border-slate-700">
            <p className="text-xs text-slate-400 mb-2">Logged in as</p>
            <p className="font-semibold text-slate-100">{user.name}</p>
            <p className="text-xs text-slate-400 mt-2 capitalize">{user.role.replace("_", " ")}</p>
            <p className="text-xs text-slate-400 capitalize">{user.region}</p>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <IconComponent size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-medium transition-colors text-slate-200"
          >
            <LogOut size={20} />
            <span className="text-sm">Sign out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
