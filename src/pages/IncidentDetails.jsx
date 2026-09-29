import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Brain, CheckCircle2, ClipboardCheck, Pencil, Play, RotateCcw, Save, ShieldAlert, X } from 'lucide-react';
import { analyzeIncident, decideApproval, getIncident, updateIncident } from '../api/api';
import AppHeader from '../components/AppHeader';
import ApprovalPanel from '../components/ApprovalPanel';
import HypothesisCard from '../components/HypothesisCard';
import MemoryRecall from '../components/MemoryRecall';
import RecommendationCard from '../components/RecommendationCard';

function IncidentDetails({ incidents, onRefresh }) {
    const { id } = useParams();
    const [incident, setIncident] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [savingDecision, setSavingDecision] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [savingEdit, setSavingEdit] = useState(false);
    const [editForm, setEditForm] = useState({ title: '', description: '', severity: 'medium' });
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');

    const loadIncident = async () => {
        setLoading(true);
        try {
            const data = await getIncident(id);
            setIncident(data);
        } catch (err) {
            const fromList = incidents.find((item) => String(item.id || item.incident_id) === String(id));
            setIncident(fromList || null);
            if (!fromList) setError(err.response?.data?.detail || 'Incident not found.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIncident(null);
        setAnalysis(null);
        setError('');
        loadIncident();
    }, [id]);

    const runAnalysis = async () => {
        setAnalyzing(true);
        setError('');
        try {
            const result = await analyzeIncident(id);
            setAnalysis(result);
            onRefresh?.();
        } catch (err) {
            setError(err.response?.data?.detail || 'Analysis failed. Check the API and try again.');
        } finally {
            setAnalyzing(false);
        }
    };

    const handleStatusChange = async () => {
        const status = incident.status === 'resolved' ? 'open' : 'resolved';
        setUpdatingStatus(true);
        setError('');
        setNotice('');
        try {
            const updated = await updateIncident(id, { status });
            setIncident(updated);
            const updatedTime = new Date(updated.updated_at).toLocaleString();
            setNotice(`${status === 'resolved' ? 'Incident marked resolved' : 'Incident reopened'} · Updated ${updatedTime}.`);
            await onRefresh?.();
        } catch (err) {
            setError(err.response?.data?.detail || 'Incident status could not be updated.');
        } finally {
            setUpdatingStatus(false);
        }
    };

    const openEditForm = () => {
        setEditForm({
            title: incident.title || '',
            description: incident.description || '',
            severity: incident.severity || 'medium',
        });
        setEditOpen(true);
        setError('');
    };

    const handleEditSave = async (event) => {
        event.preventDefault();
        setSavingEdit(true);
        setError('');
        setNotice('');
        try {
            const updated = await updateIncident(id, editForm);
            setIncident(updated);
            setAnalysis(null);
            setEditOpen(false);
            setNotice(`Incident details updated at ${new Date(updated.updated_at).toLocaleString()}.`);
            await onRefresh?.();
        } catch (err) {
            setError(err.response?.data?.detail || 'Incident details could not be updated.');
        } finally {
            setSavingEdit(false);
        }
    };

    const handleDecision = async (decision) => {
        setSavingDecision(true);
        setError('');
        setNotice('');
        try {
            const result = await decideApproval(id, decision);
            setIncident((current) => current && ({
                ...current,
                action_status: result.decision,
                updated_at: result.decided_at,
            }));
            setAnalysis((current) => current && ({
                ...current,
                action: { ...current.action, status: result.decision },
            }));
            setNotice(`Mitigation ${decision} · Updated ${new Date(result.decided_at).toLocaleString()}. No infrastructure action was executed.`);
            await onRefresh?.();
        } catch (err) {
            setError(err.response?.data?.detail || 'Approval decision could not be saved.');
        } finally {
            setSavingDecision(false);
        }
    };

    const createdAt = incident?.created_at
        ? new Date(incident.created_at).toLocaleString()
        : 'Not recorded';
    const updatedAt = incident?.updated_at;
    const updatedAtLabel = updatedAt ? new Date(updatedAt).toLocaleString() : 'No edits yet';

    if (loading) return <div className="app-frame"><AppHeader /><main className="workspace"><div className="loading-state">Loading incident…</div></main></div>;
    if (!incident) return <div className="app-frame"><AppHeader /><main className="workspace"><div className="empty-state">{error || 'Incident not found.'}</div></main></div>;

    return (
        <div className="app-frame">
            <AppHeader active="incidents" connection="online" />
            <main className="workspace incident-workspace">
                <div className="detail-toolbar">
                    <Link to="/" className="text-link"><ArrowLeft size={16} /> All incidents</Link>
                    <Link to={`/postmortem/${id}`} className="button button-secondary"><ClipboardCheck size={16} /> Postmortem</Link>
                </div>
                <header className="incident-heading">
                    <div className="incident-heading-copy">
                        <p className="eyebrow">INCIDENT / {incident.id || incident.incident_id}</p>
                        <h1>{incident.title}</h1>
                        <p>{incident.description || 'No description provided.'}</p>
                    </div>
                    <span className={`status-tag status-${incident.status || 'open'}`}>{(incident.status || 'open').replaceAll('_', ' ')}</span>
                </header>
                <div className="incident-facts">
                    <span><small>SEVERITY</small><strong className={`severity-text severity-text-${incident.severity || 'medium'}`}>{incident.severity || 'medium'}</strong></span>
                    <span><small>SOURCE</small><strong>{incident.source || 'manual'}</strong></span>
                    <span><small>REPORTED</small><strong>{createdAt}</strong></span>
                    <span><small>LAST UPDATED</small><strong>{updatedAtLabel}</strong></span>
                </div>
                <div className="detail-actions">
                    <button className="button button-secondary" onClick={openEditForm}>
                        <Pencil size={16} /> Edit details
                    </button>
                    <button className="button button-primary" onClick={runAnalysis} disabled={analyzing}>
                        <Play size={16} /> {analyzing ? 'Analyzing…' : analysis ? 'Run analysis again' : 'Run analysis'}
                    </button>
                    <button className="button button-secondary" onClick={handleStatusChange} disabled={updatingStatus}>
                        {incident.status === 'resolved' ? <RotateCcw size={16} /> : <CheckCircle2 size={16} />}
                        {updatingStatus ? 'Updating…' : incident.status === 'resolved' ? 'Reopen incident' : 'Mark resolved'}
                    </button>
                </div>

                {error && <div className="alert error" role="alert">{error}</div>}
                {notice && <div className="inline-notice" role="status">{notice}</div>}

                {analysis ? (
                    <div className="analysis-grid">
                        <section className="panel">
                            <div className="panel-heading"><h2><Brain size={18} /> Hypotheses</h2><span>{analysis.hypotheses?.length || 0} candidates</span></div>
                            <div className="hypothesis-list">
                                {analysis.hypotheses?.length ? analysis.hypotheses.map((item, index) => (
                                    <HypothesisCard key={`${item.title}-${index}`} hypothesis={item} />
                                )) : <p>No hypotheses were returned.</p>}
                            </div>
                        </section>
                        <RecommendationCard recommendation={analysis.recommendation} />
                        <section className="panel evidence-panel">
                            <h2><ShieldAlert size={18} /> Evidence</h2>
                            {analysis.evidence?.length ? <ul className="evidence-list">{analysis.evidence.map((item, index) => (
                                <li key={`${item.title}-${index}`}><strong>{item.title}</strong><p>{item.description}</p><span>{item.source}</span></li>
                            ))}</ul> : <p>No evidence was returned.</p>}
                        </section>
                        <ApprovalPanel action={analysis.action} onApprove={() => handleDecision('approved')} onReject={() => handleDecision('rejected')} busy={savingDecision} />
                        <MemoryRecall memories={analysis.memories} />
                    </div>
                ) : (
                    <section className="analysis-empty">
                        <span className="analysis-empty-icon"><Brain size={23} /></span>
                        <div><h2>Analysis not run</h2><p>Run the incident agent to review hypotheses, evidence, runbook guidance, and related history.</p></div>
                        <button className="button button-primary" onClick={runAnalysis} disabled={analyzing}><Play size={16} /> {analyzing ? 'Analyzing…' : 'Run analysis'}</button>
                    </section>
                )}
            </main>
            {editOpen && (
                <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && !savingEdit && setEditOpen(false)}>
                    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="edit-incident-title">
                        <div className="modal-heading">
                            <div><p className="eyebrow">INCIDENT / {incident.id || incident.incident_id}</p><h2 id="edit-incident-title">Edit details</h2></div>
                            <button className="icon-button" type="button" onClick={() => setEditOpen(false)} disabled={savingEdit} aria-label="Close dialog"><X size={19} /></button>
                        </div>
                        <form className="incident-form" onSubmit={handleEditSave}>
                            <label>Incident title<input autoFocus required maxLength={140} value={editForm.title} onChange={(event) => setEditForm({ ...editForm, title: event.target.value })} /></label>
                            <label>Description<textarea required rows={4} value={editForm.description} onChange={(event) => setEditForm({ ...editForm, description: event.target.value })} /></label>
                            <label>Severity<select value={editForm.severity} onChange={(event) => setEditForm({ ...editForm, severity: event.target.value })}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option></select></label>
                            {error && <div className="alert error" role="alert">{error}</div>}
                            <div className="modal-actions">
                                <button type="button" className="button button-secondary" onClick={() => setEditOpen(false)} disabled={savingEdit}>Cancel</button>
                                <button type="submit" className="button button-primary" disabled={savingEdit}><Save size={16} /> {savingEdit ? 'Saving…' : 'Save changes'}</button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </div>
    );
}

export default IncidentDetails;
