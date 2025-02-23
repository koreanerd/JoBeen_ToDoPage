import { Task } from '@/types/task';
import { apiClient } from '@/services/apiClient';

const API_BASE_URL = '/api/tasks';

export const taskApi = {
  fetchTasks: (boardId: number) =>
    apiClient<Task[]>(`/api/tasks?boardId=${boardId}`, 'GET'),
  addTask: (newTask: { boardId: number; title: string }) =>
    apiClient<Task>('/api/tasks', 'POST', newTask),
  deleteTask: (boardId: number, taskId: number) => {
    return apiClient<void>(API_BASE_URL, 'DELETE', { boardId, taskId });
  },
  updateTask: ({
    taskId,
    boardId,
    title,
    description,
  }: {
    taskId: number;
    boardId: number;
    title: string;
    description: string;
  }) =>
    apiClient<Task>(`/api/tasks`, 'PUT', {
      taskId,
      boardId,
      title,
      description,
    }),
  updateTaskOrder: (boardId: number, tasks: Task[]) =>
    apiClient<Task[]>(`/api/tasks`, 'PUT', { boardId, tasks }),
  moveTask: ({
    taskId,
    fromBoardId,
    toBoardId,
  }: {
    taskId: number;
    fromBoardId: number;
    toBoardId: number;
  }) =>
    apiClient<Task>(`/api/tasks/move`, 'POST', {
      taskId,
      fromBoardId,
      toBoardId,
    }),
};
