import { useReadContract, useWatchContractEvent } from "wagmi";
import { wagmiContractConfig } from "./contractConfig";

export default function useRead() {
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

  useWatchContractEvent({
    ...wagmiContractConfig,
    eventName: "Incremented",
    address: wagmiContractConfig.address as `0x${string}`,
    onLogs: () => {
      refetch();
    },
  });

  useWatchContractEvent({
    ...wagmiContractConfig,
    eventName: "Decremented",
    address: wagmiContractConfig.address as `0x${string}`,
    onLogs: () => {
      refetch();
    },
  });
  return { balance, error, isLoading, isError };
}
