export type TicketTypeForm = {
  _id: string;
  name: string;
  description?: string;
  price: number | string;
  quantityTotal: number | string;

  privileges: string; // comma-separated input

  accessLevel?: "vip" | "media" | "general" | "speaker" | "staff";
  color?: string;

  eventId?: string;
};

export const initialTicketTypeForm = {
  name: "",
  description: "",
  price: "",
  quantityTotal: "",
  privileges: "",
  accessLevel: "general",
  color: "#3B82F6",
};

export const accessLevelColorMap = {
  vip: "#FACC15", // gold
  media: "#A855F7", // purple
  general: "#3B82F6", // blue
  speaker: "#10B981", // green
  staff: "#EF4444", // red
};
