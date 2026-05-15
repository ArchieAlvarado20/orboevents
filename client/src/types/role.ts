export type RoleStatus = "active" | "inactive";

export interface RoleFormType {
  _id: string;
  name: string;
  description: string;
  permissions: string[];
  status: RoleStatus;
  accessLevel?: "super" | "admin" | "staff" | "user";
}

export const initialForm = {
  name: "",
  description: "",
  permissions: [],
  status: "active" as RoleStatus,
  accessLevel: "",
};
