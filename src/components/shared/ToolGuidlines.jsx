"use client";

import { motion } from "framer-motion";
import { Wrench, ShieldCheck, RefreshCcw, AlertCircle } from "lucide-react";

const guidelines = [
  {
    icon: <Wrench className="h-6 w-6 text-blue-600" />,
    title: "Use Responsibly",
    description: "Treat tools with care and use them only for their intended purpose.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
    title: "Return On Time",
    description: "Respect others' time by returning tools by the agreed deadline.",
  },
  {
    icon: <RefreshCcw className="h-6 w-6 text-blue-600" />,
    title: "Keep it Clean",
    description: "Clean tools after use to ensure they're ready for the next person.",
  },
  {
    icon: <AlertCircle className="h-6 w-6 text-blue-600" />,
    title: "Report Issues",
    description: "Inform the owner immediately if a tool is damaged or malfunctioning.",
  },
];

export function ToolGuidelines() {
  return (
    <section className="py-16 rounded-4xl bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-slate-100"
        >
          Tool Usage Guidelines
        </motion.h2>
        <p className="mt-4 text-center text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Follow these simple rules to ensure a safe, smooth, and trustworthy tool-sharing experience.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guidelines.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="rounded-xl bg-gray-50 dark:bg-gray-800 p-6 shadow hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-purple-900 rounded-full">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
