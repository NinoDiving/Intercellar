import useWatchEvent from "@/services/contract/watchEvent";
import "./watchEvent.css";
import { formatGwei } from "viem";

export default function WatchEvent() {
  const { events } = useWatchEvent();

  return (
    <article className="events-container">
      <h2>Historique des transactions ({events.length})</h2>
      {events.length === 0 ? (
        <p>Aucun événement pour le moment</p>
      ) : (
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-item">
              <p>Method: {event.type}</p>
              <p>Hash: {event.transactionHash}</p>
              <p>Block: {event.blockNumber.toString()}</p>
              <p>Date: {new Date(event.timestamp).toLocaleDateString()}</p>
              <p>Time: {new Date(event.timestamp).toLocaleTimeString()}</p>
              <p>From: {event.sender}</p>
              <p>To: {event.address}</p>
              <p>
                Gas fee: {event.gasPrice ? formatGwei(event.gasPrice) : "none"}{" "}
                Gwei
              </p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
