import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { UserType } from '@/Types/UserType';
import AdminNavbar from './ProfilesNavbar/AdminNavbar';
import CustomerNavbar from './ProfilesNavbar/CustomerNavbar';

interface AuthenticatedLayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthenticatedLayout({
  header,
  children,
}: AuthenticatedLayoutProps) {
  const user = usePage().props.auth.user as UserType;

  const { alert } = usePage().props as any;

  useEffect(() => {
    if (alert?.success) {
      toast.success(alert.success);
    }
    if (alert?.error) {
      toast.error(alert.error);
    }
  }, [alert]);

  return (
    <div className="min-h-screen bg-neutral">
      <Toaster position="top-center" />
      {user.profile === 'admin' ? <AdminNavbar /> : <CustomerNavbar />}
      {header && (
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      <main className="pt-24">{children}</main>
    </div>
  );
}
