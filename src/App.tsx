// src/App.tsx
import { useTasks } from "./hooks/useTasks";
import { useUIStore } from "./store/useUIStore";
import { AddTaskModal } from "./components/AddTaskModal";
import { TaskCard } from "./components/TaskCard";
import { FilterBar } from "./components/FilterBar";
import { KanbanBoard } from "./components/KanbanBoard";
import { StatsBar } from "./components/StatsBar";

export default function App() {
  const { data: tasks, isLoading, isError, error } = useTasks();
  const { openAddModal, searchQuery, statusFilter, priorityFilter, viewMode } =
    useUIStore();

  const filteredTasks = tasks?.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans md:p-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              کاربان (Karban)
            </h1>
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

        <StatsBar />

        <FilterBar />

        <main>
          {isLoading && (
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-40 w-full animate-pulse rounded-2xl bg-white p-6 shadow-sm"
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

          {filteredTasks && filteredTasks.length === 0 && (
            <div className="rounded-2xl bg-white p-12 text-center text-slate-500 shadow-sm">
              هیچ تسکی با این مشخصات پیدا نشد!
            </div>
          )}

          {filteredTasks && filteredTasks.length > 0 && (
            <>
              {viewMode === "kanban" ? (
                <KanbanBoard tasks={filteredTasks} />
              ) : (
                <div className="grid gap-4 md:grid-cols-3">
                  {filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <AddTaskModal />
    </div>
  );
}
