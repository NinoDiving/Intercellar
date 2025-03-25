import { useConnect } from "wagmi";

export default function ConnectSection() {
  const { connectors, connect, status, error } = useConnect();

  return (
    <article>
      <section>
        <h2>Connect your wallet</h2>
        {connectors.map((connector) => (
          <div key={connector.id}>
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
              disabled={status === "pending"}
            >
              {status === "pending" ? "Connecting..." : connector.name}
            </button>
            {error && <div className="error">{error.message}</div>}
          </div>
        ))}
      </section>
    </article>
  );
}
