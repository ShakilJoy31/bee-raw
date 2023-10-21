import { BASE_URL, productsGettingAPI } from "@/constants/routeConstants";
import axios from "axios";

const handleGettingProducts = async () => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL
      });
    try {
      const response = await axiosInstance.get(productsGettingAPI);
      console.log(response);
      return response.data;
    } catch (error) {
        console.log(error)
    }
  };


  export const CustomerAPI = {
    handleGettingProducts
  }
