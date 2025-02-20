import TaskCard from '@/components/card/TaskCard';

interface BoardColumnProps {
  status: 'notStarted' | 'inProgress' | 'done';
  title: string;
}

export default function BoardColumn({ status, title }: BoardColumnProps) {
  return (
    <div className="w-[320px] min-w-[200px]">
      <h2 className="mb-[12px]">{title}</h2>

      <div>
        <TaskCard />
      </div>
    </div>
  );
}
