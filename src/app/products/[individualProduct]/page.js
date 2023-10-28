"use client"
import React from 'react';

import {
  usePathname,
  useRouter,
} from 'next/navigation';

const Page = () => {
    const pathname = usePathname();
    const clickedFor = pathname.split("/")[pathname.split("/").length - 1];
    //   let totalPrice;
    //   if(user.length < 2){
    //     totalPrice = user[0].price;
    //   }else{
    //     totalPrice = user?.reduce((total, cart) => total + (parseFloat(cart.price) * parseFloat(cart.quantity)), 0);
    //   }
    console.log(clickedFor);
    const router = useRouter();
    return (
        <div><div className='min-h-screen mx-[48px] text-white'></div></div>);
    };

export default Page;