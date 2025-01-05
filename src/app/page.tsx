'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/api/auth/me');
        const user = res.data;

        if (user.role === 'ADMIN') {
          router.push('/admin/dashboard');
        } else if (user.role === 'USER') {
          router.push('/user/dashboard');
        } else if (user.role === 'CANDIDATE') {
          router.push('/candidate/dashboard');
        } else {
          router.push('/login');
        }
      } catch (error) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return <div>Loading...</div>;
};

export default HomePage;

