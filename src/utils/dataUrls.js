const urls = {
    swiggyAssets: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/',
  swiggyApi: {
    baseUrlRestaurant: (lat = 18.5904779, lng = 73.7271909) =>
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
  }
}

export default urls;