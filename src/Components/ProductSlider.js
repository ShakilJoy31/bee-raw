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
                        <div style={{width: '350px'}} className='flex items-center'>
                            <div style={{ zIndex: '1', marginRight: '-12.5px' }}><span><BsArrowLeftCircleFill color='red' size={25}></BsArrowLeftCircleFill></span></div>

                            <img className='h-[280px] w-full rounded-lg' src={previewImage} />

                            <div style={{ zIndex: '1', marginLeft:'-12.5px' }}><span><BsArrowRightCircleFill color='red' size={25}></BsArrowRightCircleFill></span></div>
                        </div>

                        <div style={{marginTop: '25px', marginLeft: '12.5px'}} className='grid grid-cols-4 gap-2'>
                            {
                                individualProduct?.productPicture.map((picture, index)=> <img style={{width: '70px', height: '55px'}} onClick={()=>handleReviewImage(picture)} key={index} className='rounded-lg' src={picture} />)
                            }
                        </div>
                    </div>


                    {/* Information part........ */}
                    <div style={{marginLeft: '12px'}}>
                        <h1 style={{marginBottom: '12px', fontSize: '1.875rem', fontWeight: '800'}}>{individualProduct?.title}</h1>
                        <p style={{height: '120px', overflowY: 'scroll'}}>{individualProduct?.description}</p>
                        <p style={{marginTop: '12px'}}>Price: {individualProduct?.price}</p>
                        <p style={{marginTop: '12px'}}>Color: {individualProduct?.price}</p>
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