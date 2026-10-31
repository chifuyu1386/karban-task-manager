// src/api/tasksApi.ts
import type { Task, CreateTaskInput, TaskStatus } from "../types/task";

const BASE_URL = "http://localhost:3001";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error("خطا در دریافت لیست تسک‌ها از سرور");
  }
  return response.json();
};

export const createTask = async (newTask: CreateTaskInput): Promise<Task> => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  if (!response.ok) {
    throw new Error("خطا در ثبت تسک جدید");
  }
  return response.json();
};

export const updateTaskStatus = async ({
  id,
  status,
}: {
  id: string;
  status: TaskStatus;
}): Promise<Task> => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error("خطا در بروزرسانی وضعیت تسک");
  }
  return response.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("خطا در حذف تسک");
  }
};
