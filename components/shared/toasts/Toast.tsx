import { toast } from "sonner";

interface ToastAction {
  label: string;
  onClick: () => void;
}

export const showSuccessToast = (message: string, action: ToastAction) => {
  toast("", {
    description: message,
    actionButtonStyle: {
      background: "oklch(0.7686 0.1647 70.0804)",
      fontWeight: "bold",
      fontSize: "16px",
      paddingBlock: "10px",
      paddingInline: "15px",
      color: "oklch(98.7% 0.022 95.277)",
      width: "fit-content",
    },
    style: {
      fontSize: ".8rem",
      width: "400px",
    },
    action: {
      label: action.label,
      onClick: action.onClick,
    },
  });
};

export const showErrorToast = (message: string, action: ToastAction) => {
  toast("", {
    description: message,
    actionButtonStyle: {
      backgroundColor: "darkred",
      fontWeight: "bold",
      fontSize: "16px",
      paddingBlock: "10px",
      paddingInline: "15px",
      color: "oklch(98.7% 0.022 95.277)",
      width: "fit-content",
    },
    style: {
      fontSize: ".8rem",
      width: "400px",
      backgroundColor: "firebrick",
    },
    action: {
      label: action.label,
      onClick: action.onClick,
    },
  });
};
