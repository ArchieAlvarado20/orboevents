export interface EventForm {
  _id: string;
  name: string;
  description: string;
  image?: File | string | null;

  category: string;
  eventType: string;

  organizer: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };

  location: string;
  venue: string;

  basePrice: number;
  capacity: number;

  status: "draft" | "pending" | "active" | "cancelled" | "completed";

  tags: string[];
}

export const EventInitialForm = {
  name: "",
  description: "",
  image: "",

  category: "",
  eventType: "",

  organizer: {
    name: "",
    email: "",
    phone: "",
    company: "",
  },

  location: "",
  venue: "",

  basePrice: null,
  capacity: null,

  status: "active",

  tags: [],
};
