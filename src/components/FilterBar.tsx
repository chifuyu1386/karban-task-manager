// src/components/FilterBar.tsx
import { Search, LayoutGrid, Columns3, RotateCcw } from 'lucide-react';
import {
  useUIStore,
  type FilterStatus,
  type FilterPriority,
} from '../store/useUIStore';

export const FilterBar = () => {
  const {
    searchQuery,
    statusFilter,
    priorityFilter,
    viewMode,
    setSearchQuery,
    setStatusFilter,
    setPriorityFilter,
    setViewMode,
    resetFilters,
  } = useUIStore();

  const hasActiveFilters =
    searchQuery !== '' || statusFilter !== 'all' || priorityFilter !== 'all';

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در عنوان یا توضیحات..."
            className="w-full rounded-xl border border-slate-200 py-2 pr-9 pl-3 text-sm outline-none transition-colors focus:border-blue-600"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-600"
        >
          <option value="all">همه وضعیت‌ها</option>
          <option value="todo">برای انجام</option>
          <option value="in-progress">در حال انجام</option>
          <option value="done">انجام شده</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as FilterPriority)}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-600"
        >
          <option value="all">همه اولویت‌ها</option>
          <option value="high">فوری</option>
          <option value="medium">متوسط</option>
          <option value="low">عادی</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex cursor-pointer items-center gap-1 rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>حذف فیلترها</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-1 self-end rounded-xl bg-slate-100 p-1 md:self-auto">
        <button
          onClick={() => setViewMode('kanban')}
          className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            viewMode === 'kanban'
              ? 'bg-white text-blue-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Columns3 className="h-4 w-4" />
          <span>کانبان</span>
        </button>
        <button
          onClick={() => setViewMode('grid')}
          className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            viewMode === 'grid'
              ? 'bg-white text-blue-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <LayoutGrid className="h-4 w-4" />
          <span>شبکه‌ای</span>
        </button>
      </div>
    </div>
  );
};