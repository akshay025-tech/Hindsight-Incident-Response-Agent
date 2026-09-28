import { Clock } from "lucide-react";

function Timeline({ timeline }) {
  return (
    <section className="panel timeline-panel">

      <div className="section-title">
        <Clock size={20} />
        <h2>Incident Timeline</h2>
      </div>

      <div className="timeline">

        {timeline.map((event, index) => (

          <div
            className="timeline-item"
            key={index}
          >

            <div className="timeline-dot"></div>

            <div className="timeline-content">

              <span>
                {event.timestamp}
              </span>

              <strong>
                {event.title}
              </strong>

              <p>
                {event.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Timeline;