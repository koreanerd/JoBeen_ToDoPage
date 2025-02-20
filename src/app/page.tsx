import BoardContainer from '@/components/board/BoardContainer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-[1000px]">
        <BoardContainer />
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
