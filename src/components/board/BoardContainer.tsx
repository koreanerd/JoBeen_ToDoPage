import BoardColumn from '@/components/board/BoardColumn';

export default function BoardContainer() {
  return (
    <div>
      <div className="border-b border-border pb-[10px] mb-[25px] w-full text-heading font-bold">
        Your Pretty To-do List
      </div>

      <div className="flex justify-between gap-4 px-[5px] w-full">
        <BoardColumn status="notStarted" title="Not started" />

        <BoardColumn status="inProgress" title="In progress" />

        <BoardColumn status="done" title="Done" />
      </div>
    </div>
  );
}
