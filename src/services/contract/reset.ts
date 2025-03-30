import { useWriteContract } from "wagmi";
import { wagmiContractConfig } from "./contractConfig";

export default function Reset() {
  const { writeContract, isSuccess, isError, error } = useWriteContract();

  const handleReset = () => {
    writeContract({
      ...wagmiContractConfig,
      functionName: "reset",
      address: wagmiContractConfig.address as `0x${string}`,
    });
  };
  return { handleReset, isSuccess, isError, error };
}
