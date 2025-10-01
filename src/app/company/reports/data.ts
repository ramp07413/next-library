
export type Report = {
  id: string;
  title: string;
  submittedBy: string;
  libraryName: string;
  date: string;
  status: 'open' | 'closed';
  category: 'maintenance' | 'incident' | 'feedback' | 'other';
};

export const reports: Report[] = [
  {
    id: 'REP-001',
    title: 'Leaky faucet in main restroom',
    submittedBy: 'Sarah Chen',
    libraryName: 'City Central Library',
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    status: 'open',
    category: 'maintenance',
  },
  {
    id: 'REP-002',
    title: 'Wi-Fi connectivity issues in study area B',
    submittedBy: 'Michael Rodriguez',
    libraryName: 'Tech Park Library',
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    status: 'open',
    category: 'incident',
  },
  {
    id: 'REP-003',
    title: 'Suggestion for more comfortable chairs',
    submittedBy: 'Alice Johnson (Student)',
    libraryName: 'Downtown Branch',
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    status: 'closed',
    category: 'feedback',
  },
  {
    id: 'REP-004',
    title: 'Broken shelf in fiction section',
    submittedBy: 'Emily White',
    libraryName: 'City Central Library',
    date: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
    status: 'closed',
    category: 'maintenance',
  },
   {
    id: 'REP-005',
    title: 'Request for extended hours during finals',
    submittedBy: 'Bob Williams (Student)',
    libraryName: 'Tech Park Library',
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    status: 'open',
    category: 'feedback',
  },
];
