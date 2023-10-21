"use client"
import React, { useEffect, useState } from 'react';
import MyServiceCSS from "../../../style/MyServiceCSS.module.css";
import { border4px, verificationFieldsRound } from '../../constants/speceing';
import { blackColor, userInputBackground, userNameColor } from '../../constants/color-constants';
import { BiSearch } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { errorFont, userImageBorder } from '../../constants/font-constants';
import { user } from '../../constants/image-constants';
import { AiFillStar, AiOutlineDown } from 'react-icons/ai';
import { HiOutlineMicrophone } from 'react-icons/hi';
import { BsArrowLeft, BsMinecartLoaded } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { CustomerAPI } from '@/APIcalling/customerAPI';

const Page = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        CustomerAPI.handleGettingProducts().then(res => setProducts(res));
    },[])
    console.log(products); 
    return (
        <div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[24px] my-6 w-full' style={{ overflow: 'hidden' }}>
                
                {
                    products?.map((product, index) => <div key={index} className="card w-full glass">
                    <figure><img src={product.productPicture[0]} alt="car!"/></figure>
                    <div className="p-4">
                      <h2 className="card-title mb-3">{product.title}</h2>
                      <div className="flex justify-between items-center">
                      <p>{product.price}</p>
                        <button className="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                    <div>
                    <button className="btn btn-outline btn-error w-full normal-case">Add to cart</button>
                    </div>
                  </div>)
                }
                
                
            </div>







            {/* Child will be replaced with this div..... */}
            {/* <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[24px] my-6 w-full' style={{ overflow: 'hidden' }}>
                
                {
                    products.map((product, index) => <div key={index} style={{position: 'relative'}} className='w-[180px] h-[165px]'>
                    <img className='w-full h-full' style={{borderRadius: '16px', filter: 'brightness(0.5)', webkitFilter: 'brightness(0.5)'}} src={product.productPicture[0]} alt="" />
                    <div className="w-[180px] h-[165px]">
                        <div style={{position: 'absolute', top: '1px'}} className='flex justify-between w-full'>
                            <div>
                                <img className='h-full' src="https://i.ibb.co/XYxDz3W/Rectangle-223.png" alt="" />
                                <p style={{position: 'absolute', top:'20px', transform: 'rotate(-45deg)'}}>20% off</p>
                            </div>

                            <div className='mr-[24px] mt-[24px]'>
                                <div style={{width: '16px', height: '16px', background: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <div style={{width: '10px', height: '10px', background: 'green', borderRadius: '50%',}}></div>
                                </div>
                            </div>
                        </div>

                        <div style={{position: 'absolute', bottom: '24px'}}>
                            <div className='pl-[24px] pr-[10px]'>
                                <div className='flex items-center'>
                                    <span><AiFillStar color={'yellow'}></AiFillStar></span>
                                    <span><AiFillStar color={'yellow'}></AiFillStar></span>
                                    <span><AiFillStar color={'yellow'}></AiFillStar></span>
                                    <span><AiFillStar></AiFillStar></span>
                                    <span><AiFillStar></AiFillStar></span>
                                </div>
                                <h1 style={{ fontSize: '16px', color: 'white', marginTop: '8px' }}>Manokamana Food Restaurant</h1>
                            </div>
                        </div>
                    </div>
                </div>)
                }
                
                
            </div> */}
        </div>
    );
};

export default Page;