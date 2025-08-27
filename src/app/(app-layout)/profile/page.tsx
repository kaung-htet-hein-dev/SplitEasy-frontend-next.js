'use client';

import { Button } from '@/components/atoms/button';
import { Card } from '@/components/atoms/card';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

interface ProfileProps {
  onLogout: () => void;
}

export default function Profile({ onLogout }: ProfileProps) {
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    currency: 'USD',
    language: 'en',
  });

  const [notifications, setNotifications] = useState({
    expenseAdded: true,
    balanceUpdates: true,
    reminders: false,
    weeklySummary: true,
  });

  const currencies = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'CAD', label: 'Canadian Dollar (C$)' },
    { value: 'AUD', label: 'Australian Dollar (A$)' },
    { value: 'JPY', label: 'Japanese Yen (¥)' },
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' },
  ];

  const handleSave = () => {
    // In a real app, you would save the profile data
    console.log('Saving profile:', profile);
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Profile & Settings</h1>
        <p className="mt-2 text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {/* Profile Info */}
      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.email}</p>
          </div>
        </div>
      </Card>

      {/* Sign Out */}
      <Card className="p-6">
        <Button variant="destructive" className="w-full" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </Card>
    </div>
  );
}
