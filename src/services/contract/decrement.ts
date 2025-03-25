import { useWriteContract } from "wagmi";
import { wagmiContractConfig } from "./contractConfig";

export default function Decrement() {
  const { writeContract, isError, isSuccess } = useWriteContract();

  const handleDecrement = () => {
    writeContract({
      ...wagmiContractConfig,
      functionName: "decrement",
      address: wagmiContractConfig.address as `0x${string}`,
    });
  };
  const handleDecrementMore = (value: bigint) => {
    writeContract({
      ...wagmiContractConfig,
      functionName: "decrementBy",
      address: wagmiContractConfig.address as `0x${string}`,
      args: [value],
    });
  };
  return { handleDecrement, handleDecrementMore, isError, isSuccess };
}
