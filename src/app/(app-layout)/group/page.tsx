'use client';

import React from 'react';
import { Users, ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { Card } from '@/components/atoms/card';

interface Group {
  id: string;
  name: string;
  members: string[];
  totalExpenses: number;
  yourBalance: number;
}

interface GroupsProps {
  groups: Group[];
  onViewGroup: (groupId: string) => void;
}

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Roommates',
    members: ['You', 'Alex', 'Sam'],
    totalExpenses: 1250,
    yourBalance: -45,
  },
  {
    id: '2',
    name: 'Trip to Bali',
    members: ['You', 'Emma', 'Jake', 'Lisa'],
    totalExpenses: 2840,
    yourBalance: 120,
  },
  {
    id: '3',
    name: 'Work Lunches',
    members: ['You', 'Mike', 'Sarah'],
    totalExpenses: 340,
    yourBalance: 15,
  },
];

export default function Groups({ groups = mockGroups, onViewGroup }: GroupsProps) {
  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Groups</h1>
          <p className="mt-2 text-muted-foreground">Manage your expense groups</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">New Group</Button>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map(group => (
          <Card key={group.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3  rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{group.name}</h3>
                  <p className="text-sm text-muted-foreground">{group.members.length} members</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total expenses</span>
                <span className="font-medium text-foreground">
                  ${group.totalExpenses.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Your balance</span>
                <span className={`font-medium`}>
                  {group.yourBalance >= 0 ? '+' : ''}${group.yourBalance.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Members</p>
                <div className="flex flex-wrap gap-1">
                  {group.members.slice(0, 3).map((member, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground"
                    >
                      {member}
                    </span>
                  ))}
                  {group.members.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">
                      +{group.members.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={() => onViewGroup(group.id)}>
                View Details
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {groups.length === 0 && (
        <div className="text-center py-12">
          <div className="p-4 bg-muted rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No groups yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first group to start splitting expenses
          </p>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        </div>
      )}
    </div>
  );
}
