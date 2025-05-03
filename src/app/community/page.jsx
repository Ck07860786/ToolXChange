'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/shared/Header';
import { useUser, SignInButton } from '@clerk/nextjs';
import GroupCard from './group-card';
import CreateGroupModal from './create-group-modal';
import Poll from '@/components/shared/Poll';
import CommunityGuidelines from '@/components/shared/CommunityGuidelines';

export default function CommunityPage() {
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { isSignedIn } = useUser();

  const fetchGroups = async () => {
    const res = await fetch('/api/community/groups');
    setGroups(await res.json());
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <section className="h-screen mt-20 flex flex-col">
      <Header />

      <div className="flex-1 overflow-hidden">
        <div className="max-w-6xl mx-auto py-6 px-4 h-full">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Community Groups</h1>
            {isSignedIn ? (
              <Button onClick={() => setShowModal(true)}>New Group</Button>
            ) : (
              <SignInButton>
                <Button variant="outline">Sign In</Button>
              </SignInButton>
            )}
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100%-100px)]">
            {/* Scrollable Group List */}
            <div className="md:col-span-2 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {groups.length > 0 ? (
                groups.map((g) => <GroupCard key={g._id} group={g} />)
              ) : (
                <p className="text-gray-500">No groups yet. Create one!</p>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 overflow-y-auto custom-scrollbar">
              <Poll />
              <CommunityGuidelines />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && isSignedIn && (
        <CreateGroupModal
          onClose={() => {
            setShowModal(false);
            fetchGroups();
          }}
        />
      )}
    </section>
  );
}
