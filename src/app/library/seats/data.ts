
export type Seat = {
  id: string;
  seatNumber: string;
  status: 'occupied' | 'free' | 'maintenance';
  studentName: string | null;
  studentId: string | null;
  dateAssigned: string | null;
};

export const seats: Seat[] = [
  {
    id: '1',
    seatNumber: 'A-01',
    status: 'occupied',
    studentName: 'Alice Johnson',
    studentId: 'STU-001',
    dateAssigned: new Date('2024-06-01T09:00:00Z').toISOString(),
  },
  {
    id: '2',
    seatNumber: 'A-02',
    status: 'occupied',
    studentName: 'Diana Prince',
    studentId: 'STU-004',
    dateAssigned: new Date('2024-05-15T11:00:00Z').toISOString(),
  },
  {
    id: '3',
    seatNumber: 'A-03',
    status: 'free',
    studentName: null,
    studentId: null,
    dateAssigned: null,
  },
  {
    id: '4',
    seatNumber: 'B-05',
    status: 'occupied',
    studentName: 'Bob Williams',
    studentId: 'STU-002',
    dateAssigned: new Date('2024-06-10T14:00:00Z').toISOString(),
  },
    {
    id: '5',
    seatNumber: 'B-06',
    status: 'maintenance',
    studentName: null,
    studentId: null,
    dateAssigned: null,
  },
  {
    id: '6',
    seatNumber: 'C-21',
    status: 'occupied',
    studentName: 'Charlie Brown',
    studentId: 'STU-003',
    dateAssigned: new Date('2024-06-05T10:30:00Z').toISOString(),
  },
   {
    id: '7',
    seatNumber: 'D-11',
    status: 'occupied',
    studentName: 'Ethan Hunt',
    studentId: 'STU-005',
    dateAssigned: new Date('2024-05-20T08:00:00Z').toISOString(),
  },
  {
    id: '8',
    seatNumber: 'D-12',
    status: 'free',
    studentName: null,
    studentId: null,
    dateAssigned: null,
  },
];
