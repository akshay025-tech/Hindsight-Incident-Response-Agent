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
            </div>

            <span className="memory-count">
              12 Memories
            </span>

          </div>


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

      </main>

    </div>
  );
}

export default App;