"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import {
  Bell,
  ClipboardCheck,
  LogOut,
  Menu,
  User,
  ListTodo,
} from "lucide-react";

import { logoutUser } from "../services/auth.service";

export default function Navbar({ user, onMenuClick }) {
  const router = useRouter();
  const pathname = usePathname();

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await logoutUser();

      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
    }
  };

  const isTasksPage = pathname === "/dashboard/tasks";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">

        {/* Left */}
        <div className="flex items-center gap-3">

          {/* Mobile menu */}
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
              <ClipboardCheck className="h-5 w-5 text-white" />
            </div>

            <div>
              <h1 className="text-sm font-bold text-slate-900 sm:text-base">
                TaskFlow
              </h1>

              <p className="hidden text-xs text-slate-400 sm:block">
                Employee Task Management
              </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            <Link
              href="/dashboard"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                pathname === "/dashboard"
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              Dashboard
            </Link>

            <Link
              href="/dashboard/tasks"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isTasksPage
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <ListTodo className="h-4 w-4" />
              Tasks
            </Link>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Notifications */}
          <button
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>

          <div className="hidden h-7 w-px bg-slate-200 sm:block" />

          {/* User */}
          <div className="flex items-center gap-3">

            {/* User information */}
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-slate-400">
                {user?.email || ""}
              </p>
            </div>

            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
              <User className="h-5 w-5 text-blue-600" />
            </div>

            {/* Desktop Logout */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60 md:flex"
            >
              <LogOut className="h-4 w-4" />

              {loggingOut ? "Logging out..." : "Logout"}
            </button>

            {/* Mobile Logout */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60 md:hidden"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}