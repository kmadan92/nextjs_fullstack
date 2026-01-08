'use client';

import {
  HomeIcon,
  PhotoIcon,
  CameraIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Search', href: '/search', icon: MagnifyingGlassIcon },
  { name: 'Videos', href: '/videos', icon: CameraIcon },
  { name: 'Photos', href: '/photos', icon: PhotoIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              // Base: Warm red text, layout props
              "relative flex h-[48px] items-center justify-start gap-4 rounded-xl p-3 text-sm font-medium transition-all duration-200",
              // Hover: Light red background, dark red text
              "hover:bg-red-100 hover:text-red-900 dark:hover:bg-red-900/30 dark:hover:text-red-100",
              {
                // Active State: Deep Red Text, Red-Orange Background
                'bg-red-100 text-red-900 shadow-sm ring-1 ring-red-200': pathname === link.href,
                // Inactive State: Muted Red/Brown text
                'text-red-950/70 hover:bg-red-50': pathname !== link.href,
              }
            )}
          >
            <LinkIcon className="w-6 min-w-[24px]" />

            <p className="opacity-0 translate-x-[-10px] whitespace-nowrap transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}