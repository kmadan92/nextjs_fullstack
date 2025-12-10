'use client';

import { Category } from '@/app/lib/definitions';
import { CollectionCard } from './collection-card';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CategoryRow({ category }: { category: Category }) {
    return (
        <div className="mb-8 space-y-4">
            {/* Row Header */}
            <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold text-red-950 dark:text-stone-100 md:text-2xl">
                    {category.title}
                </h2>
                <Link
                    href={`/dashboard/category/${category.id}`}
                    className="group flex items-center text-sm font-medium text-red-800 hover:text-red-600 dark:text-red-400"
                >
                    See all <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            {/* Horizontal Scroll Container */}
            {/* 'no-scrollbar' utility needs to be added to globals.css or use standard overflow */}
            <div className="flex gap-4 overflow-x-auto pb-6 pl-2 pr-6 pt-2 scrollbar-hide">
                {category.collections.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                ))}
            </div>
        </div>
    );
}