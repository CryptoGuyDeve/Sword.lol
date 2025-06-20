import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}