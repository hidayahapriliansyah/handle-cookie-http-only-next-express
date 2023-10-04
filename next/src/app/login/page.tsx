'use client'

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LogIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const resJson = await response.json();
    console.log(resJson);
    router.push('/dashboard');
  }

  return (
    <div className='flex justify-center items-center m-4'>
      <div>
        <h1 className='text-2xl text-center'>Log In</h1>
        <form onSubmit={handleSubmit} className=' text-black'>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' className='border border-black' />
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className='border border-black' />
          <button type='submit' className='bg-blue-100'>Log in</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;