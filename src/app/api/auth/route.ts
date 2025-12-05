import { NextRequest, NextResponse } from 'next/server';

// Simple demo authentication - in production, use proper authentication
const users = [
  {
    id: '1',
    email: 'admin@boutique.com',
    password: 'admin123',
    role: 'super_admin' as const,
  },
  {
    id: '2',
    email: 'user@boutique.com',
    password: 'user123',
    role: 'user' as const,
  },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
