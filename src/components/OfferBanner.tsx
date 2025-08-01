'use client';
import { motion } from 'framer-motion';

export default function AppliancesOfferBanner() {
  return (
    <div 
      className="relative h-[70vh] min-h-[500px] w-full bg-[url('https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center bg-fixed"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-800/30"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-8 md:px-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md text-white"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-gray-500/20 backdrop-blur-sm rounded-full border border-gray-400">
            🏡 Home Appliances Sale
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
            Premium Electronics
          </h2>
          <p className="text-xl md:text-2xl mb-6">
            <span className="font-bold text-amber-300">40% OFF</span> on TVs, Fridges & More
          </p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Smart TVs</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Refrigerators</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm">ACs</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Washing Machines</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4z" clipRule="evenodd" />
            </svg>
            Shop Appliances
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}