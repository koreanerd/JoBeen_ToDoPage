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
    const { id, title } = await req.json();

    if (!id || !title) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const boardIndex = boards.findIndex((board) => board.id === id);
    if (boardIndex === -1) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }

    // 이름 업데이트
    boards[boardIndex].title = title;

    return NextResponse.json(boards[boardIndex], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
