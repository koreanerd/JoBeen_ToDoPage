import { cva } from 'class-variance-authority';
import TaskCard from '@/components/card/TaskCard';

interface BoardColumnProps {
  status: 'notStarted' | 'inProgress' | 'done';
  title: string;
}

const headingStyles = cva(
  'w-fit p-[3px] border-[2px] rounded-[5px] leading-none font-medium',
  {
    variants: {
      status: {
        notStarted: 'text-notStarted border-notStarted',
        inProgress: 'text-inProgress border-inProgress',
        done: 'text-done border-done',
      },
    },
  },
);

export default function BoardColumn({ status, title }: BoardColumnProps) {
  return (
    <div className="w-[calc(100%/3)]">
      <div className="flex items-center gap-[12px] mb-[12px]">
        <h2 className={headingStyles({ status })}>{title}</h2>

        <div className="text-body">0</div>
      </div>

      <div>
        <TaskCard />
      </div>
    </div>
  );
}
