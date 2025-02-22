'use client';

import { Board } from '@/types/board';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { boardApi } from '@/services/api/boardApi';
export const useBoard = (initialData: Board[]) => {
  const queryClient = useQueryClient();

  const { data: boards = [] } = useQuery({
    queryKey: ['boards'],
    queryFn: boardApi.fetchBoards,
    initialData,
  });

  const addBoard = useMutation({
    mutationFn: boardApi.addBoard,
    onSuccess: (newBoard) => {
      queryClient.setQueryData(['boards'], (oldBoards: Board[] = []) => [
        ...oldBoards,
        newBoard,
      ]);
    },
  });

  const deleteBoard = useMutation({
    mutationFn: boardApi.deleteBoard,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(['boards'], (oldBoards: Board[] = []) =>
        oldBoards.filter((board) => board.id !== deletedId),
      );
    },
  });

  const updateBoardTitle = useMutation({
    mutationFn: boardApi.updateBoard,
    onSuccess: (updatedBoard) => {
      queryClient.setQueryData(['boards'], (oldBoards: Board[] = []) =>
        oldBoards.map((board) =>
          board.id === updatedBoard.id ? updatedBoard : board,
        ),
      );
    },
  });

  return { boards, addBoard, deleteBoard, updateBoardTitle };
};
