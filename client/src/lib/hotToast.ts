import toast from "react-hot-toast";
import { CheckCircle, XCircle, Info } from "lucide-react";
import React from "react";

const baseStyle = {
  background: "rgba(255,255,255,0.6)",
  backdropFilter: "blur(0.2px)",
  WebkitBackdropFilter: "blur(0.2px)",
  borderRadius: "12px",
  color: "#111",
  animation: "fade-toast 200ms ease",
};

export const showSuccess = (message: string) => {
  return toast.success(message, {
    icon: React.createElement(CheckCircle, {
      size: 20,
      className: "text-green-500",
    }),

    duration: 3000,
    style: baseStyle,
  });
};

export const showError = (message: string) => {
  return toast.error(message, {
    icon: React.createElement(XCircle, {
      size: 20,
      className: "text-red-500",
    }),

    duration: 3000,
    style: baseStyle,
  });
};

export const showInfo = (message: string) => {
  return toast(message, {
    icon: React.createElement(Info, {
      size: 20,
      className: "text-blue-500",
    }),
    duration: 3000,
    style: baseStyle,
  });
};
