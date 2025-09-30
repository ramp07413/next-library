
import { students } from '../students/data';

export type LibraryPayment = {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  status: 'Paid' | 'Pending' | 'Overdue';
};

export const payments: LibraryPayment[] = [
  {
    id: 'LIB-PAY-001',
    studentId: 'STU-001',
    studentName: 'Alice Johnson',
    studentAvatar: students.find(s => s.id === 'STU-001')?.avatar || '',
    amount: 150,
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
    paidDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
    status: 'Paid',
  },
  {
    id: 'LIB-PAY-002',
    studentId: 'STU-002',
    studentName: 'Bob Williams',
    studentAvatar: students.find(s => s.id === 'STU-002')?.avatar || '',
    amount: 150,
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 10).toISOString(),
    paidDate: null,
    status: 'Pending',
  },
  {
    id: 'LIB-PAY-003',
    studentId: 'STU-003',
    studentName: 'Charlie Brown',
    studentAvatar: students.find(s => s.id === 'STU-003')?.avatar || '',
    amount: 150,
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5).toISOString(),
    paidDate: new Date(new Date().getFullYear(), new Date().getMonth(), 4).toISOString(),
    status: 'Paid',
  },
  {
    id: 'LIB-PAY-004',
    studentId: 'STU-004',
    studentName: 'Diana Prince',
    studentAvatar: students.find(s => s.id === 'STU-004')?.avatar || '',
    amount: 120,
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth() -1, 15).toISOString(),
    paidDate: null,
    status: 'Overdue',
  },
  {
    id: 'LIB-PAY-005',
    studentId: 'STU-005',
    studentName: 'Ethan Hunt',
    studentAvatar: students.find(s => s.id === 'STU-005')?.avatar || '',
    amount: 150,
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 20).toISOString(),
    paidDate: null,
    status: 'Pending',
  },
];
