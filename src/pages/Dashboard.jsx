import { useMemo, useState } from 'react';
import { BellRing, Plus, RefreshCw, Search, X, Zap } from 'lucide-react';
import { createIncident, simulateIncident } from '../api/api';
import AppHeader from '../components/AppHeader';
import IncidentFeed from '../components/IncidentFeed';

function Dashboard({ incidents, loading, error, onRefresh, lastSyncedAt, newIncidents = [], onDismissNewIncidents }) {
    const [filter, setFilter] = useState('active');
    const [query, setQuery] = useState('');
    const [createOpen, setCreateOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [fetchingAlert, setFetchingAlert] = useState(false);
    const [createError, setCreateError] = useState('');
    const [form, setForm] = useState({ title: '', description: '', severity: 'medium', source: 'manual' });
    const counts = useMemo(() => {
        const total = incidents.length;
        const active = incidents.filter((item) => (item.status || '').toLowerCase() !== 'resolved').length;
        const resolved = total - active;
        return { total, active, resolved };
    }, [incidents]);
    const visibleIncidents = useMemo(() => {
        const search = query.trim().toLowerCase();
        return incidents.filter((incident) => {
            const resolved = (incident.status || '').toLowerCase() === 'resolved';
            const matchesFilter = filter === 'all' || (filter === 'resolved' ? resolved : !resolved);
            const matchesSearch = !search || [incident.title, incident.description, incident.id, incident.incident_id, incident.severity, incident.source]
                .some((value) => String(value || '').toLowerCase().includes(search));
            return matchesFilter && matchesSearch;
        }).sort((left, right) => {
            const leftUpdated = Date.parse(left.updated_at || left.created_at || '') || 0;
            const rightUpdated = Date.parse(right.updated_at || right.created_at || '') || 0;
            return rightUpdated - leftUpdated;
        });
    }, [filter, incidents, query]);

    const viewNewIncidents = () => {
        setFilter('all');
        setQuery('');
        onDismissNewIncidents?.();
    };

    const handleCreate = async (event) => {
        event.preventDefault();
        setCreating(true);
        setCreateError('');
        try {
            await createIncident(form);
            await onRefresh();
            setForm({ title: '', description: '', severity: 'medium', source: 'manual' });
            setCreateOpen(false);
            setFilter('active');
        } catch (createFailure) {
            setCreateError('Incident could not be created. Check the API connection and try again.');
        } finally {
            setCreating(false);
        }
    };

    const handleFetchAlert = async () => {
        setFetchingAlert(true);
        setCreateError('');
        try {
            await simulateIncident();
            setFilter('all');
            setQuery('');
            await onRefresh();
        } catch (fetchError) {
            setCreateError('Could not fetch a sample alert from the backend.');
        } finally {
            setFetchingAlert(false);
        }
    };

    return (
        <div className="app-frame">
            <AppHeader active="incidents" connection={loading ? 'checking' : error ? 'offline' : 'online'} />
            <main className="workspace">
                <header className="page-heading">
                    <div>
                        <p className="eyebrow">OPERATIONS / INCIDENTS</p>
                        <h1>Response overview</h1>
                        <p className="page-summary">Triage service events and coordinate a response.</p>
                    </div>
                    <div className="heading-actions">
                        <button className="button button-secondary" onClick={onRefresh} disabled={loading}>
                            <RefreshCw size={16} className={loading ? 'spin' : ''} /> Refresh
                        </button>
                        <button className="button button-secondary" onClick={handleFetchAlert} disabled={fetchingAlert}>
                            <Zap size={16} /> {fetchingAlert ? 'Fetching alert…' : 'Fetch sample alert'}
                        </button>
                        <button className="button button-primary" onClick={() => setCreateOpen(true)}>
                            <Plus size={17} /> New incident
                        </button>
                    </div>
                </header>

                {(error || createError) && <div className="alert error" role="alert">{createError || error}</div>}
                {newIncidents.length > 0 && (
                    <div className="new-incidents-banner" role="status">
                        <span className="new-incidents-message"><BellRing size={17} /> {newIncidents.length} new {newIncidents.length === 1 ? 'incident' : 'incidents'} received</span>
                        <div className="new-incidents-actions">
                            <button type="button" onClick={viewNewIncidents}>View new incidents</button>
                            <button type="button" className="icon-button" onClick={onDismissNewIncidents} aria-label="Dismiss new incident notice"><X size={16} /></button>
                        </div>
                    </div>
                )}

                <section className="metrics-strip" aria-label="Incident summary">
                    <div className="metric-cell metric-active">
                        <span className="metric-label">Active incidents</span>
                        <strong>{String(counts.active).padStart(2, '0')}</strong>
                        <span className="metric-note">Require attention</span>
                    </div>
                    <div className="metric-cell">
                        <span className="metric-label">Total tracked</span>
                        <strong>{String(counts.total).padStart(2, '0')}</strong>
                        <span className="metric-note">Across this workspace</span>
                    </div>
                    <div className="metric-cell metric-resolved">
                        <span className="metric-label">Resolved</span>
                        <strong>{String(counts.resolved).padStart(2, '0')}</strong>
                        <span className="metric-note">Closed incidents</span>
                    </div>
                </section>

                <section className="queue-section">
                    <div className="queue-toolbar">
                        <div className="queue-title">
                            <p className="eyebrow">TRIAGE QUEUE</p>
                            <h2>Incidents <span>{visibleIncidents.length}</span></h2>
                        </div>
                        <div className="queue-filters" role="group" aria-label="Filter incidents by status">
                            {[
                                ['all', 'All', counts.total],
                                ['active', 'Active', counts.active],
                                ['resolved', 'Resolved', counts.resolved],
                            ].map(([value, label, count]) => (
                                <button key={value} className={filter === value ? 'is-selected' : ''} aria-pressed={filter === value} onClick={() => setFilter(value)}>
                                    {label}<span>{count}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <label className="search-field">
                        <Search size={17} />
                        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search incidents, services, or IDs" aria-label="Search incidents" />
                        {query && <button type="button" className="icon-button" onClick={() => setQuery('')} aria-label="Clear search"><X size={16} /></button>}
                    </label>
                    <div className="queue-sync-line">
                        <span><i className="live-dot" /> Checks for new incidents every 15 seconds</span>
                        <span>{lastSyncedAt ? `Last checked ${lastSyncedAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}` : 'Connecting to incident feed…'}</span>
                    </div>
                    <IncidentFeed
                        incidents={visibleIncidents}
                        loading={loading}
                        emptyMessage={query ? 'No incidents match this search.' : `No ${filter === 'all' ? '' : `${filter} `}incidents.`}
                    />
                </section>
            </main>

            {createOpen && (
                <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && !creating && setCreateOpen(false)}>
                    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="create-title">
                        <div className="modal-heading">
                            <div><p className="eyebrow">MANUAL INTAKE</p><h2 id="create-title">New incident</h2></div>
                            <button className="icon-button" onClick={() => setCreateOpen(false)} disabled={creating} aria-label="Close dialog"><X size={19} /></button>
                        </div>
                        <form onSubmit={handleCreate} className="incident-form">
                            <label>Incident title<input autoFocus required maxLength={140} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Checkout latency elevated" /></label>
                            <label>Description<textarea required rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Describe the observed impact" /></label>
                            <div className="form-row">
                                <label>Severity<select value={form.severity} onChange={(event) => setForm({ ...form, severity: event.target.value })}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option></select></label>
                                <label>Source<input maxLength={80} value={form.source} onChange={(event) => setForm({ ...form, source: event.target.value })} /></label>
                            </div>
                            {createError && <div className="alert error" role="alert">{createError}</div>}
                            <div className="modal-actions">
                                <button type="button" className="button button-secondary" onClick={() => setCreateOpen(false)} disabled={creating}>Cancel</button>
                                <button type="submit" className="button button-primary" disabled={creating}>{creating ? 'Creating…' : 'Create incident'}</button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
