import { wagmiContractConfig } from "@/services/contract/contractConfig";
import { ContractEvent } from "@/types/contract/contract";
import { useState, useEffect } from "react";
import { useBlockNumber, usePublicClient } from "wagmi";

export default function useWatchEvent() {
  const [events, setEvents] = useState<ContractEvent[]>([]);

  const { data: blockNumber } = useBlockNumber({ watch: true });
  const publicClient = usePublicClient();

  useEffect(() => {
    if (!publicClient) return;
    const checkEvents = async () => {
      try {
        const incrementedLogs = await publicClient.getLogs({
          address: wagmiContractConfig.address as `0x${string}`,
          event: {
            type: "event",
            name: "Incremented",
            inputs: [{ type: "uint256", name: "value", indexed: false }],
          },
          fromBlock: BigInt(0),
          toBlock: "latest",
        });

        const incrementedByLogs = await publicClient.getLogs({
          address: wagmiContractConfig.address as `0x${string}`,
          event: {
            type: "event",
            name: "IncrementedBy",
            inputs: [{ type: "uint256", name: "value", indexed: false }],
          },
          fromBlock: BigInt(0),
          toBlock: "latest",
        });

        const decrementedLogs = await publicClient.getLogs({
          address: wagmiContractConfig.address as `0x${string}`,
          event: {
            type: "event",
            name: "Decremented",
            inputs: [{ type: "uint256", name: "value", indexed: false }],
          },
          fromBlock: BigInt(0),
          toBlock: "latest",
        });

        const decrementedByLogs = await publicClient.getLogs({
          address: wagmiContractConfig.address as `0x${string}`,
          event: {
            type: "event",
            name: "DecrementedBy",
            inputs: [{ type: "uint256", name: "value", indexed: false }],
          },
          fromBlock: BigInt(0),
          toBlock: "latest",
        });

        const resetLogs = await publicClient.getLogs({
          address: wagmiContractConfig.address as `0x${string}`,
          event: {
            type: "event",
            name: "Reseted",
            inputs: [],
          },
          fromBlock: BigInt(0),
          toBlock: "latest",
        });

        const allLogs = [
          ...incrementedLogs.map((log) => ({ type: "Incrementation", log })),
          ...incrementedByLogs.map((log) => ({ type: "Incremention By", log })),
          ...decrementedLogs.map((log) => ({ type: "Decrementation", log })),
          ...decrementedByLogs.map((log) => ({
            type: "Decrementation By",
            log,
          })),
          ...resetLogs.map((log) => ({ type: "Reset", log })),
        ];

        if (allLogs.length > 0) {
          const transaction = await publicClient.getTransaction({
            hash: allLogs[0].log.transactionHash,
          });

          const newEvents = await Promise.all(
            allLogs.map(async (item) => {
              const block = await publicClient.getBlock({
                blockNumber: item.log.blockNumber,
              });

              return {
                type: item.type,
                timestamp: Number(block.timestamp) * 1000,
                transactionHash: item.log.transactionHash,
                id: `${item.log.transactionHash}-${item.log.logIndex}`,
                blockNumber: item.log.blockNumber,
                address: item.log.address,
                sender: transaction.from,
                gasPrice: transaction.gasPrice,
                valueTransaction: transaction.value,
              };
            })
          );

          setEvents((prev) => {
            const existingIds = new Set(prev.map((e) => e.id));
            const uniqueNewEvents = newEvents.filter(
              (e): e is ContractEvent =>
                e !== undefined && !existingIds.has(e.id)
            );

            if (uniqueNewEvents.length === 0) return prev;

            const allEvents = [...prev, ...uniqueNewEvents];

            return allEvents.sort((a, b) => b.timestamp - a.timestamp);
          });
        }
      } catch (error) {
        console.error("Erreur lors de la vérification des événements:", error);
      }
    };

    checkEvents();
  }, [blockNumber, publicClient]);

  return { events };
}
