
export type Library = {
  id: string;
  libraryName: string;
  libraryEmail: string;
  libraryContact: string;
  libraryAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  isActive: boolean;
};

export const libraries: Library[] = [
  {
    id: "1",
    libraryName: "City Central Library",
    libraryEmail: "contact@citycentral.com",
    libraryContact: "123-456-7890",
    libraryAddress: {
      street: "123 Main St",
      city: "Metropolis",
      state: "NY",
      zip: "10001",
    },
    isActive: true,
  },
  {
    id: "2",
    libraryName: "Tech Park Library",
    libraryEmail: "support@techparklib.io",
    libraryContact: "987-654-3210",
    libraryAddress: {
      street: "456 Innovation Dr",
      city: "Silicon Valley",
      state: "CA",
      zip: "94043",
    },
    isActive: true,
  },
  {
    id: "3",
    libraryName: "Downtown Branch",
    libraryEmail: "downtown@libman.com",
    libraryContact: "555-123-4567",
    libraryAddress: {
      street: "789 Commerce St",
      city: "Big City",
      state: "TX",
      zip: "75001",
    },
    isActive: false,
  },
  {
    id: "4",
    libraryName: "Suburb Community Library",
    libraryEmail: "help@suburblib.org",
    libraryContact: "222-333-4444",
    libraryAddress: {
      street: "101 Suburbia Ln",
      city: "Pleasantville",
      state: "FL",
      zip: "33101",
    },
    isActive: true,
  },
  {
    id: "5",
    libraryName: "Westside Reading Room",
    libraryEmail: "info@westread.com",
    libraryContact: "888-777-6666",
    libraryAddress: {
      street: "21 West End Ave",
      city: "New Town",
      state: "WA",
      zip: "98001",
    },
    isActive: false,
  },
];
