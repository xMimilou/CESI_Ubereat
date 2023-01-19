import axios from "axios";

export async function fetchRestaurants() {
  try {
    const response = await axios.get("http://localhost:5050/api/restorer/restaurants");
    let restaurants = response.data;
    return restaurants;
  } catch (error) {
    console.error(error);
  }
}
