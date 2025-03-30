import Decrement from "@/services/contract/decrement";
import Increment from "@/services/contract/increment";
import { useState, useEffect } from "react";

export default function useInteractionButton() {
  const [incrementValue, setIncrementValue] = useState<bigint>(BigInt(0));
  const [isSendMore, setIsSendMore] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [decrementValue, setDecrementValue] = useState<bigint>(BigInt(0));
  const [isRemoveMore, setIsRemoveMore] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const {
    handleIncrement,
    handleIncrementMore,
    isSuccess: isIncrementSuccess,
    isError: isIncrementError,
    error: incrementError,
  } = Increment();

  const {
    handleDecrement,
    handleDecrementMore,
    isSuccess: isDecrementSuccess,
    isError: isDecrementError,
    error: decrementError,
  } = Decrement();

  useEffect(() => {
    if (isIncrementSuccess || isDecrementSuccess) {
      setIsSuccess(true);
      setIsError(false);
      setTimeout(() => setIsSuccess(false), 6000);
    }

    if (isIncrementError || isDecrementError) {
      setIsError(true);
      setIsSuccess(false);

      if (incrementError) {
        setErrorMessage(incrementError.message || "Increment error");
      } else if (decrementError) {
        setErrorMessage(decrementError.message || "Decrement error");
      }

      setTimeout(() => setIsError(false), 6000);
    }
  }, [
    isIncrementSuccess,
    isDecrementSuccess,
    isIncrementError,
    isDecrementError,
    incrementError,
    decrementError,
  ]);

  useEffect(() => {
    if (isSendMore && isRemoveMore) {
      setIsRemoveMore(false);
    }
  }, [isSendMore]);

  useEffect(() => {
    if (isRemoveMore && isSendMore) {
      setIsSendMore(false);
    }
  }, [isRemoveMore]);

  return {
    handleIncrement,
    handleIncrementMore,
    incrementValue,
    setIncrementValue,
    isSendMore,
    setIsSendMore,
    handleDecrement,
    handleDecrementMore,
    decrementValue,
    setDecrementValue,
    isRemoveMore,
    setIsRemoveMore,
    isSuccess,
    isError,
    errorMessage,
  };
}
