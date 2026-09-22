"use client";

import { Trash2, Pencil } from "lucide-react";

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  deleting = false,
}) => {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {task.title}
          </h3>

          <p className="mt-2 text-sm text-gray-600">
            {task.description || "No description"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {/* Edit */}
          <button
            type="button"
            onClick={() => onEdit(task)}
            disabled={deleting}
            className="rounded-lg border p-2 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Edit task"
          >
            <Pencil size={17} />
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(task)}
            disabled={deleting}
            className="rounded-lg border p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Delete task"
          >
            {deleting ? (
              <span className="block h-[17px] w-[17px] animate-spin rounded-full border-2 border-red-200 border-t-red-600" />
            ) : (
              <Trash2 size={17} />
            )}
          </button>
        </div>
      </div>

      {/* Task Details */}
      <div className="mt-4 flex flex-wrap gap-2">
        {/* Status */}
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          {task.status}
        </span>

        {/* Priority */}
        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
          {task.priority}
        </span>

        {/* Due Date */}
        {task.dueDate && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            Due:{" "}
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
