// src/components/KanbanBoard.tsx
import type { Task, TaskStatus } from '../types/task';
import { TaskCard } from './TaskCard';

interface KanbanBoardProps {
  tasks: Task[];
}

const COLUMNS: { title: string; status: TaskStatus; dotColor: string }[] = [
  { title: 'برای انجام', status: 'todo', dotColor: 'bg-slate-400' },
  { title: 'در حال انجام', status: 'in-progress', dotColor: 'bg-blue-500' },
  { title: 'انجام شده', status: 'done', dotColor: 'bg-emerald-500' },
];

export const KanbanBoard = ({ tasks }: KanbanBoardProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {COLUMNS.map((col) => {
        const columnTasks = tasks.filter((t) => t.status === col.status);

        return (
          <div
            key={col.status}
            className="flex flex-col rounded-2xl bg-slate-200/60 p-4"
          >
            <div className="mb-4 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${col.dotColor}`} />
                <h2 className="text-sm font-bold text-slate-700">{col.title}</h2>
              </div>
              <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-slate-600 shadow-2xs">
                {columnTasks.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {columnTasks.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-xs text-slate-400">
                  تسکی در این ستون نیست
                </div>
              ) : (
                columnTasks.map((task) => <TaskCard key={task.id} task={task} />)
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};