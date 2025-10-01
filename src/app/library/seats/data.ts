
export type Seat = {
  id: string;
  seatNumber: string;
  status: 'available' | 'half occupied' | 'full occupied' | 'maintenance';
  studentName: string | null;
  studentId: string | null;
  dateAssigned: string | null;
};

export const seats: Seat[] = [
  {
    id: '1',
    seatNumber: '101',
    status: 'full occupied',
    studentName: 'Alice Johnson',
    studentId: 'STU-001',
    dateAssigned: new Date('2024-06-01T09:00:00Z').toISOString(),
  },
  {
    id: '2',
    seatNumber: '102',
    status: 'full occupied',
    studentName: 'Diana Prince',
    studentId: 'STU-004',
    dateAssigned: new Date('2024-05-15T11:00:00Z').toISOString(),
  },
  {
    id: '3',
    seatNumber: '103',
    status: 'available',
    studentName: null,
    studentId: null,
    dateAssigned: null,
  },
  {
    id: '4',
    seatNumber: '205',
    status: 'full occupied',
    studentName: 'Bob Williams',
    studentId: 'STU-002',
    dateAssigned: new Date('2024-06-10T14:00:00Z').toISOString(),
  },
    {
    id: '5',
    seatNumber: '206',
    status: 'maintenance',
    studentName: null,
    studentId: null,
    dateAssigned: null,
  },
  {
    id: '6',
    seatNumber: '321',
    status: 'half occupied',
    studentName: 'Charlie Brown',
    studentId: 'STU-003',
    dateAssigned: new Date('2024-06-05T10:30:00Z').toISOString(),
  },
   {
    id: '7',
    seatNumber: '411',
    status: 'full occupied',
    studentName: 'Ethan Hunt',
    studentId: 'STU-005',
    dateAssigned: new Date('2024-05-20T08:00:00Z').toISOString(),
  },
  {
    id: '8',
    seatNumber: '412',
    status: 'available',
    studentName: null,
    studentId: null,
    dateAssigned: null,
  },
];
