import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { PrimeReactProvider } from 'primereact/api';
import { AuthProvider } from '@/contexts/AuthContext';
import AdminNavbar from '@/components/AdminNavbar';
import UserNavbar from '@/components/UserNavbar';
import { cookies } from 'next/headers';
import { mockAuth } from '@/lib/mockData';
import "primereact/resources/themes/tailwind-light/theme.css";
import 'primeicons/primeicons.css';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exam System",
  description: "Online examination platform",
};

async function getUserRole() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const role = String(cookieStore.get('lastUsername')?.value || '').toUpperCase();
  return token ? role : null;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const role = await getUserRole();
  const { headers } = await import('next/headers');
  const headersList = headers();
  const pathname = (await headersList).get('x-pathname') || '/';
  const showNavbar = !['/login'].includes(pathname);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <AuthProvider>
          <PrimeReactProvider>
            {showNavbar && role === 'ADMIN' && <AdminNavbar />}
            {showNavbar && role === 'USER' && <UserNavbar />}
            {role ? <div className="antialiased p-4 md:p-8 lg:p-16">{children}</div> : children}
          </PrimeReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
