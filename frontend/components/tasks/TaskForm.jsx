"use client";

import { useEffect, useState } from "react";

const initialFormData = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  due_date: "",
};

const TaskForm = ({
  onSubmit,
  onCancel,
  loading = false,
  initialData = null,
  mode = "create",
}) => {
  const [formData, setFormData] = useState(initialFormData);

  // Load task data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "pending",
        priority: initialData.priority || "medium",
        due_date: initialData.dueDate
          ? new Date(initialData.dueDate)
              .toISOString()
              .split("T")[0]
          : "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [initialData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    await onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim() || null,
      due_date: formData.due_date || null,
    });
  };

  const isEditMode = mode === "edit";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-5"
    >
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Task Title
        </label>

        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
          disabled={loading}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe what needs to be completed..."
          rows={5}
          disabled={loading}
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50"
        />
      </div>

      {/* Status + Priority */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Status
          </label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label
            htmlFor="priority"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Priority
          </label>

          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label
          htmlFor="due_date"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Due Date
        </label>

        <input
          id="due_date"
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          disabled={loading}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50"
        />

        <p className="mt-2 text-xs text-slate-400">
          Select the date by which this task should be completed.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
        {/* Cancel */}
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Cancel
        </button>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          )}

          {loading
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
              ? "Update Task"
              : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
