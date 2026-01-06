'use client';

import Link from 'next/link';
import NavLinks from '@/app/components/dashboard/nav-links';
import { PowerIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { clearTokensInDB } from '@/lib/auth';

export default function SideNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDarkMode = theme === 'dark';

  async function handleSignOut(e: React.FormEvent) {

    e.preventDefault()
    clearTokensInDB()
    await signOut({ redirectTo: "/" })
  }

  return (
    <aside
      className="group fixed left-0 top-0 z-40 flex h-full w-20 flex-col overflow-hidden 
      border-r border-red-100 shadow-xl shadow-stone-200/50
      bg-[#fff5eb]/95 backdrop-blur-xl 
      px-3 py-5 transition-[width] duration-300 ease-in-out hover:w-72 
      dark:bg-stone-900/95 dark:border-stone-800 dark:shadow-none"
    >

      {/* Logo Section */}
      <Link
        href="/"
        className="mb-8 flex flex-col items-center space-y-2 transition-opacity duration-300 hover:opacity-90"
      >
        <div className="relative flex h-12 w-full items-center justify-center transition-all duration-300 group-hover:h-48">
          {/* Small Icon (Collapsed) - Matches Login 'Red' Theme */}
          <div className="absolute opacity-100 transition-opacity duration-300 group-hover:opacity-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 font-bold text-red-900 ring-2 ring-white shadow-sm dark:bg-red-900 dark:text-red-100 dark:ring-stone-800">K</div>
          </div>

          {/* Full Logo (Expanded) */}
          <div className="relative h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <Image
              src="/kiaan-memory.png"
              alt="Kiaan's Memories Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-center text-xs font-medium text-red-950/60 dark:text-stone-400">
            by Nehil
          </p>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="flex grow flex-col justify-between">
        <nav className="flex flex-col space-y-2">
          <NavLinks />

          {/* Theme Toggle Button - Styled to match Login Button Colors */}
          <button
            onClick={toggleTheme}
            className="relative flex h-[48px] items-center justify-start gap-4 rounded-xl p-3 text-sm font-medium text-red-950/70 transition-colors duration-200 hover:bg-red-100 hover:text-red-900 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            {isDarkMode ? <SunIcon className="w-6 min-w-[24px]" /> : <MoonIcon className="w-6 min-w-[24px]" />}
            <p className="opacity-0 translate-x-[-10px] whitespace-nowrap transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </p>
          </button>
        </nav>

        {/* Sign Out - Matches Login Button Hover */}
        <form className="mb-2">
          <button
            onClick={handleSignOut}
            className="flex h-[48px] w-full items-center justify-start gap-4 rounded-xl bg-white/50 p-3 text-sm font-medium text-red-900 transition-colors hover:bg-red-900 hover:text-white dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-red-900">
            <PowerIcon className="w-6 min-w-[24px]" />
            <span className="opacity-0 translate-x-[-10px] whitespace-nowrap transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              Sign Out
            </span>
          </button>
        </form>
      </div>
    </aside>
  );
}