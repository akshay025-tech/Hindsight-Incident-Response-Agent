import { Brain } from 'lucide-react';

function HypothesisCard({ hypothesis }) {
    const confidence = Number(hypothesis?.confidence);
    const percent = Number.isFinite(confidence)
        ? Math.round(Math.max(0, Math.min(100, confidence <= 1 ? confidence * 100 : confidence)))
        : null;

    return (
        <article className="hypothesis-item">
            <div className="hypothesis-heading">
                <Brain size={16} />
                <strong>{hypothesis?.title || 'Likely cause'}</strong>
            </div>
            <p>{hypothesis?.description || 'No supporting details available.'}</p>
            {percent !== null && (
                <div className="confidence-row">
                    <div className="confidence-track" aria-label={`${percent}% confidence`}>
                        <span style={{ width: `${percent}%` }} />
                    </div>
                    <span>{percent}%</span>
                </div>
            )}
        </article>
    );
}

export default HypothesisCard;
