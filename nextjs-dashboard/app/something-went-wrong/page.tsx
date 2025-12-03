'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function SomethingWentWrongPage() {

    const router = useRouter();
    
  return (
    <main 
      className="flex min-h-screen flex-col items-center justify-center p-6"
      style={{ backgroundColor: '#FFFBF5' }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-6"
      >
        {/* Icon: A cute 'oops' emoji */}
        <div className="text-8xl mb-2 animate-pulse">
          🙈
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-bold text-red-900 tracking-tight">
          Uh-oh! Technical Glitch...
        </h1>

        {/* Kiaan's Message Box */}
        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-red-100 shadow-sm">
          <p className="text-red-950 text-lg leading-relaxed font-medium"> 
            <br></br>Galti se mistake ho gya. 🍼 <br></br>Baccha samaj ke maaf karna
          </p>
          <p className="mt-4 text-sm text-red-800/70 italic">
            — Kiaan
          </p>
        </div>

        {/* Reassurance */}
        <p className="text-sm text-red-800/60">
          (Don't worry, Dad & Mom are already fixing my mess!)
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <button 
            onClick={() => router.back()}
            className="w-full py-3 px-6 rounded-xl bg-red-900 text-white font-medium shadow-lg hover:bg-red-800 transition-all transform hover:-translate-y-0.5"
          >
            Let's Try Again
          </button>

          <Link 
            href="/dashboard"
            className="w-full py-3 px-6 rounded-xl bg-white border border-red-100 text-red-900 font-medium hover:bg-red-50 transition-colors"
          >
            Go Back Home
          </Link>
        </div>

      </motion.div>
    </main>
  );
}