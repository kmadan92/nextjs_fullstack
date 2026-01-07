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
          <span className='text-3xl'>🛰️ 🛡️</span><br></br>
          This is top secret project!! <span className='text-3xl'>🕵️‍♂️ </span><br></br>My Mumma has deployed a satellite to run a DNA identity scan and you are not detected.<br></br>
          Please ask my Papa for a security clearance and add you to the family's VIP list!
        </p>

        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-red-900 text-white font-medium hover:bg-red-800 transition-colors"
        >
          Back to Login
        </Link>
      </motion.div>
    </main>
  );
}