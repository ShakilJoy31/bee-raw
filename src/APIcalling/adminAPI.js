import { BASE_URL, productPostingAPI } from "@/constants/routeConstants";
import axios from "axios";

  // Post request...
  const postingProducts = async (payload) => {
    console.log(payload);
    const axiosInstance = axios.create({
      baseURL: BASE_URL,
    });
  
    try {
      const response = await axiosInstance.post(productPostingAPI, payload);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  

  export const AdminAPI = {
    // handleGettingRestaurants,
    postingProducts
  }