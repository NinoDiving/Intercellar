import { SnackBarProps } from "@/types/snackBar/snackBar";
import { Snackbar } from "@mui/material";

export default function SnackBar({ isOpen, message, onClose }: SnackBarProps) {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isOpen}
      message={message}
      autoHideDuration={1000}
      onClose={handleClose}
    />
  );
}
