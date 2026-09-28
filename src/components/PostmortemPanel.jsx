import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Brain,
  Clock,
  Wrench
} from "lucide-react";

function PostmortemPanel() {
  return (
    <section className="panel postmortem-panel">

      {/* Header */}
      <div className="panel-header">
        <div className="section-title">
          <FileText size={20} />
          <h2>Incident Postmortem</h2>
        </div>

        <span className="postmortem-status">
          <CheckCircle size={14} />
          Resolved
        </span>
      </div>

      {/* Incident Summary */}
      <div className="postmortem-block">
        <div className="postmortem-heading">
          <AlertTriangle size={17} />
          <h3>Incident Summary</h3>
        </div>

        <p>
          Payment service experienced database connection pool exhaustion,
          causing increased request failures and timeout errors.
        </p>
      </div>

      {/* Root Cause */}
      <div className="postmortem-block">
        <div className="postmortem-heading">
          <Brain size={17} />
          <h3>Root Cause</h3>
        </div>

        <p>
          A sudden increase in traffic exhausted the available database
          connections, resulting in connection timeout errors.
        </p>
      </div>

      {/* Resolution */}
      <div className="postmortem-block">
        <div className="postmortem-heading">
          <Wrench size={17} />
          <h3>Resolution</h3>
        </div>

        <p>
          The database connection pool was increased and the affected
          service was restarted. Error rates returned to normal.
        </p>
      </div>

      {/* Metrics */}
      <div className="postmortem-meta">

        <div className="meta-card">
          <Clock size={17} />

          <div>
            <span>Incident Duration</span>
            <strong>18 minutes</strong>
          </div>
        </div>

        <div className="meta-card">
          <CheckCircle size={17} />

          <div>
            <span>Recovery Status</span>
            <strong>Recovered</strong>
          </div>
        </div>

      </div>

      {/* Agent Learning */}
      <div className="learning-section">

        <div className="postmortem-heading">
          <Brain size={17} />
          <h3>Agent Learning</h3>
        </div>

        <div className="learning-box">

          <Brain size={20} />

          <div>
            <strong>Memory Updated</strong>

            <p>
              The incident pattern and successful resolution have been
              recorded for future incident analysis.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default PostmortemPanel;
