"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Star, Search, X } from 'lucide-react';
import { Header } from '@/components/shared/Header';

export default function Tools() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [popupImage, setPopupImage] = useState(null);

  useEffect(() => {
    async function fetchApproved() {
      const res = await fetch('/api/tools/approved');
      if (res.ok) {
        const { tools } = await res.json();
        setTools(tools);
      }
      setLoading(false);
    }
    fetchApproved();
  }, []);

  const filtered = useMemo(() => {
    if (!query) return tools;
    return tools.filter(t => t.name.toLowerCase().includes(query.toLowerCase()));
  }, [tools, query]);

  if (loading) return <div className="p-6 text-center">Loading available tools...</div>;

  return (
    <>
    <Header/>
    <div className="px-4 py-8 max-w-7xl mx-auto mt-14">
      <h1 className="text-4xl font-bold text-center mb-8">Available Tools</h1>

      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search tools..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full shadow-sm border-gray-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(tool => (
          <div key={tool._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col relative">
            {!tool.availability && (
              <div className="absolute top-2 left-2 z-10">
                <Badge className="bg-red-600 text-white text-xs px-2 py-1">Unavailable</Badge>
              </div>
            )}

            <div className="w-full">
              <Carousel showThumbs={false} showStatus={false} infiniteLoop swipeable dynamicHeight={false}>
                {tool.images?.map(img => (
                  <div key={img.public_id} className="h-60 relative cursor-pointer" onClick={() => setPopupImage(img.url)}>
                    <Image
                      src={img.url}
                      alt={tool.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{tool.name}</h3>
                <Badge variant="outline" className="text-xs">{tool.status}</Badge>
              </div>

              <p className="text-sm text-gray-600 flex-1 mb-4 line-clamp-3">{tool.description}</p>

              <div className="flex items-center mb-4">
                <Star className="text-yellow-500" size={18} />
                <span className="ml-1 text-sm text-gray-700">{tool.rating?.toFixed(1) || '0.0'}</span>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <span className="text-xl font-bold text-green-600">${tool.rentalRate}</span>
                  <span className="text-sm text-gray-500 ml-1">/ day</span>
                </div>
                <Button size="sm" disabled={!tool.availability} className="px-4 py-1">
                  Rent Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {popupImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative w-11/12 md:w-3/4 lg:w-1/2">
            <button
              onClick={() => setPopupImage(null)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
            >
              <X size={24} />
            </button>
            <img src={popupImage} alt="Full View" className="w-full max-h-[80vh] object-contain rounded-lg" />
          </div>
        </div>
      )}
    </div>
    </>
  );
}
