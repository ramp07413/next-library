
export type Permission = {
  id: string;
  action: string; // e.g., 'create', 'read', 'update', 'delete'
  subject: string; // e.g., 'library', 'user', 'payment'
  description: string;
};

export type RolePermissions = {
  [key in 'owner' | 'super_admin' | 'admin' | 'student']: string[];
};

export const modules = [
  {
    name: 'Libraries',
    permissions: [
      { id: 'lib-read', action: 'read', subject: 'library', description: 'View list of libraries' },
      { id: 'lib-create', action: 'create', subject: 'library', description: 'Register a new library' },
      { id: 'lib-update', action: 'update', subject: 'library', description: 'Edit library details' },
      { id: 'lib-delete', action: 'delete', subject: 'library', description: 'Deactivate a library' },
    ],
  },
  {
    name: 'Users',
    permissions: [
      { id: 'user-read', action: 'read', subject: 'user', description: 'View list of users' },
      { id: 'user-create', action: 'create', subject: 'user', description: 'Add a new user' },
      { id: 'user-update', action: 'update', subject: 'user', description: 'Edit user roles and status' },
      { id: 'user-delete', action: 'delete', subject: 'user', description: 'Delete a user' },
    ],
  },
  {
    name: 'Payments',
    permissions: [
      { id: 'pay-read', action: 'read', subject: 'payment', description: 'View all transactions' },
      { id: 'pay-update', action: 'update', subject: 'payment', description: 'Mark payments as paid or send reminders' },
    ],
  },
  {
    name: 'Expenses',
    permissions: [
        { id: 'exp-read', action: 'read', subject: 'expense', description: 'View all expenses' },
        { id: 'exp-create', action: 'create', subject: 'expense', description: 'Add a new expense' },
        { id: 'exp-update', action: 'update', subject: 'expense', description: 'Edit expense details' },
    ]
  },
  {
    name: 'Student',
    permissions: [
        { id: 'stu-dashboard', action: 'read', subject: 'student_dashboard', description: 'Access personal dashboard' },
        { id: 'stu-payments', action: 'manage', subject: 'student_payments', description: 'Manage personal payments' },
    ]
  }
];

export const rolePermissions: RolePermissions = {
  owner: modules.flatMap(m => m.permissions.map(p => p.id)), // All permissions
  super_admin: [
    'lib-read', 'lib-create', 'lib-update',
    'user-read', 'user-create', 'user-update',
    'pay-read', 'pay-update',
    'exp-read', 'exp-create', 'exp-update',
  ],
  admin: [
    'lib-read',
    'user-read',
    'pay-read',
  ],
  student: [
    'stu-dashboard', 'stu-payments'
  ],
};
