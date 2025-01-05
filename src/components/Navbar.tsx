'use client';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const menuRef = useRef<Menu>(null);
  const pathname = usePathname();

  const menuItems = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => {
        window.location.href = '/profile';
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
          {/* Left side - Logo and main navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold flex items-center space-x-2">
              <i className="pi pi-book" />
              <span>Exam System</span>
            </Link>

            {user && (
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/user/dashboard" className={`${isActive('/user/dashboard')} transition duration-150`}>
                  <i className="pi pi-home mr-1" />
                  Dashboard
                </Link>
                <Link href="/schedule" className={`${isActive('/schedule')} transition duration-150`}>
                  <i className="pi pi-calendar mr-1" />
                  Schedule
                </Link>
                <Link href="/results" className={`${isActive('/results')} transition duration-150`}>
                  <i className="pi pi-chart-bar mr-1" />
                  Results
                </Link>
              </div>
            )}
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden md:block text-sm">{user.username}</span>
                <div className="relative">
                  <Avatar
                    label={user.username[0].toUpperCase()}
                    shape="circle"
                    className="cursor-pointer bg-blue-700 hover:bg-blue-600 transition-colors"
                    onClick={(e) => menuRef.current?.toggle(e)}
                  />
                  <Menu model={menuItems} popup ref={menuRef} className="w-48" />
                </div>
              </>
            ) : (
              <Link href="/login">
                <Button label="Login" className="p-button-sm" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {user && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link href="/user/dashboard" 
                className={`${isActive('/user/dashboard')} px-3 py-2 rounded-md text-sm font-medium`}>
                <i className="pi pi-home mr-2" />
                Dashboard
              </Link>
              <Link href="/schedule" 
                className={`${isActive('/schedule')} px-3 py-2 rounded-md text-sm font-medium`}>
                <i className="pi pi-calendar mr-2" />
                Schedule
              </Link>
              <Link href="/results" 
                className={`${isActive('/results')} px-3 py-2 rounded-md text-sm font-medium`}>
                <i className="pi pi-chart-bar mr-2" />
                Results
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
