'use client';

import { useId } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useBoard } from '@/hooks/useBoard';
import { svgPaths } from '@/config/svgPaths';
import DraggableBoardColumn from './DraggableBoardColumn';
import IconButton from '@/components/common/IconButton';
import SvgIcon from '@/components/icons/SvgIcon';

export default function BoardContainer() {
  const dndContextId = useId();
  const { boards, setBoards, addBoard, updateBoardOrder } = useBoard();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = boards.findIndex((b) => b.id === active.id);
    const newIndex = boards.findIndex((b) => b.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newBoards = arrayMove(boards, oldIndex, newIndex);

      setBoards(newBoards);

      updateBoardOrder.mutate(newBoards);
    }
  };

  return (
    <div className="w-full px-[100px] max-lg:px-[20px]">
      <div className="border-b border-border pb-[10px] mb-[25px] w-full text-heading font-bold">
        Your Pretty To-do List
      </div>

      <DndContext
        id={dndContextId}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={boards.map((b) => b.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-4">
            <div className="flex justify-between gap-4 px-[5px] w-full">
              {boards.map((board) => (
                <div key={board.id} className="relative w-full group">
                  <DraggableBoardColumn board={board} />
                </div>
              ))}

              <IconButton
                onClick={() =>
                  addBoard.mutate({
                    status: `custom-${boards.length + 1}`,
                    title: `New Board ${boards.length + 1}`,
                  })
                }
                icon={
                  <SvgIcon
                    className="text-accent hover:opacity-[50%]"
                    width={25}
                    height={25}
                    pathData={svgPaths.plus}
                    viewBox="0 0 20 20"
                  />
                }
                aria-label="Add Board"
                title="Add Board"
              />
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
