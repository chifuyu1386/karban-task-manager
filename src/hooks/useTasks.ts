import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasksApi";

export const TASK_QUERY_KEY = ["tasks"] as const;

export const useTasks = () => {
  return useQuery({
    queryKey: TASK_QUERY_KEY,
    queryFn: fetchTasks,
  });
};
