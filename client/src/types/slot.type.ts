export type SlotFormType = {
  _id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number | "";
  eventId?: string;
};

export const initialSlotForm = {
  name: "",
  date: "",
  startTime: "",
  endTime: "",
  capacity: "",
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
    },
  ],
};
