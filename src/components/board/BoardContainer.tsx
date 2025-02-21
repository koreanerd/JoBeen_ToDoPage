import { boardData } from '@/config/constants';
import BoardColumn from '@/components/board/BoardColumn';

export default function BoardContainer() {
  return (
    <div className="w-full px-[100px] max-lg:px-[20px]">
      <div className="border-b border-border pb-[10px] mb-[25px] w-full text-heading font-bold">
        Your Pretty To-do List
      </div>

      <div className="flex justify-between gap-4 px-[5px] w-full">
        {boardData.map((board) => (
          <BoardColumn
            key={board.status}
            status={board.status}
            title={board.title}
          />
        ))}
      </div>
    </div>
  );
}
