import { useState } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { Board } from '@/types/board';

export function useEditTitle(
  initialTitle: string,
  updateBoardTitle: UseMutationResult<
    Board,
    Error,
    { id: number; title: string },
    void
  >,
  boardId: number,
) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(initialTitle);

  const handleEdit = () => setIsEditing(true);

  const handleConfirmEdit = () => {
    setIsEditing(false);
    if (newTitle.trim() !== '' && newTitle !== initialTitle) {
      updateBoardTitle.mutate({ id: boardId, title: newTitle });
    } else {
      setNewTitle(initialTitle);
    }
  };

  return {
    isEditing,
    newTitle,
    setNewTitle,
    handleEdit,
    handleConfirmEdit,
  };
}
