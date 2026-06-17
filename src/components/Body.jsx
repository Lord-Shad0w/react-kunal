import RestaurantCard from "./RestaurantCard";
import { useState } from "react";
import Location from "./Location";

const FilterProduct = ({ restaurants, setFilteredRes }) => (
  <div className="filter-container">
    <button
      className="filter-btn"
      onClick={() => {
        const topRatedRestaurants = restaurants.filter(
          (res) => Number(res?.info?.avgRating) >= 4.3,
        );
        setFilteredRes(topRatedRestaurants);
      }}
      type="button"
    >
      Top Rated
    </button>
  </div>
);

const SearchProduct = ({ restaurants, setFilteredRes }) => {
  const [searchRes, setSearchRes] = useState("");

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-res"
        placeholder="Search restaurant"
        value={searchRes}
        onChange={(e) => setSearchRes(e.target.value)}
      />
      <button
        className="search-btn"
        type="button"
        onClick={() => {
          const filteredLists = searchRes.trim()
            ? restaurants.filter((res) =>
                res?.info?.name.toLowerCase().includes(searchRes.toLowerCase()),
              )
            : restaurants;
          setFilteredRes(filteredLists);
        }}
      >
        Search
      </button>
    </div>
  );
};

const Body = () => (
  <Location>
    {({
      restaurants,
      searchedRes,
      setSearchedRes,
      locationMessage,
      locationError,
      showLocationMessage,
      dataLoading,
    }) => (
      <>
        {!dataLoading && (
          <>
            <div className="controls-row">
              <div className="filter-search-container">
                <SearchProduct
                  restaurants={restaurants}
                  setFilteredRes={setSearchedRes}
                />
                <FilterProduct
                  restaurants={restaurants}
                  setFilteredRes={setSearchedRes}
                />
              </div>
              {showLocationMessage && (
                <div className="location-inline">
                  <p>{locationError || locationMessage}</p>
                </div>
              )}
            </div>
            <div className="res-container">
              {searchedRes.map((restaurant) => (
                <RestaurantCard key={restaurant.info.id} resData={restaurant} />
              ))}
            </div>
          </>
        )}
      </>
    )}
  </Location>
);

export default Body;
