export interface UserType {
  _id: string;
  name: string;
  email: string;
  image: File | null;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  status?: "active" | "inactive" | "suspended" | "hold";
}

export interface UserEditType {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status?: "active" | "inactive" | "suspended" | "hold";
}

export const userInitialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  image: null,
  role: "",
  phone: "",
  status: "active",
};

export const userInitialEditForm = {
  name: "",
  email: "",
  role: "",
  phone: "",
  status: "active",
};
