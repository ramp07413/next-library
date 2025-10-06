
export type Permission = {
  id: string;
  action: string; 
  subject: string; 
  description: string;
};

export type LibraryRolePermissions = {
  [key in 'head' | 'librarian' | 'clerk']: string[];
};

export const libraryModules = [
  {
    name: 'Students',
    permissions: [
      { id: 'student-read', action: 'read', subject: 'student', description: 'View student list and details' },
      { id: 'student-create', action: 'create', subject: 'student', description: 'Add a new student' },
      { id: 'student-update', action: 'update', subject: 'student', description: 'Edit student profiles' },
      { id: 'student-delete', action: 'delete', subject: 'student', description: 'Activate/Deactivate a student' },
    ],
  },
  {
    name: 'Seats',
    permissions: [
      { id: 'seat-read', action: 'read', subject: 'seat', description: 'View seat layout and status' },
      { id: 'seat-assign', action: 'update', subject: 'seat', description: 'Assign or vacate a seat' },
      { id: 'seat-maintenance', action: 'update', subject: 'seat', description: 'Mark seats for maintenance' },
    ],
  },
  {
    name: 'Payments',
    permissions: [
      { id: 'payment-read', action: 'read', subject: 'payment', description: 'View student payment history' },
      { id: 'payment-update', action: 'update', subject: 'payment', description: 'Mark payments as paid or send reminders' },
    ],
  },
  {
    name: 'Expenses',
    permissions: [
        { id: 'expense-read', action: 'read', subject: 'expense', description: 'View library expenses' },
        { id: 'expense-create', action: 'create', subject: 'expense', description: 'Add a new expense' },
    ]
  },
  {
    name: 'Admins',
    permissions: [
        { id: 'admin-read', action: 'read', subject: 'admin', description: 'View list of library admins' },
        { id: 'admin-manage', action: 'manage', subject: 'admin', description: 'Add, edit, or remove other admins' },
    ]
  }
];

export const libraryRolePermissions: LibraryRolePermissions = {
  head: libraryModules.flatMap(m => m.permissions.map(p => p.id)), // All permissions for the library
  librarian: [
    'student-read', 'student-create', 'student-update',
    'seat-read', 'seat-assign',
    'payment-read', 'payment-update',
    'expense-read',
    'admin-read',
  ],
  clerk: [
    'student-read',
    'seat-read',
    'payment-read',
  ],
};
