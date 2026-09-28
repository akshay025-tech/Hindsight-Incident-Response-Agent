import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Brain,
  CheckCircle
} from "lucide-react";

import { getPostmortem } from "../api/api";

function Postmortem() {
  const { id } = useParams();

  const [postmortem, setPostmortem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPostmortem();
  }, [id]);

  const loadPostmortem = async () => {
    try {
      const data = await getPostmortem(id);
      setPostmortem(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading postmortem...
      </div>
    );
  }

  if (!postmortem) {
    return (
      <div className="loading">
        Postmortem not found.
      </div>
    );
  }

  return (
    <div className="app">

      <header className="topbar">

        <Link to="/" className="back-button">
          <ArrowLeft size={18} />
          Dashboard
        </Link>

        <div className="agent-status">
          <Brain size={18} />
          Learning System
        </div>

      </header>

      <main className="postmortem-page">

        <section className="panel">

          <div className="section-title">
            <FileText size={22} />
            <h1>Incident Postmortem</h1>
          </div>

          <div className="postmortem-section">

            <h3>Summary</h3>

            <p>
              {postmortem.summary}
            </p>

          </div>

          <div className="postmortem-section">

            <h3>Root Cause</h3>

            <p>
              {postmortem.root_cause}
            </p>

          </div>

          <div className="postmortem-section">

            <h3>Resolution</h3>

            <p>
              {postmortem.resolution}
            </p>

          </div>

          <div className="postmortem-section">

            <h3>What the Agent Learned</h3>

            <div className="learning-box">

              <CheckCircle size={20} />

              <p>
                {postmortem.learning}
              </p>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default Postmortem;