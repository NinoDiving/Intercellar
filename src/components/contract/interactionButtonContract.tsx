import Decrement from "@/services/contract/decrement";
import { Increment } from "@/services/contract/increment";
import { useState } from "react";

export default function InteractionButtonContract() {
  const { handleIncrement, handleIncrementMore, isError, isSuccess } =
    Increment();
  const [value, setValue] = useState<bigint>(BigInt(0));
  const { handleDecrement, handleDecrementMore } = Decrement();
  const [isRemoveMore, setIsRemoveMore] = useState<boolean>(false);
  const [isSendMore, setIsSendMore] = useState<boolean>(false);

  return (
    <div>
      <button type="button" onClick={handleIncrement}>
        Send 1 coin
      </button>
      <button type="button" onClick={() => setIsSendMore(!isSendMore)}>
        Send more coins
      </button>
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
      {isSendMore && (
        <div>
          <input
            type="number"
            onChange={(e) => setValue(BigInt(e.target.value))}
          />{" "}
          <button type="button" onClick={() => handleIncrementMore(value)}>
            Send coins
          </button>
        </div>
      )}

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
