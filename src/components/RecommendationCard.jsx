import { Zap } from 'lucide-react';

function RecommendationCard({ recommendation }) {
    const details = typeof recommendation === 'string'
        ? { description: recommendation }
        : recommendation;

    return (
        <section className="panel">
            <h2><Zap size={18} /> Recommendation</h2>
            {details ? (
                <div>
                    <h3>{details.title || 'Immediate Response'}</h3>
                    <p>{details.description || details.action || 'No recommendation details available.'}</p>
                    {details.expected_impact && <p><strong>Expected impact:</strong> {details.expected_impact}</p>}
                    {details.risk && <p><strong>Risk:</strong> {details.risk}</p>}
                    {details.rollback && <p><strong>Rollback:</strong> {details.rollback}</p>}
                </div>
            ) : (
                <p>No recommendation available.</p>
            )}
        </section>
    );
}

export default RecommendationCard;
