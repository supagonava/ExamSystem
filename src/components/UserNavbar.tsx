'use client';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function UserNavbar() {
  // ...existing Navbar code but with user-specific links...
  const { user, logout } = useAuth();
  const menuRef = useRef<Menu>(null);
  const pathname = usePathname();

  const menuItems = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => {
        window.location.href = '/user/profile';
      },
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-power-off',
      command: async () => {
        await logout();
        window.location.href = '/login';
      },
    },
  ];

  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-200 border-b-2 border-blue-200' : 'hover:text-blue-200';
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/user/dashboard" className="text-xl font-bold">
              Exam System
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/user/dashboard" className={isActive('/user/dashboard')}>
                Dashboard
              </Link>
              <Link href="/user/exams" className={isActive('/user/exams')}>
                My Exams
              </Link>
              <Link href="/user/results" className={isActive('/user/results')}>
                Results
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:block">{user?.username}</span>
            <Avatar
              label={user?.username?.[0].toUpperCase()}
              shape="circle"
              className="cursor-pointer"
              onClick={(e) => menuRef.current?.toggle(e)}
            />
            <Menu model={menuItems} popup ref={menuRef} />
          </div>
        </div>
      </div>
    </nav>
  );
}
