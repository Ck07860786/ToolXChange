"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HandshakeIcon, Search, Smile, Wrench } from "lucide-react";


const steps = [
    {
      icon: <Search size={36} className="text-blue-600" />,
      image: 'https://img.freepik.com/free-vector/stamp-collecting-concept-illustration_114360-6913.jpg?uid=R192994205&ga=GA1.1.293498645.1690197407&semt=ais_hybrid&w=740',
      title: "Discover Tools Nearby",
      description:
        "Explore a growing collection of tools available within your community — from drills to gardening kits, all at your fingertips.",
    },
    {
      icon: <HandshakeIcon size={36} className="text-green-600" />,
      image:'https://img.freepik.com/free-vector/connected-world-concept-illustration_114360-3027.jpg?t=st=1744887508~exp=1744891108~hmac=26d42876ddae1c652e3eadddf24ed96995b368646965f674782267621a449c88&w=826',
      title: "Connect & Borrow Easily",
      description:
        "Request the tool you need, connect with the owner securely, and arrange convenient pickup and return details.",
    },
    {
      icon: <Wrench size={36} className="text-yellow-600" />,
      image:'https://img.freepik.com/free-vector/done-concept-illustration_114360-3060.jpg?t=st=1744887597~exp=1744891197~hmac=76c71da86f3f7d503f7d7cccbd49fa169fba13ecfc69ad9f1afc81b74d100e4e&w=826',
      title: "Complete Your Projects",
      description:
        "Use the tool for your DIY, repair, or creative projects — without buying new or adding to clutter and waste.",
    },
    {
      icon: <Smile size={36} className="text-purple-600" />,
      image:'https://img.freepik.com/free-vector/delivery-concept-illustration_114360-2094.jpg?t=st=1744888409~exp=1744892009~hmac=d6772366b1db2181d6134999c8d7360dbfd48acbd22b66c75a027330fa1236f8&w=826',
      title: "Return & Build Community",
      description:
        "Return tools on time, share feedback, and help foster a community of trust, sustainability, and mutual support.",
    },
  ];

export default function HowItWorks() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading (fake delay)
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" w-full flex flex-col items-center px-6 py-16">
      <h2 className="text-4xl font-semibold text-gray-900 mb-4 text-center">
        How It <span className="text-blue-600">Works</span>
      </h2>
      <p className="mb-20 text-sm text-gray-500">
        Follow these simple steps to connect with experts, get personalized guidance, and achieve your goals.
      </p>

      <div className="relative flex flex-col items-center justify-center w-full max-w-4xl ">
        {steps.map((step, index) => (
          <div key={index} className={`w-full flex flex-col md:flex-row items-center gap-6 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative   rounded-3xl p-4 w-full md:max-w-sm text-center  backdrop-blur-lg transition-all hover:scale-105 "
            >
           

              {/* Image or Skeleton */}
              <div className="flex items-center p-2 justify-center h-full w-full rounded-full mx-auto mb-6 shadow-lg border transition-transform hover:scale-110">
                {loading ? (
                  <div className="h-full w-full rounded-full bg-gray-200 animate-pulse"></div>
                ) : (
                  <img src={step.image} alt={step.title} width='full' height='full' optimize='true'   className="h-full  w-full object-cover rounded-full" />
                )}
              </div>

              {/* Title or Skeleton */}
              <h3 className="text-2xl font-bold text-gray-900">
                {loading ? (
                  <div className="h-6 w-40 bg-gray-200 mx-auto rounded animate-pulse"></div>
                ) : (
                  step.title
                )}
              </h3>

              {/* Description or Skeleton */}
              <p className="text-gray-700 text-sm mt-6 leading-relaxed">
                {loading ? (
                  <>
                    <div className="h-4 w-52 bg-gray-200 mx-auto rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-44 bg-gray-200 mx-auto rounded animate-pulse"></div>
                  </>
                ) : (
                  step.description
                )}
              </p>
            </motion.div>

            {/* Detail Description or Skeleton */}
            <div className={`text-gray-700 text-sm leading-relaxed text-center md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
              {loading ? (
                <>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </>
              ) : (
                step.detailDescription
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}