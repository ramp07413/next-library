
export type Expense = {
  id: string;
  category: 'utilities' | 'maintenance' | 'supplies' | 'staff' | 'marketing' | 'other';
  description: string;
  amount: number;
  date: string;
  type: 'one-time' | 'recurring';
};

export const expenses: Expense[] = [
  {
    id: 'EXP-001',
    category: 'staff',
    description: 'Monthly payroll for developers',
    amount: 15000,
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
    type: 'recurring',
  },
  {
    id: 'EXP-002',
    category: 'utilities',
    description: 'Cloud server hosting fees',
    amount: 2500,
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 5).toISOString(),
    type: 'recurring',
  },
  {
    id: 'EXP-003',
    category: 'marketing',
    description: 'Q3 Social media ad campaign',
    amount: 3000,
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 10).toISOString(),
    type: 'one-time',
  },
  {
    id: 'EXP-004',
    category: 'supplies',
    description: 'New office laptops for new hires',
    amount: 4500,
    date: new Date(new Date().getFullYear(), new Date().getMonth() -1, 15).toISOString(),
    type: 'one-time',
  },
  {
    id: 'EXP-005',
    category: 'maintenance',
    description: 'Office cleaning services',
    amount: 500,
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 20).toISOString(),
    type: 'recurring',
  },
];
