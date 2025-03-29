import useWatchEvent from "@/services/contract/watchEvent";
import "./watchEvent.css";
export default function WatchEvent() {
  const { events } = useWatchEvent();

  console.log("Liste des événements dans le composant:", events);

  return (
    <article className="events-container">
      <h2>Historique des transactions ({events.length})</h2>
      {events.length === 0 ? (
        <p>Aucun événement pour le moment</p>
      ) : (
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-item">
              <p>Action : {event.type}</p>
              <p>Valeur: {event.value.toString()}</p>

              <p>Heure: {new Date(event.timestamp).toLocaleTimeString()}</p>
              <p>Hash: {event.transactionHash}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
