export type SnackBarProps = {
  isSuccess: boolean;
  isError: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  error: string;
};
