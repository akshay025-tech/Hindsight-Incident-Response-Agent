import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Brain,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Clock3,
  Cpu,
  Database,
  FileText,
  GitBranch,
  HardDrive,
  Home,
  MemoryStick,
  MoreHorizontal,
  Network,
  Radar,
  Search,
  Server,
  Settings,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
  Wifi,
  Zap
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* BRAND */}
      <div className="brand">
        <div className="brand-logo">
          <Brain size={21} />
        </div>

        <div className="brand-copy">
          <div className="brand-title">INCIDENT AI</div>
          <div className="brand-subtitle">SRE COMMAND CENTER</div>
        </div>
      </div>

      <div className="sidebar-divider" />

      {/* WORKSPACE */}
      <div className="nav-section-title">
        WORKSPACE
      </div>

      <nav className="nav-list">

        <div className="nav-item active">
          <Home size={18} />
          <span>Overview</span>
        </div>

        <div className="nav-item">
          <AlertTriangle size={18} />
          <span>Incidents</span>
          <span className="nav-count danger">03</span>
        </div>

        <div className="nav-item">
          <Brain size={18} />
          <span>AI Memory</span>
          <span className="nav-count">148</span>
        </div>

        <div className="nav-item">
          <Activity size={18} />
          <span>Telemetry</span>
        </div>

        <div className="nav-item">
          <FileText size={18} />
          <span>Postmortems</span>
          <span className="nav-count">27</span>
        </div>

      </nav>

      {/* SYSTEM */}
      <div className="nav-section-title system-title">
        SYSTEM
      </div>

      <nav className="nav-list">

        <div className="nav-item">
          <Server size={18} />
          <span>Services</span>
        </div>

        <div className="nav-item">
          <GitBranch size={18} />
          <span>Deployments</span>
        </div>

        <div className="nav-item">
          <Settings size={18} />
          <span>Settings</span>
        </div>

      </nav>

      <div className="sidebar-bottom">

        {/* SYSTEM HEALTH */}
        <div className="sidebar-health">

          <div className="health-icon">
            <ShieldCheck size={18} />
          </div>

          <div className="health-copy">
            <strong>System healthy</strong>
            <span>99.98% availability</span>
          </div>

          <div className="health-pulse" />

        </div>

        {/* USER */}
        <div className="sidebar-user">

          <div className="user-avatar">
            AG
          </div>

          <div className="user-copy">
            <strong>Operator</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown size={15} />

        </div>

      </div>

    </aside>
  );
}


function Topbar() {
  return (
    <header className="topbar">

      <div className="breadcrumb">
        <span>Workspace</span>
        <span className="breadcrumb-slash">/</span>
        <strong>Overview</strong>
      </div>

      <div className="topbar-actions">

        <div className="search-box">
          <Search size={16} />
          <span>Search incidents...</span>
          <kbd>⌘ K</kbd>
        </div>

        <div className="live-indicator">
          <span className="live-dot" />
          LIVE
        </div>

        <button className="icon-button">
          <Terminal size={17} />
        </button>

        <button className="icon-button">
          <Settings size={17} />
        </button>

      </div>

    </header>
  );
}


function StatCard({
  label,
  value,
  change,
  icon: Icon,
  type = "normal"
}) {
  return (
    <div className={`stat-card ${type}`}>

      <div className="stat-top">
        <div className="stat-icon">
          <Icon size={17} />
        </div>

        <span className="stat-change">
          {change}
        </span>
      </div>

      <div className="stat-label">
        {label}
      </div>

      <div className="stat-value">
        {value}
      </div>

    </div>
  );
}


function AICore() {
  return (
    <div className="ai-core-card">

      <div className="ai-core-header">
        <div>
          <span className="eyebrow">
            MEMORY ENGINE
          </span>

          <h2>
            Incident Intelligence
          </h2>

          <p>
            AI reasoning powered by historical incident memory.
          </p>
        </div>

        <div className="ai-status">
          <span />
          ONLINE
        </div>
      </div>

      <div className="ai-core-stage">

        <div className="core-grid" />

        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three" />

        <div className="core-glow" />

        <div className="core-sphere">

          <div className="sphere-inner">
            <Brain size={42} />
          </div>

          <div className="sphere-ring ring-one" />
          <div className="sphere-ring ring-two" />

        </div>

        <div className="floating-node node-one">
          <Database size={15} />
          <span>148 memories</span>
        </div>

        <div className="floating-node node-two">
          <Radar size={15} />
          <span>7 signals</span>
        </div>

        <div className="floating-node node-three">
          <Sparkles size={15} />
          <span>AI reasoning</span>
        </div>

      </div>

      <div className="ai-core-footer">

        <div>
          <span>Recall accuracy</span>
          <strong>94.8%</strong>
        </div>

        <div>
          <span>Active context</span>
          <strong>12.4k</strong>
        </div>

        <div>
          <span>Avg. reasoning</span>
          <strong>1.8s</strong>
        </div>

      </div>

    </div>
  );
}


function IncidentPanel() {
  return (
    <section className="dashboard-card incidents-card">

      <div className="card-header">

        <div>
          <div className="card-title">
            Active Incidents
          </div>

          <div className="card-subtitle">
            Current production events
          </div>
        </div>

        <button className="small-button">
          View all
          <ArrowUpRight size={14} />
        </button>

      </div>

      <div className="incident-list">

        <div className="incident-row">

          <div className="incident-status critical">
            <AlertTriangle size={15} />
          </div>

          <div className="incident-details">

            <div className="incident-name">
              Database connection exhaustion
            </div>

            <div className="incident-meta">
              INC-001 · payment-service · 4 min ago
            </div>

          </div>

          <div className="incident-severity critical-text">
            CRITICAL
          </div>

          <div className="incident-confidence">
            92%
          </div>

        </div>


        <div className="incident-row">

          <div className="incident-status warning">
            <Wifi size={15} />
          </div>

          <div className="incident-details">

            <div className="incident-name">
              Elevated API latency
            </div>

            <div className="incident-meta">
              INC-002 · api-gateway · 12 min ago
            </div>

          </div>

          <div className="incident-severity warning-text">
            WARNING
          </div>

          <div className="incident-confidence">
            78%
          </div>

        </div>


        <div className="incident-row">

          <div className="incident-status info">
            <Network size={15} />
          </div>

          <div className="incident-details">

            <div className="incident-name">
              Network packet loss
            </div>

            <div className="incident-meta">
              INC-003 · edge-service · 28 min ago
            </div>

          </div>

          <div className="incident-severity info-text">
            INVESTIGATING
          </div>

          <div className="incident-confidence">
            64%
          </div>

        </div>

      </div>

    </section>
  );
}


function DiagnosisPanel() {
  return (
    <section className="dashboard-card diagnosis-card">

      <div className="card-header">

        <div>
          <div className="card-title">
            AI Diagnosis
          </div>

          <div className="card-subtitle">
            Current reasoning context
          </div>
        </div>

        <div className="ai-mini-badge">
          <Sparkles size={13} />
          AI
        </div>

      </div>

      <div className="diagnosis-content">

        <div className="diagnosis-confidence">

          <div className="confidence-ring">

            <div className="confidence-value">
              92<span>%</span>
            </div>

          </div>

          <div>
            <span>Confidence</span>
            <strong>High confidence</strong>
          </div>

        </div>

        <div className="diagnosis-line" />

        <div className="diagnosis-root">

          <span className="eyebrow">
            MOST LIKELY ROOT CAUSE
          </span>

          <h3>
            DB connection pool exhaustion
          </h3>

          <p>
            Historical incidents show the same pattern:
            traffic spike → connection saturation →
            request timeouts.
          </p>

        </div>

        <div className="evidence-tags">

          <span>
            <CheckCircle2 size={13} />
            8 matching incidents
          </span>

          <span>
            <CheckCircle2 size={13} />
            Metric correlation
          </span>

          <span>
            <CheckCircle2 size={13} />
            Deployment match
          </span>

        </div>

      </div>

    </section>
  );
}


function TelemetryChart() {
  return (
    <section className="dashboard-card telemetry-card">

      <div className="card-header">

        <div>
          <div className="card-title">
            Service Telemetry
          </div>

          <div className="card-subtitle">
            Payment service · Last 60 minutes
          </div>
        </div>

        <div className="telemetry-live">
          <span />
          Streaming
        </div>

      </div>

      <div className="chart-area">

        <div className="chart-y-axis">
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>

        <div className="chart">

          <div className="chart-grid-lines">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <svg
            className="chart-svg"
            viewBox="0 0 700 220"
            preserveAspectRatio="none"
          >

            <defs>
              <linearGradient
                id="areaGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#287cff"
                  stopOpacity="0.34"
                />

                <stop
                  offset="100%"
                  stopColor="#287cff"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>

            <path
              className="chart-area-fill"
              d="
                M0,170
                C40,160 60,150 95,158
                C130,165 145,120 180,125
                C215,130 235,155 265,142
                C300,125 320,90 350,100
                C380,110 395,135 425,118
                C455,100 480,60 510,75
                C540,90 555,110 585,82
                C615,54 650,65 700,35
                L700,220
                L0,220 Z
              "
            />

            <path
              className="chart-line"
              d="
                M0,170
                C40,160 60,150 95,158
                C130,165 145,120 180,125
                C215,130 235,155 265,142
                C300,125 320,90 350,100
                C380,110 395,135 425,118
                C455,100 480,60 510,75
                C540,90 555,110 585,82
                C615,54 650,65 700,35
              "
            />

          </svg>

          <div className="chart-point point-one" />
          <div className="chart-point point-two" />
          <div className="chart-point point-three" />

        </div>

      </div>

      <div className="chart-footer">

        <span>60m ago</span>
        <span>45m</span>
        <span>30m</span>
        <span>15m</span>
        <span>Now</span>

      </div>

      <div className="telemetry-legend">

        <div>
          <span className="legend-dot blue" />
          Request rate
        </div>

        <div>
          <span className="legend-dot purple" />
          Error rate
        </div>

        <div>
          <span className="legend-dot cyan" />
          Latency
        </div>

      </div>

    </section>
  );
}


function MemoryPanel() {
  return (
    <section className="dashboard-card memory-panel">

      <div className="card-header">

        <div>
          <div className="card-title">
            Memory Recall
          </div>

          <div className="card-subtitle">
            Relevant historical knowledge
          </div>
        </div>

        <Brain size={19} className="card-icon" />

      </div>

      <div className="memory-score">

        <div className="memory-score-circle">
          <span>8</span>
          <small>matches</small>
        </div>

        <div>
          <strong>Strong pattern match</strong>
          <p>
            Similar incidents detected in memory.
          </p>
        </div>

      </div>

      <div className="memory-items">

        <div className="memory-item">

          <div className="memory-index">
            01
          </div>

          <div>
            <strong>
              DB pool saturation
            </strong>

            <span>
              96% similarity · 18 days ago
            </span>
          </div>

          <ArrowUpRight size={14} />

        </div>

        <div className="memory-item">

          <div className="memory-index">
            02
          </div>

          <div>
            <strong>
              Traffic spike pattern
            </strong>

            <span>
              91% similarity · 42 days ago
            </span>
          </div>

          <ArrowUpRight size={14} />

        </div>

        <div className="memory-item">

          <div className="memory-index">
            03
          </div>

          <div>
            <strong>
              Connection timeout
            </strong>

            <span>
              87% similarity · 67 days ago
            </span>
          </div>

          <ArrowUpRight size={14} />

        </div>

      </div>

    </section>
  );
}


function ServicesPanel() {
  return (
    <section className="dashboard-card services-panel">

      <div className="card-header">

        <div>
          <div className="card-title">
            Service Health
          </div>

          <div className="card-subtitle">
            Production infrastructure
          </div>
        </div>

        <MoreHorizontal size={18} />

      </div>

      <div className="service-list">

        <div className="service-row">

          <div className="service-icon">
            <Server size={16} />
          </div>

          <div className="service-name">
            <strong>payment-service</strong>
            <span>Production</span>
          </div>

          <div className="service-metric">
            <span>CPU</span>
            <strong>72%</strong>
          </div>

          <div className="service-status healthy">
            <span />
            Healthy
          </div>

        </div>


        <div className="service-row">

          <div className="service-icon">
            <Database size={16} />
          </div>

          <div className="service-name">
            <strong>postgres-primary</strong>
            <span>Database</span>
          </div>

          <div className="service-metric">
            <span>Connections</span>
            <strong>91%</strong>
          </div>

          <div className="service-status warning">
            <span />
            Warning
          </div>

        </div>


        <div className="service-row">

          <div className="service-icon">
            <Network size={16} />
          </div>

          <div className="service-name">
            <strong>api-gateway</strong>
            <span>Production</span>
          </div>

          <div className="service-metric">
            <span>Latency</span>
            <strong>142ms</strong>
          </div>

          <div className="service-status healthy">
            <span />
            Healthy
          </div>

        </div>

      </div>

    </section>
  );
}


function ActivityPanel() {
  return (
    <section className="dashboard-card activity-panel">

      <div className="card-header">

        <div>
          <div className="card-title">
            Incident Activity
          </div>

          <div className="card-subtitle">
            Latest system events
          </div>
        </div>

        <Clock3 size={18} />

      </div>

      <div className="activity-list">

        <div className="activity-item">

          <div className="activity-dot blue-dot" />

          <div>
            <strong>
              AI analysis started
            </strong>

            <span>
              INC-001 · 2 minutes ago
            </span>
          </div>

        </div>

        <div className="activity-item">

          <div className="activity-dot green-dot" />

          <div>
            <strong>
              Memory match found
            </strong>

            <span>
              8 historical incidents · 3 minutes ago
            </span>
          </div>

        </div>

        <div className="activity-item">

          <div className="activity-dot purple-dot" />

          <div>
            <strong>
              Recommendation generated
            </strong>

            <span>
              Increase DB connection pool · 4 minutes ago
            </span>
          </div>

        </div>

        <div className="activity-item">

          <div className="activity-dot orange-dot" />

          <div>
            <strong>
              Incident detected
            </strong>

            <span>
              Payment service · 5 minutes ago
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}


function App() {
  return (
    <div className="app-shell">

      <Sidebar />

      <main className="main-content">

        <Topbar />

        <div className="dashboard">

          {/* PAGE HEADER */}

          <section className="page-heading">

            <div>

              <div className="eyebrow">
                SRE WORKSPACE
              </div>

              <h1>
                Incident Overview
              </h1>

              <p>
                Monitor production systems, investigate incidents,
                and let memory-powered AI accelerate diagnosis.
              </p>

            </div>

            <div className="heading-actions">

              <button className="secondary-button">
                <Clock3 size={16} />
                Last 24 hours
                <ChevronDown size={14} />
              </button>

              <button className="primary-button">
                <Zap size={16} />
                Simulate Incident
              </button>

            </div>

          </section>


          {/* STATS */}

          <section className="stats-grid">

            <StatCard
              label="Active Incidents"
              value="03"
              change="+1 today"
              icon={AlertTriangle}
              type="danger"
            />

            <StatCard
              label="Memory Entries"
              value="148"
              change="+12 this week"
              icon={Brain}
            />

            <StatCard
              label="Services Online"
              value="24 / 24"
              change="100% healthy"
              icon={Server}
            />

            <StatCard
              label="Mean Recovery"
              value="18m"
              change="-32% this month"
              icon={TrendingUp}
            />

          </section>


          {/* AI HERO */}

          <section className="hero-grid">

            <AICore />

            <div className="hero-side">

              <div className="mini-hero-card">

                <div className="mini-card-icon">
                  <Radar size={19} />
                </div>

                <div>
                  <span>Signals monitored</span>
                  <strong>1,284</strong>
                </div>

                <div className="mini-sparkline">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

              </div>


              <div className="mini-hero-card">

                <div className="mini-card-icon purple">
                  <Brain size={19} />
                </div>

                <div>
                  <span>AI memory recall</span>
                  <strong>94.8%</strong>
                </div>

                <div className="mini-progress">
                  <span />
                </div>

              </div>


              <div className="mini-hero-card">

                <div className="mini-card-icon green">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <span>Recovery success</span>
                  <strong>97.2%</strong>
                </div>

                <div className="mini-progress green-progress">
                  <span />
                </div>

              </div>

            </div>

          </section>


          {/* INCIDENT + DIAGNOSIS */}

          <section className="two-column-grid">

            <IncidentPanel />

            <DiagnosisPanel />

          </section>


          {/* TELEMETRY */}

          <section className="telemetry-grid">

            <TelemetryChart />

            <MemoryPanel />

          </section>


          {/* SERVICES + ACTIVITY */}

          <section className="two-column-grid bottom-grid">

            <ServicesPanel />

            <ActivityPanel />

          </section>


          {/* FOOTER */}

          <footer className="dashboard-footer">

            <div>
              <CircleDot size={13} />
              Incident Response Agent
            </div>

            <span>
              Memory-powered SRE intelligence
            </span>

            <span>
              v1.0.0
            </span>

          </footer>

        </div>

      </main>

    </div>
  );
}

export default App;