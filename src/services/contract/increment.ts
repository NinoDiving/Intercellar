import { useWriteContract } from "wagmi";
import { wagmiContractConfig } from "./contractConfig";

export default function Increment() {
  const { writeContract, isSuccess, isError, error } = useWriteContract();
  const handleIncrement = () => {
    writeContract({
      ...wagmiContractConfig,
      functionName: "increment",
      address: wagmiContractConfig.address as `0x${string}`,
    });
  };
  const handleIncrementMore = (value: bigint) => {
    writeContract({
      ...wagmiContractConfig,
      functionName: "incrementBy",
      address: wagmiContractConfig.address as `0x${string}`,
      args: [value],
    });
  };
  return { handleIncrement, handleIncrementMore, isSuccess, isError, error };
}
