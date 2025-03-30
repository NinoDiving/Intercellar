import { wagmiContractConfig } from "@/services/contract/contractConfig";
import { useState, useEffect } from "react";
import { useBlockNumber, usePublicClient } from "wagmi";

export type ContractEvent = {
  type: string;
  value: bigint;
  timestamp: number;
  transactionHash: string;
  address: `0x${string}`;
  sender: `0x${string}`;
  gasPrice?: bigint;
  valueTransaction: bigint;
  blockNumber: bigint;
  id: string;
};

export default function useWatchEvent() {
  const [events, setEvents] = useState<ContractEvent[]>([]);

  const { data: blockNumber } = useBlockNumber({ watch: true });
  const publicClient = usePublicClient();

  useEffect(() => {
    if (!blockNumber || !publicClient) return;

    const checkEvents = async () => {
      try {
        const incrementedLogs = await publicClient.getLogs({
          address: wagmiContractConfig.address as `0x${string}`,
          event: {
            type: "event",
            name: "Incremented",
            inputs: [{ type: "uint256", name: "value", indexed: false }],
          },
          fromBlock: blockNumber - BigInt(5),
          toBlock: blockNumber,
        });

        const incrementedByLogs = await publicClient.getLogs({
          address: wagmiContractConfig.address as `0x${string}`,
          event: {
            type: "event",
            name: "IncrementedBy",
            inputs: [{ type: "uint256", name: "value", indexed: false }],
          },
          fromBlock: blockNumber - BigInt(5),
          toBlock: blockNumber,
        });

        const decrementedLogs = await publicClient.getLogs({
          address: wagmiContractConfig.address as `0x${string}`,
          event: {
            type: "event",
            name: "Decremented",
            inputs: [{ type: "uint256", name: "value", indexed: false }],
          },
          fromBlock: blockNumber - BigInt(5),
          toBlock: blockNumber,
        });

        const decrementedByLogs = await publicClient.getLogs({
          address: wagmiContractConfig.address as `0x${string}`,
          event: {
            type: "event",
            name: "DecrementedBy",
            inputs: [{ type: "uint256", name: "value", indexed: false }],
          },
          fromBlock: blockNumber - BigInt(5),
          toBlock: blockNumber,
        });

        const allLogs = [
          ...incrementedLogs.map((log) => ({ type: "Incrementation", log })),
          ...incrementedByLogs.map((log) => ({ type: "Incremention By", log })),
          ...decrementedLogs.map((log) => ({ type: "Decrementation", log })),
          ...decrementedByLogs.map((log) => ({
            type: "Decrementation By",
            log,
          })),
        ];

        if (allLogs.length > 0) {
          const transaction = await publicClient.getTransaction({
            hash: allLogs[0].log.transactionHash,
          });
          const newEvents = allLogs.map((item) => ({
            type: item.type,
            value: item.log.args.value as bigint,
            timestamp: Date.now(),
            transactionHash: item.log.transactionHash,
            id: `${item.log.transactionHash}-${item.log.logIndex}`,
            blockNumber: item.log.blockNumber,
            address: item.log.address,
            sender: transaction.from,
            gasPrice: transaction.gasPrice,
            valueTransaction: transaction.value,
          }));

          setEvents((prev) => {
            const existingIds = new Set(prev.map((e) => e.id));
            const uniqueNewEvents = newEvents.filter(
              (e) => !existingIds.has(e.id)
            );

            console.log("Ajout de nouveaux événements:", uniqueNewEvents);

            if (uniqueNewEvents.length === 0) return prev;
            return [...prev, ...uniqueNewEvents];
          });
        }
      } catch (error) {
        console.error("Erreur lors de la vérification des événements:", error);
      }
    };
    console.log(events);

    checkEvents();
  }, [blockNumber, publicClient]);

  return { events, blockNumber };
}
