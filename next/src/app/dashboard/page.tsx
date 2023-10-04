'use client'

import { useRouter } from 'next/navigation';
import React from 'react'

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch('/api/logout');
    const resJson = await response.json();
    console.log(resJson);
    router.push('/login');
  }

  return (
    <>
      <div>Dashboard</div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  )
}

export default Dashboard