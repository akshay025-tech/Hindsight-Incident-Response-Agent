import { useState } from "react";
import {
  ShieldCheck,
  Play,
  CheckCircle
} from "lucide-react";

import {
  approveAction,
  executeAction
} from "../api/api";

function ApprovalPanel({
  action,
  onActionComplete
}) {
  const [approved, setApproved] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  if (!action) {
    return (
      <section className="panel">

        <div className="section-title">
          <ShieldCheck size={20} />
          <h2>Human Approval</h2>
        </div>

        <div className="empty-state">
          No action waiting for approval.
        </div>

      </section>
    );
  }

  const handleApprove = async () => {
    try {
      await approveAction(action.id);
      setApproved(true);
    } catch (error) {
      setError(error.response?.data?.detail || "Approval failed.");
    }
  };

  const handleExecute = async () => {
    setExecuting(true);

    try {
      await executeAction(action.id);

      setCompleted(true);

      if (onActionComplete) {
        onActionComplete();
      }

    } catch (error) {
      setError(error.response?.data?.detail || "Action simulation failed.");
    } finally {
      setExecuting(false);
    }
  };

  return (
    <section className="panel approval-panel">

      <div className="section-title">
        <ShieldCheck size={20} />
        <h2>Human Approval</h2>
      </div>

      {error && <div className="request-error" role="alert">{error}</div>}

      {!approved && !completed && (

        <>
          <p>
            Review and approve the recommendation. The next step only simulates
            execution and updates this incident; it does not change production.
          </p>

          <button
            className="approve-button"
            onClick={handleApprove}
          >
            <ShieldCheck size={18} />
            Approve Action
          </button>
        </>

      )}

      {approved && !completed && (

        <>

          <div className="approved-message">
            <CheckCircle size={20} />
            Action approved.
          </div>

          <button
            className="execute-button"
            onClick={handleExecute}
            disabled={executing}
          >
            <Play size={18} />

            {executing
              ? "Simulating..."
              : "Simulate Action"}
          </button>

        </>

      )}

      {completed && (

        <div className="completed-message">

          <CheckCircle size={22} />

          <div>
            <strong>Action Completed</strong>

            <p>
              Waiting for recovery verification.
            </p>
          </div>

        </div>

      )}

    </section>
  );
}

export default ApprovalPanel;