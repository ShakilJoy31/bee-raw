import axios from 'axios';

import {
  BASE_URL,
  categorizedProductsAPI,
  placedOrderAPI,
  productsGettingAPI,
} from '@/constants/routeConstants';

// Fetching caterized products.....
const getCategorizedProductsForCustomer = async () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    const response = await axiosInstance.get(categorizedProductsAPI);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};



// Fetching specific products.....
const handleGettingProducts = async (pageNumber, category) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });

  try {
    let apiUrl = `${BASE_URL}${productsGettingAPI}?page=${pageNumber}`;
    if (category) {
      apiUrl += `&category=${JSON.stringify([{ category }])}`;
    }
    const response = await axiosInstance.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log(error);
    // You might want to throw the error or handle it accordingly
  }
};

const handleGettingProduct = async (productId) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });

  try {
    const response = await axiosInstance.get(`/get-product/${productId}`);
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
    return response.data;
  } catch (error) {
    console.log(error)
  }
};


export const CustomerAPI = {
  handleGettingProducts,
  userInformationForPlacOrderProduct,
  handleGettingProduct,
  getCategorizedProductsForCustomer
}
