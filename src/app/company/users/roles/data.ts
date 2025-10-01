
import { users } from '../data';

export type Role = {
  name: 'owner' | 'super_admin' | 'admin' | 'student';
  description: string;
  userCount: number;
};

const roleDescriptions = {
  owner: 'Full access to all company and library settings.',
  super_admin: 'Manages all libraries and company-level settings.',
  admin: 'Manages a specific library branch.',
  student: 'Access to personal dashboard and library resources.',
};

export const roles: Role[] = (Object.keys(roleDescriptions) as Array<keyof typeof roleDescriptions>).map(roleName => {
  const userCount = users.filter(user => user.role === roleName).length;
  return {
    name: roleName,
    description: roleDescriptions[roleName],
    userCount: userCount,
  };
});
