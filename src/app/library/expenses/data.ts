
export type LibraryExpense = {
  id: string;
  category: 'rent' | 'utilities' | 'books' | 'staff' | 'events' | 'other';
  description: string;
  amount: number;
  date: string;
  type: 'one-time' | 'recurring';
};

export const expenses: LibraryExpense[] = [
  {
    id: 'LIB-EXP-001',
    category: 'rent',
    description: 'Monthly space rental fee',
    amount: 3000,
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
    type: 'recurring',
  },
  {
    id: 'LIB-EXP-002',
    category: 'utilities',
    description: 'Electricity and Wi-Fi bill',
    amount: 450,
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 5).toISOString(),
    type: 'recurring',
  },
  {
    id: 'LIB-EXP-003',
    category: 'books',
    description: 'New fiction and non-fiction book order',
    amount: 1200,
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 10).toISOString(),
    type: 'one-time',
  },
  {
    id: 'LIB-EXP-004',
    category: 'staff',
    description: 'Part-time librarian salary',
    amount: 2200,
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15).toISOString(),
    type: 'recurring',
  },
  {
    id: 'LIB-EXP-005',
    category: 'events',
    description: 'Summer reading program marketing',
    amount: 300,
    date: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 20).toISOString(),
    type: 'one-time',
  },
];
