import { wagmiContractConfig } from "@/services/contract/contractConfig";
import useRead from "@/services/contract/read";
import "./contract.css";
import ResetButton from "./interactionContract/resetButton";
export default function ReadContract() {
  const { balance, error, isError, isLoading } = useRead();

  return (
    <article className="contract-container">
      <h1>Smart Contract</h1>
      <div>
        <p>Contract address: {wagmiContractConfig.address}</p>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error: {error?.message}</p>
        ) : (
          <p>
            Actual balance: {balance?.toString()}{" "}
            {balance && balance > 1 ? "coins" : "coin"}
          </p>
        )}
        <ResetButton />
      </div>
    </article>
  );
}
