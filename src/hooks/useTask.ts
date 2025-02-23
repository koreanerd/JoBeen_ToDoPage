import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { arrayMove } from '@dnd-kit/sortable';
import { taskApi } from '@/services/api/taskApi';
import { Task } from '@/types/task';

export function useTask(boardId: number) {
  const queryClient = useQueryClient();

  const { data: tasks = [] } = useQuery<Task[], Error>({
    queryKey: ['tasks', boardId],
    queryFn: () => taskApi.fetchTasks(boardId),
  });

  const addTask = useMutation({
    mutationFn: (newTask: { boardId: number; title: string }) =>
      taskApi.addTask(newTask),
    onSuccess: (newTask) => {
      queryClient.setQueryData(['tasks', boardId], (oldTasks: Task[] = []) => [
        ...oldTasks,
        newTask,
      ]);
    },
  });

  const deleteTask = useMutation({
    mutationFn: (taskId: number) => {
      return taskApi.deleteTask(boardId, taskId);
    },
    onSuccess: (_, taskId) => {
      queryClient.setQueryData(['tasks', boardId], (oldTasks: Task[] = []) =>
        oldTasks.filter((task) => task.id !== taskId),
      );
    },
  });

  const updateTask = useMutation({
    mutationFn: ({
      taskId,
      boardId,
      title,
      description,
    }: {
      taskId: number;
      boardId: number;
      title: string;
      description: string;
    }) => taskApi.updateTask({ taskId, boardId, title, description }),
    onSuccess: (updatedTask: Task) => {
      queryClient.setQueryData(['tasks', boardId], (oldTasks: Task[] = []) =>
        oldTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task,
        ),
      );
    },
  });

  const updateTaskOrder = (
    boardId: number,
    fromTaskId: number,
    toTaskId: number,
  ) => {
    queryClient.setQueryData(['tasks', boardId], (oldTasks: Task[]) => {
      const fromIndex = oldTasks.findIndex((task) => task.id === fromTaskId);
      const toIndex = oldTasks.findIndex((task) => task.id === toTaskId);
      const newTasks = arrayMove(oldTasks, fromIndex, toIndex);

      taskApi.updateTaskOrder(boardId, newTasks);

      return newTasks;
    });
  };

  return {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    updateTaskOrder,
  };
}
