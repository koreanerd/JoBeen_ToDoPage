import { NextResponse } from 'next/server';
import { Task } from '@/types/task';
import { boards } from '../boards/route';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const boardId = searchParams.get('boardId');

  if (boardId) {
    const board = boards.find((b) => b.id === Number(boardId));

    if (!board) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }

    return NextResponse.json(board.tasks, { status: 200 });
  }

  return NextResponse.json(boards, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const { boardId, title } = await req.json();

    if (!boardId || !title) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const board = boards.find((b) => b.id === Number(boardId));

    if (!board) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      description: '',
      boardId,
    };

    if (!board.tasks) board.tasks = [];

    board.tasks.push(newTask);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { taskId, boardId } = await req.json();

    if (!taskId || !boardId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const board = boards.find((b) => b.id === Number(boardId));

    if (!board) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }

    board.tasks = board.tasks?.filter((task) => task.id !== Number(taskId));

    return NextResponse.json(
      { message: 'Task deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const requestBody = await req.json();
    const {
      taskId,
      boardId,
      title,
      description,
      fromBoardId,
      toBoardId,
      tasks,
    } = requestBody;

    if (boardId && tasks) {
      const board = boards.find((b) => b.id === Number(boardId));

      if (!board) {
        return NextResponse.json({ error: 'Board not found' }, { status: 404 });
      }

      board.tasks = tasks;

      return NextResponse.json(
        { message: 'Task order updated successfully' },
        { status: 200 },
      );
    }

    // 태스크 이동 처리
    if (fromBoardId && toBoardId && taskId) {
      const fromBoard = boards.find((b) => b.id === Number(fromBoardId));

      if (!fromBoard) {
        return NextResponse.json(
          { error: 'From Board not found' },
          { status: 404 },
        );
      }

      const taskToMove = fromBoard.tasks?.find((t) => t.id === Number(taskId));

      if (!taskToMove) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
      }

      fromBoard.tasks = fromBoard.tasks?.filter((t) => t.id !== Number(taskId));

      const toBoard = boards.find((b) => b.id === Number(toBoardId));

      if (!toBoard) {
        return NextResponse.json(
          { error: 'To Board not found' },
          { status: 404 },
        );
      }

      toBoard.tasks?.push({ ...taskToMove, boardId: toBoardId });

      return NextResponse.json(
        { message: 'Task moved successfully', task: taskToMove },
        { status: 200 },
      );
    }

    if (taskId && boardId && title !== undefined) {
      const board = boards.find((b) => b.id === Number(boardId));

      if (!board) {
        return NextResponse.json({ error: 'Board not found' }, { status: 404 });
      }

      const task = board.tasks?.find((t) => t.id === Number(taskId));

      if (!task) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
      }

      task.title = title;
      task.description = description || task.description;

      return NextResponse.json(task, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
