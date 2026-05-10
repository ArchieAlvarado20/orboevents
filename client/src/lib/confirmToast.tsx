import { toast } from "react-toastify";

let activeToastId = null;

export const confirmToast = (message, onConfirm) => {
  // close existing confirm toast first
  if (activeToastId) {
    toast.dismiss(activeToastId);
  }

  activeToastId = toast(
    ({ closeToast }) => (
      <div className="space-y-3">
        <p className="text-sm font-medium">{message}</p>

        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              onConfirm();
              toast.dismiss(activeToastId);
              activeToastId = null;
            }}
            className="px-3 py-1 bg-red-500 text-white rounded text-xs"
          >
            Yes
          </button>

          <button
            onClick={() => {
              toast.dismiss(activeToastId);
              activeToastId = null;
            }}
            className="px-3 py-1 bg-gray-200 rounded text-xs"
          >
            No
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      onClose: () => {
        activeToastId = null;
      },
    },
  );
};
