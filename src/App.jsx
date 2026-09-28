<<<<<<< Updated upstream
function App() {
  return (
    <div className="app">

      {/* ================= HEADER ================= */}
      <header className="topbar">

        <div className="brand">
          <div className="brand-icon">
            IR
          </div>

          <div className="brand-text">
            <h1>Incident Response Agent</h1>
            <p>Memory-Powered AI SRE Platform</p>
          </div>
        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          System Operational
        </div>

      </header>


      {/* ================= MAIN CONTENT ================= */}
      <main className="dashboard">

        {/* PAGE TITLE */}
        <section className="page-header">

          <div>
            <h2>Incident Dashboard</h2>
            <p>
              Monitor, investigate and resolve production incidents
              using AI-powered incident response.
            </p>
          </div>

          <button className="btn-primary">
            + New Incident
          </button>

        </section>


        {/* ================= STATS ================= */}
        <section className="stats-grid">

          <div className="stat-card">
            <span className="stat-label">
              Active Incidents
            </span>

            <strong className="stat-value">
              03
            </strong>

            <span className="stat-info">
              Currently being monitored
            </span>
          </div>


          <div className="stat-card">
            <span className="stat-label">
              Critical Incidents
            </span>

            <strong className="stat-value critical">
              01
            </strong>

            <span className="stat-info">
              Requires attention
            </span>
          </div>


          <div className="stat-card">
            <span className="stat-label">
              Memory Recall
            </span>

            <strong className="stat-value">
              12
            </strong>

            <span className="stat-info">
              Historical incidents found
            </span>
          </div>


          <div className="stat-card">
            <span className="stat-label">
              Recovery Rate
            </span>

            <strong className="stat-value success">
              94%
            </strong>

            <span className="stat-info">
              Successful recoveries
            </span>
          </div>

        </section>


        {/* ================= MAIN GRID ================= */}
        <section className="main-grid">

          {/* INCIDENTS */}
          <div className="dashboard-card incidents-card">

            <div className="card-header">

              <div>
                <h3>Active Incidents</h3>
                <p>Latest production events</p>
              </div>

              <button className="btn-secondary">
                View All
              </button>

            </div>


            <div className="incident-list">

              {/* INCIDENT 1 */}
              <div className="incident-item">

                <div className="incident-main">

                  <div className="incident-id">
                    INC-001
                  </div>

                  <h4>
                    Database Connection Pool Exhaustion
                  </h4>

                  <p>
                    Payment Service
                  </p>

                </div>

                <div className="incident-meta">

                  <span className="status-badge status-critical">
                    Critical
                  </span>

                  <span className="incident-time">
                    2 min ago
                  </span>

                </div>

              </div>


              {/* INCIDENT 2 */}
              <div className="incident-item">

                <div className="incident-main">

                  <div className="incident-id">
                    INC-002
                  </div>

                  <h4>
                    Increased API Latency
                  </h4>

                  <p>
                    User Service
                  </p>

                </div>

                <div className="incident-meta">

                  <span className="status-badge status-investigating">
                    Investigating
                  </span>

                  <span className="incident-time">
                    8 min ago
                  </span>

                </div>

              </div>


              {/* INCIDENT 3 */}
              <div className="incident-item">

                <div className="incident-main">

                  <div className="incident-id">
                    INC-003
                  </div>

                  <h4>
                    Memory Usage Spike
                  </h4>

                  <p>
                    Analytics Service
                  </p>

                </div>

                <div className="incident-meta">

                  <span className="status-badge status-resolved">
                    Resolved
                  </span>

                  <span className="incident-time">
                    21 min ago
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* SYSTEM OVERVIEW */}
          <div className="dashboard-card overview-card">

            <div className="card-header">

              <div>
                <h3>System Overview</h3>
                <p>Current infrastructure health</p>
              </div>

            </div>


            <div className="health-list">

              <div className="health-row">

                <div>
                  <strong>API Gateway</strong>
                  <span>Healthy</span>
                </div>

                <div className="health-status healthy">
                  ●
                </div>

              </div>


              <div className="health-row">

                <div>
                  <strong>Payment Service</strong>
                  <span>Incident detected</span>
                </div>

                <div className="health-status warning">
                  ●
                </div>

              </div>


              <div className="health-row">

                <div>
                  <strong>Database</strong>
                  <span>Healthy</span>
                </div>

                <div className="health-status healthy">
                  ●
                </div>

              </div>


              <div className="health-row">

                <div>
                  <strong>Memory System</strong>
                  <span>Operational</span>
                </div>

                <div className="health-status healthy">
                  ●
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= AI MEMORY ================= */}
        <section className="dashboard-card memory-card">

          <div className="card-header">

            <div>
              <h3>AI Memory</h3>

              <p>
                Historical knowledge available to the incident agent
              </p>
=======
import { useState } from "react";
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

const incidents = [
  {
    id: "INC-042",
    service: "payment-service",
    issue: "Database connection pool exhaustion",
    severity: "critical",
    status: "Investigating",
    time: "2 min ago",
  },
  {
    id: "INC-041",
    service: "auth-service",
    issue: "Elevated authentication latency",
    severity: "warning",
    status: "Monitoring",
    time: "18 min ago",
  },
  {
    id: "INC-039",
    service: "orders-api",
    issue: "Redis cache miss spike",
    severity: "warning",
    status: "Resolved",
    time: "1 hr ago",
  },
];

const memories = [
  {
    type: "Experience",
    title: "Connection pool exhaustion",
    text: "Traffic spike caused database connection saturation.",
    confidence: "94%",
  },
  {
    type: "Observation",
    title: "Timeout pattern",
    text: "API latency increases before connection failures.",
    confidence: "89%",
  },
  {
    type: "Opinion",
    title: "Likely remediation",
    text: "Increase pool size and restart affected service.",
    confidence: "91%",
  },
];

/* =========================================================
   APP
========================================================= */

function App() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [simulating, setSimulating] = useState(false);

  const simulateIncident = () => {
    setSimulating(true);

    setTimeout(() => {
      setSimulating(false);
      setActiveTab("Incidents");
    }, 1200);
  };

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
            onClick={() => setActiveTab("Overview")}
          />

          <NavItem
            icon="alert"
            label="Incidents"
            count="03"
            danger
            active={activeTab === "Incidents"}
            onClick={() => setActiveTab("Incidents")}
          />

          <NavItem
            icon="brain"
            label="AI Memory"
            count="148"
            active={activeTab === "AI Memory"}
            onClick={() => setActiveTab("AI Memory")}
          />

          <NavItem
            icon="activity"
            label="Telemetry"
            active={activeTab === "Telemetry"}
            onClick={() => setActiveTab("Telemetry")}
          />

          <NavItem
            icon="file"
            label="Postmortems"
            count="27"
            active={activeTab === "Postmortems"}
            onClick={() => setActiveTab("Postmortems")}
          />
        </div>

        <div className="nav-section system-section">
          <div className="nav-label">SYSTEM</div>

          <NavItem
            icon="server"
            label="Services"
            active={activeTab === "Services"}
            onClick={() => setActiveTab("Services")}
          />

          <NavItem
            icon="deploy"
            label="Deployments"
            active={activeTab === "Deployments"}
            onClick={() => setActiveTab("Deployments")}
          />

          <NavItem
            icon="settings"
            label="Settings"
            active={activeTab === "Settings"}
            onClick={() => setActiveTab("Settings")}
          />
        </div>

        <div className="sidebar-bottom">
          <div className="health-card">
            <div className="health-icon">
              <Icon name="check" size={17} />
            </div>

            <div>
              <strong>System healthy</strong>
              <span>99.98% availability</span>
            </div>

            <div className="health-dot" />
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
            <strong>{activeTab}</strong>
          </div>

          <div className="topbar-actions">

            <div className="search-box">
              <Icon name="search" size={17} />
              <input placeholder="Search incidents..." />
              <kbd>⌘ K</kbd>
            </div>

            <div className="live-indicator">
              <span />
              LIVE
            </div>

            <button className="icon-button">
              <Icon name="terminal" size={18} />
            </button>

            <button className="icon-button">
              <Icon name="settings" size={18} />
            </button>

          </div>

        </header>

        {/* PAGE */}

        <section className="page">

          {activeTab === "Overview" && (
            <Overview
              simulateIncident={simulateIncident}
              simulating={simulating}
            />
          )}

          {activeTab === "Incidents" && <Incidents />}

          {activeTab === "AI Memory" && <Memory />}

          {activeTab === "Telemetry" && <Telemetry />}

          {activeTab === "Postmortems" && <Postmortems />}

          {activeTab === "Services" && <Services />}

          {activeTab === "Deployments" && <Deployments />}

          {activeTab === "Settings" && <Settings />}

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

function Overview({ simulateIncident, simulating }) {
  return (
    <>
      <div className="page-heading">

        <div>
          <div className="eyebrow">SRE WORKSPACE</div>

          <h1>Incident Overview</h1>

          <p>
            Monitor production systems, investigate incidents,
            and let memory-powered AI accelerate diagnosis.
          </p>
        </div>

        <div className="heading-actions">

          <button className="range-button">
            <Icon name="clock" size={16} />
            Last 24 hours
            <span>⌄</span>
          </button>

          <button
            className="simulate-button"
            onClick={simulateIncident}
            disabled={simulating}
          >
            <Icon name="pulse" size={17} />
            {simulating ? "Simulating..." : "Simulate Incident"}
          </button>

        </div>

      </div>

      {/* STAT CARDS */}

      <div className="stats-grid">

        <StatCard
          icon="alert"
          label="Active Incidents"
          value="03"
          change="+1 today"
          tone="danger"
        />

        <StatCard
          icon="brain"
          label="Memory Entries"
          value="148"
          change="+12 this week"
          tone="violet"
        />

        <StatCard
          icon="server"
          label="Services Online"
          value="24 / 24"
          change="100% healthy"
          tone="green"
        />

        <StatCard
          icon="activity"
          label="Mean Recovery"
          value="18m"
          change="-32% this month"
          tone="amber"
        />

      </div>

      <div className="dashboard-grid">

        {/* MEMORY CORE */}

        <section className="panel intelligence-panel">

          <div className="panel-heading">

            <div>
              <div className="eyebrow">MEMORY ENGINE</div>

              <h2>Incident Intelligence</h2>

              <p>
                AI reasoning powered by historical incident memory.
              </p>
            </div>

            <div className="online-badge">
              <span />
              ONLINE
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
              <span>148 memories</span>
            </div>

            <div className="memory-tag tag-right">
              <Icon name="pulse" size={14} />
              <span>7 signals</span>
            </div>

            <div className="memory-tag tag-bottom">
              <Icon name="activity" size={14} />
              <span>AI reasoning</span>
            </div>

          </div>

        </section>

        {/* SIDE METRICS */}

        <div className="side-metrics">

          <MetricPanel
            icon="pulse"
            label="Signals monitored"
            value="1,284"
          />

          <MetricPanel
            icon="brain"
            label="AI memory recall"
            value="94.8%"
            progress={94.8}
          />

          <MetricPanel
            icon="check"
            label="Recovery success"
            value="96.2%"
            progress={96.2}
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

          <button className="text-button">
            View all
            <Icon name="arrow" size={15} />
          </button>

        </div>

        <div className="incident-table">

          {incidents.map((incident) => (
            <IncidentRow
              key={incident.id}
              incident={incident}
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

function IncidentRow({ incident }) {
  return (
    <div className="incident-row">

      <div className={`severity ${incident.severity}`}>
        <span />
      </div>

      <div className="incident-main">

        <div className="incident-id">
          {incident.id}
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

      <button className="row-arrow">
        <Icon name="arrow" size={17} />
      </button>

    </div>
  );
}

/* =========================================================
   INCIDENTS
========================================================= */

function Incidents() {
  return (
    <PageContainer
      eyebrow="OPERATIONS"
      title="Incidents"
      description="Monitor, investigate and resolve production incidents."
    >
      <div className="content-grid">

        {incidents.map((incident) => (
          <div className="large-incident-card" key={incident.id}>

            <div className={`severity ${incident.severity}`}>
              <span />
            </div>

            <div className="large-incident-content">

              <div className="incident-id">
                {incident.id}
              </div>

              <h3>{incident.issue}</h3>

              <p>{incident.service}</p>

              <div className="incident-card-footer">
                <span>{incident.status}</span>
                <span>{incident.time}</span>
              </div>

            </div>

          </div>
        ))}

      </div>
    </PageContainer>
  );
}

/* =========================================================
   MEMORY
========================================================= */

function Memory() {
  return (
    <PageContainer
      eyebrow="MEMORY ENGINE"
      title="AI Memory"
      description="Historical experiences, observations and learned operational knowledge."
    >

      <div className="memory-summary">

        <div>
          <span>Total memories</span>
          <strong>148</strong>
        </div>

        <div>
          <span>Recall accuracy</span>
          <strong>94.8%</strong>
        </div>

        <div>
          <span>Learned today</span>
          <strong>12</strong>
        </div>

      </div>

      <div className="memory-list">

        {memories.map((memory) => (
          <div className="memory-card" key={memory.title}>

            <div className="memory-card-type">
              {memory.type}
            </div>

            <h3>{memory.title}</h3>

            <p>{memory.text}</p>

            <div className="memory-card-bottom">
              <span>Confidence</span>
              <strong>{memory.confidence}</strong>
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
      eyebrow="OBSERVABILITY"
      title="Telemetry"
      description="Real-time production signals feeding the incident intelligence engine."
    >

      <div className="telemetry-layout">

        <div className="panel chart-panel">

          <div className="panel-title-row">
            <div>
              <div className="eyebrow">REQUEST RATE</div>
              <h2>Traffic signals</h2>
            </div>

            <span className="green-text">LIVE</span>
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
  return (
    <PageContainer
      eyebrow="LEARNING LOOP"
      title="Postmortems"
      description="Incident recovery records and knowledge retained by the agent."
    >

      <div className="postmortem-layout">

        <div className="panel postmortem-main">

          <div className="resolved-label">
            <Icon name="check" size={15} />
            RESOLVED
          </div>

          <div className="eyebrow">INC-038</div>

          <h2>Database connection pool exhaustion</h2>

          <p>
            Payment service experienced elevated timeout rates after
            database connections reached capacity.
          </p>

          <div className="postmortem-sections">

            <div>
              <span>ROOT CAUSE</span>
              <strong>
                Traffic spike exhausted available database connections.
              </strong>
            </div>

            <div>
              <span>RESOLUTION</span>
              <strong>
                Increased connection pool capacity and restarted service.
              </strong>
            </div>

            <div>
              <span>LEARNING</span>
              <strong>
                Similar traffic and timeout patterns should trigger
                connection-pool analysis.
              </strong>
            </div>

          </div>

        </div>

        <div className="panel timeline-panel">

          <div className="eyebrow">TIMELINE</div>
          <h3>Incident lifecycle</h3>

          <TimelineItem
            time="14:02"
            title="Alert detected"
            text="API timeout rate crossed threshold."
          />

          <TimelineItem
            time="14:05"
            title="Memory recalled"
            text="3 similar incidents identified."
          />

          <TimelineItem
            time="14:09"
            title="Action approved"
            text="Connection pool increase approved."
          />

          <TimelineItem
            time="14:20"
            title="Recovery verified"
            text="Error rate returned to baseline."
          />

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
      eyebrow="INFRASTRUCTURE"
      title="Services"
      description="Current health of production services."
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
      eyebrow="RELEASES"
      title="Deployments"
      description="Recent production deployments and their status."
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
            Configure how the AI agent recalls memory and validates
            evidence before recommending actions.
          </p>

          <div className="setting-row">
            <span>Evidence validation</span>
            <div className="toggle on">
              <span />
>>>>>>> Stashed changes
            </div>
          </div>

<<<<<<< Updated upstream
            <span className="memory-count">
              12 Memories
            </span>

          </div>

=======
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
>>>>>>> Stashed changes

          <div className="memory-content">

            <div className="memory-item">

              <div className="memory-number">
                01
              </div>

              <div>
                <strong>
                  Database connection exhaustion
                </strong>

                <p>
                  Similar incident resolved by increasing the
                  connection pool and restarting the service.
                </p>
              </div>

            </div>


            <div className="memory-item">

              <div className="memory-number">
                02
              </div>

              <div>
                <strong>
                  Traffic spike pattern
                </strong>

                <p>
                  Historical traffic increase correlated with
                  database connection failures.
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* ================= FOOTER ================= */}
        <footer className="dashboard-footer">

          <span>
            Incident Response Agent
          </span>

          <span>
            AI-powered SRE Operations
          </span>

        </footer>

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