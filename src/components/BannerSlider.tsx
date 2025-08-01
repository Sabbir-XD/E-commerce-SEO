'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// ACTUAL WORKING IMAGE URLS (replace these with your own)
const demoImages = {
  summer: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1800&auto=format&fit=crop",
  arrivals: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1800&auto=format&fit=crop",
  limited: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80"
};

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  bgColor: string;
  image: string;
  imageAlt: string;
}

const banners: Banner[] = [
  {
    id: 1,
    title: "Summer Collection",
    subtitle: "Up to 50% Off",
    cta: "Shop Now",
    bgColor: "bg-gradient-to-r from-amber-400 to-orange-500",
    image: demoImages.summer,
    imageAlt: "Summer fashion collection with sunglasses and beachwear"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh Styles Added Daily",
    cta: "Explore",
    bgColor: "bg-gradient-to-r from-blue-400 to-orange-600",
    image: demoImages.arrivals,
    imageAlt: "Newest fashion arrivals displayed on mannequins"
  },
  {
    id: 3,
    title: "Limited Edition",
    subtitle: "Exclusive Designs",
    cta: "Discover",
    bgColor: "bg-gradient-to-r from-purple-500 to-pink-600",
    image: demoImages.limited,
    imageAlt: "Limited edition luxury handbags collection"
  }
];

export default function BannerSlider() {
  return (
    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl shadow-xl mx-auto max-w-[1800px]">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ 
          delay: 7000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true 
        }}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white/50',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !w-6'
        }}
        loop={true}
        speed={1200}
        className="h-full w-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className={`${banner.bgColor} relative`}>
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-black/30 z-10"></div>
              <Image
                src={banner.image}
                alt={banner.imageAlt}
                fill
                priority={banner.id === 1}
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
                className="object-cover object-center"
              />
            </div>

            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-20 h-full flex flex-col items-start justify-center p-8 md:p-16 text-white max-w-2xl"
            >
              <motion.span 
                className="text-sm md:text-base font-medium mb-2 tracking-wider text-shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {banner.subtitle}
              </motion.span>
              <motion.h2
                className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {banner.title}
              </motion.h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-medium rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {banner.cta}
              </motion.button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}