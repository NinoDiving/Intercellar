import { useBlockNumber, useReadContract } from "wagmi";
import { wagmiContractConfig } from "./contractConfig";

export default function useRead() {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const {
    data: balance,
    error,
    isLoading,
    isError,
    refetch,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "count",
    address: wagmiContractConfig.address as `0x${string}`,
  });

  if (blockNumber) {
    refetch();
  }

  return { balance, error, isLoading, isError };
}
