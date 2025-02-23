import { Board } from '@/types/board';

export const boardsData = {
  boards: [
    {
      id: 1,
      status: 'default',
      title: 'Not Started 📌',
      tasks: [
        {
          id: 1,
          title: 'How do I move boards?',
          description:
            'Hold the button at the top of the board and drag it left and right with all your might! 💪',
          boardId: 1,
        },
        {
          id: 2,
          title: 'How do I move cards?',
          description:
            'Hold the card and drag it top and bottom with all your might! 💪',
          boardId: 2,
        },
      ],
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
        {
          id: 3,
          title: 'How do I add new card?',
          description: 'Click the add button on the right side! Wow! →',
          boardId: 3,
        },
      ],
    },
  ] as Board[],
};
