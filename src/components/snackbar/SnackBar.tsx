import * as React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import { SnackBarProps } from "@/types/snackBar/snackBar";

export default function SnackBars({
  isSuccess = false,
  isError = false,
  message = "Opération réussie !",
  severity = "success",
  error,
}: SnackBarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isSuccess || isError) {
      setOpen(true);
    }
  }, [isSuccess, isError]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        className="toast-alert"
        onClose={handleClose}
        severity={isError ? "error" : severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {isError ? error : message}
      </Alert>
    </Snackbar>
  );
}
