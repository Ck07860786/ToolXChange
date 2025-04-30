"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    image: "https://img.freepik.com/free-vector/stamp-collecting-concept-illustration_114360-6913.jpg?uid=R192994205&ga=GA1.1.293498645.1690197407&semt=ais_hybrid&w=740",
    title: "Discover Tools Nearby",
    description:
      "Explore a growing collection of tools available within your community — from drills to gardening kits, all at your fingertips.",
  },
  {
    number: 2,
    image: "https://img.freepik.com/free-vector/connected-world-concept-illustration_114360-3027.jpg?t=st=1744887508~exp=1744891108~hmac=26d42876ddae1c652e3eadddf24ed96995b368646965f674782267621a449c88&w=826",
    title: "Connect & Borrow Easily",
    description:
      "Request the tool you need, connect with the owner securely, and arrange convenient pickup and return details.",
  },
  {
    number: 3,
    image: "https://img.freepik.com/free-vector/done-concept-illustration_114360-3060.jpg?t=st=1744887597~exp=1744891197~hmac=76c71da86f3f7d503f7d7cccbd49fa169fba13ecfc69ad9f1afc81b74d100e4e&w=826",
    title: "Complete Your Projects",
    description:
      "Use the tool for your DIY, repair, or creative projects — without buying new or adding to clutter and waste.",
  },
  {
    number: 4,
    image: "https://img.freepik.com/free-vector/delivery-concept-illustration_114360-2094.jpg?t=st=1744888409~exp=1744892009~hmac=d6772366b1db2181d6134999c8d7360dbfd48acbd22b66c75a027330fa1236f8&w=826",
    title: "Return & Build Community",
    description:
      "Return tools on time, share feedback, and help foster a community of trust, sustainability, and mutual support.",
  },
];

export default function HowItWorks() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center px-6 py-16">
      <h2 className="text-4xl font-semibold text-gray-900 mb-4 text-center">
        How It <span className="text-blue-600">Works</span>
      </h2>
      <p className="mb-16 text-sm text-gray-500 text-center max-w-xl">
        Follow these simple steps to connect with experts, get personalized guidance, and achieve your goals.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center rounded-3xl p-6   hover:scale-105 transition-transform"
          >
            {/* Step number in styled circle */}
            <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md bg-gradient-to-r from-blue-700 via-25%  to-purple-400">
              {step.number}
            </div>

            {/* Image */}
            <div className="w-40 h-40 rounded-full overflow-hidden shadow mb-4">
              {loading ? (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              ) : (
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {loading ? (
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mx-auto"></div>
              ) : (
                step.title
              )}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-700 leading-relaxed">
              {loading ? (
                <>
                  <div className="h-4 w-52 bg-gray-200 rounded animate-pulse mb-2 mx-auto"></div>
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </>
              ) : (
                step.description
              )}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
