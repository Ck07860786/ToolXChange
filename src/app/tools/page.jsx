'use client'
import React, { useEffect, useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Star, Search, X, ChevronRight } from 'lucide-react'
import { Header } from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import TestimonialSection from '@/components/shared/TestimonialSection'
import { LocationFilter } from '@/components/shared/LocationFilter'
import { ToolGuidelines } from '@/components/shared/ToolGuidlines'
import RentModal from '@/components/shared/RentModel'

export default function Tools() {
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [popupImage, setPopupImage] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedTool, setSelectedTool] = useState(null)

  // initial fetch
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const res = await fetch('/api/tools/approved')
      if (res.ok) {
        const { tools } = await res.json()
        setTools(tools)
      }
      setLoading(false)
    })()
  }, [])

  const filtered = useMemo(() => {
    return query
      ? tools.filter(t =>
          t.name.toLowerCase().includes(query.toLowerCase())
        )
      : tools
  }, [tools, query])

  const handleRentClick = tool => {
    setSelectedTool(tool)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedTool(null)
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative mt-24 ">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-4">
            <sapn className=' text-blue-500 font-bold '>Discover</sapn> and Rent Top Tools
          </h1>
          <p className="text-lg mb-6">
            Find high-quality equipment for any project. Fast delivery, easy
            booking, and 24/7 support.
          </p>
        </div>
      </section>

      <div className="px-4 py-12 max-w-7xl mx-auto space-y-16">
        {/* Search & Categories */}
        <section className="space-y-6">
          <div className="relative w-full max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search tools..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full shadow-sm border-gray-300"
            />
          </div>
          <div className="flex justify-center space-x-3">
            {['Gardening', 'Construction', 'Electronics', 'Plumbing'].map(
              cat => (
                <Badge
                  key={cat}
                  variant="outline"
                  className="px-3 py-1 rounded-full cursor-pointer hover:bg-blue-100"
                >
                  {cat}
                </Badge>
              )
            )}
          </div>

          {/* Location filter now controls both tools & loading */}
          <LocationFilter setTools={setTools} setLoading={setLoading} />
          <div className=' flex items-center justify-center'>
            <div className=' p-4'>
            <Button className=' hover:bg-zinc-900 hover:text-white'
    variant="outline"
    onClick={async () => {
      setQuery('')
      setLoading(true)
      const res = await fetch('/api/tools/approved')
      if (res.ok) {
        const { tools } = await res.json()
        setTools(tools)
      }
      setLoading(false)
    }}
  >
    Reset Filters
  </Button>
            </div>
          </div>
          
        </section>

        {/* Tools Grid */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">All Tools</h2>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white rounded-lg shadow h-80"
                >
                  <div className="bg-gray-200 h-3/5 rounded-t-lg" />
                  <div className="p-4 space-y-2">
                    <div className="bg-gray-200 h-4 w-3/4" />
                    <div className="bg-gray-200 h-3 w-1/2" />
                    <div className="bg-gray-200 h-6 w-1/4 mt-auto" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No tools found for “{query || 'your location'}.”
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(tool => (
                <div
                  key={tool._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col relative"
                >
                  {!tool.availability && (
                    <div className="absolute top-2 left-2 z-10">
                      <Badge className="bg-red-600 text-white text-xs px-2 py-1">
                        Unavailable
                      </Badge>
                    </div>
                  )}

                  <div className="w-full">
                    <Carousel
                      showThumbs={false}
                      showStatus={false}
                      infiniteLoop
                      swipeable
                    >
                      {tool.images?.map(img => (
                        <div
                          key={img.public_id}
                          className="h-60 relative cursor-pointer"
                          onClick={() => setPopupImage(img.url)}
                        >
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
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {tool.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {tool.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 flex-1 mb-4 line-clamp-3">
                      {tool.description}
                    </p>

                    <div className="flex items-center mb-4">
                      <Star className="text-yellow-500" size={18} />
                      <span className="ml-1 text-sm text-gray-700">
                        {tool.rating?.toFixed(1) || '0.0'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-xl font-bold text-green-600">
                          ${tool.rentalRate}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          / day
                        </span>
                      </div>
                      <Button
                        size="sm"
                        disabled={!tool.availability}
                        className="px-4 py-1"
                        onClick={() => handleRentClick(tool)}
                      >
                        Rent Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <ToolGuidelines/>

        {/* Testimonials */}
        <TestimonialSection />

        {/* Newsletter */}
        <section className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Join our newsletter for the latest deals and updates.
          </p>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <Input placeholder="Enter your email" className="pr-32" />
              <Button className="absolute top-0 right-0 rounded-l-none h-full px-6">
                Subscribe <ChevronRight className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Image Popup */}
      {popupImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative w-11/12 md:w-3/4 lg:w-1/2">
            <button
              onClick={() => setPopupImage(null)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
            >
              <X size={24} />
            </button>
            <img
              src={popupImage}
              alt="Full View"
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Rent Modal */}
      {showModal && (
        <RentModal
          tool={selectedTool}
          onClose={handleCloseModal}
        />
      )}

      <Footer />
    </>
  )
}
