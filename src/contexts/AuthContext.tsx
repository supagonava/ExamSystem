'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockAuth, mockUsers } from '@/lib/mockData';
import Cookies from 'js-cookie';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = Cookies.get('token');
      if (token) {
        const lastUsername = Cookies.get('lastUsername');
        const mockUser = mockUsers.find(u => u.username === lastUsername);
        if (mockUser) {
          const { password, ...userWithoutPassword } = mockUser;
          setUser(userWithoutPassword as User);
        }
      }
    } catch (error) {
      setUser(null);
      Cookies.remove('token');
      Cookies.remove('lastUsername');
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const { token, user } = mockAuth.login(username, password);
      Cookies.set('token', token);
      Cookies.set('lastUsername', String(username).toUpperCase());
      setUser(user as User);

      // Handle redirection based on role
      const role = user.role;
      if (role === 'USER') {
        window.open('/user/dashboard', "_self");
      } else if (role === 'ADMIN') {
        window.open('/admin/dashboard', "_self");
      }
    } catch (error) {
      throw new Error('Authentication failed');
    }
  };

  const logout = async () => {
    Cookies.remove('token');
    Cookies.remove('lastUsername');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
