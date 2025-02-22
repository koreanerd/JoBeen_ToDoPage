import { NextResponse } from 'next/server';

let boards = [{ id: 1, status: 'default', title: 'Click & Change title 📌' }];

export async function GET() {
  return NextResponse.json(boards);
}

export async function POST(req: Request) {
  try {
    const { status, title } = await req.json();

    if (!status || !title) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newBoard = {
      id: Date.now(),
      status,
      title,
    };

    boards.push(newBoard);

    return NextResponse.json(newBoard, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    boards = boards.filter((board) => board.id !== id);
    return NextResponse.json(
      { message: 'Board deleted successfully' },
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
    const { id, title, boards: updatedBoards } = await req.json();

    if (updatedBoards) {
      if (!Array.isArray(updatedBoards)) {
        return NextResponse.json(
          { error: 'Invalid data format' },
          { status: 400 },
        );
      }
      boards = updatedBoards;
      return NextResponse.json(boards, { status: 200 });
    }

    if (id && title) {
      const boardIndex = boards.findIndex((board) => board.id === id);
      if (boardIndex === -1) {
        return NextResponse.json({ error: 'Board not found' }, { status: 404 });
      }

      boards[boardIndex].title = title;
      return NextResponse.json(boards[boardIndex], { status: 200 });
    }

    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
