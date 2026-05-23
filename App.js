import React from "react";
import ReactDOM from "react-dom/client";
const { resLists } = require("./restaurantData");
/**
 * Header
 *    - Logo
 *     - Nav Items(Home, About, Cart)
 * Body
 *    - Search Bar
 *    -Restaurant Container
 *      - Restaurant Card(Details in Notepad++)
 * Footer
 *    -Copyright
 *    - Links
 *    - Address
 *    - Contact
 */

const Logo = () => {
  const logoImg = require("url:./resources/logo/delLogo.png");
  return <img className="logo-img" src={logoImg} alt="DeliveryLogo" />;
};

const ResImg = ({ id }) => (
  <img
    className="res-img"
    src={
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
      id
    }
    alt="RestaurantImage"
  />
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
            src={require("url:./resources/starIcon.png")}
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

const NavItems = () => (
  <ul className="nav-items-list">
    <li>Home</li>
    <li>About</li>
    <li>Cart</li>
    <li>Support</li>
  </ul>
);

const HeaderComponent = () => (
  <div className="header">
    <div className="logo">
      <Logo />
    </div>
    <div className="nav-items">
      <NavItems />
    </div>
  </div>
);
const SearchProduct = () => (
  <div className="search-container">Search for restaurants or dishes</div>
);
const RestaurantCard = (props) => {
  const { info } = props?.resData;
  return (
    <div className="res-card">
      <ResImg id={info.cloudinaryImageId} />
      <ResDetails resData={info} />
    </div>
  );
};

const Body = () => (
  <>
    <SearchProduct />
    <div className="res-container">
      {resLists.map((restaurant) => (
        <RestaurantCard resData={restaurant} />
      ))}
    </div>
  </>
);

const AppLayout = () => (
  <>
    <header>
      <div className="main-header">{HeaderComponent()}</div>
    </header>
    <main>
      <Body />
    </main>
  </>
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
