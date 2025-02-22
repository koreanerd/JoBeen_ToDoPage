import { boardApi } from '@/services/api/boardApi';
import BoardContainer from '@/components/board/BoardContainer';

export default async function Home() {
  const initialData = await boardApi.fetchBoards();

  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center">
      <main className="w-full flex items-center justify-center ">
        <BoardContainer initialData={initialData} />
      </main>
    </div>
  );
}
