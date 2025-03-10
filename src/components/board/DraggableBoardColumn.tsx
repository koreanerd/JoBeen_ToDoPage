'use client';

import { Board } from '@/types/board';
import { CSS } from '@dnd-kit/utilities';
import BoardColumn from '@/components/board/BoardColumn';
import { useSortable } from '@dnd-kit/sortable';
import { useTask } from '@/hooks/useTask';

interface DraggableBoardColumnProps {
  board: Board;
}

export default function DraggableBoardColumn({
  board,
}: DraggableBoardColumnProps) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: board.id,
  });

  const { tasks, addTask } = useTask(board.id);

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative w-full group">
      <div
        className="drag-handle cursor-grab flex items-center justify-center h-[25px] hover:bg-fade hover:rounded-[4px] transition-colors duration-300"
        {...listeners}
        {...attributes}
      >
        <div className="w-[10px] h-[10px] flex flex-col justify-between">
          <div className="w-full h-[2px] bg-fade"></div>

          <div className="w-full h-[2px] bg-fade"></div>

          <div className="w-full h-[2px] bg-fade"></div>
        </div>
      </div>

      <BoardColumn board={board} tasks={tasks} addTask={addTask} />
    </div>
  );
}
