'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function SideNav() {
  return (
    <aside className="flex h-full flex-col bg-white/90 backdrop-blur-xl border-r border-gray-200 shadow-lg px-1  py-5">
      {/* Logo Section */}
      <Link
        href="/"
        className="mb-8 flex flex-col items-center space-y-2 hover:opacity-90 transition"
      >
        <div className="relative w-full h-48">
          <Image
            src="/kiaan-memory.png"
            alt="Kiaan's Memories Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="text-center">
          
          <p className="text-xs text-gray-600 font-medium">
            by Nehil
          </p>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="flex grow flex-col justify-between">
        <nav className="space-y-1">
          <NavLinks />
        </nav>

        {/* Sign Out */}
        <form className="mt-6">
          <button className="flex w-full items-center gap-2 rounded-lg bg-gray-100 p-3 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition">
            <PowerIcon className="w-5" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
