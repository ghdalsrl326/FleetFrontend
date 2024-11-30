export interface Location {
  id: number;
  name: string;
  robot: {
    id: string;
    is_online: boolean;
  };
}

export const locations: Location[] = [
  // Please add more locations to show features

  {
    id: 0,
    name: "Spicy restaurant",
    robot: {
      id: "abcde123",
      is_online: true,
    },
  },
  {
    id: 1,
    name: "Salty restaurant",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
];
