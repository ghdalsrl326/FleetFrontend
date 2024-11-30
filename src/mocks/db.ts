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
  "Organic",
  "Royal",
  "Authentic",
  "Exotic",
  "Elegant",
  "Classic",
  "Vintage",
  "Charming",
  "Rustic",
  "Gourmet",
  "Traditional",
  "Urban",
  "정통",
  "할머니",
  "명품",
  "착한",
  "든든한",
  "신선한",
  "특제",
  "왕가",
  "프리미엄",
  "우리동네",
  "전통",
  "시골",
  "행복한",
  "맛있는",
  "향긋한",
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
  "Grill",
  "Garden",
  "Tavern",
  "Lounge",
  "Corner",
  "Steakhouse",
  "Pizzeria",
  "Brasserie",
  "Terrace",
  "Palace",
  "Hub",
  "Junction",
  "식당",
  "밥집",
  "국수",
  "김밥",
  "분식",
  "한식당",
  "백반집",
  "찜닭",
  "삼겹살",
  "국밥",
  "반찬",
  "도시락",
  "주막",
  "해장국",
  "반점",
];

const getRandomElement = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];
const getRandomPrefix = () => (Math.random() > 0.5 ? "더 " : "");
const getRandomSuffix = () =>
  Math.random() > 0.7 ? " 본점" : Math.random() > 0.5 ? " 맛집" : "";

export const locations: Location[] = Array.from(
  { length: 1000 },
  (_, index) => ({
    id: index,
    name: `${getRandomPrefix()}${getRandomElement(adjectives)} ${getRandomElement(nouns)}${getRandomSuffix()} ${index.toString().padStart(3, "0")}`,
    robot:
      Math.random() > 0.25
        ? {
            id: `BOT-${Math.random().toString(36).substr(2, 6)}`,
            isOnline: Math.random() > 0.3,
          }
        : undefined,
    star: Math.random() > 0.7,
  }),
);
