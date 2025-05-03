import React from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

export default function Poll() {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md mx-auto mt-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        🗳️ Poll: What's your favorite activity?
      </h3>

      <form className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="activity1"
            name="activity"
            className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
          />
          <Label htmlFor="activity1" className="text-sm text-gray-700">Hiking</Label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="activity2"
            name="activity"
            className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
          />
          <Label htmlFor="activity2" className="text-sm text-gray-700">Cycling</Label>
        </div>

        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-sm">
          Vote
        </Button>
      </form>
    </div>
  );
}
