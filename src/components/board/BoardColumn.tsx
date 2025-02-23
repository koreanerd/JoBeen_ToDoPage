'use client';

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
import { useEditTitle } from '@/hooks/useEditTitle';
import { handleTaskDragEnd } from '@/utils/utils';

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

  const { isEditing, newTitle, setNewTitle, handleEdit, handleConfirmEdit } =
    useEditTitle(
      board.title,
      updateBoardTitle as UseMutationResult<
        Board,
        Error,
        { id: number; title: string },
        void
      >,
      board.id,
    );

  const boardTasks: Task[] = tasks || [];

  const handleDragEnd = (event: DragEndEvent) => {
    handleTaskDragEnd(event, updateTaskOrder);
  };

  const handleAddTask = () => {
    addTask.mutate({ boardId: board.id, title: 'New Task' });
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
        <div className="ml-auto">
          <div className="group relative">
            <IconButton
              onClick={() => deleteBoard.mutate(board.id)}
              icon={
                <SvgIcon
                  className="opacity-[50%] group-hover:text-accent group-hover:opacity-[100%]"
                  width={25}
                  height={25}
                  pathData={svgPaths.trash}
                  viewBox="0 0 20 20"
                />
              }
              aria-label="Delete Board"
              title="Delete Board"
              className="opacity-0 group-hover:opacity-100"
            />
          </div>
        </div>
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
        onClick={handleAddTask}
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
