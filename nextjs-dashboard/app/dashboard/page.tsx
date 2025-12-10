'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { CategoryRow } from '@/app/ui/dashboard/category-row';
import { Category } from '@/app/lib/definitions';
import { motion } from 'framer-motion';
import Image from 'next/image';

// --- MOCK DATA GENERATOR ---
const generateMockData = (startId: number): Category[] => [
    {
        id: `cat-${startId}`,
        title: "Kiaan's First Year 👶",
        collections: [
            { id: '1', title: 'First Kolkata Trip', itemCount: 42, type: 'photo', thumbnail: 'https://images.unsplash.com/photo-1543353071-87d3780521cc?auto=format&fit=crop&q=80&w=800' },
            { id: '2', title: 'Diwali Celebration', itemCount: 12, type: 'video', thumbnail: 'https://images.unsplash.com/photo-1514371879740-2e7d2068f502?auto=format&fit=crop&q=80&w=800' },
            { id: '3', title: 'First Steps', itemCount: 5, type: 'video', thumbnail: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800' },
            { id: '4', title: 'Rice Ceremony', itemCount: 150, type: 'photo', thumbnail: 'https://images.unsplash.com/photo-1610996884638-744033c4eb82?auto=format&fit=crop&q=80&w=800' },
            { id: '5', title: 'Random Cuteness', itemCount: 99, type: 'photo', thumbnail: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800' },
        ]
    },
    {
        id: `cat-${startId + 1}`,
        title: "Trips & Adventures ✈️",
        collections: [
            { id: '6', title: 'Vizag Beach', itemCount: 80, type: 'photo', thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800' },
            { id: '7', title: 'Flight Journey', itemCount: 3, type: 'video', thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800' },
            { id: '8', title: 'Zoo Visit', itemCount: 45, type: 'photo', thumbnail: 'https://images.unsplash.com/photo-1534567176735-8424074338e4?auto=format&fit=crop&q=80&w=800' },
            { id: '9', title: 'Park Day', itemCount: 20, type: 'video', thumbnail: 'https://images.unsplash.com/photo-1596464716127-f9a0859d03d3?auto=format&fit=crop&q=80&w=800' },
        ]
    },
    {
        id: `cat-${startId + 2}`,
        title: "Family Fun 👨‍👩‍👦",
        collections: [
            { id: '10', title: 'Grandparents Visit', itemCount: 10, type: 'photo', thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800' },
            { id: '11', title: 'Funny Faces', itemCount: 6, type: 'video', thumbnail: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=80&w=800' },
        ]
    }
];

export default function DashboardPage(): React.JSX.Element {
    // FIX: Using function callback in useState prevents regenerating data on every render
    const [categories, setCategories] = useState<Category[]>(() => generateMockData(1));
    const [loading, setLoading] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView && !loading) {
            loadMoreCategories();
        }
    }, [inView]);

    const loadMoreCategories = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Use functional state update for safety
        setCategories((prev) => {
            const newCategories = generateMockData(prev.length + 1);
            return [...prev, ...newCategories];
        });

        setLoading(false);
    };

    return (
        <main className="min-h-screen space-y-8 pb-10">

            {/* Hero / Featured Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                // @ts-ignore - This ignores the specific Framer Motion type error if dependencies are mismatched
                className="relative mb-10 h-[50vh] w-full overflow-hidden rounded-3xl shadow-2xl"
            >
                <Image
                    src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1200"
                    alt="Featured"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                    <h1 className="mb-2 text-5xl font-extrabold tracking-tight drop-shadow-lg">Kiaan&apos;s 1st Birthday</h1>
                    <p className="mb-4 text-lg font-medium text-gray-200">Coming soon • Vizag Trip</p>
                    <button className="rounded-lg bg-red-600 px-6 py-3 font-bold text-white shadow-lg hover:bg-red-700">
                        Play Highlights
                    </button>
                </div>
            </motion.div>

            {/* Categories Rows */}
            <div className="space-y-10">
                {categories.map((category) => (
                    <CategoryRow key={category.id} category={category} />
                ))}
            </div>

            {/* Infinite Scroll Loader */}
            <div ref={ref} className="flex h-24 w-full items-center justify-center">
                {loading && (
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-200 border-t-red-600"></div>
                        <p className="text-sm text-red-900/60 dark:text-stone-400">Loading memories...</p>
                    </div>
                )}
            </div>
        </main>
    );
}