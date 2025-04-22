"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Edit3, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import HeroAnimation from "@/components/landing/hero-animation";
import FeatureCard from "@/components/landing/feature-card";
import PricingCard from "@/components/landing/pricing-card";
import TestimonialCard from "@/components/landing/testimonial-card";
import { motion } from "framer-motion";


export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 z-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 bg-purple-900/30 px-4 py-2 rounded-full text-sm text-purple-300 w-fit">
              <Sparkles className="h-4 w-4" />
              <span>Powered by Gemini AI</span>
            </div>
            <h1 className="bg-clip-text text-transparent text-start bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight"  >
              Take smarter notes with{" "}
              <span className="text-purple-500">AI assistance</span>
            </h1>
            <p className="mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-start">
              NoteGenius helps you create, organize, and summarize your notes
              with the power of artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                asChild
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Link href={"/dashboard"}>
                  Get started for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <HeroAnimation />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gradient-to-b from-purple-950/20 to-black container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to take your note-taking to the next level
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Lock />}
            title="Secure Authentication"
            description="Sign in with Google or email & password. Your notes are private and secure."
            delay={0.1}
          />
          <FeatureCard
            icon={<Edit3 />}
            title="Rich Note Editor"
            description="Create, edit, and organize your notes with our intuitive editor."
            delay={0.2}
          />
          <FeatureCard
            icon={<Brain />}
            title="AI Summarization"
            description="Let Gemini AI summarize your long notes into concise key points."
            delay={0.3}
          />
        </div>
      </section>


      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="container mx-auto px-4 py-16 md:py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their
            note-taking
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="NoteGenius has completely changed how I take notes during meetings. The AI summarization is a game-changer!"
            author="Sarah Johnson"
            role="Product Manager"
            delay={0.1}
          />
          <TestimonialCard
            quote="As a student, this app has saved me countless hours. I can focus on lectures and let the AI handle the summarization."
            author="Michael Chen"
            role="Computer Science Student"
            delay={0.2}
          />
          <TestimonialCard
            quote="The interface is beautiful and intuitive. I've tried many note apps, but this one stands out with its AI capabilities."
            author="Emma Rodriguez"
            role="UX Designer"
            delay={0.3}
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the plan that works best for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard
            title="Free"
            price="$0"
            description="Perfect for getting started"
            features={[
              "Up to 50 notes",
              "Basic AI summarization",
              "Email support",
              "1 user",
            ]}
            buttonText="Get Started"
            buttonVariant="outline"
            delay={0.1}
          />
          <PricingCard
            title="Pro"
            price="$9.99"
            period="per month"
            description="For power users"
            features={[
              "Unlimited notes",
              "Advanced AI summarization",
              "Priority support",
              "1 user",
            ]}
            buttonText="Upgrade to Pro"
            buttonVariant="default"
            highlighted={true}
            delay={0.2}
          />
          <PricingCard
            title="Team"
            price="$19.99"
            period="per month"
            description="For small teams"
            features={[
              "Unlimited notes",
              "Advanced AI summarization",
              "Priority support",
              "Up to 5 users",
            ]}
            buttonText="Contact Sales"
            buttonVariant="outline"
            delay={0.3}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-purple-950/20 to-black py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform your note-taking?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Join thousands of users who have already upgraded their
              productivity with NoteGenius.
            </p>
            <Link href={"/dashboard"}>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get started for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-800 text-center"> 

          <p>© {new Date().getFullYear()} NoteGenius. All rights reserved.</p>

      </footer>
    </div>
  );
}
