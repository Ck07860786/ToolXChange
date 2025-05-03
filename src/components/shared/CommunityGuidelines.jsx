import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Users, MessageCircle, Ban } from 'lucide-react';

export default function CommunityGuidelines() {
  const guidelines = [
    {
      title: 'Be Respectful',
      description: 'Treat everyone with kindness and respect. No harassment or hate speech.',
      icon: <ShieldCheck className="w-5 h-5 text-green-600" />,
    },
    {
      title: 'Stay On Topic',
      description: 'Ensure your posts and comments are relevant to the group or discussion.',
      icon: <MessageCircle className="w-5 h-5 text-blue-600" />,
    },
    {
      title: 'No Spam or Self-Promo',
      description: 'Avoid excessive self-promotion or irrelevant links. Keep it organic.',
      icon: <Ban className="w-5 h-5 text-red-500" />,
    },
    {
      title: 'Support Each Other',
      description: 'Encourage open discussion and help others learn and grow.',
      icon: <Users className="w-5 h-5 text-purple-600" />,
    },
  ];

  return (
    <Card className="bg-white shadow-md rounded-xl p-6">
      <CardHeader className="mb-4">
        <CardTitle className="text-2xl font-bold text-gray-800">Community Guidelines</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {guidelines.map((rule, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <div className="mt-1">{rule.icon}</div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700">{rule.title}</h4>
              <p className="text-sm text-gray-500">{rule.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
