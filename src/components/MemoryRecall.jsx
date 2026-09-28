import {
  Brain,
  History
} from "lucide-react";

function MemoryRecall({ memories }) {
  return (
    <section className="panel memory-panel">

      <div className="panel-header">

        <div className="section-title">
          <Brain size={20} />
          <h2>Memory Recall</h2>
        </div>

        <span className="memory-badge">
          Hindsight
        </span>

      </div>

      {memories.length === 0 ? (

        <div className="empty-state">
          No related historical incidents recalled yet.
        </div>

      ) : (

        <div className="memory-list">

          {memories.map((memory, index) => (

            <div className="memory-card" key={index}>

              <div className="memory-icon">
                <History size={18} />
              </div>

              <div className="memory-content">

                <strong>
                  {memory.title}
                </strong>

                <p>
                  {memory.summary}
                </p>

                <div className="memory-footer">

                  <span>
                    Similarity:
                    {" "}
                    {Math.round(
                      memory.similarity * 100
                    )}
                    %
                  </span>

                  <span>
                    Outcome:
                    {" "}
                    {memory.outcome}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default MemoryRecall;