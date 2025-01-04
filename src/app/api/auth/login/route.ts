import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const users = [
  { id: '1', email: 'admin@example.com', password: 'admin123', role: 'ADMIN' },
  { id: '2', email: 'candidate@example.com', password: 'candidate123', role: 'CANDIDATE' },
];

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    const token = jwt.sign({ id: user.id, role: user.role }, 'secret-key', { expiresIn: '1h' });
    return NextResponse.json({ token, role: user.role });
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}

