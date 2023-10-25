import React from 'react';

import { useRouter } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';

import {
  blackColor,
  tableBackground,
} from '@/constants/color-constants';

import Button from './button';

const EmptyCartComponent = () => {
    const router = useRouter();
    return (
        <div>
            <div className='flex items-center py-[24px]'>
                <span onClick={() => router.back()} className='hover:cursor-pointer'>
                    <BsArrowLeft color={blackColor}></BsArrowLeft>
                </span>
                <p className='text-black ml-[16px]'>Cart</p>
            </div>

            <div>
                <img className='block mx-auto' src="https://i.ibb.co/VMJJK6Y/undraw-empty-cart-co35-1.png" alt="" />
            </div>
            <p style={{fontSize: '24px'}} className='flex justify-center my-[75px] text-white'>Nothing in cart. Product added in the cart will be shown here.</p>
            <div onClick={()=> router.push('/products')} className='flex justify-center'>
            <Button background={tableBackground} width='300px'><span className='text-white'>Browse products</span></Button>
            </div>
        </div>
    );
};

export default EmptyCartComponent;