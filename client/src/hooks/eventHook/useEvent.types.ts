// forms/event/event.types.ts
export interface EventForm {
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: string;
  price: string;
  image: File | null;
  category: string;
  status: string;

  organizerName: string;
  contactNumber: string;
  tags: string;
  dressCode: string;
}

export const initialEventForm: EventForm = {
  name: "",
  description: "",
  date: "",
  startTime: "",
  endTime: "",
  location: "",
  capacity: "",
  price: "",
  image: null,
  category: "Public Event",
  status: "active",
  organizerName: "",
  contactNumber: "",
  tags: "",
  dressCode: "",
};
