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
              <h3>Method: {event.type}</h3>
              <div className="info-date">
                <p>{new Date(event.timestamp).toLocaleDateString()}</p>
                <p>{new Date(event.timestamp).toLocaleTimeString()}</p>
                <p>
                  <span>Block:</span> {event.blockNumber.toString()}
                </p>
              </div>
              <p>
                <span>Hash:</span> {event.transactionHash}
              </p>
              <p>
                <span>From:</span> {event.sender}
              </p>
              <p>
                <span>To:</span> {event.address}
              </p>
              <p>
                <span> Gas fee:</span>{" "}
                {event.gasPrice ? formatGwei(event.gasPrice) : "none"} Gwei
              </p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
