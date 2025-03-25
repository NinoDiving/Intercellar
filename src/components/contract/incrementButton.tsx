import { Increment } from "@/services/contract/increment";
import { useState } from "react";
import SnackBar from "../snackbar/SnackBar";

export default function IncrementButton() {
  const [isSendMore, setIsSendMore] = useState<boolean>(false);
  const [value, setValue] = useState<bigint>(BigInt(0));
  const { handleIncrement, handleIncrementMore, isError, isSuccess, error } =
    Increment();
  return (
    <div className="button-container">
      <SnackBar
        isOpen={isError || isSuccess}
        message={isError ? "Error" : "Transaction réussie !"}
        onClose={() => {}}
      />
      <button type="button" onClick={handleIncrement}>
        Send 1 coin
      </button>
      <button type="button" onClick={() => setIsSendMore(!isSendMore)}>
        Send more coins
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
    </div>
  );
}
