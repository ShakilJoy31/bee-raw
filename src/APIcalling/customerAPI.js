import axios from 'axios';

import {
  BASE_URL,
  placedOrderAPI,
  productsGettingAPI,
} from '@/constants/routeConstants';

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

  const handleGettingProduct = async (productId) => {
    const axiosInstance = axios.create({
      baseURL: BASE_URL
    });
  
    try {
      const response = await axiosInstance.get(`/get-product/${productId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  

const userInformationForPlacOrderProduct = async (payload) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL
      });
    try {
      const response = await axiosInstance.post(placedOrderAPI, payload);
      console.log(response);
      return response.data;
    } catch (error) {
        console.log(error)
    }
  };


  export const CustomerAPI = {
    handleGettingProducts,
    userInformationForPlacOrderProduct,
    handleGettingProduct
  }
