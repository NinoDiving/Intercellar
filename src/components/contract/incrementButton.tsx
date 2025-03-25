import { Increment } from "@/services/contract/increment";
import { useState, useEffect } from "react";
import SnackBar from "../snackbar/SnackBar";

export default function IncrementButton() {
  const [isSendMore, setIsSendMore] = useState<boolean>(false);
  const [value, setValue] = useState<bigint>(BigInt(0));
  const [open, setOpen] = useState(false);
  const { handleIncrement, handleIncrementMore, isError, isSuccess, error } =
    Increment();

  useEffect(() => {
    if (isError || isSuccess) {
      setOpen(true);
    }
  }, [isError, isSuccess]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="button-container">
      <SnackBar
        isOpen={open}
        message={isError ? error?.message : "Transaction réussie !"}
        onClose={handleClose}
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
