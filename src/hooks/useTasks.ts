import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} from '../api/tasksApi';

export const TASK_QUERY_KEY = ['tasks'] as const;


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


export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEY });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEY });
    },
  });
};