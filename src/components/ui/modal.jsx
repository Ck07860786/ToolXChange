// components/ui/modal.jsx
'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export function Modal({ open, onClose, title, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md p-6 bg-white rounded-xl shadow-lg -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-between items-center mb-4 h-full">
            <Dialog.Title className="text-xl font-semibold">{title}</Dialog.Title>
            <button onClick={onClose} className="p-1 rounded hover:bg-gray-200">
              <X size={20} />
            </button>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
