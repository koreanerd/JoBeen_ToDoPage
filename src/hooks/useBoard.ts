'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Board } from '@/types/board';
import { boardApi } from '@/services/api/boardApi';

export const useBoard = () => {
  const queryClient = useQueryClient();

  const { data: boards = [] } = useQuery({
    queryKey: ['boards'],
    queryFn: boardApi.fetchBoards,
  });

  const setBoards = (newBoards: Board[]) => {
    queryClient.setQueryData(['boards'], newBoards);
  };

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

  const updateBoardOrder = useMutation({
    mutationFn: boardApi.updateBoardOrder,
    onSuccess: (updatedBoards) => {
      queryClient.setQueryData(['boards'], updatedBoards);
    },
  });

  return {
    boards,
    setBoards,
    addBoard,
    deleteBoard,
    updateBoardTitle,
    updateBoardOrder,
  };
};
