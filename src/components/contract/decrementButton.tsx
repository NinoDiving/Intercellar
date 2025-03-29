import Decrement from "@/services/contract/decrement";
import { useState } from "react";
import { StyledButton } from "../style/styledbutton";

export default function DecrementButton() {
  const { handleDecrement, handleDecrementMore } = Decrement();
  const [isRemoveMore, setIsRemoveMore] = useState<boolean>(false);
  const [value, setValue] = useState<bigint>(BigInt(0));
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
        Remove more coin
      </StyledButton>
      {isRemoveMore && (
        <div>
          <input
            type="number"
            onChange={(e) => setValue(BigInt(e.target.value))}
          />{" "}
          <StyledButton
            type="button"
            onClick={() => {
              handleDecrementMore(value);
            }}
          >
            Remove coins
          </StyledButton>
        </div>
      )}
    </div>
  );
}
