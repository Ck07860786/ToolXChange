import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Tool from '@/models/toolModel';

export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = params;
  const body = await request.json();
  const updated = await Tool.findByIdAndUpdate(id, body, { new: true });
  if (!updated) {
    return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Tool updated', tool: updated });
}


export async function DELETE(request, { params }) {
    await dbConnect();
    const { id } = params;
    const deleted = await Tool.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Tool deleted' });
  }