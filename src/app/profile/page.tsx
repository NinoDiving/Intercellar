"use client";

import { useDisconnect, useAccount } from "wagmi";

export default function ProfilePage() {
  const { disconnect } = useDisconnect();
  const account = useAccount();
  return (
    <div>
      <h2>Account</h2>

      <div>
        status: {account.status}
        <br />
        addresses: {JSON.stringify(account.addresses)}
        <br />
        chainId: {account.chainId}
      </div>

      {account.status === "connected" && (
        <button type="button" onClick={() => disconnect()}>
          Disconnect
        </button>
      )}
    </div>
  );
}
