"use client";

import { useConnect } from "wagmi";
import { useRouter } from "next/navigation";
import ReadContract from "@/components/contract/readContract";
import InteractionButtonContract from "@/components/contract/interactionButtonContract";

function App() {
  const { connectors, connect, status, error } = useConnect();
  const router = useRouter();

  return (
    <>
      <ReadContract />
      <InteractionButtonContract />
      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
      <button onClick={() => router.push("/profile")}>Profile</button>
    </>
  );
}

export default App;
