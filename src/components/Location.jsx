import { useEffect, useRef, useState } from "react";
import urls from "../utils/dataUrls";
import Shimmer from "./ShimmerLoad";

const Location = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchedRes, setSearchedRes] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [locationMessage, setLocationMessage] = useState(
    "Getting your current location...",
  );
  const [locationError, setLocationError] = useState("");
  const [showLocationMessage, setShowLocationMessage] = useState(true);
  const messageTimer = useRef(null);

  const defaultLocation = {
    lat: 18.5904779,
    lng: 73.7271909,
  };

  const getLocationName = async (lat, lng) => {
    const endpoints = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

    try {
      const response = await fetch(endpoints);
      const data = await response.json();

      const city =
        data?.address?.city || data?.address?.town || data?.address?.village;
      const county =
        data?.address?.county ||
        data?.address?.state ||
        data?.principalSubdivision;
      const displayName =
        data?.display_name ||
        data?.city ||
        data?.locality ||
        data?.principalSubdivision;

      return city || county || displayName?.split(",")[0] || "your area";
    } catch (error) {
      console.warn("Reverse geocode failed for", url, error);
    }

    return "your area";
  };

  const hideLocationMessageAfterDelay = () => {
    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
    }

    messageTimer.current = setTimeout(() => {
      setShowLocationMessage(false);
    }, 5000);
  };

  const fetchRestaurant = async ({ lat, lng }) => {
    setDataLoading(true);
    setShowLocationMessage(true);
    setLocationMessage("Fetching restaurants near your location...");

    const locationName = await getLocationName(lat, lng);

    try {
      const resResponse = await fetch(
        urls.swiggyApi.baseUrlRestaurant(lat, lng),
      );
      const resLists = await resResponse.json();
      const restaurantList =
        resLists?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ?? [];

      setRestaurants(restaurantList);
      setSearchedRes(restaurantList);
      setLocationError("");
      setLocationMessage(`Showing restaurants near ${locationName}`);
      hideLocationMessageAfterDelay();
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setRestaurants([]);
      setSearchedRes([]);
      setLocationError("Could not fetch restaurants. Please try again later.");
      setLocationMessage(`Using default location (${locationName})`);
      hideLocationMessageAfterDelay();
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not available in this browser.");
      fetchRestaurant(defaultLocation);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchRestaurant({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Geolocation error:", error.message);
        setLocationError(
          "Could not access current location. Using default location.",
        );
        fetchRestaurant(defaultLocation);
      },
      {
        timeout: 10000,
        maximumAge: 600000,
        enableHighAccuracy: true,
      },
    );

    return () => {
      if (messageTimer.current) {
        clearTimeout(messageTimer.current);
      }
    };
  }, []);

  return (
    <>
      {children({
        restaurants,
        searchedRes,
        setSearchedRes,
        locationMessage,
        locationError,
        showLocationMessage,
        dataLoading,
      })}
      {dataLoading && (
        <Shimmer
          locationMessage={locationMessage}
          locationError={locationError}
          showLocationMessage={showLocationMessage}
        />
      )}
    </>
  );
};

export default Location;
