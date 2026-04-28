import Swal from "sweetalert2";

export const showSuccess = (message = "Success!") => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: message,

    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,

    showClass: {
      popup: "", // disable enter animation
    },
    hideClass: {
      popup: "", // disable exit animation
    },
  });
};

export const showError = (message = "Something went wrong") => {
  return Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    confirmButtonColor: "#ef4444", // red
  });
};

// ⚡ INFO ALERT (optional)
export const showInfo = (message = "Info") => {
  return Swal.fire({
    icon: "info",
    title: "Info",
    text: message,
    confirmButtonColor: "#6366f1",
  });
};
