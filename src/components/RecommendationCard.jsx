import {
  Zap,
  RotateCcw
} from "lucide-react";

function RecommendationCard({ recommendation }) {
  if (!recommendation) {
    return (
      <section className="panel">

        <div className="section-title">
          <Zap size={20} />
          <h2>Recommended Action</h2>
        </div>

        <div className="empty-state">
          Run analysis to generate a recommendation.
        </div>

      </section>
    );
  }

  return (
    <section className="panel recommendation-panel">

      <div className="section-title">
        <Zap size={20} />
        <h2>Recommended Action</h2>
      </div>

      <div className="recommendation">

        <h3>
          {recommendation.title}
        </h3>

        <p>
          {recommendation.description}
        </p>

        <div className="recommendation-details">

          <div>
            <span>Expected Impact</span>
            <strong>
              {recommendation.expected_impact}
            </strong>
          </div>

          <div>
            <span>Risk</span>
            <strong>
              {recommendation.risk}
            </strong>
          </div>

        </div>

        <div className="rollback">

          <RotateCcw size={16} />

          <div>
            <strong>Rollback Plan</strong>

            <p>
              {recommendation.rollback}
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default RecommendationCard;