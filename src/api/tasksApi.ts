import type { Task, CreateTaskInput } from "../types/task";

const BASE_URL = "http://localhost:3001";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error("خطا در دریافت تسک ها از سرور");
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
