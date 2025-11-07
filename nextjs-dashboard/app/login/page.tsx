'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Input from '../ui/input';
import Button from '../ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false);

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSuccess(true);
      console.log(`Logged in as ${email}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-sky-50 to-blue-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-lg p-8 shadow-2xl border border-gray-100"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-semibold text-gray-800"
          >
            Welcome to <span className="text-blue-600">Kiaan’s Memory Lane</span> 👋
          </motion.h1>
          <p className="mt-2 text-gray-500">Sign in to relive your favorite memories ✨</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-sm text-red-600 text-center" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            variant={isSuccess ? 'secondary' : 'primary'}
            className="w-full mt-2"
          >
            {isLoading
              ? 'Logging in...'
              : isSuccess
              ? 'Success ✅'
              : 'Log In'}
          </Button>
        </form>

        <div className="mt-8 flex flex-col items-center space-y-3">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link href="/signup" className="text-blue-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/')}
          >
            ← Back to Home
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
