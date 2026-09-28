import {
  FileText,
  Activity,
  CheckCircle,
  XCircle
} from "lucide-react";

function EvidencePanel({ evidence }) {
  return (
    <section className="panel">

      <div className="section-title">
        <FileText size={20} />
        <h2>Evidence</h2>
      </div>

      {evidence.length === 0 ? (

        <div className="empty-state">
          Evidence will appear after analysis.
        </div>

      ) : (

        <div className="evidence-list">

          {evidence.map((item, index) => (

            <div
              className="evidence-item"
              key={index}
            >

              <div className="evidence-icon">

                {item.type === "metric" ? (
                  <Activity size={18} />
                ) : (
                  <FileText size={18} />
                )}

              </div>

              <div className="evidence-content">

                <strong>
                  {item.title}
                </strong>

                <p>
                  {item.description}
                </p>

                <span className="evidence-source">
                  Source: {item.source}
                </span>

              </div>

              {item.supports ? (
                <CheckCircle
                  size={20}
                  className="success-icon"
                />
              ) : (
                <XCircle
                  size={20}
                  className="error-icon"
                />
              )}

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default EvidencePanel;