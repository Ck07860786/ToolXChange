'use client';
import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function CreateGroupModal({ onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name) return;
    setLoading(true);
    await fetch('/api/community/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    });
    setLoading(false);
    onClose();
  };

  return (
    <Modal open onClose={onClose} title="Create New Group">
      <div className="space-y-4">
        <Input placeholder="Group Name" value={name} onChange={e => setName(e.target.value)} />
        <Textarea placeholder="Description" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
        <Button onClick={handleCreate} disabled={!name || loading} className="w-full">
          {loading ? 'Creating...' : 'Create Group'}
        </Button>
      </div>
    </Modal>
  );
}