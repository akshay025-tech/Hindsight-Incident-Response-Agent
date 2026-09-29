import { useEffect, useRef, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import IncidentDetails from './pages/IncidentDetails';
import MemoryLibrary from './pages/MemoryLibrary';
import Postmortem from './pages/Postmortem';
import { getIncidents } from './api/api';

function App() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [lastSyncedAt, setLastSyncedAt] = useState(null);
    const [newIncidents, setNewIncidents] = useState([]);
    const knownIncidentIds = useRef(null);

    const loadIncidents = async (options = {}) => {
        const silent = options?.silent === true;
        if (!silent) setLoading(true);
        try {
            const data = await getIncidents();
            const previousIds = knownIncidentIds.current;
            if (previousIds) {
                const arrivals = data.filter((incident) => {
                    const incidentId = String(incident.id || incident.incident_id || '');
                    return incidentId && !previousIds.has(incidentId);
                });
                if (arrivals.length) {
                    setNewIncidents((current) => {
                        const combined = new Map(current.map((incident) => [String(incident.id || incident.incident_id), incident]));
                        arrivals.forEach((incident) => combined.set(String(incident.id || incident.incident_id), incident));
                        return [...combined.values()];
                    });
                }
            }
            knownIncidentIds.current = new Set(data.map((incident) => String(incident.id || incident.incident_id || '')).filter(Boolean));
            setIncidents(data);
            setLastSyncedAt(new Date());
            setError('');
        } catch (err) {
            setError('Could not load incidents from the API.');
        } finally {
            if (!silent) setLoading(false);
        }
    };

    useEffect(() => {
        void loadIncidents();
        const intervalId = window.setInterval(() => void loadIncidents({ silent: true }), 15000);
        return () => window.clearInterval(intervalId);
    }, []);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Dashboard
                        incidents={incidents}
                        loading={loading}
                        error={error}
                        onRefresh={loadIncidents}
                        lastSyncedAt={lastSyncedAt}
                        newIncidents={newIncidents}
                        onDismissNewIncidents={() => setNewIncidents([])}
                    />
                }
            />
            <Route
                path="/incident/:id"
                element={<IncidentDetails incidents={incidents} onRefresh={loadIncidents} />}
            />
            <Route path="/memory" element={<MemoryLibrary />} />
            <Route path="/postmortem/:id" element={<Postmortem />} />
            <Route
                path="*"
                element={
                    <div className="page-shell">
                        <div className="panel">
                            <h1>Page not found</h1>
                            <Link to="/" className="button primary">
                                Back to incidents
                            </Link>
                        </div>
                    </div>
                }
            />
        </Routes>
    );
}

export default App;
