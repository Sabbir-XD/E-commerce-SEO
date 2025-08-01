"use client";
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'

const banners = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "Up to 50% Off New Arrivals",
    image: "https://picsum.photos/1600/900?random=1",
    cta: "Shop Now",
    color: "bg-indigo-600"
  },
  {
    id: 2,
    title: "Limited Time Offer",
    subtitle: "Free Shipping on All Orders",
    image: "https://picsum.photos/1600/900?random=2",
    cta: "Discover More",
    color: "bg-indigo-700"
  },
  {
    id: 3,
    title: "Premium Electronics",
    subtitle: "Latest Gadgets & Accessories",
    image: "https://picsum.photos/1600/900?random=3",
    cta: "Explore Tech",
    color: "bg-indigo-800"
  }
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  const goToPrev = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl mx-auto max-w-7xl shadow-xl">
      <AnimatePresence custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className={`absolute inset-0 ${banners[currentSlide].color} opacity-20`} />
          <Image
            src={banners[currentSlide].image}
            alt={banners[currentSlide].title}
            fill
            className="object-cover"
            priority
            unoptimized // Remove this if you want Next.js to optimize the images
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-6 text-white">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {banners[currentSlide].title}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 max-w-lg text-gray-100 drop-shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {banners[currentSlide].subtitle}
              </motion.p>
              <motion.button
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg shadow-indigo-500/30 transition-all"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag size={20} />
                {banners[currentSlide].cta}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-sm z-10 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-sm z-10 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-indigo-600 w-6' : 'bg-white/50 hover:bg-white/70'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}