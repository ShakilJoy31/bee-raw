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

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const clickedFor = pathname.split("/")[pathname.split("/").length - 1];
  const [individualProduct, setIndividualProduct] = useState([]); 
  useEffect(() => {
    CustomerAPI.handleGettingProduct(clickedFor).then(res => setIndividualProduct(res));
  }, [])
  return (
    <div>
      <div className='text-white'>
        {
          individualProduct?.length < 1 ? <div className='w-full min-h-screen flex justify-center items-center'>
          <div>
          <span style={{color: 'purple'}} className="loading loading-infinity w-[250px] h-[150px] "></span>
        <p style={{fontFamily: 'Lucida Sans Unicode'}} className='text-white flex justify-center items-center'>Loading. Please wait...</p>
          </div>
        </div> : <ProductSlider individualProduct={individualProduct} setIndividualProduct={setIndividualProduct}></ProductSlider>
          // Cambria
          // Lucida Sans Unicode
        }
      </div>
    </div>);
};

export default Page;