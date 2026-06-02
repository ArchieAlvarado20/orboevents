export interface EventZoneFormType {
  _id?: string;

  eventId?: string;

  zoneId: string;

  capacity: number | "";

  entryTime: string;

  isReEntryAllowed: boolean;

  scanOrder: number | "";

  isActive: boolean;
}

export const initialEventZoneForm: EventZoneFormType = {
  zoneId: "",

  capacity: "",

  entryTime: "",

  isReEntryAllowed: false,

  scanOrder: "",

  isActive: true,
};
