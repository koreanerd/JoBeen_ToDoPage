import BoardContainer from '@/components/board/BoardContainer';

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center">
      <main className="w-full flex items-center justify-center ">
        <BoardContainer />
      </main>
    </div>
  );
}
