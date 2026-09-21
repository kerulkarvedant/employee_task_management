"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  ListTodo,
  Plus,
  ArrowRight,
} from "lucide-react";

import ProtectedRoute from "../../components/ProtectedRoute";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { getTasks } from "../../services/task.service";

function DashboardContent({ user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardTasks = async () => {
      try {
        const data = await getTasks();

        setTasks(data.tasks || []);
      } catch (error) {
        console.error("Dashboard tasks error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardTasks();
  }, []);

  // Task statistics
  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  // Latest 5 tasks
  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        user={user}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Dashboard
                </p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Welcome back,{" "}
                  {user?.name?.split(" ")[0]} 👋
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Here's what's happening with your tasks today.
                </p>
              </div>

              <a
                href="/dashboard/tasks"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                New Task
              </a>
            </div>

            {/* Stats */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {/* Total */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Total Tasks
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {loading ? "..." : totalTasks}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                    <ListTodo className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Pending */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Pending
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {loading ? "..." : pendingTasks}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                    <Clock3 className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </div>

              {/* Completed */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Completed
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {loading ? "..." : completedTasks}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Tasks */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Recent Tasks
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Your latest tasks
                  </p>
                </div>

                <a
                  href="/dashboard/tasks"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Loading */}
              {loading && (
                <div className="flex min-h-56 items-center justify-center">
                  <p className="text-sm text-slate-500">
                    Loading tasks...
                  </p>
                </div>
              )}

              {/* Empty */}
              {!loading && recentTasks.length === 0 && (
                <div className="flex min-h-56 items-center justify-center p-6">
                  <div className="text-center">

                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                      <ListTodo className="h-6 w-6 text-slate-400" />
                    </div>

                    <h4 className="mt-4 text-sm font-semibold text-slate-800">
                      No tasks yet
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      Create your first task to get started.
                    </p>

                    <a
                      href="/dashboard/tasks"
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                    >
                      <Plus className="h-4 w-4" />
                      Create Task
                    </a>

                  </div>
                </div>
              )}

              {/* Recent Tasks List */}
              {!loading && recentTasks.length > 0 && (
                <div className="divide-y divide-slate-100">

                  {recentTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex flex-col gap-3 px-5 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <h4 className="truncate text-sm font-semibold text-slate-800">
                          {task.title}
                        </h4>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {task.description || "No description"}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            task.status === "completed"
                              ? "bg-emerald-50 text-emerald-700"
                              : task.status === "in_progress"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {task.status === "in_progress"
                            ? "In Progress"
                            : task.status.charAt(0).toUpperCase() +
                              task.status.slice(1)}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            task.priority === "high"
                              ? "bg-red-50 text-red-700"
                              : task.priority === "medium"
                                ? "bg-purple-50 text-purple-700"
                                : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {task.priority.charAt(0).toUpperCase() +
                            task.priority.slice(1)}
                        </span>

                      </div>
                    </div>
                  ))}

                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      {(user) => <DashboardContent user={user} />}
    </ProtectedRoute>
  );
}