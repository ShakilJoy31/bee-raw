import axios from 'axios';

import {
  BASE_URL,
  placedOrderAPIForAdmin,
  productDeleteByAdmin,
  productPostingAPI,
} from '@/constants/routeConstants';

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


  const handleGettingOrders = async () => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL
      });
    try {
      const response = await axiosInstance.get(placedOrderAPIForAdmin);
      console.log(response);
      return response.data;
    } catch (error) {
        console.log(error)
    }
  };

  

  const handleDeletingOrder = async (orderId) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL
    });

    try {
        const response = await axiosInstance.delete(`${productDeleteByAdmin}${orderId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

  

  export const AdminAPI = {
    // handleGettingRestaurants,
    postingProducts,
    handleGettingOrders,
    handleDeletingOrder
  }

