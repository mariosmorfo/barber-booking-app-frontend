export type ServiceItem = {
  name: string;
  duration?: number;
  price?: number;
  description?: string;
};

export const SERVICES: ServiceItem[] = [
  {
    name: "Haircut",
    duration: 30,
    price: 30,
    description:
      "Precision cut tailored to your style and preference by our expert barbers.",
  },
  {
    name: "Beard Trim",
    duration: 20,
    price: 15,
    description: "Shaping and trimming to keep your beard looking its best.",
  },
  {
    name: "Haircut & Beard Combo",
    duration: 50,
    price: 40,
    description: "Complete grooming package for the modern gentleman.",
  },
  {
    name: "Hot Towel Shave",
    duration: 25,
    price: 35,
    description: "Classic hot towel shave experience with premium products.",
  },
];

export default SERVICES;
