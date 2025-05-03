'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ChatRoom from './chat-room';
import { useUser, SignInButton } from '@clerk/nextjs';
import { Users } from 'lucide-react';
import Link from 'next/link';

export default function GroupCard({ group }) {
  const { isSignedIn, user } = useUser();
  const [joined, setJoined] = useState(isSignedIn && group.members.includes(user.id));
  const [showChat, setShowChat] = useState(false);

  const handleJoin = async () => {
    if (!isSignedIn) return;
    await fetch(`/api/community/groups/${group._id}/members`, {
      method: 'POST'
    });
    setJoined(true);
  };

  return (
    <Card className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-gray-800">{group.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600">{group.description}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Users className="w-4 h-4" />
          <span>{group.members?.length || 0} Members</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        {/* Join Button */}
        {!joined
          ? isSignedIn
            ? <Button variant="secondary" size="sm" className="mt-2 w-full" onClick={handleJoin} >Join</Button>
            : <Link className=' w-full' href={`/sign-in`}><Button variant="secondary"  className="mt-2 w-full">Sign In to Join</Button></Link>
          : <Button variant="secondary" size="sm" className="mt-2 w-full" onClick={() => setShowChat(true)} >Chat</Button>
        }
      </CardFooter>

      {showChat && joined && <ChatRoom groupId={group._id} onClose={() => setShowChat(false)} />}
    </Card>
  );
}
