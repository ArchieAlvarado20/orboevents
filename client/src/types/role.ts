export type RoleStatus = "active" | "inactive";

export interface RoleFormType {
  _id: string;
  name: string;
  description: string;
  permissions: string[];
  status: RoleStatus;
}

export const initialForm = {
  name: "",
  description: "",
  permissions: [],
  status: "active" as RoleStatus,
};
