import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Brain, Play } from "lucide-react";
import { Link } from "react-router-dom";

import {
  getIncident,
  analyzeIncident
} from "../api/api";

import IncidentHeader from "../components/IncidentHeader";
import MemoryRecall from "../components/MemoryRecall";
import HypothesisCard from "../components/HypothesisCard";
import EvidencePanel from "../components/EvidencePanel";
import RecommendationCard from "../components/RecommendationCard";
import ApprovalPanel from "../components/ApprovalPanel";
import Timeline from "../components/Timeline";

function IncidentDetails() {
  const { id } = useParams();

  const [incident, setIncident] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    loadIncident();
  }, [id]);

  const loadIncident = async () => {
    try {
      const data = await getIncident(id);
      setIncident(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const runAnalysis = async () => {
    setAnalyzing(true);

    try {
      const result = await analyzeIncident(id);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading incident...</div>;
  }

  if (!incident) {
    return <div className="loading">Incident not found.</div>;
  }

  return (
    <div className="app">

      <header className="topbar">

        <Link to="/" className="back-button">
          <ArrowLeft size={18} />
          Back
        </Link>

        <div className="agent-status">
          <Brain size={18} />
          AI Agent
        </div>

      </header>

      <main className="incident-page">

        <IncidentHeader incident={incident} />

        <div className="analysis-button-container">
          <button
            className="primary-button"
            onClick={runAnalysis}
            disabled={analyzing}
          >
            <Play size={18} />

            {analyzing
              ? "Analyzing Incident..."
              : "Run AI Analysis"}
          </button>
        </div>

        <section className="two-column">

          <div>

            <MemoryRecall
              memories={analysis?.memories || []}
            />

            <HypothesisCard
              hypotheses={analysis?.hypotheses || []}
            />

            <EvidencePanel
              evidence={analysis?.evidence || []}
            />

          </div>

          <div>

            <RecommendationCard
              recommendation={analysis?.recommendation}
            />

            <ApprovalPanel
              action={analysis?.action}
              onActionComplete={loadIncident}
            />

          </div>

        </section>

        <Timeline
          timeline={incident.timeline || []}
        />

      </main>
    </div>
  );
}

export default IncidentDetails;