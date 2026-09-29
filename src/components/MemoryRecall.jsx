import { History } from 'lucide-react';

function MemoryRecall({ memories = [] }) {
    return (
        <section className="panel">
            <h2><History size={18} /> Related Incidents</h2>
            {memories.length ? (
                <ul className="memory-list">
                    {memories.map((memory, index) => (
                        <li key={`${memory.incident_id || memory.title || 'memory'}-${index}`}>
                            <strong>{memory.title || memory.incident_id || 'Previous incident'}</strong>
                            <p>{memory.summary || memory.lesson || 'No historical notes available.'}</p>
                            {memory.outcome && <span>{memory.outcome}</span>}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No related incident history found.</p>
            )}
        </section>
    );
}

export default MemoryRecall;
