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

  status: "draft" | "pending" | "published" | "cancelled" | "completed";

  tags: string[];

  slot?: {
    _id?: string;
    date: string;
    startTime?: string;
  }[];
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

  status: "pending",

  tags: [],
  slot: [
    {
      name: "",
      date: "",
      startTime: "",
    },
  ],
};
