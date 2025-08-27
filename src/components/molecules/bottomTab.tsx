'use client';

import { NAVIGATION_ITEMS } from '@/constants/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const BottomTab = () => {
  const path = usePathname();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t lg:hidden bg-tab">
      <div className="grid grid-cols-4 py-2">
        {NAVIGATION_ITEMS.map(item => (
          <Link
            key={item.id}
            href={item.path}
            className={`flex flex-col items-center justify-center p-2 transition-colors ${
              path === item.path ? 'text-teal-600' : 'text-muted-foreground'
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
