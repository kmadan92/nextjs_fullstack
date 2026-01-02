'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Input from '../components/input';
import Button from '../components/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import axios from "axios"

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSuccess(false);

        if (!formData.fullName || !formData.email || !formData.password) {
            setError('Please fill all mandatory fields.');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post("api/users/signup", formData) // simulate API call
            setIsSuccess(true);
            router.push('/');

        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main
            className="flex min-h-screen flex-col items-center justify-center p-6"
            style={{
                backgroundImage: "url('/background-pattern.png')",
                backgroundRepeat: 'repeat',
                backgroundSize: '400px',
                backgroundColor: '#FFFBF5'
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md rounded-3xl bg-[#fff5eb]/95 backdrop-blur-xl p-8 shadow-xl shadow-stone-200/50 border border-white/50"
            >
                {/* Header Section */}
                <div className="text-center mb-8">
                    <motion.h1
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold text-red-900 tracking-tight"
                    >
                        Join the Family ❤️
                    </motion.h1>
                    <p className="m-6 text-center text-red-950">
                        Create an account to view moments with<br /> little Kiaan <span className='text-2xl'>👼</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    <Input
                        label="Full Name"
                        labelClassname="text-sm font-medium text-red-950"
                        name="fullName"
                        placeholder="Enter your name"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="bg-[#fff5eb]/95 focus:ring-red-950 border-red-950"
                    />

                    <Input
                        label="Email"
                        labelClassname="text-sm font-medium text-red-950"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-[#fff5eb]/95 focus:ring-red-950 border-red-950"
                    />

                    <Input
                        label="Password"
                        labelClassname="text-sm font-medium text-red-950"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-[#fff5eb]/95 focus:ring-red-950 border-red-950"
                    />

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
                        className={`w-full py-3 text-base shadow-lg transition-all ${isSuccess
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-red-900 hover:bg-red-700'
                            }`}
                    >
                        {isLoading ? 'Adding you to family...' : isSuccess ? 'Success! 🎉' : 'Sign Up'}
                    </Button>

                    <p className="text-sm text-center text-red-950">
                        Already have an account?{' '}
                        <Link href="/login" className="text-red-700 font-semibold hover:text-red-950 hover:underline transition-colors">
                            Log in
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