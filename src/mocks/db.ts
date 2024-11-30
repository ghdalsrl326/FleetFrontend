import { Location } from "types/location";

const adjectives = [
  "Spicy",
  "Sweet",
  "Salty",
  "Tasty",
  "Fresh",
  "Fancy",
  "Cozy",
  "Modern",
];
const nouns = [
  "Restaurant",
  "Kitchen",
  "Bistro",
  "Cafe",
  "Diner",
  "Eatery",
  "House",
  "Place",
];

export const locations: Location[] = Array.from(
  { length: 200 },
  (_, index) => ({
    id: index,
    name: `${adjectives[index % adjectives.length]} ${nouns[index % nouns.length]} ${index.toString().padStart(3, "0")}`,
    robot:
      index % 4 === 0
        ? undefined
        : {
            id: `robot${index.toString().padStart(3, "0")}`,
            isOnline: index % 2 === 0,
          },
    star: index % 3 === 0,
  }),
);
