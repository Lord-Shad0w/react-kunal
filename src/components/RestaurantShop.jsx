import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { ShopShimmer } from "./ShimmerLoad";
import menuSvgLeft from "url:../../resources/svg/menushopsvgleft.svg";
import menuSvgRight from "url:../../resources/svg/menushopsvgright.svg";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantShop = () => {
  const [openCategoryId, setOpenCategoryId] = useState(new Set());
  const { resId } = useParams();
  const scrollRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(true);

  const {
    restInfo,
    couponDetails,
    menus,
    orgMenu,
    shopDetails,
    selectedFilter,
    setSelectedFilter,
  } = useRestaurantMenu(resId);

  const toggle = (id) => {
    setOpenCategoryId((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const checkScrollPosition = () => {
    const el = scrollRef.current;
    if (!el) return;
    setScrollLeft(el.scrollLeft > 0);
    setScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmt = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -scrollAmt : scrollAmt,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (menus?.length > 0 && openCategoryId.size === 0) {
      setOpenCategoryId(new Set([menus[0].categoryId]));
    }
  }, [menus]);

  useEffect(() => checkScrollPosition(), [couponDetails]);

  if (shopDetails === null) return <ShopShimmer />;

  return (
    <div className="restaurant-main-page">
      <div className="rest-name">
        <h2 className="restaurant-name">{restInfo.resName}</h2>
      </div>
      <div className="res-infos">
        <div className="res-info-box">
          <div className="res-info-content">
            <div className="rating-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="greenGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#48c479" />
                    <stop offset="100%" stopColor="#2d9e57" />
                  </linearGradient>
                </defs>
                <circle cx="10" cy="10" r="9" fill="url(#greenGrad)" />
                <polygon
                  points="10,4 11.5,8 16,8 12.5,10.5 13.8,15 10,12.5 6.2,15 7.5,10.5 4,8 8.5,8"
                  fill="white"
                />
              </svg>
            </div>
            <div className="shop-rating">{`${restInfo.avgRating}(${restInfo.totalRatings})`}</div>
            <div className="dot-separator">•</div>
            <div className="cost-for-two">{restInfo.costForTwo}</div>
          </div>
          <div className="cusines-type margin-cmn">
            {restInfo.cuisines.join(", ")}
          </div>
          <div className="location">
            <div className="road-bullets margin-cmn">
              <div className="circle-start-end"></div>
              <div className="straight-map"></div>
              <div className="circle-start-end"></div>
            </div>
            <div className="destination">
              <div className="outlet-loc">{restInfo.outlet}</div>
              <div className="distance-time">{restInfo.maxMinTime}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="offers-container">
        <div className="offers-header">
          <div className="offer-title">
            <h3>Deals for you</h3>
          </div>
          <div className="nav-btns-container">
            <button
              aria-label="click here to move previous"
              className="left-arrow"
              onClick={() => scroll("left")}
              disabled={!scrollLeft}
            >
              &#8592;
            </button>
            <button
              aria-label="click here to move next"
              className="right-arrow"
              onClick={() => scroll("right")}
              disabled={!scrollRight}
            >
              &#8594;
            </button>
          </div>
        </div>
        <div className="row" ref={scrollRef} onScroll={checkScrollPosition}>
          {couponDetails.map((coupon) => (
            <div className="coupons-info-box" key={coupon.id}>
              <div className="coupon-info margin-cmn">{coupon.header}</div>
              <div className="coupon-code margin-cmn">
                {coupon.couponCode || coupon.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="menu-text">
        <div className="menu-svg-left">
          <img src={menuSvgLeft} alt="Menu left decoration" />
        </div>
        <div>MENU</div>
        <div className="menu-sv-right">
          <img src={menuSvgRight} alt="Menu right decoration" />
        </div>
      </div>
      <div className="food-filter-container">
        <div className="food-filter-toggle">
          <span
            className={`food-filter-label ${selectedFilter === "veg" ? "selected" : "unselected"}`}
          >
            Veg
          </span>
          <div className="filter-slider" role="group" aria-label="Food filter">
            <span className="slider-line"></span>
            <button
              type="button"
              className={`slider-dot veg-dot ${selectedFilter === "veg" ? "active" : ""}`}
              onClick={() => {
                setSelectedFilter("veg");
              }}
              aria-label="Select veg filter"
              aria-pressed={selectedFilter === "veg"}
            />
            <button
              type="button"
              className={`slider-dot none-dot ${selectedFilter === "none" ? "active" : ""}`}
              onClick={() => setSelectedFilter("none")}
              aria-label="Select no filter"
              aria-pressed={selectedFilter === "none"}
            />
            <button
              type="button"
              className={`slider-dot nonveg-dot ${selectedFilter === "nonveg" ? "active" : ""}`}
              onClick={() => setSelectedFilter("nonveg")}
              aria-label="Select non-veg filter"
              aria-pressed={selectedFilter === "nonveg"}
            />
          </div>
          <span
            className={`food-filter-label ${selectedFilter === "nonveg" ? "selected" : "unselected"}`}
          >
            Non-Veg
          </span>
        </div>
      </div>
      {menus.map((menu) => {
        const isOpen = openCategoryId.has(menu.categoryId);

        return (
          <div className="food-menu-container" key={menu.categoryId}>
            <div className="food-menu-section">
              <button
                className="section-name"
                onClick={() => toggle(menu.categoryId)}
              >
                <h3>{menu.title.trim()}</h3>
                <div
                  className={`menu-arrow ${isOpen ? "menu-expanded" : "menu-collapsed"}`}
                >
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/material-outlined/24/expand-arrow.png"
                    alt="collapse-arrow"
                  />
                </div>
              </button>
              <div
                className={
                  "food-items-rows" +
                  " " +
                  (isOpen ? "menu-expanded" : "menu-collapsed") +
                  "-items"
                }
              >
                <div className="inner">
                  {menu.itemCards.map((food, index) => (
                    <div key={food.id}>
                      <div className={"food-item-row" + index + 1}>
                        <div>
                          <div className="food-name">{food.itemName}</div>
                          <div className="food-price">₹{food.price}</div>
                          <div className="food-ratings">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                id="Layer_1"
                                viewBox="0 0 501.986 501.986"
                                xmlSpace="preserve"
                                width="14px"
                                height="14px"
                                fill="#000000"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <g>
                                    {" "}
                                    <g>
                                      {" "}
                                      <path
                                        style={{ fill: "#3cfbe5" }}
                                        d="M287.442,42.472l42.984,87.096c5.921,11.997,17.365,20.312,30.604,22.235l96.116,13.966 c33.339,4.844,46.651,45.815,22.527,69.331l-69.55,67.795c-9.58,9.338-13.951,22.792-11.69,35.978l16.419,95.728 c5.695,33.204-29.157,58.526-58.976,42.849l-85.969-45.196c-11.841-6.225-25.988-6.225-37.829,0l-85.969,45.196 c-29.819,15.677-64.671-9.644-58.976-42.849l16.419-95.728c2.261-13.185-2.11-26.639-11.69-35.978L22.312,235.1 C-1.812,211.585,11.5,170.614,44.839,165.77l96.116-13.966c13.239-1.924,24.684-10.239,30.604-22.235l42.984-87.096 C229.454,12.262,272.533,12.262,287.442,42.472z"
                                      ></path>{" "}
                                      <path d="M374.839,492.172c-8.05,0-16.139-1.941-23.616-5.872l-85.969-45.196c-8.931-4.694-19.593-4.693-28.521,0L150.764,486.3 c-17.189,9.037-37.628,7.56-53.338-3.855C81.715,471.03,73.995,452.05,77.277,432.91l16.419-95.728 c1.705-9.944-1.59-20.084-8.813-27.126l-69.551-67.794C1.426,228.707-3.484,208.813,2.517,190.343 c6-18.469,21.667-31.677,40.885-34.469l96.115-13.967c9.984-1.451,18.61-7.718,23.075-16.765l42.984-87.096 c8.595-17.414,25.998-28.232,45.417-28.232s36.822,10.818,45.417,28.232l0,0l42.984,87.096 c4.465,9.047,13.091,15.314,23.075,16.765l96.115,13.967c19.218,2.792,34.885,16,40.885,34.469 c6.001,18.469,1.091,38.363-12.815,51.918l-69.55,67.794c-7.225,7.042-10.52,17.183-8.814,27.127l16.419,95.727 c3.282,19.14-4.438,38.121-20.148,49.535C395.685,488.895,385.295,492.172,374.839,492.172z M250.993,417.582 c8.096,0,16.188,1.939,23.567,5.819l85.969,45.196c10.559,5.551,22.625,4.679,32.275-2.333s14.208-18.217,12.191-29.974 l-16.419-95.728c-2.817-16.434,2.628-33.192,14.567-44.829l69.549-67.794c8.543-8.327,11.442-20.071,7.756-31.417 c-3.687-11.345-12.935-19.142-24.739-20.857l-96.117-13.967c-16.499-2.397-30.754-12.755-38.134-27.706l-42.984-87.096 c-5.279-10.697-15.553-17.083-27.481-17.083c-11.929,0-22.202,6.386-27.481,17.083l-42.984,87.096 c-7.38,14.951-21.635,25.308-38.134,27.706l-96.116,13.967c-11.806,1.715-21.054,9.513-24.74,20.857 c-3.687,11.345-0.787,23.09,7.756,31.416l69.55,67.794c11.938,11.637,17.384,28.396,14.566,44.829L96.99,436.291 c-2.017,11.757,2.541,22.962,12.191,29.974c9.651,7.012,21.717,7.884,32.275,2.333l85.969-45.196 C234.804,419.522,242.899,417.582,250.993,417.582z"></path>{" "}
                                    </g>{" "}
                                    <g>
                                      {" "}
                                      <path d="M231.978,103.014c-1.486,0-2.994-0.333-4.418-1.035c-4.952-2.444-6.985-8.44-4.542-13.393l8.559-17.342 c2.444-4.953,8.438-6.988,13.394-4.542c4.952,2.444,6.985,8.44,4.542,13.393l-8.559,17.342 C239.211,100.966,235.664,103.014,231.978,103.014z"></path>{" "}
                                    </g>{" "}
                                    <g>
                                      {" "}
                                      <path d="M145.668,198.093c-4.887,0-9.16-3.585-9.884-8.563c-0.794-5.465,2.993-10.54,8.458-11.334 c23.306-3.387,43.441-18.017,53.863-39.134l9.612-19.476c2.443-4.953,8.44-6.986,13.394-4.542 c4.952,2.444,6.985,8.44,4.542,13.393l-9.612,19.476c-13.337,27.021-39.102,45.741-68.922,50.075 C146.632,198.059,146.147,198.093,145.668,198.093z"></path>{" "}
                                    </g>{" "}
                                  </g>{" "}
                                </g>
                              </svg>
                            </div>
                            4.0 (263)
                          </div>
                          <div className="food-description">
                            {food.description}
                          </div>
                        </div>
                        <div className="food-img-container">
                          {food.imageId && (
                            <img
                              src={
                                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                                food.imageId
                              }
                              alt=""
                              className="food-img"
                            />
                          )}
                        </div>
                      </div>
                      <div className="item-row-border"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantShop;
