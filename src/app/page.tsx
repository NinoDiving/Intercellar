"use client";

import { useConnect } from "wagmi";
import { useRouter } from "next/navigation";
function App() {
  const { connectors, connect, status, error } = useConnect();
  const router = useRouter();
  return (
    <>
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
