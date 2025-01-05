'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const res = await axios.get('/api/auth/me');
          const { role } = res.data;

          if (role === 'USER') {
            window.open('/user/dashboard', '_self');
          } else if (role === 'ADMIN') {
            window.open('/admin/dashboard', '_self');
          }
        } catch (error) {
          Cookies.remove('token');
        }
      }
    };
    checkAuth();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth/login', {
        email: emailOrUsername.includes('@') ? emailOrUsername : undefined,
        username: !emailOrUsername.includes('@') ? emailOrUsername : undefined,
        password,
      });

      const { token, role } = res.data;
      Cookies.set('token', token);

      if (role === 'USER') {
        window.open('/user/dashboard', "_self");
      } else if (role === 'ADMIN') {
        window.open('/admin/dashboard', "_self");;
      }
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-900">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Email or Username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
