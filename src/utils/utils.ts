import { Board } from '@/types/board';
import { arrayMove } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core';

export const handleBoardDragEnd = (
  boards: Board[],
  setBoards: (newBoards: Board[]) => void,
  updateBoardOrder: any,
  activeId: number,
  overId: number,
) => {
  const oldIndex = boards.findIndex((b) => b.id === activeId);
  const newIndex = boards.findIndex((b) => b.id === overId);

  if (oldIndex !== -1 && newIndex !== -1) {
    const newBoards = arrayMove(boards, oldIndex, newIndex);
    setBoards(newBoards);
    updateBoardOrder.mutate(newBoards);
  }
};

export const handleTaskDragEnd = (
  event: DragEndEvent,
  updateTaskOrder: (
    fromBoardId: number,
    fromTaskId: number,
    toTaskId: number,
  ) => void,
) => {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  const activeData = active.data.current;
  const overData = over.data.current;

  if (!activeData || !overData) return;

  if (activeData.type === 'task' && overData.type === 'task') {
    const fromBoardId = activeData.boardId;
    const toBoardId = overData.boardId;

    if (fromBoardId === toBoardId) {
      updateTaskOrder(
        fromBoardId,
        Number(activeData.taskId),
        Number(overData.taskId),
      );
    }
  }
};
