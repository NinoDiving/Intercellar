import Decrement from "@/services/contract/decrement";
import { useState } from "react";

export default function DecrementButton() {
  const { handleDecrement, handleDecrementMore } = Decrement();
  const [isRemoveMore, setIsRemoveMore] = useState<boolean>(false);
  const [value, setValue] = useState<bigint>(BigInt(0));
  return (
    <div className="button-container">
      <button type="button" onClick={handleDecrement}>
        Remove 1 coin
      </button>
      <button
        type="button"
        onClick={() => {
          setIsRemoveMore(!isRemoveMore);
        }}
      >
        Remove more coin
      </button>
      {isRemoveMore && (
        <div>
          <input
            type="number"
            onChange={(e) => setValue(BigInt(e.target.value))}
          />{" "}
          <button
            type="button"
            onClick={() => {
              handleDecrementMore(value);
            }}
          >
            Remove coins
          </button>
        </div>
      )}
    </div>
  );
}
