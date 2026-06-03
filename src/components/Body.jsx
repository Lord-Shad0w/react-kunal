import RestaurantCard from "./RestaurantCard";
const { resLists } = require("../../restaurantData");

const SearchProduct = () => (
  <div className="search-container">Search for restaurants or dishes</div>
);

const Body = () => (
  <>
    <SearchProduct />
    <div className="res-container">
      {resLists.map((restaurant) => (
        <RestaurantCard key={restaurant.info.id} resData={restaurant} /> //don't use index as key, use unique id from data. We can use as it won't give an error/warning but its not recommended as practice. It fails when we add new item in between and react gets confused.
      ))}
    </div>
  </>
);

export default Body;
