"use client"
import React from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/Components/button';

import DashboardCSS from '../../../../style/Dashboard.module.css';
import {
  ProductsStore,
  UserStore,
} from '../../../../userStore';

const Page = () => {
    const router = useRouter();
    const { user, setUser } = UserStore.useContainer();
    const { products, setProducts } = ProductsStore.useContainer();
    const filteredproducts = products.filter(product => product.category[0].category === 'Accessories');
    return (
        <div>
            <h1 className='my-2'> <svg className="gradient-text text-3xl font-bold" width="100%" height="38" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'crimson' }} />
                        <stop offset="50%" style={{ stopColor: '#00ff00' }} />
                        <stop offset="100%" style={{ stopColor: 'rgb(28,97,231)' }} />
                    </linearGradient>
                </defs>
                <text x="50%" y="30" fill="url(#gradient)" textAnchor="middle">Headphones</text>
            </svg></h1>
            {
                filteredproducts?.length < 1 ? <div className='w-full min-h-screen flex justify-center items-center'>
                    <div>
                        <span style={{ color: 'crimson' }} className="loading loading-infinity w-[250px] h-[150px] "></span>
                        <p style={{ fontFamily: 'Lucida Sans Unicode' }} className='text-white flex justify-center items-center'>Loading. Please wait...</p>
                    </div>
                </div> : <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[24px] my-6 w-full' style={{ overflow: 'hidden' }}>

                    {
                        filteredproducts?.map((product, index) => <div style={{
                            borderRadius: '0 8px 0 8px'
                        }} key={index} className={`w-full hover:cursor-pointer ${DashboardCSS.imageContainer}`}>
                            <div style={{ position: 'absolute', top: '0', zIndex: '1' }} className='flex justify-between w-full'>
                                <div>
                                    <img className='h-full' src="https://i.ibb.co/XYxDz3W/Rectangle-223.png" alt="" />
                                    <p style={{ position: 'absolute', top: '20px', transform: 'rotate(-45deg)' }}>{product?.offer}% off</p>
                                </div>
                            </div>
                            <div onClick={() => {
                                {
                                    router.push(`/products/${product._id}`)
                                    localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                                }
                                localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                            }} className={`${DashboardCSS.imageContainer}`}>
                                <figure><img src={product?.productPicture[0]} alt="Product Image" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '0 8px 0 0' }} /></figure>
                            </div>

                            <div className=''>
                                <div className='mt-1'>
                                    <div className="px-1">
                                        <h2 onClick={() => {
                                            router.push(`/products/${product._id}`)
                                            localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                                        }} className="hover:text-black h-[100px] lg:h-[75px]">{product.title.slice(0, 70)}</h2>
                                        <div className="flex justify-between items-center">
                                            <div className='flex justify-between items-center w-full'>
                                                <p style={{ textDecoration: 'line-through' }} className='text-slate-400 mb-1' onClick={() => {
                                                    router.push(`/products/${product._id}`)
                                                    localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                                                }}>{product.offerPrice} ৳</p>

                                                <p onClick={() => {
                                                    router.push(`/products/${product._id}`)
                                                    localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                                                }}>{product.price} ৳</p>
                                            </div>
                                        </div>
                                        <button style={{ background: 'rgb(28,97,231)' }} onClick={() => handleBuyNowButton(product)} className="btn border-0 btn-sm my-1 w-full text-white normal-case">Buy Now</button>
                                    </div>


                                    <div onClick={() => handleItemAddToCart(product)} className=''>
                                        <Button background={'rgb(28,97,231)'} width='100%' borderRadius='0 8px 0 8px'><span className='text-white'>Add to cart</span></Button>

                                    </div>
                                </div>
                            </div>

                        </div>)
                    }
                </div>
            }
        </div>
    );
};

export default Page;