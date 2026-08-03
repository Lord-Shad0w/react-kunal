import { useState, useEffect } from "react";
import urls from "../utils/dataUrls";
import { getCurrentCoordinates } from "../components/Location";

const useRestaurantMenu = (resId) => {
  const [shopDetails, setShopDetails] = useState(null);
  const [restInfo, setRestInfo] = useState(null);
  const [couponDetails, setCouponDetails] = useState(null);
  const [menus, setMenus] = useState(null);
  const [orgMenu, setOrgMenu] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("none");

  const fetchData = async () => {
    const { lat, lng } = await getCurrentCoordinates();
    const responseMenu = await fetch(urls.swiggyApi.restUrl(lat, lng, resId));
    const shopData = await responseMenu.json();
    const processedInfo = await shopData.data.cards[2]?.card.card.info;
    const processedOffer =
      await shopData.data.cards[3]?.card?.card?.gridElements?.infoWithStyle
        .offers;
    const menusData =
      await shopData.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    const finalMenu = menusData
      .filter((item) => {
        const card = item.card.card;
        return card.title !== undefined && card.itemCards !== undefined;
      })
      .map((item) => {
        const card = item.card.card;
        return {
          title: card.title,
          categoryId: card.categoryId,
          itemCards: card.itemCards.map((itemCard) => {
            const info = itemCard?.card?.info;
            return {
              id: info?.id,
              itemName: info?.name,
              description: (info?.description || " No Description").replace(
                /\u00A0/g,
                " ",
              ),
              imageId: info?.imageId,
              isVeg: info?.itemAttribute.vegClassifier,
              price: Math.round(
                Number(info?.defaultPrice || info?.finalPrice || info?.price) /
                  100,
              ),
              rating: info?.ratings.aggregatedRating.rating,
              totalRating: info?.ratings.aggregatedRating.ratingCountV2,
            };
          }),
        };
      });
    setRestInfo({
      resName: processedInfo?.name,
      avgRating: processedInfo?.avgRatingString,
      totalRatings: processedInfo?.totalRatingsString,
      costForTwo: processedInfo?.costForTwoMessage,
      cuisines: processedInfo?.cuisines,
      outlet: processedInfo?.areaName,
      maxMinTime: processedInfo?.sla?.slaString.toLowerCase(),
    });
    setCouponDetails(
      processedOffer.map((offer) => {
        return {
          id: offer.info.offerIds[0],
          header: offer.info.header,
          couponCode: offer.info.couponCode,
          description: offer.info.description,
          offerLogo: offer.info.offerLogo,
        };
      }),
    );
    setMenus(finalMenu);
    setShopDetails(processedInfo);
    setOrgMenu(finalMenu);
  };

  const filterByType = () => {
    if (!orgMenu) return;
    if (selectedFilter === "none") {
      setMenus(orgMenu);
      return;
    }
    const targetType = selectedFilter === "veg" ? "VEG" : "NONVEG";
    setMenus(
      orgMenu
        .map((category) => ({
          ...category,
          itemCards: category.itemCards.filter(
            (food) => food.isVeg === targetType,
          ),
        }))
        .filter((category) => category.itemCards.length > 0),
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => filterByType(), [selectedFilter]);

  return {
    restInfo,
    couponDetails,
    menus,
    orgMenu,
    shopDetails,
    selectedFilter,
    setSelectedFilter,
  };
};

export default useRestaurantMenu;
