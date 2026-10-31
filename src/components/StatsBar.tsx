// src/components/StatsBar.tsx
import { CheckCircle2, Clock, ListTodo, Layers } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';

export const StatsBar = () => {
  const { data: tasks } = useTasks();

  if (!tasks) return null;

  const total = tasks.length;
  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in-progress').length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;

  const stats = [
    {
      label: 'کل تسک‌ها',
      value: total,
      icon: Layers,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'برای انجام',
      value: todoCount,
      icon: ListTodo,
      color: 'text-slate-600 bg-slate-100',
    },
    {
      label: 'در حال انجام',
      value: inProgressCount,
      icon: Clock,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      label: 'انجام شده',
      value: doneCount,
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50',
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-sm border border-slate-100"
          >
            <div className={`rounded-xl p-2.5 ${stat.color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">{stat.label}</p>
              <p className="mt-0.5 text-lg font-bold text-slate-800">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};