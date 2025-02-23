'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from './TaskCard';

interface DraggableTaskCardProps {
  boardId: number;
  task: {
    id: number;
    title: string;
    description: string;
  };
}

export default function DraggableTaskCard({
  boardId,
  task,
}: DraggableTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: `task-${task.id}`,
    data: { type: 'task', taskId: task.id, boardId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
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
      <TaskCard
        id={task.id}
        title={task.title}
        description={task.description}
        boardId={boardId}
      />
    </div>
  );
}
