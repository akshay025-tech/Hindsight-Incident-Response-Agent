import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

import { getIncidents  } from "../api/api";

function Dashboard() {
  //const [incidents, setIncidents] = useState([]);
    const [incidents, setIncidents] = useState([
  {
    id: "INC-001",
    service: "Payment Service",
    severity: "Critical",
    status: "Resolved",
    description: "Database connection pool exhaustion"
  },
  {
    id: "INC-002",
    service: "User Service",
    severity: "High",
    status: "Investigating",
    description: "Increased API latency"
  }
]);
  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    try {
      const data = await getIncidents();
      setIncidents(data);
    } catch (error) {
      console.error("Failed to load incidents:", error);
    }
  };

  const activeCount = incidents.filter(
    (incident) => incident.status === "active"
  ).length;

  const resolvedCount = incidents.filter(
    (incident) => incident.status === "resolved"
  ).length;

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>Incident Response Agent</h1>
          <p>Memory-Powered AI SRE Agent</p>
        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          System Operational
        </div>
      </header>

      <main className="dashboard">
        <section className="stats-grid">

          <div className="stat-card">
            <Activity size={24} />
            <div>
              <span>Active Incidents</span>
              <strong>{activeCount}</strong>
            </div>
          </div>

          <div className="stat-card">
            <AlertTriangle size={24} />
            <div>
              <span>Total Incidents</span>
              <strong>{incidents.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <CheckCircle size={24} />
            <div>
              <span>Resolved</span>
              <strong>{resolvedCount}</strong>
            </div>
          </div>

          <div className="stat-card">
            <Clock size={24} />
            <div>
              <span>Agent Status</span>
              <strong>Ready</strong>
            </div>
          </div>

        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>Incident Feed</h2>
            <button onClick={loadIncidents}>Refresh</button>
          </div>

          {incidents.length === 0 ? (
            <div className="empty-state">
              No incidents detected.
            </div>
          ) : (
            <div className="incident-list">

              {incidents.map((incident) => (
                <Link
                  key={incident.id}
                  to={`/incident/${incident.id}`}
                  className="incident-row"
                >
                  <div>
                    <strong>{incident.title}</strong>

                    <span>
                      {incident.service} · {incident.severity}
                    </span>
                  </div>

                  <div>
                    <span className={`severity ${incident.severity}`}>
                      {incident.severity}
                    </span>

                    <span className="incident-status">
                      {incident.status}
                    </span>
                  </div>
                </Link>
              ))}

            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;