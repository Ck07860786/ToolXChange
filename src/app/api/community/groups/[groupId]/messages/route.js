import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import mongoose from 'mongoose'
import GroupMessage from '@/models/GroupMessage'
import { getAuth } from '@clerk/nextjs/server'
import { pusherServer } from '@/lib/pusherServer';

export async function GET(request, context) {
  // await only context.params, not context itself
  const { groupId } = await context.params
  await dbConnect()
  const messages = await GroupMessage
    .find({ groupId: new mongoose.Types.ObjectId(groupId) })
    .sort({ sentAt: 1 })

  return NextResponse.json(messages)
}

export async function POST(request, context) {
    const { groupId } = await context.params;
    const { text, userId, authorName } = await request.json();
  
    if (!userId) {
      return NextResponse.json({ error: 'Missing user info' }, { status: 400 });
    }
  
    await dbConnect();
  
    const msg = await GroupMessage.create({
      groupId: new mongoose.Types.ObjectId(groupId),
      authorId: userId,
      authorName,
      text,
    });

    await pusherServer.trigger(`group-${groupId}`, 'new-message', msg);
  
    return NextResponse.json(msg, { status: 201 });
  
}