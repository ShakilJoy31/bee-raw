"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
// import { CustomerAPI } from '@/redux/sagas/customerAPI';
import EmptyCartComponent from '@/Components/EmptyCartComponent';
import Divider from '@/Components/Divider';
import Button from '@/Components/button';
import { UserStore } from '../../../userStore';

const Page = () => {
  const { user, setUser } = UserStore.useContainer();
  let totalPrice;
  if(user?.length < 2){
    totalPrice = user[0].price;
  }else{
    totalPrice = user?.reduce((total, cart) => total + (parseFloat(cart.price) * parseFloat(cart.quantity)), 0);
  }
const router = useRouter();
console.log(user);
    return (
        <div>
                <div className='min-h-screen mx-[48px] text-white'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center py-[24px]'>
                    <span onClick={() => router.back()} className='hover:cursor-pointer'>
                        <BsArrowLeft color={'black'}></BsArrowLeft>
                    </span>
                    <p className='text-black ml-[16px]'>Cart</p>
                </div>

                
                    <div onClick={() => router.back()}>
                    <Button background={'#9F5AE5'} width='300px'><span className='text-white'>Order Extra Item</span></Button>
                </div>
                
                </div>
                
    
                <div className='mt-[48px] flex justify-end'>

                    <div>
      <h1 style={{ fontSize: '16px' }} className='font-bold mb-[8px]'>Pre-Order Summary</h1>
      <div className='flex items-center justify-between'>
        <h1>Item total</h1>
        <p>{totalPrice}</p>
      </div>

      <div className='flex items-center justify-between my-[8px]'>
                            <h1>Delevary Charge: </h1>
                            <p className='ml-2'>60-120 Taka</p>
                        </div>
    </div>
                </div>
    
                
                <div className='flex items-center justify-center gap-x-[48px] pb-[66px] mt-[48px]'>
                    <div>
                        <Button background='#DC3545' width='250px'><span className='text-white'>Cancel</span></Button>
                    </div>
    
                    <div>
                        <Button background={'#9F5AE5'} width='300px'><span className='text-white'>Place Order</span></Button>
                    </div>
                    
                </div>
    
            </div>
        </div>
        
    );
};

export default Page;


// {/* <dialog id="alReadyExistsOnTheCartModal" className="modal" style={{ maxWidth: '480px', transform: 'translateX(-50%)', left: '50%' }}>
//                                     <div style={{
//                                         color: 'white',
//                                         background: '#DC3545',
//                                         border: '1px solid white'
//                                     }} className="modal-box">
//                                         <h3 className="flex justify-center text-white">Item already added!</h3>

//                                     </div>
//                                     <form method="dialog" className="modal-backdrop">
//                                         <button>close</button>
//                                     </form>
//                                 </dialog> */}