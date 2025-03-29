import { wagmiContractConfig } from "@/services/contract/contractConfig";
import { useState, useEffect } from "react";
import { useBlockNumber, usePublicClient } from "wagmi";

export type ContractEvent = {
  type: string;
  value: bigint;
  timestamp: number;
  transactionHash: string;
  id: string;
};

export default function useWatchEvent() {
  const [events, setEvents] = useState<ContractEvent[]>([]);

  const { data: blockNumber } = useBlockNumber({ watch: true });
  const publicClient = usePublicClient();

  useEffect(() => {
    if (!blockNumber || !publicClient) return;

    console.log(`Vérification des événements pour le bloc ${blockNumber}`);

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

        console.log(`Logs trouvés pour le bloc ${blockNumber}:`, allLogs);

        if (allLogs.length > 0) {
          const newEvents = allLogs.map((item) => ({
            type: item.type,
            value: item.log.args.value as bigint,
            timestamp: Date.now(),
            transactionHash: item.log.transactionHash,
            id: `${item.log.transactionHash}-${item.log.logIndex}`,
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

    checkEvents();
  }, [blockNumber, publicClient]);

  useEffect(() => {
    console.log("État actuel des événements:", events);
  }, [events]);

  return { events };
}
