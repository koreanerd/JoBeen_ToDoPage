import { Board } from '@/types/board';
import { apiClient } from '@/services/apiClient';

const API_BASE_URL = '/api/boards';

export const boardApi = {
  fetchBoards: () => apiClient<Board[]>(API_BASE_URL, 'GET'),
  addBoard: (newBoard: Omit<Board, 'id'>) =>
    apiClient<Board>(API_BASE_URL, 'POST', newBoard),
  deleteBoard: (id: number) => apiClient(API_BASE_URL, 'DELETE', { id }),
  updateBoard: ({ id, title }: { id: number; title: string }) =>
    apiClient<Board>(API_BASE_URL, 'PUT', { id, title }),
  updateBoardOrder: async (boards: Board[]): Promise<void> => {
    await apiClient(API_BASE_URL, 'PUT', { boards });
  },
};
