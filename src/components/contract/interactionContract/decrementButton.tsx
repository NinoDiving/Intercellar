import { SendHorizontal } from "lucide-react";
import { StyledButton } from "../../style/styledbutton";
import { DecrementButtonProps } from "@/types/button/buttonProps";
import { TextField } from "@mui/material";
import useRead from "@/services/contract/read";
export default function DecrementButton({
  handleDecrement,
  handleDecrementMore,
  value,
  setValue,
  isRemoveMore,
  setIsRemoveMore,
}: DecrementButtonProps) {
  const { balance } = useRead();

  const disabled = !balance || value > BigInt(balance.toString());

  return (
    <div className="button-container">
      <StyledButton type="button" onClick={handleDecrement}>
        Remove 1 coin
      </StyledButton>
      <StyledButton
        type="button"
        onClick={() => {
          setIsRemoveMore(!isRemoveMore);
        }}
      >
        Remove more coins
      </StyledButton>
      {isRemoveMore && (
        <div className="send-more-container">
          <TextField
            label="How many coins ?"
            variant="filled"
            type="number"
            onChange={(e) => setValue(BigInt(e.target.value))}
          />{" "}
          <StyledButton
            disabled={disabled}
            type="button"
            onClick={() => {
              handleDecrementMore(value);
            }}
          >
            <SendHorizontal />
          </StyledButton>
        </div>
      )}
    </div>
  );
}
