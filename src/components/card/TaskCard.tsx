import { useState, RefObject } from 'react';
import { useTask } from '@/hooks/useTask';
import { useMenuToggle } from '@/hooks/useMenuToggle';
import IconButton from '../common/IconButton';
import SvgIcon from '../icons/SvgIcon';
import { svgPaths } from '@/config/svgPaths';

interface TaskCardProps {
  title: string;
  description?: string;
  boardId: number;
  id: number;
}

interface TaskMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  menuRef: RefObject<HTMLDivElement | null>;
}

const TaskMenu: React.FC<TaskMenuProps> = ({ onEdit, onDelete, menuRef }) => (
  <div
    ref={menuRef}
    className="absolute left-[10px] top-[15px] w-fit bg-white shadow-lg border border-border rounded-[5px] z-10"
  >
    <button
      onClick={onEdit}
      className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
    >
      Edit
    </button>

    <button
      onClick={onDelete}
      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
    >
      Delete
    </button>
  </div>
);

export default function TaskCard({
  title,
  description = '',
  boardId,
  id,
}: TaskCardProps) {
  const { deleteTask, updateTask } = useTask(boardId);
  const { isMenuOpen, toggleMenu, menuRef } = useMenuToggle();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleEdit = () => {
    setIsEditing(true);
    toggleMenu();
  };

  const handleSave = () => {
    updateTask.mutate({
      taskId: id,
      boardId,
      title: editedTitle,
      description: editedDescription,
    });

    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="p-[15px] rounded-lg shadow-[2px_2px_4px_2px_rgba(0,0,0,0.1)]">
        <div className="flex flex-nowrap items-center gap-[5px] max-md:w-[120px]">
          <SvgIcon
            className="text-accent"
            width={24}
            height={24}
            pathData="M16 4H9.5L7 14L10.3614 13.253L8 20H8.5L17 9L13.15 9.7L16 4Z"
            viewBox="0 0 24 24"
          />

          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded"
            />
          ) : (
            <h3 className="text-title font-medium">{title}</h3>
          )}

          <div className="relative flex items-center">
            <IconButton
              onClick={toggleMenu}
              icon={
                <SvgIcon
                  className="text-black ml-auto"
                  width={24}
                  height={24}
                  pathData={svgPaths.menu}
                  viewBox="0 0 24 24"
                />
              }
              aria-label="Task Options"
              title="Task Options"
            />

            {isMenuOpen && (
              <TaskMenu
                onEdit={handleEdit}
                onDelete={() => deleteTask.mutate(id)}
                menuRef={menuRef}
              />
            )}
          </div>
        </div>

        <div className="my-[25px] border-t border-border"></div>

        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full border border-gray-300 px-2 py-1 rounded"
          />
        ) : (
          <div className="text-body">{description || 'No description'}</div>
        )}

        {isEditing && (
          <button
            onClick={handleSave}
            className="w-full mt-3 py-2 bg-accent text-white rounded-md hover:opacity-75"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
