export type RoleStatus = "active" | "inactive";

export interface RoleFormType {
  name: string;
  description: string;
  permissions: string[];
  status: RoleStatus;
}
