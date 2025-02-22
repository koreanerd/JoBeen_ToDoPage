import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { boardApi } from '@/services/api/boardApi';
import BoardContainer from '@/components/board/BoardContainer';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['boards'],
    queryFn: boardApi.fetchBoards,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center">
      <main className="w-full flex items-center justify-center ">
        <HydrationBoundary state={dehydratedState}>
          <BoardContainer />
        </HydrationBoundary>
      </main>
    </div>
  );
}
