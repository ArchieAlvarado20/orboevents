export type RoleStatus = "active" | "inactive";

export interface RoleFormType {
  _id?: string;

  name: string;

  description: string;

  permissions: string[];

  status: RoleStatus;

  accessLevel: "super" | "admin" | "staff";
}

export const initialForm: RoleFormType = {
  name: "",
  description: "",
  permissions: [] as string[],
  status: "active",
  accessLevel: "admin",
};
