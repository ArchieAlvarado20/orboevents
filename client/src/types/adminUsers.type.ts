export interface UserType {
  _id: string;
  name: string;
  email: string;
  image: File | null;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  status?: "active" | "inactive" | "suspended";
}
