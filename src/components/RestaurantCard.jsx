import paths from "../utils/assetsPath";
import urls from "../utils/dataUrls";
import starIcon from "url:../../resources/starIcon.png";

const ResImg = ({ id }) => (
  <img className="res-img" src={urls.swiggyAssets + id} alt="RestaurantImage" />
);

const ResDetails = ({ resData }) => {
  const { name, cuisines, avgRatingString, sla, costForTwo } = resData;

  return (
    <div className="res-details">
      <h3 className="res-name">{name}</h3>
      <p className="res-cuisines">{cuisines.join(", ")}</p>
      <div className="res-info">
        <div className="res-rating-container">
          <img
            className="res-star"
            src={starIcon}
            alt="Star"
          />
          <span className="res-rating">{avgRatingString} </span>
        </div>
        <span className="res-delivery-time">{sla.slaString}</span>
      </div>
      <div className="res-cost">
        <span className="res-cost-for-two">{costForTwo}</span>
      </div>
    </div>
  );
};

const RestaurantCard = (props) => {
  const { info } = props?.resData;
  return (
    <div >
      <ResImg id={info.cloudinaryImageId} />
      <ResDetails resData={info} />
    </div>
  );
};

export default RestaurantCard;