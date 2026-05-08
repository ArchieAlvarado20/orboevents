import { toast } from "react-toastify";

export const confirmToast = (message, onConfirm) => {
  const toastId = toast(
    ({ closeToast }) => (
      <div className="space-y-3">
        <p className="text-sm font-medium">{message}</p>

        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              onConfirm();
              toast.dismiss(toastId);
            }}
            className="px-3 py-1 bg-red-500 text-white rounded text-xs"
          >
            Yes
          </button>

          <button
            onClick={() => toast.dismiss(toastId)}
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
    },
  );
};
