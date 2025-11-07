'use client';

import React, { useState } from 'react';
import Input from '../ui/input';
import Button from '../ui/button';
import { useRouter } from 'next/navigation';

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
      await new Promise((resolve) => setTimeout(resolve, 1500)); // simulate API call
      setIsSuccess(true);
      console.log('Signup Data:', formData);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-semibold text-gray-800">
          Create Your Account ✨
        </h1>
        <p className="mb-6 text-center text-gray-500">
          Join Kiaan’s Memory Lane and start creating moments.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
            <Input
              label="First Name *"
              name="firstName"
              placeholder="Enter first name"
              required
              value={formData.fullName}
              onChange={handleChange}
            />

          <Input
            label="Email *"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Password *"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            value={formData.password}
            onChange={handleChange}
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
            {isLoading ? 'Creating account...' : isSuccess ? 'Success 🎉' : 'Sign Up'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>

        <div className="mt-6 text-center">
          <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
            ← Back to Home
          </Button>
        </div>
      </div>
    </main>
  );
}
