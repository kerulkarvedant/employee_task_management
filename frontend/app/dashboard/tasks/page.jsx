"use client";

import { useEffect, useState } from "react";
import { Plus, X, ListTodo } from "lucide-react";

import ProtectedRoute from "../../../components/ProtectedRoute";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";

import TaskList from "../../../components/tasks/TaskList";
import TaskForm from "../../../components/tasks/TaskForm";

import {
  createTask,
  getTasks,
} from "../../../services/task.service";

function TasksContent({ user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();

      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Fetch tasks error:", error);

      setError(error.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create Task
  const handleCreateTask = async (taskData) => {
    try {
      setCreating(true);
      setError("");

      const data = await createTask(taskData);

      setTasks((prevTasks) => [
        data.task,
        ...prevTasks,
      ]);

      setShowCreateForm(false);
    } catch (error) {
      console.error("Create task error:", error);

      setError(error.message || "Failed to create task");
    } finally {
      setCreating(false);
    }
  };

  // Edit Task
  const handleEdit = (task) => {
    console.log("Edit task:", task);
  };

  // Delete Task
  const handleDelete = (task) => {
    console.log("Delete task:", task);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <Navbar
        user={user}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Tasks
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Task Management
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Create, manage and track your tasks.
                </p>
              </div>

              {!showCreateForm && (
                <button
                  onClick={() => {
                    setError("");
                    setShowCreateForm(true);
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:w-auto"
                >
                  <Plus className="h-4 w-4" />
                  Create Task
                </button>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-600">
                  {error}
                </p>

                <button
                  onClick={() => setError("")}
                  className="shrink-0 rounded-md p-1 text-red-500 transition hover:bg-red-100 hover:text-red-700"
                  aria-label="Close error"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Create Task Form */}
            {showCreateForm && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                      Create New Task
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Add a new task to your task list.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    disabled={creating}
                    className="self-start rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Close form"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <TaskForm
                  onSubmit={handleCreateTask}
                  onCancel={() => setShowCreateForm(false)}
                  loading={creating}
                  mode="create"
                />
              </div>
            )}

            {/* Task Section */}
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Your Tasks
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    {loading
                      ? "Loading your tasks..."
                      : `${tasks.length} ${
                          tasks.length === 1 ? "task" : "tasks"
                        } available`}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <ListTodo className="h-5 w-5 text-blue-600" />
                </div>
              </div>

              {/* Loading */}
              {loading && (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                  <p className="mt-4 text-sm text-slate-500">
                    Loading tasks...
                  </p>
                </div>
              )}

              {/* Tasks */}
              {!loading && (
                <TaskList
                  tasks={tasks}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function TasksPage() {
  return (
    <ProtectedRoute>
      {(user) => <TasksContent user={user} />}
    </ProtectedRoute>
  );
}