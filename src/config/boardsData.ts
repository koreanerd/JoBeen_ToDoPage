import { Board } from '@/types/board';

export const boardsData = {
  boards: [
    {
      id: 1,
      status: 'default',
      title: 'Not Started 📌',
      tasks: [{ id: 1, title: 'Task 1', description: 'Wakeup!', boardId: 1 }],
    },
    {
      id: 2,
      status: 'default',
      title: 'In Progress 📌',
      tasks: [
        { id: 2, title: 'Task 2', description: 'Do something.', boardId: 2 },
      ],
    },
    {
      id: 3,
      status: 'default',
      title: 'Completed 📌',
      tasks: [
        { id: 3, title: 'Task 3', description: 'Do homework.', boardId: 3 },
      ],
    },
  ] as Board[],
};
