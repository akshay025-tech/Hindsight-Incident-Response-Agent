import {
  Server,
  AlertTriangle,
  Clock
} from "lucide-react";

function IncidentHeader({ incident }) {
  return (
    <section className="incident-header">

      <div>
        <div className="incident-title-row">

          <AlertTriangle
            size={28}
            className="warning-icon"
          />

          <div>
            <h1>{incident.title}</h1>

            <p>
              Incident ID: {incident.id}
            </p>
          </div>

        </div>
      </div>

      <div className="incident-meta">

        <div>
          <Server size={16} />
          {incident.service}
        </div>

        <div>
          <Clock size={16} />
          {incident.created_at}
        </div>

        <span
          className={`severity ${incident.severity}`}
        >
          {incident.severity}
        </span>

      </div>

    </section>
  );
}

export default IncidentHeader;