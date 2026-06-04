export type TicketTypeForm = {
  _id: string;
  name: string;
  description?: string;
  price: number | string;
  quantityTotal: number | string;

  quantitySold: number | string;
  quantityReserved: number | string;

  privileges: string; // comma-separated input

  accessLevel?: "vip" | "premium" | "regular";
  color?: string;

  eventId?: string;

  slotId?: string;

  allowedZones: string[];

  status?: "draft" | "pending" | "cancelled" | "published";
};

export const initialTicketTypeForm = {
  name: "",
  description: "",
  price: "",
  quantityTotal: "",
  privileges: "",
  accessLevel: "regular",
  allowedZones: [],
  color: "#3B82F6",
  slotId: "",
};

export const accessLevelColorMap = {
  vip: "#FACC15", // gold
  premium: "#A855F7", // purple
  regular: "#3B82F6", // blue
};
