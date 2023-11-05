"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import {
  usePathname,
  useRouter,
} from 'next/navigation';

import { CustomerAPI } from '@/APIcalling/customerAPI';
import ProductSlider from '@/Components/ProductSlider';
import Spinner from '@/Components/Spinner';

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const clickedFor = pathname.split("/")[pathname.split("/").length - 1];
  const [individualProduct, setIndividualProduct] = useState([]); 
  useEffect(() => {
    CustomerAPI.handleGettingProduct(clickedFor).then(res => setIndividualProduct(res));
  }, [])
  //   let totalPrice;
  //   if(user.length < 2){
  //     totalPrice = user[0].price;
  //   }else{
  //     totalPrice = user?.reduce((total, cart) => total + (parseFloat(cart.price) * parseFloat(cart.quantity)), 0);
  //   }
  return (
    <div>
      <div className='text-white'>
        {/* <CenterMode></CenterMode> */}
        {/* <MySlider></MySlider> */}
        {
          individualProduct?.length < 1 ? <div className='flex justify-center items-center h-full'><Spinner></Spinner></div> : <ProductSlider individualProduct={individualProduct}></ProductSlider>
        }
      </div>
    </div>);
};

export default Page;