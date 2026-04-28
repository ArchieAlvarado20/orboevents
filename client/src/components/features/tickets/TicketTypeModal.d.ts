export type EventType = {
    _id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    capacity: number;
    image?: string;
    status: "draft" | "active" | "cancelled" | "completed";
    color: "green";
};
type TicketTypeModalProps = {
    event: EventType;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
};
export default function TicketTypeModal({ event, open, onClose, onSuccess, }: TicketTypeModalProps): import("react/jsx-runtime").JSX.Element;
export {};
