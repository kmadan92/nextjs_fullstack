'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sun, Heart, Sparkles, ChevronRight, Quote } from 'lucide-react';

export default function DashboardPage(): React.JSX.Element {
    const router = useRouter();

    const sections = [
        {
            id: 'grandparents',
            title: 'Grandparents',
            subtitle: 'The Roots',
            description: '"The roots that buried themselves in the dark, just so you could find the sun."',
            icon: Sun,
            color: 'text-amber-700',
            iconBg: 'bg-amber-100',
            bgGradient: 'from-amber-50 via-orange-50 to-amber-100',
            borderColor: 'border-amber-200',
            href: '/videos/grandparents'
        },
        {
            id: 'parents',
            title: 'Parents',
            subtitle: 'The Shade',
            description: '"The unshakeable shelter built from our love, so you can dream without fear and rise without limits."',
            icon: Heart,
            color: 'text-rose-700',
            iconBg: 'bg-rose-100',
            bgGradient: 'from-rose-50 via-red-50 to-pink-100',
            borderColor: 'border-rose-200',
            href: '/videos/parents'
        },
        {
            id: 'kiaan',
            title: 'Kiaan',
            subtitle: 'The Life',
            description: '"The vibrant bloom that proves our roots were deep and our love was strong."',
            icon: Sparkles,
            color: 'text-sky-700',
            iconBg: 'bg-sky-100',
            bgGradient: 'from-sky-50 via-blue-50 to-indigo-100',
            borderColor: 'border-sky-200',
            href: '/videos/kiaan'
        }
    ];

    return (
        <div className="min-h-screen bg-[#FAFAF9] p-6 md:p-12 font-sans selection:bg-rose-200">
            {/* Header Section */}
            <header className="mb-16 text-center max-w-2xl mx-auto">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 p-2 px-5 mb-5 rounded-full bg-white border border-rose-100 shadow-sm text-[11px] font-bold tracking-widest text-rose-400 uppercase"
                >
                    <span>MADE WITH ❤️ FOR KIAAN

                    </span>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >

                    </motion.div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-4xl md:text-6xl font-serif font-medium text-slate-800 tracking-tight mb-4"
                >
                    Family Memories
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-slate-500 text-lg font-light"
                >
                    A collection of moments that built your world.
                </motion.p>
            </header>

            {/* Cards Container */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {sections.map((section, index) => (
                    <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.25, duration: 0.6 }}
                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        onClick={() => router.push(section.href)}
                        className={`
                            relative cursor-pointer group rounded-[2rem] p-8 md:p-10 border
                            bg-gradient-to-br ${section.bgGradient} ${section.borderColor}
                            shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500
                            flex flex-col h-[450px] overflow-hidden
                        `}
                    >
                        {/* Decorative Quote Icon in background */}
                        <Quote className={`absolute top-8 right-8 w-24 h-24 opacity-5 ${section.color} transform -scale-x-100`} />

                        {/* Top Content: Icon & Subtitle */}
                        <div className="flex flex-col items-start gap-4 mb-auto z-10">
                            <div className={`p-4 rounded-2xl ${section.iconBg} ${section.color} shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                                <section.icon size={32} strokeWidth={1.5} />
                            </div>
                            <span className="uppercase tracking-widest text-[10px] font-bold text-slate-500 bg-white/80 px-3 py-1 rounded-full backdrop-blur-md">
                                {section.subtitle}
                            </span>
                        </div>

                        {/* Middle Content: Title & Emotional Quote */}
                        <div className="z-10 mb-8">
                            <h2 className={`text-5xl font-serif mb-6 ${section.color}`}>
                                {section.title}
                            </h2>
                            <div className="relative">
                                <div className={`w-8 h-1 mb-4 rounded-full bg-current opacity-20 ${section.color}`} />
                                <p className={`text-lg md:text-xl font-serif italic leading-relaxed text-slate-700`}>
                                    {section.description}
                                </p>
                            </div>
                        </div>

                        {/* Bottom Action */}
                        <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-6 group-hover:border-black/10 transition-colors z-10">
                            <span className={`text-sm font-semibold ${section.color} opacity-80`}>
                                Explore Gallery
                            </span>
                            <div className={`p-2 rounded-full bg-white/50 ${section.color} group-hover:bg-white group-hover:shadow-md transition-all`}>
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}