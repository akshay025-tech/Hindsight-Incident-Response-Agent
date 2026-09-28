import {
  Lightbulb,
  CheckCircle
} from "lucide-react";

import ConfidenceMeter from "./ConfidenceMeter";

function HypothesisCard({ hypotheses }) {
  return (
    <section className="panel">

      <div className="section-title">
        <Lightbulb size={20} />
        <h2>Agent Hypotheses</h2>
      </div>

      {hypotheses.length === 0 ? (

        <div className="empty-state">
          Run AI analysis to generate hypotheses.
        </div>

      ) : (

        <div className="hypothesis-list">

          {hypotheses.map((hypothesis, index) => (

            <div
              className="hypothesis-card"
              key={index}
            >

              <div className="hypothesis-top">

                <div>
                  <strong>
                    {hypothesis.title}
                  </strong>

                  <p>
                    {hypothesis.description}
                  </p>
                </div>

                {hypothesis.validated && (
                  <CheckCircle
                    size={20}
                    className="success-icon"
                  />
                )}

              </div>

              <ConfidenceMeter
                value={hypothesis.confidence}
              />

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default HypothesisCard;