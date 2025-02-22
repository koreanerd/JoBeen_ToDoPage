'use client';

import { useState } from 'react';
import { Board } from '@/types/board';
import { useBoard } from '@/hooks/useBoard';
import { svgPaths } from '@/config/svgPaths';
import TaskCard from '@/components/card/TaskCard';
import SvgIcon from '../icons/SvgIcon';
import IconButton from '../common/IconButton';

export default function BoardColumn({ id, title }: Board) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const { updateBoardTitle, deleteBoard } = useBoard();

  const handleEdit = () => setIsEditing(true);

  const handleConfirmEdit = () => {
    setIsEditing(false);
    if (newTitle.trim() !== '' && newTitle !== title) {
      updateBoardTitle.mutate({ id, title: newTitle });
    } else {
      setNewTitle(title);
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
            {title}
          </h2>
        )}

        <div className="text-body">0</div>

        <IconButton
          onClick={() => deleteBoard.mutate(id)}
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
          className="absolute top-[25px] right-0 hidden group-hover:flex pointer-events-auto"
        />
      </div>

      <div>
        <TaskCard />
      </div>

      <div className="flex items-center gap-[5px] py-[5px] pl-[15px] border border-fade mt-[12px] rounded-[5px] hover:border-none hover:bg-accent">
        <SvgIcon
          className="text-fade"
          width={20}
          height={20}
          pathData="M9.5 4.25C9.91421 4.25 10.25 4.58579 10.25 5V9.25H14.5C14.9142 9.25 15.25 9.58579 15.25 10C15.25 10.4142 14.9142 10.75 14.5 10.75H10.25V15C10.25 15.4142 9.91421 15.75 9.5 15.75C9.08579 15.75 8.75 15.4142 8.75 15V10.75H4.5C4.08579 10.75 3.75 10.4142 3.75 10C3.75 9.58579 4.08579 9.25 4.5 9.25H8.75V5C8.75 4.58579 9.08579 4.25 9.5 4.25Z"
          viewBox="0 0 20 20"
        />

        <div className="text-subHeading text-fade">New task</div>
      </div>
    </div>
  );
}
