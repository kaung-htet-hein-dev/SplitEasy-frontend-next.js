'use client';

import React from 'react';
import { Users, DollarSign, TrendingUp, Clock, ArrowRight, Plus } from 'lucide-react';
import { Card } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';

interface Group {
  id: string;
  name: string;
  members: string[];
  totalExpenses: number;
  yourBalance: number;
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  participants: string[];
  date: string;
  groupId: string;
}

interface HomeProps {
  groups: Group[];
  expenses: Expense[];
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

const mockExpenses: Expense[] = [
  {
    id: '1',
    description: 'Groceries',
    amount: 85,
    paidBy: 'You',
    participants: ['You', 'Alex', 'Sam'],
    date: '2025-01-15',
    groupId: '1',
  },
  {
    id: '2',
    description: 'Electricity Bill',
    amount: 120,
    paidBy: 'Alex',
    participants: ['You', 'Alex', 'Sam'],
    date: '2025-01-14',
    groupId: '1',
  },
  {
    id: '3',
    description: 'Hotel Booking',
    amount: 480,
    paidBy: 'Emma',
    participants: ['You', 'Emma', 'Jake', 'Lisa'],
    date: '2025-01-12',
    groupId: '2',
  },
];

export default function Home({
  groups = mockGroups,
  expenses = mockExpenses,
  onViewGroup,
}: HomeProps) {
  const totalBalance = groups.reduce((sum, group) => sum + group.yourBalance, 0);
  const totalExpenses = groups.reduce((sum, group) => sum + group.totalExpenses, 0);
  const recentExpenses = expenses.slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Good morning! 👋</h1>
        <p className="mt-2 text-muted-foreground">Here's what's happening with your expenses</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm  mb-1">Total Balance</p>
              <p className={`text-2xl font-semibold `}>
                {totalBalance >= 0 ? '+' : ''}${totalBalance.toFixed(2)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-1">Total Expenses</p>
              <p className="text-2xl font-semibold ">${totalExpenses.toFixed(2)}</p>
            </div>
            <DollarSign className="h-8 w-8 " />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-1">Active Groups</p>
              <p className="text-2xl font-semibold ">{groups.length}</p>
            </div>
            <Users className="h-8 w-8 " />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-1">This Month</p>
              <p className="text-2xl font-semibold">{expenses.length}</p>
            </div>
            <Clock className="h-8 w-8 " />
          </div>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Expenses */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Recent Expenses</h2>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            {recentExpenses.map(expense => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <DollarSign className="h-4 w-4 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{expense.description}</h3>
                    <p className="text-sm text-muted-foreground">
                      {groups.find(g => g.id === expense.groupId)?.name} •{' '}
                      {formatDate(expense.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${expense.amount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">by {expense.paidBy}</p>
                </div>
              </div>
            ))}

            {recentExpenses.length === 0 && (
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No recent expenses</p>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h2>

          <div className="space-y-3">
            <Button className="w-full justify-start bg-teal-600 hover:bg-teal-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Create Group
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="h-4 w-4 mr-2" />
              Settle Up
            </Button>
          </div>
        </Card>
      </div>

      {/* Groups Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Your Groups</h2>
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.slice(0, 3).map(group => (
            <div
              key={group.id}
              className="p-4 bg-muted rounded-lg hover:bg-accent transition-colors cursor-pointer"
              onClick={() => onViewGroup(group.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground">{group.name}</h3>
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Users className="h-4 w-4 text-teal-600" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Members</span>
                  <span className="text-foreground">{group.members.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your balance</span>
                  <span className={`font-medium `}>
                    {group.yourBalance >= 0 ? '+' : ''}${group.yourBalance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {groups.length === 0 && (
            <div className="col-span-full text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No groups yet</p>
              <Button variant="outline" className="mt-3">
                <Plus className="h-4 w-4 mr-2" />
                Create your first group
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
