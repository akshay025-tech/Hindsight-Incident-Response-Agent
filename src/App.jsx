import { useEffect, useState } from "react";
import { createIncident, getIncidents, getMemories, getPostmortem } from "./api/api";
import IncidentWorkspace from "./components/IncidentWorkspace";
import "./styles/index.css";

/* =========================================================
   ICONS
========================================================= */

const Icon = ({ name, size = 20 }) => {
  const icons = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),

    alert: (
      <>
        <path d="M10.3 3.6 2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
        <path d="M12 8v5" />
        <path d="M12 16h.01" />
      </>
    ),

    brain: (
      <>
        <path d="M9.5 4.5a3.5 3.5 0 0 0-6 2.5c0 .4.1.8.2 1.2A3.8 3.8 0 0 0 5 15.5a3.5 3.5 0 0 0 4.5 3.3" />
        <path d="M14.5 4.5a3.5 3.5 0 0 1 6 2.5c0 .4-.1.8-.2 1.2a3.8 3.8 0 0 1-1.3 7.3 3.5 3.5 0 0 1-4.5 3.3" />
        <path d="M12 3v18" />
        <path d="M7 8h2.5M15 8h2" />
        <path d="M7 13h2.5M15 13h2" />
      </>
    ),

    activity: (
      <polyline points="3 12 7 12 10 4 14 20 17 12 21 12" />
    ),

    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M8 13h8M8 17h6" />
      </>
    ),

    server: (
      <>
        <rect x="3" y="4" width="18" height="6" rx="2" />
        <rect x="3" y="14" width="18" height="6" rx="2" />
        <path d="M7 7h.01M7 17h.01" />
      </>
    ),

    deploy: (
      <>
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M8 7.5c2 1 4 1 6 0s3-3 4-5" />
        <path d="M16 16.5c-2-1-4-1-6 0s-3 3-4 5" />
      </>
    ),

    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1-2.1 2.1-.1-.1a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-1.1 1.7v.2h-3v-.2a1.8 1.8 0 0 0-1.1-1.7 1.8 1.8 0 0 0-2 .4l-.1.1-2.1-2.1.1-.1a1.8 1.8 0 0 0 .4-2 1.8 1.8 0 0 0-1.7-1.1H5v-3h.2a1.8 1.8 0 0 0 1.7-1.1 1.8 1.8 0 0 0-.4-2l-.1-.1 2.1-2.1.1.1a1.8 1.8 0 0 0 2 .4A1.8 1.8 0 0 0 11.7 5v-.2h3V5a1.8 1.8 0 0 0 1.1 1.7 1.8 1.8 0 0 0 2-.4l.1-.1L20 8.3l-.1.1a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.7 1.1h.2v3h-.2a1.8 1.8 0 0 0-1.8 1.5Z" />
      </>
    ),

    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),

    terminal: (
      <>
        <path d="m5 8 4 4-4 4" />
        <path d="M12 16h7" />
      </>
    ),

    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    arrow: <polyline points="9 18 15 12 9 6" />,

    check: (
      <>
        <path d="m5 12 4 4L19 6" />
      </>
    ),

    pulse: (
      <>
        <path d="M3 12h4l2-7 4 14 2-7h6" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
};

/* =========================================================
   DATA
========================================================= */

function incidentAge(value) {
  if (!value) return "Time unavailable";
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return value;
  const minutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60000));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  return `${Math.floor(hours / 24)} days ago`;
}

/* =========================================================
   APP
========================================================= */

function App() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [simulating, setSimulating] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [loadingIncidents, setLoadingIncidents] = useState(true);
  const [incidentError, setIncidentError] = useState("");
  const [apiConnected, setApiConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);

  const loadIncidents = async () => {
    setLoadingIncidents(true);
    try {
      const result = await getIncidents();
      setIncidents(result);
      setIncidentError("");
      setApiConnected(true);
      return result;
    } catch (error) {
      setApiConnected(false);
      setIncidentError(error.response?.data?.detail || "Could not load incidents from the API.");
      return [];
    } finally {
      setLoadingIncidents(false);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const navigateToTab = (tab) => {
    setSelectedIncidentId(null);
    setActiveTab(tab);
  };

  const createTestIncident = async () => {
    setSimulating(true);
    setIncidentError("");
    try {
      const created = await createIncident({
        title: "Database connection timeout",
        description: "Test incident created from the Incident Response Agent interface.",
        severity: "high",
        status: "open",
        source: "payment-service",
      });
      await loadIncidents();
      setActiveTab("Incidents");
      if (created?.id != null) setSelectedIncidentId(created.id);
    } catch (error) {
      setIncidentError(error.response?.data?.detail || "Could not create the test incident.");
    } finally {
      setSimulating(false);
    }
  };

  const displayIncidents = incidents.map((incident) => ({
    ...incident,
    displayId: `INC-${String(incident.id).padStart(3, "0")}`,
    service: incident.source || "Unspecified source",
    issue: incident.title,
    severity: (incident.severity || "unknown").toLowerCase(),
    status: incident.status || "open",
    time: incidentAge(incident.created_at),
  }));
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredIncidents = displayIncidents.filter((incident) =>
    [incident.title, incident.service, incident.severity, incident.status]
      .some((value) => String(value || "").toLowerCase().includes(normalizedQuery))
  );
  const activeCount = incidents.filter(
    (incident) => !["resolved", "closed"].includes((incident.status || "").toLowerCase())
  ).length;
  const resolvedCount = incidents.length - activeCount;
  const awaitingApprovalCount = incidents.filter(
    (incident) => (incident.status || "").toLowerCase() === "approved"
  ).length;

  return (
    <div className="app-shell">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-orb">
            <Icon name="brain" size={23} />
          </div>

          <div>
            <div className="brand-name">INCIDENT AI</div>
            <div className="brand-subtitle">SRE COMMAND CENTER</div>
          </div>
        </div>

        <div className="sidebar-line" />

        <div className="nav-section">
          <div className="nav-label">WORKSPACE</div>

          <NavItem
            icon="grid"
            label="Overview"
            active={activeTab === "Overview"}
            onClick={() => navigateToTab("Overview")}
          />

          <NavItem
            icon="alert"
            label="Incidents"
            count={incidents.length}
            danger
            active={activeTab === "Incidents"}
            onClick={() => navigateToTab("Incidents")}
          />

          <NavItem
            icon="brain"
            label="AI Memory"
            active={activeTab === "AI Memory"}
            onClick={() => navigateToTab("AI Memory")}
          />

          <NavItem
            icon="activity"
            label="Telemetry"
            active={activeTab === "Telemetry"}
            onClick={() => navigateToTab("Telemetry")}
          />

          <NavItem
            icon="file"
            label="Postmortems"
            active={activeTab === "Postmortems"}
            onClick={() => navigateToTab("Postmortems")}
          />
        </div>

        <div className="nav-section system-section">
          <div className="nav-label">SYSTEM</div>

          <NavItem
            icon="server"
            label="Services"
            active={activeTab === "Services"}
            onClick={() => navigateToTab("Services")}
          />

          <NavItem
            icon="deploy"
            label="Deployments"
            active={activeTab === "Deployments"}
            onClick={() => navigateToTab("Deployments")}
          />

          <NavItem
            icon="settings"
            label="Settings"
            active={activeTab === "Settings"}
            onClick={() => navigateToTab("Settings")}
          />
        </div>

        <div className="sidebar-bottom">
          <div className="health-card">
            <div className="health-icon">
              <Icon name="check" size={17} />
            </div>

            <div>
              <strong>{apiConnected ? "Incident API connected" : "Incident API offline"}</strong>
              <span>Supabase incident data</span>
            </div>

            <div className={`health-dot ${apiConnected ? "" : "offline"}`} />
          </div>

          <div className="operator">
            <div className="operator-avatar">AG</div>

            <div>
              <strong>Operator</strong>
              <span>AI/ML Engineer</span>
            </div>

            <span className="operator-status">●</span>
          </div>
        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="main-content">

        {/* TOP BAR */}

        <header className="topbar">

          <div className="breadcrumb">
            <span>Workspace</span>
            <b>/</b>
            <strong>{selectedIncidentId ? "Investigation" : activeTab}</strong>
          </div>

          <div className="topbar-actions">

            <div className="search-box">
              <Icon name="search" size={17} />
              <input
                placeholder="Search incidents..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <kbd>⌘ K</kbd>
            </div>

            <div className="live-indicator">
              <span />
              {apiConnected ? "API CONNECTED" : "API OFFLINE"}
            </div>

              <button
                className="icon-button"
                aria-label="Open API documentation"
                title="Open API documentation"
                onClick={() => window.open("http://localhost:8000/docs", "_blank", "noopener,noreferrer")}
              >
              <Icon name="terminal" size={18} />
            </button>

              <button
                className="icon-button"
                aria-label="Open settings"
                title="Open settings"
                onClick={() => navigateToTab("Settings")}
              >
              <Icon name="settings" size={18} />
            </button>

          </div>

        </header>

        {/* PAGE */}

        <section className="page">

          {selectedIncidentId ? (
            <IncidentWorkspace
              incidentId={selectedIncidentId}
              onBack={() => setSelectedIncidentId(null)}
              onIncidentUpdated={loadIncidents}
            />
          ) : (
            <>
          {activeTab === "Overview" && (
            <Overview
              createTestIncident={createTestIncident}
              simulating={simulating}
              incidents={filteredIncidents}
              activeCount={activeCount}
              totalCount={incidents.length}
              resolvedCount={resolvedCount}
              awaitingApprovalCount={awaitingApprovalCount}
              onViewAll={() => navigateToTab("Incidents")}
              onSelectIncident={setSelectedIncidentId}
              loading={loadingIncidents}
              error={incidentError}
              onRefresh={loadIncidents}
            />
          )}

          {activeTab === "Incidents" && (
            <Incidents
              incidents={filteredIncidents}
              onSelectIncident={setSelectedIncidentId}
              loading={loadingIncidents}
              error={incidentError}
              onRefresh={loadIncidents}
            />
          )}

          {activeTab === "AI Memory" && <Memory />}

          {activeTab === "Telemetry" && <Telemetry />}

          {activeTab === "Postmortems" && <Postmortems />}

          {activeTab === "Services" && <Services />}

          {activeTab === "Deployments" && <Deployments />}

          {activeTab === "Settings" && <Settings />}
            </>
          )}

        </section>

      </main>
    </div>
  );
}

/* =========================================================
   NAV ITEM
========================================================= */

function NavItem({
  icon,
  label,
  count,
  danger,
  active,
  onClick,
}) {
  return (
    <button
      className={`nav-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="nav-icon">
        <Icon name={icon} size={20} />
      </span>

      <span className="nav-text">{label}</span>

      {count && (
        <span className={`nav-count ${danger ? "danger" : ""}`}>
          {count}
        </span>
      )}
    </button>
  );
}

/* =========================================================
   OVERVIEW
========================================================= */

function Overview({
  createTestIncident,
  simulating,
  incidents,
  activeCount,
  totalCount,
  resolvedCount,
  awaitingApprovalCount,
  onViewAll,
  onSelectIncident,
  loading,
  error,
  onRefresh,
}) {
  const activeIncidents = incidents.filter(
    (incident) => !["resolved", "closed"].includes(incident.status.toLowerCase())
  );

  return (
    <>
      <div className="page-heading">

        <div>
          <div className="eyebrow">SRE WORKSPACE</div>

          <h1>Incident Overview</h1>

          <p>
            Review incident reports, match local runbooks,
            and track human-approved response actions.
          </p>
        </div>

        <div className="heading-actions">

          <div className="range-button">
            <Icon name="clock" size={16} />
            All records
          </div>

          <button
            className="simulate-button"
            onClick={createTestIncident}
            disabled={simulating}
          >
            <Icon name="pulse" size={17} />
            {simulating ? "Creating..." : "Create Test Incident"}
          </button>

        </div>

      </div>

      {/* STAT CARDS */}

      <div className="stats-grid">

        <StatCard
          icon="alert"
          label="Active Incidents"
          value={String(activeCount).padStart(2, "0")}
          change="From incident records"
          tone="danger"
        />

        <StatCard
          icon="file"
          label="Total Incidents"
          value={String(totalCount).padStart(2, "0")}
          change="Stored in Supabase"
          tone="violet"
        />

        <StatCard
          icon="clock"
          label="Awaiting Approval"
          value={String(awaitingApprovalCount).padStart(2, "0")}
          change="Human review required"
          tone="green"
        />

        <StatCard
          icon="check"
          label="Resolved"
          value={String(resolvedCount).padStart(2, "0")}
          change="Status recorded"
          tone="amber"
        />

      </div>

      <div className="dashboard-grid">

        {/* MEMORY CORE */}

        <section className="panel intelligence-panel">

          <div className="panel-heading">

            <div>
              <div className="eyebrow">RULE-BASED ANALYSIS</div>

              <h2>Incident Intelligence</h2>

              <p>
                Incident hypotheses and recommendations come from local runbooks.
              </p>
            </div>

            <div className="online-badge">
              <span />
              READY
            </div>

          </div>

          <div className="memory-stage">

            <div className="stage-grid" />

            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />

            <div className="memory-core">

              <div className="core-glow" />

              <div className="core-inner">
                <Icon name="brain" size={48} />
              </div>

            </div>

            <div className="memory-tag tag-left">
              <Icon name="brain" size={14} />
              <span>Local runbooks</span>
            </div>

            <div className="memory-tag tag-right">
              <Icon name="pulse" size={14} />
              <span>Rule matching</span>
            </div>

            <div className="memory-tag tag-bottom">
              <Icon name="activity" size={14} />
              <span>Approval gated</span>
            </div>

          </div>

        </section>

        {/* SIDE METRICS */}

        <div className="side-metrics">

          <MetricPanel
            icon="pulse"
            label="Incident records"
            value={totalCount}
          />

          <MetricPanel
            icon="alert"
            label="Open incidents"
            value={activeCount}
          />

          <MetricPanel
            icon="check"
            label="Resolved incidents"
            value={resolvedCount}
          />

        </div>

      </div>

      {/* INCIDENTS */}

      <section className="panel incident-panel">

        <div className="panel-title-row">

          <div>
            <div className="eyebrow">LIVE OPERATIONS</div>
            <h2>Active Incidents</h2>
          </div>

          <button className="text-button" onClick={onViewAll}>
            View all
            <Icon name="arrow" size={15} />
          </button>

        </div>

        <div className="incident-table">

          {loading ? (
            <div className="empty-state">Loading incidents...</div>
          ) : error ? (
            <div className="request-error" role="alert">
              {error} <button className="text-button" onClick={onRefresh}>Retry</button>
            </div>
          ) : activeIncidents.length === 0 ? (
            <div className="empty-state">No active incidents match this search.</div>
          ) : activeIncidents.slice(0, 4).map((incident) => (
            <IncidentRow
              key={incident.id}
              incident={incident}
              onSelect={onSelectIncident}
            />
          ))}

        </div>

      </section>
    </>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  label,
  value,
  change,
  tone,
}) {
  return (
    <div className={`stat-card ${tone}`}>

      <div className="stat-top">
        <div className="stat-icon">
          <Icon name={icon} size={19} />
        </div>

        <span>{change}</span>
      </div>

      <div className="stat-label">{label}</div>

      <div className="stat-value">{value}</div>

    </div>
  );
}

/* =========================================================
   METRIC PANEL
========================================================= */

function MetricPanel({
  icon,
  label,
  value,
  progress,
}) {
  return (
    <div className="metric-panel">

      <div className="metric-icon">
        <Icon name={icon} size={20} />
      </div>

      <div className="metric-info">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      {progress !== undefined ? (
        <div className="progress">
          <div style={{ width: `${progress}%` }} />
        </div>
      ) : (
        <div className="signal-bars">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      )}

    </div>
  );
}

/* =========================================================
   INCIDENT ROW
========================================================= */

function IncidentRow({ incident, onSelect }) {
  return (
    <button
      type="button"
      className="incident-row clickable-row"
      onClick={() => onSelect(incident.id)}
    >

      <div className={`severity ${incident.severity}`}>
        <span />
      </div>

      <div className="incident-main">

        <div className="incident-id">
          {incident.displayId}
        </div>

        <strong>{incident.issue}</strong>

        <span>{incident.service}</span>

      </div>

      <div className="incident-status">
        <span>{incident.status}</span>
      </div>

      <div className="incident-time">
        {incident.time}
      </div>

      <span className="row-arrow" aria-hidden="true">
        <Icon name="arrow" size={17} />
      </span>

    </button>
  );
}

/* =========================================================
   INCIDENTS
========================================================= */

function Incidents({ incidents, onSelectIncident, loading, error, onRefresh }) {
  return (
    <PageContainer
      eyebrow="OPERATIONS"
      title="Incidents"
      description="Monitor, investigate and resolve production incidents."
    >
      <div className="content-grid">
        {loading ? (
          <div className="empty-state">Loading incidents...</div>
        ) : error ? (
          <div className="request-error" role="alert">
            {error} <button className="text-button" onClick={onRefresh}>Retry</button>
          </div>
        ) : incidents.length === 0 ? (
          <div className="empty-state">No incidents match this search.</div>
        ) : incidents.map((incident) => (
          <button
            className="large-incident-card clickable-card"
            key={incident.id}
            onClick={() => onSelectIncident(incident.id)}
          >
            <div className={`severity ${incident.severity}`}>
              <span />
            </div>

            <div className="large-incident-content">
              <div className="incident-id">{incident.displayId}</div>
              <h3>{incident.issue}</h3>
              <p>{incident.service}</p>

              <div className="incident-card-footer">
                <span>{incident.status}</span>
                <span>{incident.time}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </PageContainer>
  );
}

function Memory() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let current = true;
    getMemories()
      .then((records) => {
        if (current) setMemories(records);
      })
      .catch((requestError) => {
        if (current) setError(requestError.response?.data?.detail || "Could not load memory records.");
      })
      .finally(() => {
        if (current) setLoading(false);
      });

    return () => {
      current = false;
    };
  }, []);

  return (
    <PageContainer
      eyebrow="MEMORY ENGINE"
      title="AI Memory"
      description="Lessons stored locally and matched against incident details."
    >

      <div className="memory-summary">

        <div>
          <span>Total memories</span>
          <strong>{memories.length}</strong>
        </div>

        <div>
          <span>Recall source</span>
          <strong>Local</strong>
        </div>

        <div>
          <span>Recorded lessons</span>
          <strong>{memories.filter((memory) => memory.lesson).length}</strong>
        </div>

      </div>

      <div className="memory-list">

        {loading ? (
          <div className="empty-state">Loading memory records...</div>
        ) : error ? (
          <div className="request-error" role="alert">{error}</div>
        ) : memories.length === 0 ? (
          <div className="empty-state">No memory records yet.</div>
        ) : memories.map((memory, index) => (
          <div className="memory-card" key={`${memory.incident_id || memory.title}-${index}`}>

            <div className="memory-card-type">
              {memory.alert_type || "Stored lesson"}
            </div>

            <h3>{memory.title || memory.incident_id || "Historical incident"}</h3>

            <p>{memory.summary || memory.lesson}</p>

            <div className="memory-card-bottom">
              <span>{memory.outcome || "Recorded lesson"}</span>
              <strong>
                {typeof memory.similarity === "number"
                  ? `${Math.round(memory.similarity * 100)}% match`
                  : "Stored"}
              </strong>
            </div>

          </div>
        ))}

      </div>

    </PageContainer>
  );
}

/* =========================================================
   TELEMETRY
========================================================= */

function Telemetry() {
  return (
    <PageContainer
      eyebrow="DEMO DATA"
      title="Telemetry"
      description="Sample telemetry visualization. No metrics provider is connected."
    >

      <div className="telemetry-layout">

        <div className="panel chart-panel">

          <div className="panel-title-row">
            <div>
              <div className="eyebrow">REQUEST RATE</div>
              <h2>Traffic signals</h2>
            </div>

            <span className="green-text">SAMPLE</span>
          </div>

          <div className="chart">

            <div className="chart-lines">
              <span />
              <span />
              <span />
              <span />
            </div>

            <svg viewBox="0 0 800 250" preserveAspectRatio="none">
              <path
                d="M0 190 C70 150 80 190 140 160 C200 130 220 180 270 140 C320 100 340 170 400 125 C450 85 470 145 520 105 C570 65 610 135 650 95 C700 55 750 100 800 45"
              />
            </svg>

          </div>

        </div>

        <div className="telemetry-stats">

          <MetricPanel
            icon="activity"
            label="CPU utilization"
            value="62%"
            progress={62}
          />

          <MetricPanel
            icon="server"
            label="Memory utilization"
            value="71%"
            progress={71}
          />

          <MetricPanel
            icon="pulse"
            label="Network traffic"
            value="824 MB/s"
            progress={78}
          />

        </div>

      </div>

    </PageContainer>
  );
}

/* =========================================================
   POSTMORTEMS
========================================================= */

function Postmortems() {
  const [resolvedIncidents, setResolvedIncidents] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [postmortem, setPostmortem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let current = true;
    getIncidents()
      .then((rows) => {
        if (!current) return;
        const resolved = rows.filter(
          (incident) => (incident.status || "").toLowerCase() === "resolved"
        );
        setResolvedIncidents(resolved);
        setSelectedId(resolved[0] ? String(resolved[0].id) : "");
      })
      .catch((requestError) => {
        if (current) setError(requestError.response?.data?.detail || "Could not load resolved incidents.");
      })
      .finally(() => {
        if (current) setLoading(false);
      });

    return () => {
      current = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setPostmortem(null);
      return undefined;
    }

    let current = true;
    setPostmortem(null);
    getPostmortem(selectedId)
      .then((result) => {
        if (current) setPostmortem(result);
      })
      .catch((requestError) => {
        if (current) setError(requestError.response?.data?.detail || "Could not load this postmortem.");
      });

    return () => {
      current = false;
    };
  }, [selectedId]);

  return (
    <PageContainer
      eyebrow="LEARNING LOOP"
      title="Postmortems"
      description="Review generated summaries for resolved incidents."
    >
      <div className="postmortem-layout">
        <div className="panel postmortem-main">
          {loading ? (
            <div className="empty-state">Loading resolved incidents...</div>
          ) : error ? (
            <div className="request-error" role="alert">{error}</div>
          ) : resolvedIncidents.length === 0 ? (
            <div className="empty-state">No resolved incidents yet.</div>
          ) : (
            <>
              <div className="resolved-label">
                <Icon name="check" size={15} />
                RESOLVED
              </div>
              <label className="postmortem-select-label" htmlFor="postmortem-incident">
                Incident
              </label>
              <select
                id="postmortem-incident"
                value={selectedId}
                onChange={(event) => setSelectedId(event.target.value)}
              >
                {resolvedIncidents.map((incident) => (
                  <option key={incident.id} value={incident.id}>
                    INC-{String(incident.id).padStart(3, "0")} · {incident.title}
                  </option>
                ))}
              </select>
              {postmortem ? (
                <>
                  <h2>{postmortem.summary}</h2>
                  <div className="postmortem-sections">
                    <div><span>ROOT CAUSE</span><strong>{postmortem.root_cause}</strong></div>
                    <div><span>RESOLUTION</span><strong>{postmortem.resolution}</strong></div>
                    <div><span>LEARNING</span><strong>{postmortem.learning}</strong></div>
                  </div>
                  <p className="muted-note">Generated from incident data; verify findings before using externally.</p>
                </>
              ) : (
                <div className="empty-state">Loading postmortem...</div>
              )}
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

/* =========================================================
   TIMELINE
========================================================= */

function TimelineItem({
  time,
  title,
  text,
}) {
  return (
    <div className="timeline-item">

      <div className="timeline-dot" />

      <div>
        <span>{time}</span>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>

    </div>
  );
}

/* =========================================================
   SERVICES
========================================================= */

function Services() {
  const services = [
    ["payment-service", "Healthy", "99.99%"],
    ["auth-service", "Healthy", "99.97%"],
    ["orders-api", "Degraded", "98.84%"],
    ["notification-worker", "Healthy", "99.99%"],
    ["user-service", "Healthy", "99.96%"],
    ["analytics-api", "Healthy", "99.98%"],
  ];

  return (
    <PageContainer
      eyebrow="DEMO DATA"
      title="Services"
      description="Sample service inventory. Connect a monitoring provider for live health."
    >

      <div className="services-grid">

        {services.map(([name, status, uptime]) => (
          <div className="service-card" key={name}>

            <div className="service-top">
              <div className="service-icon">
                <Icon name="server" size={19} />
              </div>

              <span className={status === "Healthy" ? "healthy" : "degraded"}>
                {status}
              </span>
            </div>

            <h3>{name}</h3>

            <p>Availability</p>

            <strong>{uptime}</strong>

          </div>
        ))}

      </div>

    </PageContainer>
  );
}

/* =========================================================
   DEPLOYMENTS
========================================================= */

function Deployments() {
  const deployments = [
    ["payment-service", "v2.8.1", "12 min ago", "Successful"],
    ["orders-api", "v1.9.4", "1 hr ago", "Successful"],
    ["auth-service", "v3.1.0", "3 hr ago", "Successful"],
    ["analytics-api", "v4.2.3", "Yesterday", "Successful"],
  ];

  return (
    <PageContainer
      eyebrow="DEMO DATA"
      title="Deployments"
      description="Sample deployment history. No deployment provider is connected."
    >

      <div className="deployment-list">

        {deployments.map((deployment) => (
          <div className="deployment-row" key={deployment[0]}>

            <div className="deployment-icon">
              <Icon name="deploy" size={19} />
            </div>

            <div className="deployment-main">
              <strong>{deployment[0]}</strong>
              <span>{deployment[1]}</span>
            </div>

            <span>{deployment[2]}</span>

            <div className="deployment-success">
              <Icon name="check" size={14} />
              {deployment[3]}
            </div>

          </div>
        ))}

      </div>

    </PageContainer>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

/* =========================================================
   SETTINGS
========================================================= */

function Settings() {
  return (
    <PageContainer
      eyebrow="CONFIGURATION"
      title="Settings"
      description="Configure your Incident AI workspace."
    >
      <div className="settings-grid">
        <div className="panel settings-card">
          <div className="eyebrow">AGENT</div>

          <h3>Incident Intelligence</h3>

          <p>
            These controls are display-only until persistent agent
            configuration is implemented.
          </p>

          <div className="setting-row">
            <span>Evidence validation</span>
            <div className="toggle on">
              <span />
            </div>
          </div>

          <div className="setting-row">
            <span>Human approval required</span>
            <div className="toggle on">
              <span />
            </div>
          </div>

          <div className="setting-row">
            <span>Automatic memory retention</span>
            <div className="toggle on">
              <span />
            </div>
          </div>

          <div className="memory-content">
            <div className="memory-item">
              <div className="memory-number">01</div>
              <div>
                <strong>Database connection exhaustion</strong>
                <p>
                  Similar incident resolved by increasing the
                  connection pool and restarting the service.
                </p>
              </div>
            </div>

            <div className="memory-item">
              <div className="memory-number">02</div>
              <div>
                <strong>Traffic spike pattern</strong>
                <p>
                  Historical traffic increase correlated with
                  database connection failures.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="panel settings-card">
          <div className="eyebrow">MEMORY</div>
          <h3>Knowledge retention</h3>
          <p>
            Historical incident knowledge currently available to
            the incident response agent.
          </p>

          <div className="memory-stat">
            <strong>148</strong>
            <span>Total memories</span>
          </div>

          <div className="memory-stat">
            <strong>94.8%</strong>
            <span>Recall accuracy</span>
          </div>

          <div className="memory-stat">
            <strong>12</strong>
            <span>New memories today</span>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

/* =========================================================
   PAGE CONTAINER
========================================================= */

function PageContainer({
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      {children}
    </>
  );
}

export default App;
