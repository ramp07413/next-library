
export type JobOpening = {
  id: string;
  title: string;
  location: string;
  type: 'Full-time' | 'Part-time';
  description: string;
};

export type VolunteerOpportunity = {
  id: string;
  title: string;
  commitment: string;
  description: string;
};

export const jobOpenings: JobOpening[] = [
  {
    id: 'JOB-001',
    title: 'Senior Librarian',
    location: 'City Central Library',
    type: 'Full-time',
    description: 'Manage the main branch, oversee staff, and develop community programs. Requires a Master\'s in Library Science and 5+ years of experience.',
  },
  {
    id: 'JOB-002',
    title: 'Digital Services Librarian',
    location: 'Remote / Tech Park Library',
    type: 'Full-time',
    description: 'Oversee the library\'s digital resources, including e-books, databases, and website content. Experience with library management systems is a must.',
  },
  {
    id: 'JOB-003',
    title: 'Children\'s Librarian',
    location: 'Suburb Community Library',
    type: 'Part-time',
    description: 'Develop and lead programs for children and young adults, including story times, reading clubs, and educational workshops.',
  },
];

export const volunteerOpportunities: VolunteerOpportunity[] = [
  {
    id: 'VOL-001',
    title: 'Event Support',
    commitment: '4-6 hours per event',
    description: 'Assist with setup, registration, and coordination during our community events, author talks, and workshops.',
  },
  {
    id: 'VOL-002',
    title: 'Shelving Assistant',
    commitment: '5-10 hours per week',
    description: 'Help us keep the library organized by shelving returned books and ensuring our collections are neat and accessible.',
  },
  {
    id: 'VOL-003',
    title: 'Reading Buddy',
    commitment: '2 hours per week',
    description: 'Become a reading buddy for young learners. Help children practice their reading skills in a fun and supportive environment.',
  },
];
