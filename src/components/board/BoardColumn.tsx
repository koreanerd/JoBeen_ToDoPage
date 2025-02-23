'use client';

import { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Board } from '@/types/board';
import { Task } from '@/types/task';
import { useBoard } from '@/hooks/useBoard';
import { useTask } from '@/hooks/useTask';
import { svgPaths } from '@/config/svgPaths';
import SvgIcon from '../icons/SvgIcon';
import IconButton from '../common/IconButton';
import DraggableTaskCard from '../card/DraggableTaskCard';
import { UseMutationResult } from '@tanstack/react-query';

interface BoardColumnProps {
  board: Board;
  tasks: Task[];
  addTask: UseMutationResult<
    Task,
    Error,
    { boardId: number; title: string },
    unknown
  >;
}

export default function BoardColumn({
  board,
  tasks,
  addTask,
}: BoardColumnProps) {
  const { updateBoardTitle, deleteBoard } = useBoard();
  const { updateTaskOrder } = useTask(board.id);

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(board.title);

  const boardTasks: Task[] = Array.isArray(tasks) ? tasks : [];

  const handleEdit = () => setIsEditing(true);

  const handleConfirmEdit = () => {
    setIsEditing(false);
    if (newTitle.trim() !== '' && newTitle !== board.title) {
      updateBoardTitle.mutate({ id: board.id, title: newTitle });
    } else {
      setNewTitle(board.title);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || !overData) return;

    if (activeData.type === 'task' && overData.type === 'task') {
      const fromBoardId = activeData.boardId;
      const toBoardId = overData.boardId;

      if (fromBoardId === toBoardId) {
        updateTaskOrder(fromBoardId, activeData.taskId, overData.taskId);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-[12px] mt-[5px] mb-[12px]">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleConfirmEdit}
            onKeyDown={(e) => e.key === 'Enter' && handleConfirmEdit()}
            className="px-[5px] border border-fade bg-fade rounded focus:outline-none"
            autoFocus
          />
        ) : (
          <h2
            onClick={handleEdit}
            className="px-[5px] border border-accent rounded cursor-pointer"
          >
            {board.title}
          </h2>
        )}
        <IconButton
          onClick={() => deleteBoard.mutate(board.id)}
          icon={
            <SvgIcon
              className="text-accent opacity-[50%] hover:text-accent hover:opacity-[100%]"
              width={25}
              height={25}
              pathData={svgPaths.trash}
              viewBox="0 0 20 20"
            />
          }
          aria-label="Delete Board"
          title="Delete Board"
        />
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={boardTasks.map((task) => `task-${task.id}`)}
          strategy={verticalListSortingStrategy}
        >
          <div>
            {boardTasks.map((task) => (
              <DraggableTaskCard
                key={task.id}
                boardId={board.id}
                task={{ ...task, description: task.description ?? '' }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <button
        onClick={() => addTask.mutate({ boardId: board.id, title: 'New Task' })}
        className="flex items-center gap-[5px] w-full py-[5px] pl-[15px] border border-fade mt-[12px] rounded-[5px] hover:border-none hover:bg-accent"
      >
        <SvgIcon
          className="text-fade"
          width={20}
          height={20}
          pathData={svgPaths.plus}
          viewBox="0 0 20 20"
        />
        <div className="text-subHeading text-fade">New task</div>
      </button>
    </div>
  );
}
