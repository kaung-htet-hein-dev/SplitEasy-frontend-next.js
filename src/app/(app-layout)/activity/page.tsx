'use client';

import React, { useState } from 'react';
import { DollarSign, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '@/components/atoms/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/tabs';

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

interface ActivityPageProps {
  expenses: Expense[];
  groups: Group[];
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

export default function ActivityPage({
  expenses = mockExpenses,
  groups = mockGroups,
}: ActivityPageProps) {
  const [activeTab, setActiveTab] = useState('all');

  const getGroupName = (groupId: string) => {
    return groups.find(g => g.id === groupId)?.name || 'Unknown Group';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      weekday: 'short',
    });
  };

  const sortedExpenses = expenses.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredExpenses = () => {
    switch (activeTab) {
      case 'paid':
        return sortedExpenses.filter(expense => expense.paidBy === 'You');
      case 'involved':
        return sortedExpenses.filter(
          expense => expense.participants.includes('You') && expense.paidBy !== 'You'
        );
      default:
        return sortedExpenses;
    }
  };

  const groupExpensesByDate = (expenses: Expense[]) => {
    const grouped: { [key: string]: Expense[] } = {};
    expenses.forEach(expense => {
      const dateKey = new Date(expense.date).toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(expense);
    });
    return grouped;
  };

  const groupedExpenses = groupExpensesByDate(filteredExpenses());

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Activity</TabsTrigger>
          <TabsTrigger value="paid">You Paid</TabsTrigger>
          <TabsTrigger value="involved">You're Involved</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {Object.keys(groupedExpenses).length === 0 ? (
            <Card className="p-12 text-center">
              <div className="p-4 bg-muted rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No activity yet</h3>
              <p className="text-muted-foreground">Your expense activity will appear here</p>
            </Card>
          ) : (
            Object.entries(groupedExpenses).map(([date, dayExpenses]) => (
              <div key={date} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-px bg-border flex-1" />
                  <span className="text-sm font-medium text-muted-foreground px-3">
                    {formatDate(dayExpenses[0].date)}
                  </span>
                  <div className="h-px bg-border flex-1" />
                </div>

                <div className="space-y-3">
                  {dayExpenses.map(expense => (
                    <Card key={expense.id} className="p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-2 rounded-lg ${
                              expense.paidBy === 'You' ? 'bg-green-100' : 'bg-blue-100'
                            }`}
                          >
                            {expense.paidBy === 'You' ? (
                              <ArrowUpRight
                                className={`h-5 w-5 ${
                                  expense.paidBy === 'You' ? 'text-green-600' : 'text-blue-600'
                                }`}
                              />
                            ) : (
                              <ArrowDownRight className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{expense.description}</h3>
                            <p className="text-sm text-muted-foreground">
                              {getGroupName(expense.groupId)} • Paid by {expense.paidBy}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {expense.participants.length} participants
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            ${expense.amount.toFixed(2)}
                          </p>
                          {expense.participants.includes('You') && (
                            <p className="text-sm text-muted-foreground">
                              Your share: $
                              {(expense.amount / expense.participants.length).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
