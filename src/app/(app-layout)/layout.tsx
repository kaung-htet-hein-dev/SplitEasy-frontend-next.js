import ThemeSwitcher from '@/components/atoms/themeSwitcher';
import { BottomTab } from '@/components/molecules/bottomTab';
import { SideBar } from '@/components/molecules/sideBar';
import React from 'react';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <SideBar />

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:hidden bg-tab">
          <h1 className="text-xl font-semibold text-foreground">SplitEasy</h1>
          <ThemeSwitcher className="ml-auto" />
        </div>

        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <BottomTab />

      {/* Floating Action Button for Adding Expenses */}
    </div>
  );
};

export default AppLayout;
