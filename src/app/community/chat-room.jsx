'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { pusherClient } from '@/lib/pusher'; // Ensure this is set up

export default function ChatRoom({ groupId, onClose }) {
  const { isSignedIn, user } = useUser();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const containerRef = useRef();

  const fetchMessages = async () => {
    const res = await fetch(`/api/community/groups/${groupId}/messages`);
    setMessages(await res.json());
    scrollToBottom();
  };

  const scrollToBottom = () => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  };

  useEffect(() => {
    fetchMessages();

    pusherClient.subscribe(`group-${groupId}`);
    pusherClient.bind('new-message', (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
      scrollToBottom();
    });

    return () => {
      pusherClient.unbind('new-message');
      pusherClient.unsubscribe(`group-${groupId}`);
    };
  }, [groupId]);

  const sendMessage = async () => {
    if (!isSignedIn || !text.trim()) return;

    await fetch(`/api/community/groups/${groupId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        userId: user.id,
        authorName: user.firstName || user.fullName || 'User',
      }),
    });

    setText('');
  };

  return (
    <Modal open onClose={onClose} title="Group Chat">
      <div className="flex flex-col h-[450px] space-y-2">
        {/* Messages Container */}
        <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 rounded-lg shadow-lg">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`flex ${m.userId === user.id ? 'justify-end' : 'justify-start'} p-3`}
            >
              <div
                className={`p-3 max-w-xs rounded-lg shadow-sm border border-gray-200 ${
                  m.userId === user.id ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'
                }`}
              >
                <p className="text-xs font-semibold text-gray-700">
                  {m.authorName}{' '}
                  <span className="text-gray-400">{new Date(m.sentAt).toLocaleTimeString()}</span>
                </p>
                <p className="text-sm">{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input and Send Button */}
        <div className="flex p-4 space-x-3 items-center border-t border-gray-200 bg-white rounded-b-lg">
          <Input
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Button
            onClick={sendMessage}
            disabled={!isSignedIn || !text.trim()}
            className="bg-indigo-600 text-white rounded-full px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send
          </Button>
        </div>
      </div>
    </Modal>
  );
}
