import { toast } from "react-toastify";

export const showSuccess = (message = "Success!") => {
  toast.dismiss();
  toast.success(message);
};

export const showError = (message = "Something went wrong!") => {
  toast.dismiss();
  toast.error(message);
};

export const showInfo = (message = "Info message") => {
  toast.dismiss();
  toast.info(message);
};

export const showWarning = (message = "Warning!") => {
  toast.dismiss();
  toast.warn(message);
};
