'use client';

import Image from 'next/image';
import { PlayCircleIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Collection } from '@/app/lib/definitions';

export function CollectionCard({ collection }: { collection: Collection }) {
    return (
        <Link href={`/dashboard/collection/${collection.id}`} className="block flex-none">
            <motion.div
                whileHover={{ scale: 1.05, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                className="group relative h-40 w-64 cursor-pointer overflow-hidden rounded-xl shadow-md transition-all md:h-48 md:w-80"
            >
                {/* Thumbnail Image */}
                <Image
                    src={collection.thumbnail}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient Overlay (Netflix style fade at bottom) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

                {/* Icon Badge */}
                <div className="absolute left-3 top-3 rounded-full bg-black/40 p-1.5 backdrop-blur-sm">
                    {collection.type === 'video' ? (
                        <PlayCircleIcon className="h-5 w-5 text-white" />
                    ) : (
                        <PhotoIcon className="h-5 w-5 text-white" />
                    )}
                </div>

                {/* Text Content */}
                <div className="absolute bottom-0 w-full p-4 text-white">
                    <h3 className="truncate text-lg font-bold leading-tight drop-shadow-md">
                        {collection.title}
                    </h3>
                    <p className="text-xs font-medium text-gray-300 drop-shadow-sm">
                        {collection.itemCount} items
                    </p>
                </div>
            </motion.div>
        </Link>
    );
}