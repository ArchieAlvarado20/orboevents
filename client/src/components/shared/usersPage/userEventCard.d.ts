interface Event {
    _id: string;
    name?: string;
    date: string;
    location: string;
    image?: string;
    status?: "active" | "pending" | "completed";
    description: string;
    price?: number;
}
interface EventCardProps {
    event: Event;
}
export default function UserEventCard({ event }: EventCardProps): import("react/jsx-runtime").JSX.Element;
export {};
