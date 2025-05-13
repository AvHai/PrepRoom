import  Navbar from '@/components/Navbar.jsx'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { ScrollArea } from "@/components/ui/scroll-area"
import  Footer  from '@/components/Footer.jsx'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
    <Navbar />
    <ScrollArea className="flex-grow">
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </ScrollArea>
  </div>
);
};

export default Layout;
