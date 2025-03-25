export type SnackBarProps = {
  isOpen: boolean;
  message: string | undefined;
  onClose?: () => void;
};
