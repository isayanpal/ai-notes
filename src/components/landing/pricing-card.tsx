"use client";

import { Button } from "@/components/ui/button";
import { PricingCardProps } from "@/lib/types";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  highlighted = false,
  delay = 0,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`relative rounded-xl p-6 pt-12 transition-all duration-300 group overflow-hidden shadow-lg ${
        highlighted
          ? "bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-purple-900/20 border-2 border-purple-500"
          : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-800 hover:border-purple-500/50 hover:shadow-purple-900/20"
      }`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/5 to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-blue-500/10 to-indigo-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 group-hover:duration-200 animate-pulse pointer-events-none z-0" />

      {/* Most Popular tag */}
      {highlighted && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full z-10 shadow-md">
          Most Popular
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-100 transition-colors">
          {title}
        </h3>
        <div className="mb-4">
          <span className="text-3xl font-bold text-white">{price}</span>
          {period && <span className="text-gray-400 ml-1">{period}</span>}
        </div>
        <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
          {description}
        </p>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-white">
              <Check className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          variant={buttonVariant}
          className={`w-full ${
            buttonVariant === "default"
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : ""
          }`}
        >
          {buttonText}
        </Button>
      </div>
    </motion.div>
  );
}
