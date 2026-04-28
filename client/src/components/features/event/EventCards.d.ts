interface EventType {
    _id: string;
    name: string;
    date: string;
    location: string;
    image?: string;
    status?: "active" | "pending" | "completed";
}
interface EventCardProps {
    event: EventType;
    onAddTicket: (event: EventType) => void;
}
export default function EventCard({ event, onAddTicket }: EventCardProps): import("react/jsx-runtime").JSX.Element;
export {};
