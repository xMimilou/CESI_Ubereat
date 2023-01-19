import axios from "axios";

export async function fetchRestaurants() {
  try {
    const response = await axios.get("http://localhost:3002/restorer/restaurants");
    let restaurants = response.data;
    return restaurants;
  } catch (error) {
    console.error(error);
  }
}
