export interface Event {
  _id: string;
  name?: string;
  date: string;
  location: string;
  image?: string;
  startTime?: string;
  endTime?: string;
  status?: "active" | "pending" | "completed";
  description: string;
  price?: number;
  accessLevel: string;
  color: string;
  ticketTypes?: {
    _id: string;
    name: string;
    price: number;
    description?: string;
    accessLevel: string;
    color: string;
    privileges?: [string];
  }[];
}
