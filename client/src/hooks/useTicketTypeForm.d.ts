type TicketTypeForm = {
    name: string;
    description?: string;
    price: number | string;
    quantityTotal: number | string;
    privileges?: string;
    accessLevel?: "vip" | "media" | "general" | "speaker" | "staff";
    color?: string;
    requiresApproval: boolean;
    eventId?: string;
};
export default function useTicketTypeForm(eventId: string, onSuccess?: () => void): {
    form: TicketTypeForm;
    setForm: import("react").Dispatch<import("react").SetStateAction<TicketTypeForm>>;
    createTicketType: () => Promise<void>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    loading: boolean;
    errors: Partial<Record<keyof TicketTypeForm, string>>;
    resetErrors: () => void;
};
export {};
