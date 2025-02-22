'use client';

import { Board } from '@/types/board';
import { useBoard } from '@/hooks/useBoard';
import { svgPaths } from '@/config/svgPaths';
import BoardColumn from '@/components/board/BoardColumn';
import IconButton from '@/components/common/IconButton';
import SvgIcon from '@/components/icons/SvgIcon';

export default function BoardContainer({
  initialData,
}: {
  initialData: Board[];
}) {
  const { boards, addBoard, deleteBoard, updateBoardTitle } =
    useBoard(initialData);

  return (
    <div className="w-full px-[100px] max-lg:px-[20px]">
      <div className="border-b border-border pb-[10px] mb-[25px] w-full text-heading font-bold">
        Your Pretty To-do List
      </div>

      <div className="flex gap-4">
        <div className="flex justify-between gap-4 px-[5px] w-full">
          {boards.map((board) => (
            <div key={board.id} className="relative w-full group">
              <IconButton
                onClick={() => deleteBoard.mutate(board.id)}
                icon={
                  <SvgIcon
                    className="text-fade hover:text-accent"
                    width={25}
                    height={25}
                    pathData={svgPaths.trash}
                    viewBox="0 0 20 20"
                  />
                }
                aria-label="Delete Board"
                title="Delete Board"
                className="absolute top-0 right-0 hidden group-hover:flex pointer-events-auto"
              />

              <BoardColumn
                key={board.status}
                id={board.id}
                title={board.title}
                onUpdateTitle={(id, title) =>
                  updateBoardTitle.mutate({ id, title })
                }
              />
            </div>
          ))}
        </div>

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
              pathData={svgPaths.plust}
              viewBox="0 0 20 20"
            />
          }
          aria-label="Add Board"
          title="Add Board"
        />
      </div>
    </div>
  );
}
