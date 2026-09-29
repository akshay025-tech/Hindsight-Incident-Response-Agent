import { useEffect, useState } from "react";
import { ArrowLeft, Play } from "lucide-react";

import {
  analyzeIncident,
  getIncident
} from "../api/api";
import ApprovalPanel from "./ApprovalPanel";
import EvidencePanel from "./EvidencePanel";
import HypothesisCard from "./HypothesisCard";
import IncidentHeader from "./IncidentHeader";
import MemoryRecall from "./MemoryRecall";
import RecommendationCard from "./RecommendationCard";
import Timeline from "./Timeline";

function IncidentWorkspace({ incidentId, onBack, onIncidentUpdated }) {
  const [incident, setIncident] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const loadIncident = async () => {
    try {
      setIncident(await getIncident(incidentId));
      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.detail || "Could not load this incident.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setAnalysis(null);
    loadIncident();
  }, [incidentId]);

  const runAnalysis = async () => {
    setAnalyzing(true);
    setError("");
    try {
      setAnalysis(await analyzeIncident(incidentId));
    } catch (requestError) {
      setError(requestError.response?.data?.detail || "Analysis failed.");
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return <div className="empty-state">Loading incident...</div>;
  }

  if (!incident) {
    return (
      <section className="panel">
        <div className="empty-state">{error || "Incident not found."}</div>
        <button className="text-button" onClick={onBack}>
          <ArrowLeft size={16} /> Back to incidents
        </button>
      </section>
    );
  }

  return (
    <div className="incident-workspace">
      <div className="page-heading">
        <div>
          <button className="text-button" onClick={onBack}>
            <ArrowLeft size={16} /> Back to incidents
          </button>
          <div className="eyebrow">INCIDENT INVESTIGATION</div>
          <h1>{incident.title}</h1>
          <p>{incident.description || "No description was provided."}</p>
        </div>
        <button
          className="simulate-button"
          onClick={runAnalysis}
          disabled={analyzing}
        >
          <Play size={17} />
          {analyzing ? "Analyzing..." : "Run Analysis"}
        </button>
      </div>

      {error && <div className="request-error" role="alert">{error}</div>}

      <IncidentHeader incident={{ ...incident, service: incident.source || "Unspecified source" }} />

      <div className="two-column">
        <div>
          <MemoryRecall memories={analysis?.memories || []} />
          <HypothesisCard hypotheses={analysis?.hypotheses || []} />
          <EvidencePanel evidence={analysis?.evidence || []} />
        </div>
        <div>
          <RecommendationCard recommendation={analysis?.recommendation} />
          <ApprovalPanel
            action={analysis?.action}
            onActionComplete={() => {
              loadIncident();
              onIncidentUpdated();
            }}
          />
        </div>
      </div>

      <Timeline timeline={incident.timeline || []} />
    </div>
  );
}

export default IncidentWorkspace;