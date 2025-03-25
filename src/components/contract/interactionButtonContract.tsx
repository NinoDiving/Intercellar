import DecrementButton from "./decrementButton";
import IncrementButton from "./incrementButton";
import "./contract.css";
export default function InteractionButtonContract() {
  return (
    <div className="interaction-container">
      <IncrementButton />
      <DecrementButton />
    </div>
  );
}
