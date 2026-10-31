import { useTasks } from './hooks/useTasks';
import { useUIStore } from './store/useUIStore';
import { AddTaskModal } from './components/AddTaskModal';

export default function App() {
  const { data: tasks, isLoading, isError, error } = useTasks();
  const { openAddModal } = useUIStore();

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">کاربان (Karban)</h1>
            <p className="text-sm text-slate-500 mt-1">مدیریت هوشمند و حرفه‌ای تسک‌ها</p>
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
                <div key={item} className="h-24 w-full animate-pulse rounded-2xl bg-white p-6 shadow-sm" />
              ))}
            </div>
          )}

          {isError && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-red-600">
              <p className="font-semibold">مشکلی در ارتباط با سرور پیش آمد!</p>
              <p className="mt-1 text-sm">{error.message}</p>
            </div>
          )}

          {tasks && (
            <div className="grid gap-4 md:grid-cols-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
                >
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {task.status === 'todo' && 'برای انجام'}
                        {task.status === 'in-progress' && 'در حال انجام'}
                        {task.status === 'done' && 'انجام شده'}
                      </span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                          task.priority === 'high'
                            ? 'bg-red-50 text-red-600'
                            : task.priority === 'medium'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-emerald-50 text-emerald-600'
                        }`}
                      >
                        {task.priority === 'high' ? 'فوری' : task.priority === 'medium' ? 'متوسط' : 'عادی'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-800">{task.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{task.description}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
                    <span>تاریخ: {task.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <AddTaskModal />
    </div>
  );
}