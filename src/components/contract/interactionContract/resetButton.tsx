import reset from "@/services/contract/reset";
import { StyledButton } from "../../style/styledbutton";
import SnackBars from "../../snackbar/snackBar";
import { RotateCcw } from "lucide-react";

export default function ResetButton() {
  const { handleReset, isSuccess, isError, error } = reset();
  return (
    <>
      <StyledButton onClick={handleReset}>
        Reset
        <RotateCcw className="reset-button" />
      </StyledButton>
      <SnackBars
        isSuccess={isSuccess}
        isError={isError}
        message={isSuccess ? "Opération réussie !" : ""}
        error={error?.message || ""}
        severity={isError ? "error" : "success"}
      />
    </>
  );
}
