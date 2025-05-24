import toast from "react-hot-toast";

const success = (message) => {
  toast.success(message, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#4caf50",
      color: "#fff",
    },
  });
};

const error = (message) => {
  toast.error(message, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#f44336",
      color: "#fff",
    },
  });
};

export const showToast = {
  success,
  error,
};
