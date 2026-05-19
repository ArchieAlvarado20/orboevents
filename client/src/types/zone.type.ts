export type ZoneStatus = "active" | "inactive";

export interface ZoneFormType {
  _id?: string;

  name: string;

  description: string;

  isActive: boolean;
}

export const initialZoneForm: ZoneFormType = {
  _id: "",

  name: "",

  description: "",

  isActive: true,
};
