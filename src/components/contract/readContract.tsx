import { wagmiContractConfig } from "@/services/contract/contractConfig";
import useRead from "@/services/contract/read";
import "./contract.css";
export default function ReadContract() {
  const { balance, error, isError, isLoading } = useRead();

  return (
    <article className="contract-container">
      <h2>Smart Contract</h2>
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
      </div>
    </article>
  );
}
