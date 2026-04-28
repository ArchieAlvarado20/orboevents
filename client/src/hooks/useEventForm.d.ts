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
export default function useEventForm(onSuccess?: () => void): {
    form: EventForm;
    setForm: import("react").Dispatch<import("react").SetStateAction<EventForm>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    createEvent: () => Promise<void>;
    loading: boolean;
    errors: Partial<Record<keyof EventForm, string>>;
    resetErrors: () => void;
};
