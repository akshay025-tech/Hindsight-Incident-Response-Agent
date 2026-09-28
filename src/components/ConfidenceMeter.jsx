function ConfidenceMeter({ value = 0 }) {
  const percentage = Math.round(value * 100);

  return (
    <div className="confidence-container">

      <div className="confidence-label">
        <span>Confidence</span>
        <strong>{percentage}%</strong>
      </div>

      <div className="confidence-bar">

        <div
          className="confidence-fill"
          style={{
            width: `${percentage}%`
          }}
        />

      </div>

    </div>
  );
}

export default ConfidenceMeter;