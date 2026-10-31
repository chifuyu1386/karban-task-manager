import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTasks, createTask } from "../api/tasksApi";

export const TASK_QUERY_KEY = ["tasks"] as const;

export const useTasks = () => {
  return useQuery({
    queryKey: TASK_QUERY_KEY,
    queryFn: fetchTasks,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEY });
    },
  });
};
