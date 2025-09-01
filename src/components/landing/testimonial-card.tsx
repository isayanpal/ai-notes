"use client";

import { TestimonialCardProps } from "@/lib/types";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function TestimonialCard({
  quote,
  author,
  role,
  delay = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 group overflow-hidden shadow-lg hover:shadow-purple-900/20"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/5 to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-blue-500/10 to-indigo-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 group-hover:duration-200 animate-pulse pointer-events-none" />

      {/* Content */}
      <Quote className="h-8 w-8 text-purple-500 mb-4 opacity-70 relative z-10" />
      <p className="text-gray-300 mb-6 relative z-10 group-hover:text-gray-200 transition-colors">
        {quote}
      </p>
      <div className="relative z-10">
        <p className="font-medium text-white group-hover:text-purple-100 transition-colors">
          {author}
        </p>
        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
          {role}
        </p>
      </div>
    </motion.div>
  );
}
