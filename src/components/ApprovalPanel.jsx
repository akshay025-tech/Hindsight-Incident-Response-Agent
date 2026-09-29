import { Check, ShieldCheck, X } from 'lucide-react';

function ApprovalPanel({ action, onApprove, onReject, busy = false }) {
    const decisionMade = action?.status === 'approved' || action?.status === 'rejected';
    return (
        <section className="panel">
            <h2><ShieldCheck size={18} /> Human Approval</h2>
            {action ? (
                <div>
                    <h3>{action.title || 'Recommended action'}</h3>
                    <p>{action.description || 'Review the suggested action before proceeding.'}</p>
                    <span className={`status-label status-${action.status || 'pending_approval'}`}>{(action.status || 'pending approval').replaceAll('_', ' ')}</span>
                    {!decisionMade && (onApprove || onReject) && (
                        <div className="approval-actions">
                            {onApprove && (
                                <button className="button button-primary" onClick={() => onApprove(action)} disabled={busy}>
                                    <Check size={16} /> {busy ? 'Saving…' : 'Approve'}
                                </button>
                            )}
                            {onReject && (
                                <button className="button button-secondary" onClick={() => onReject(action)} disabled={busy}>
                                    <X size={16} /> Reject
                                </button>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <p>No action pending.</p>
            )}
        </section>
    );
}

export default ApprovalPanel;
