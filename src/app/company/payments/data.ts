
export type Payment = {
  id: string;
  libraryName: string;
  libraryId: string;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  status: 'Paid' | 'Pending' | 'Overdue';
  subscriptionPlan: 'Basic' | 'Pro' | 'Enterprise';
};

export const payments: Payment[] = [
  {
    id: 'PAY-001',
    libraryName: 'City Central Library',
    libraryId: '1',
    amount: 500,
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(),
    paidDate: null,
    status: 'Pending',
    subscriptionPlan: 'Pro',
  },
  {
    id: 'PAY-002',
    libraryName: 'Tech Park Library',
    libraryId: '2',
    amount: 1000,
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 15).toISOString(),
    paidDate: new Date(new Date().getFullYear(), new Date().getMonth(), 14).toISOString(),
    status: 'Paid',
    subscriptionPlan: 'Enterprise',
  },
  {
    id: 'PAY-003',
    libraryName: 'Downtown Branch',
    libraryId: '3',
    amount: 250,
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString(),
    paidDate: null,
    status: 'Overdue',
    subscriptionPlan: 'Basic',
  },
  {
    id: 'PAY-004',
    libraryName: 'Suburb Community Library',
    libraryId: '4',
    amount: 500,
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5).toISOString(),
    paidDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5).toISOString(),
    status: 'Paid',
    subscriptionPlan: 'Pro',
  },
  {
    id: 'PAY-005',
    libraryName: 'Westside Reading Room',
    libraryId: '5',
    amount: 250,
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(),
    paidDate: null,
    status: 'Pending',
    subscriptionPlan: 'Basic',
  },
];
