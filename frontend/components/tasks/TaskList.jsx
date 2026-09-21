"use client";

import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-white p-10 text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          No tasks found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Create your first task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;