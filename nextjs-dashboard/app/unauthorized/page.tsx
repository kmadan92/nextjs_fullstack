// app/unauthorized/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#FFFBF5]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-red-900 mb-2">Access Restricted</h1>
        <p className="text-red-950 mb-8">
          I checked my list twice, but I don't see your name! <span className='text-3xl'>🕵️‍♂️ </span>My photos are Top Secret. Please ask my Papa or Mama to add you to the VIP list!
        </p>
        
        <Link 
          href="/login"
          className="px-6 py-3 rounded-full bg-red-900 text-white font-medium hover:bg-red-800 transition-colors"
        >
          Back to Login
        </Link>
      </motion.div>
    </main>
  );
}