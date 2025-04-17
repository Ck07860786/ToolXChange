"use client"
import { Hammer, DollarSign, Leaf, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: <Hammer size={32} className="text-blue-600" />,
      title: "Borrow & Share with Ease",
      description:
        "Browse, request, and borrow tools from your local community. List your own tools to help others finish their projects too.",
    },
    {
      icon: <DollarSign size={32} className="text-green-600" />,
      title: "Save Money on Every Project",
      description:
        "Skip expensive one-time purchases by borrowing exactly what you need. Keep your projects budget-friendly and smart.",
    },
    {
      icon: <Leaf size={32} className="text-emerald-600" />,
      title: "Reduce Waste, Live Sustainably",
      description:
        "Cut down on waste and promote reuse by borrowing tools already available nearby. Support a greener, sharing-first community.",
    },
    {
      icon: <Users size={32} className="text-purple-600" />,
      title: "Build a Connected Community",
      description:
        "Connect with neighbors and like-minded makers. Strengthen bonds and collaborate on projects while sharing resources.",
    },
  ];

  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-gray-900"
          >
            Why Choose <span className="text-blue-600">ToolXchange?</span>
          </motion.h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how ToolXchange makes it easy, affordable, and sustainable
            to access the tools you need — when you need them — without the hassle
            of buying.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
