import { cva } from 'class-variance-authority';
import TaskCard from '@/components/card/TaskCard';
import SvgIcon from '../icons/SvgIcon';

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
