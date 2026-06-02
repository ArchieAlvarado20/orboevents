export type SlotFormType = {
  _id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number | "";
  eventId?: string;

  status: "pending" | "cancelled" | "published";
};

export const initialSlotForm = {
  name: "",
  date: "",
  startTime: "",
  endTime: "",
  capacity: "",

  status: "pending",
};

export type SlotFormBulkType = {
  slots: SlotFormType[];
};

export const initialSlotBulkForm = {
  slots: [
    {
      name: "",
      date: "",
      startTime: "",
      endTime: "",
      capacity: null,
      status: "pending",
    },
  ],
};
