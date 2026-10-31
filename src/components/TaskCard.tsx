// src/components/TaskCard.tsx
import { Trash2 } from 'lucide-react';
import type { Task, TaskStatus } from '../types/task';
import { useUpdateTaskStatus, useDeleteTask } from '../hooks/useTasks';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { mutate: changeStatus, isPending: isUpdating } = useUpdateTaskStatus();
  const { mutate: removeTask, isPending: isDeleting } = useDeleteTask();

  const isBusy = isUpdating || isDeleting;

  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md ${
        isBusy ? 'pointer-events-none opacity-50' : ''
      }`}
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <select
            value={task.status}
            onChange={(e) =>
              changeStatus({
                id: task.id,
                status: e.target.value as TaskStatus,
              })
            }
            disabled={isBusy}
            className="cursor-pointer rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 outline-none hover:bg-slate-200"
          >
            <option value="todo">برای انجام</option>
            <option value="in-progress">در حال انجام</option>
            <option value="done">انجام شده</option>
          </select>

          <span
            className={`rounded-md px-2 py-0.5 text-xs font-medium ${
              task.priority === 'high'
                ? 'bg-red-50 text-red-600'
                : task.priority === 'medium'
                ? 'bg-amber-50 text-amber-600'
                : 'bg-emerald-50 text-emerald-600'
            }`}
          >
            {task.priority === 'high'
              ? 'فوری'
              : task.priority === 'medium'
              ? 'متوسط'
              : 'عادی'}
          </span>
        </div>

        <h3
          className={`text-base font-bold text-slate-800 ${
            task.status === 'done' ? 'line-through text-slate-400' : ''
          }`}
        >
          {task.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">
          {task.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
        <span>تاریخ: {task.createdAt}</span>
        <button
          onClick={() => removeTask(task.id)}
          disabled={isBusy}
          title="حذف تسک"
          className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};