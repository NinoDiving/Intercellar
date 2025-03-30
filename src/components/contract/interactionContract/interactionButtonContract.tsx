import DecrementButton from "./decrementButton";
import IncrementButton from "./incrementButton";
import "../contract.css";
import SnackBars from "../../snackbar/snackBar";
import useInteractionButton from "@/hooks/interactionButton/useInteractionButton";

export default function InteractionButtonContract() {
  const {
    incrementValue,
    setIncrementValue,
    isSendMore,
    setIsSendMore,
    decrementValue,
    setDecrementValue,
    isRemoveMore,
    setIsRemoveMore,
    isSuccess,
    isError,
    errorMessage,
    handleIncrement,
    handleIncrementMore,
    handleDecrement,
    handleDecrementMore,
  } = useInteractionButton();

  return (
    <div className="interaction-container">
      <IncrementButton
        handleIncrement={handleIncrement}
        handleIncrementMore={handleIncrementMore}
        value={incrementValue}
        setValue={setIncrementValue}
        isSendMore={isSendMore}
        setIsSendMore={setIsSendMore}
      />
      <DecrementButton
        handleDecrement={handleDecrement}
        handleDecrementMore={handleDecrementMore}
        value={decrementValue}
        setValue={setDecrementValue}
        isRemoveMore={isRemoveMore}
        setIsRemoveMore={setIsRemoveMore}
      />

      <SnackBars
        isSuccess={isSuccess}
        isError={isError}
        message={isSuccess ? "Opération réussie !" : ""}
        error={errorMessage}
        severity={isError ? "error" : "success"}
      />
    </div>
  );
}
