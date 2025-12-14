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
        <>
            <p>This is dashboard page</p>
        </>
    )
}