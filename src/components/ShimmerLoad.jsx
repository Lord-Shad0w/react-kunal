const Shimmer = ({ locationMessage, locationError, showLocationMessage }) => {
  const cards = Array.from({ length: 10 });

  return (
    <div className="shimmer-container">
      <div className="shimmer-controls-row">
        <div className="shimmer-srch-filters">
          <div className="shimmer-srch-box"></div>
          <div className="shimmer-srch-btn"></div>
          <div className="shimmer-filter-btn"></div>
        </div>
        {showLocationMessage && (
          <div className="location-inline">
            <p>{locationError || locationMessage}</p>
          </div>
        )}
      </div>
      <div className="shimmer-container-res">
        {cards.map((_, index) => (
          <div className="shimmer-card"  key={index}>
            <div className="shimmer shimmer-img"></div>
            <div className="shimmer-details">
              <div className="shimmer shimmer-name"></div>
              <div className="shimmer shimmer-cuisines"></div>
              <div className="shimmer shimmer-ratings"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const shopShimmer = () => {
  return (
    <div></div>
  );
};

export default Shimmer;
