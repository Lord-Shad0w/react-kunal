import { useState } from "react";
import {shopShimmer} from "./ShimmerLoad";

const RestaurantShop = () => {
  const [shopDetails, setShopDetails] = useState(null);

  if (shopDetails === null) return <Shimmer />;

  return (
    <div className="restaurant-main-page">
      <h2 className="restaurant-name">Restaurant Name</h2>
      <div className="offers-container">Offers</div>
      <div className="menu-text"></div>
      <div className="food-filter-container"></div>
      <div className="food-menu-container">
        <div className="food-menu-section">
          <div className="food-items">
            <div className="food-name"></div>
            <div className="food-price"></div>
            <div className="ratings"></div>
            <div className="description"></div>
            <div className="food-img-container">
              <img src="" alt="" className="food-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
