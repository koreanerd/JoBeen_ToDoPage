import { useState } from 'react';
import { UseMutationResult } from '@tanstack/react-query';

export function useEditTitle(
  initialTitle: string,
  updateBoardTitle: UseMutationResult<
    any,
    any,
    { id: number; title: string },
    any
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
