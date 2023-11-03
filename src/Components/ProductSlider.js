"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
} from 'react-icons/bs';

import Button from './button';

const ProductSlider = ({individualProduct}) => {
    const router = useRouter();
    const [previewImage, setPreviewImage] = useState('');
    useEffect(()=>{
        setPreviewImage(individualProduct?.productPicture[0])
    },[individualProduct?.productPicture[0]])
    const handleReviewImage = (picture) =>{
        setPreviewImage(picture)
    }
    return (
        <div>
            <div className='text-white mt-[25px]'>
                <div className='lg:flex'>
                    <div>
                        <div className='flex items-center w-[350px]'>
                            <div style={{ zIndex: '1' }} className='mr-[-12.5px]'><span><BsArrowLeftCircleFill color='red' size={25}></BsArrowLeftCircleFill></span></div>

                            <img className='h-[280px] w-full rounded-lg' src={previewImage} />

                            <div style={{ zIndex: '1' }} className='ml-[-12.5px]'><span><BsArrowRightCircleFill color='red' size={25}></BsArrowRightCircleFill></span></div>
                        </div>

                        <div className='grid grid-cols-4 gap-2 mt-[25px] ml-[12.5px]'>
                            {
                                individualProduct?.productPicture.map((picture, index)=> <img onClick={()=>handleReviewImage(picture)} key={index} className='w-[70px] h-[55px] rounded-lg' src={picture} />)
                            }
                        </div>
                    </div>


                    {/* Information part........ */}
                    <div className='ml-[12px]'>
                        <h1 className='text-3xl font-bold mb-[12px]'>{individualProduct?.title}</h1>
                        <p style={{height: '120px', overflowY: 'scroll'}}>{individualProduct?.description}</p>
                        <p className='mt-[12px]'>Price: {individualProduct?.price}</p>
                        <p className='mt-[12px]'>Color: {individualProduct?.price}</p>
                    </div>
                </div>

                <div className='flex items-center justify-center lg:justify-end md:justify-end gap-x-[48px] pb-[66px] mt-[48px]'>
                    <div onClick={() => {
                        router.push('/products')
                    }}>
                        <Button background='#DC3545' width='150px'><span className='text-white'>Cancel</span></Button>
                    </div>

                    <div onClick={()=> router.push('/checkout')}>
                        <Button background={'#9F5AE5'} width='150px'><span className='text-white'>Checkout</span></Button>
                    </div>

                </div>
            </div>
        </div>);
};

export default ProductSlider;