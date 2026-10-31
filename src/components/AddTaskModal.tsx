// src/components/AddTaskModal.tsx
import { useState } from 'react';
import { X } from 'lucide-react';
import { useUIStore } from '../store/useUIStore';
import { useCreateTask } from '../hooks/useTasks';
import type { TaskPriority } from '../types/task';

export const AddTaskModal = () => {
  const { isAddModalOpen, closeAddModal } = useUIStore();
  const { mutate, isPending, isError, error } = useCreateTask();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  if (!isAddModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    mutate(
      {
        title,
        description,
        priority,
        status: 'todo', 
        createdAt: new Date().toLocaleDateString('fa-IR'), 
      },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
          setPriority('medium');
          closeAddModal(); 
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-800">افزودن تسک جدید</h2>
          <button
            onClick={closeAddModal}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              عنوان تسک
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلاً: طراحی صفحه ورود کاربران"
              disabled={isPending}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              توضیحات
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="جزئیات کوتاه درباره این تسک..."
              disabled={isPending}
              className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              اولویت
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              disabled={isPending}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-blue-600"
            >
              <option value="low">عادی</option>
              <option value="medium">متوسط</option>
              <option value="high">فوری</option>
            </select>
          </div>

          {isError && (
            <p className="text-xs text-red-600">خطا: {error.message}</p>
          )}

          <div className="mt-6 flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeAddModal}
              disabled={isPending}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? 'در حال ثبت...' : 'ذخیره تسک'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};