'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Input from '../ui/input';
import Button from '../ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import axios from 'axios';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post("/api/users/login", { email, password })

            router.push("/dashboard")

        } catch (err: any) {
            if (err.response?.status == 403) {
                router.push("/unauthorized")
            }
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsLoadingGoogle(true);
            await signIn('google', { callbackUrl: '/dashboard' })
        } catch (err: any) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <main
            className="flex min-h-screen flex-col items-center justify-center p-6"
            style={{
                // 1. Reference the image in the public folder
                backgroundImage: "url('/background-pattern.png')",
                // 2. This creates the 'wallpaper' effect
                backgroundRepeat: 'repeat',
                // 3. Adjust this size (300px-500px) to make the icons bigger or smaller
                backgroundSize: '400px',
                // 4. A fallback color similar to the image background (cream/off-white)
                backgroundColor: '#FFFBF5'
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                // Added 'shadow-xl' for more pop against the pattern
                // Increased bg-white opacity to 0.9 to make text readable against the pattern
                className="w-full max-w-md rounded-3xl bg-[#fff5eb]/95 backdrop-blur-xl p-8 shadow-xl shadow-stone-200/50 border border-white/50"
            >
                {/* Header Section */}
                <div className="text-center mb-8">
                    <motion.h1
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold text-red-900 tracking-tight"
                    >
                        Hello Family ❤️
                    </motion.h1>
                    <p className="m-6 text-center text-red-950">
                        I'm your little Kiaan <span className='text-3xl'>👼</span><br></br> Sign in to relive your moments with me.
                    </p>
                </div>


                {/* Google Button */}
                <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="relative w-full py-3 text-base shadow-lg bg-red-900 hover:bg-red-700 text-gray-700 border border-gray-100"
                >
                    <svg className="absolute left-4 w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    {isLoadingGoogle ? 'havan karenge..havan karenge...' : 'Sign In with Google'}
                </Button>

                {/* Elegant Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-red-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white/50 px-4 text-red-950 backdrop-blur-sm rounded-full">Or continue with</span>
                    </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <Input
                        label="Email"
                        labelClassname="text-sm font-medium text-red-950"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-[#fff5eb]/95 focus:ring-red-950 border-red-950"
                    />

                    <div className="flex flex-col gap-1">
                        <Input
                            label="Password"
                            labelClassname="text-sm font-medium text-red-950"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-[#fff5eb]/95 focus:ring-red-950 border-red-950"
                        />
                        <div className="text-right">
                            <Link href="#" className="text-xs text-red-700 hover:text-red-950 font-medium">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 text-center font-medium"
                        >
                            {error}
                        </motion.div>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 text-base shadow-lg bg-red-900 hover:bg-red-700"
                    >
                        {isLoading ? 'havan karenge..havan karenge...' : 'Sign In'}
                    </Button>

                    <p className="text-sm text-center text-red-950">
                        Don’t have an account?{' '}
                        <Link href="/signup" className="text-red-700 font-semibold hover:text-red-950 hover:underline transition-colors">
                            Create an account
                        </Link>
                    </p>
                </form>


                {/* Footer Links */}
                <div className="mt-8 text-center space-y-4">

                    <button
                        onClick={() => router.push('/')}
                        className="text-xs text-red-700 hover:text-red-950 transition-colors"
                    >
                        ← Return to Home
                    </button>
                </div>
            </motion.div>
        </main>
    );
}