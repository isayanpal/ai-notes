"use client";

import { FeatureCardProps } from "@/lib/types";
import { motion } from "framer-motion";

export default function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) {
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

      {/* Icon with gradient */}
      <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center mb-4 text-purple-300 group-hover:text-purple-200 transition-colors shadow-lg shadow-purple-900/30">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/20 via-blue-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">{icon}</div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-100 transition-colors relative z-10">
        {title}
      </h3>
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors relative z-10">
        {description}
      </p>
    </motion.div>
  );
}
