"use client";

import { Trash2, Pencil } from "lucide-react";

const TaskCard = ({ task, onEdit, onDelete }) => {
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

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="rounded-lg border p-2 text-gray-600 transition hover:bg-gray-100"
          >
            <Pencil size={17} />
          </button>

          <button
            onClick={() => onDelete(task)}
            className="rounded-lg border p-2 text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          {task.status}
        </span>

        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
          {task.priority}
        </span>

        {task.dueDate && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;