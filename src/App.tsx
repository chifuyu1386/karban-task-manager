// src/App.tsx
import { useTasks } from './hooks/useTasks';
import { useUIStore } from './store/useUIStore';
import { AddTaskModal } from './components/AddTaskModal';
import { TaskCard } from './components/TaskCard';

export default function App() {
  const { data: tasks, isLoading, isError, error } = useTasks();
  const { openAddModal } = useUIStore();

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">کاربان (Karban)</h1>
            <p className="mt-1 text-sm text-slate-500">
              مدیریت هوشمند و حرفه‌ای تسک‌ها
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="cursor-pointer rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-200 transition-colors hover:bg-blue-700"
          >
            + تسک جدید
          </button>
        </header>

        <main>
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-24 w-full animate-pulse rounded-2xl bg-white p-6 shadow-sm"
                />
              ))}
            </div>
          )}

          {isError && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-red-600">
              <p className="font-semibold">مشکلی در ارتباط با سرور پیش آمد!</p>
              <p className="mt-1 text-sm">{error.message}</p>
            </div>
          )}

          {tasks && tasks.length === 0 && (
            <div className="rounded-2xl bg-white p-12 text-center text-slate-500 shadow-sm">
              هیچ تسکی وجود ندارد. اولین تسک خود را بسازید!
            </div>
          )}

          {tasks && tasks.length > 0 && (
            <div className="grid gap-4 md:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </main>
      </div>

      <AddTaskModal />
    </div>
  );
}