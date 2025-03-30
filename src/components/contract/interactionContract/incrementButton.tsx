import { StyledButton } from "@/components/style/styledbutton";
import { IncrementButtonProps } from "@/types/button/buttonProps";
import TextField from "@mui/material/TextField";
import { SendHorizontal } from "lucide-react";
export default function IncrementButton({
  handleIncrement,
  handleIncrementMore,
  value,
  setValue,
  isSendMore,
  setIsSendMore,
}: IncrementButtonProps) {
  return (
    <div className="button-container">
      <StyledButton type="button" onClick={handleIncrement}>
        Send 1 coin
      </StyledButton>
      <StyledButton type="button" onClick={() => setIsSendMore(!isSendMore)}>
        Send more coins
      </StyledButton>
      {isSendMore && (
        <div className="send-more-container">
          <TextField
            label="How many coins ?"
            variant="filled"
            type="number"
            onChange={(e) => setValue(BigInt(e.target.value))}
          />{" "}
          <StyledButton
            type="button"
            onClick={() => handleIncrementMore(value)}
          >
            <SendHorizontal />
          </StyledButton>
        </div>
      )}
    </div>
  );
}
