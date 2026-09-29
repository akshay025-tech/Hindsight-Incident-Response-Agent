import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function IncidentFeed({ incidents = [], loading = false, emptyMessage = 'No incidents available.' }) {
    if (loading) return <div className="empty-state">Loading incidents...</div>;
    if (!incidents.length) return <div className="empty-state">{emptyMessage}</div>;

    return (
        <div className="incident-list">
            {incidents.map((incident) => {
                const id = incident.id || incident.incident_id;
                const severity = (incident.severity || 'medium').toLowerCase();
                const status = (incident.status || 'open').toLowerCase().replaceAll('_', ' ');
                return (
                    <Link key={id} to={`/incident/${id}`} className="incident-item">
                        <div className={`severity-marker severity-${severity}`}>
                            <AlertTriangle size={15} />
                            <span>{severity}</span>
                        </div>
                        <div className="incident-copy">
                            <div className="incident-title-line">
                                <h3>{incident.title || 'Untitled incident'}</h3>
                                <span className={`status-tag status-${status.replaceAll(' ', '-')}`}>{status}</span>
                            </div>
                            <p>{incident.description || 'No description provided.'}</p>
                        </div>
                        <span className="incident-id">
                            <span>{id || 'No ID'}</span>
                            {incident.updated_at && <small>Updated {new Date(incident.updated_at).toLocaleString()}</small>}
                        </span>
                        <span className="incident-arrow" aria-hidden="true"><ArrowRight size={17} /></span>
                    </Link>
                );
            })}
        </div>
    );
}

export default IncidentFeed;
