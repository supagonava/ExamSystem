'use client';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const menuRef = useRef<Menu>(null);
  const pathname = usePathname();

  const menuItems = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => {
        window.location.href = '/admin/profile';
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
            <Link href="/admin/dashboard" className="text-xl font-bold">
              Admin Panel
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/admin/dashboard" className={isActive('/admin/dashboard')}>
                Dashboard
              </Link>
              <Link href="/admin/exams" className={isActive('/admin/exams')}>
                Exams
              </Link>
              <Link href="/admin/users" className={isActive('/admin/users')}>
                Users
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
