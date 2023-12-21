"use client"
import React, { useState } from 'react';

import {
  usePathname,
  useRouter,
} from 'next/navigation';
import {
  BsDashCircleDotted,
  BsFan,
  BsFillCalculatorFill,
  BsFillSpeakerFill,
  BsSunglasses,
  BsWatch,
} from 'react-icons/bs';
import {
  FaFan,
  FaGift,
  FaMosque,
} from 'react-icons/fa';
import { GiLoincloth } from 'react-icons/gi';
import {
  ImCross,
  ImHeadphones,
} from 'react-icons/im';
import {
  MdLuggage,
  MdMapsHomeWork,
  MdSell,
} from 'react-icons/md';
import { PiTelevisionDuotone } from 'react-icons/pi';

import DashboardCSS from '../../style/Dashboard.module.css';
import MyServiceCSS from '../../style/MyServiceCSS.module.css';
import { BlurForSafety } from '../../userStore';

const CustomerSidebar = ({ drawer }) => {
    const { isModalOpen, setIsModalOpen } = BlurForSafety.useContainer();
    const router = useRouter();
    const pathname = usePathname();
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
  const handleHomeImage = () => {
    setIsBackgroundActive(true);
    router.push('/products')
    setTimeout(() => {
      setIsBackgroundActive(false);
    }, 3000);
  };

    return (
        <div style={{ background: 'black', filter: `${(isModalOpen && (pathname === '/admin' || pathname === '/admin/user-order')) ? 'blur(3px)' : ''}`}} className={`h-full w-[300px] md:w-[310px] lg:w-[320px]`}>
            <div style={{ overflow: 'hidden' }} className={`h-full text-white ${DashboardCSS.customerSidebar} ${DashboardCSS.sidebarBackground}`}>
                <div className={`flex items-center justify-around w-full ${isBackgroundActive ? MyServiceCSS.homeImage : ''}`}>
                    <img onClick={handleHomeImage} style={{ width: '150px', height: '100px' }} className={`lg:block lg:mx-auto md:block md:mx-auto py-[
                    6px] hover:cursor-pointer`} src='https://i.ibb.co/grM5C0K/IMG-20230923-145307-1-removebg-preview.png
                    ' alt="" />

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <span className='block lg:hidden md:hidden'>
                            {drawer}
                            <ImCross color={'white'} size={25} />
                        </span>
                    </label>
                </div>

                <div className={`${DashboardCSS.content} pb-8`} style={{ overflowY: 'scroll', height: '90vh' }}>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div style={{ paddingTop: '4px', paddingBottom: '4px', paddingLeft: '16px' }} onClick={() => router.push('/products/best-seller')}
                            className={`flex items-center gap-x-4 mx-[24px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/best-seller' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <span><MdSell size={25} color={'green'}></MdSell></span>
                            <p>Top Sold Products</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/smart-watch')}
                            className={``}>
                            <div className={`flex items-center mx-[24px] pl-[16px] py-[4px] gap-x-4 ${DashboardCSS.sidebarHeading} ${pathname === '/products/smart-watch' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                                <span><BsWatch size={25}></BsWatch></span>
                                <p className="">Smart Watch</p>
                            </div>
                        </div>

                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                            <div onClick={() => router.push('/products/home&living')}
                                className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/home&living' ? DashboardCSS.sidebarHeadingSelected : ''}`}
                            >
                                
                                <span><MdMapsHomeWork size={25}></MdMapsHomeWork></span>
                                <p>Home & Living</p>
                            </div>
                        </label>

                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/headphone')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/headphone' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <span><ImHeadphones size={25}></ImHeadphones></span>
                            <p>Earbud & Headphone</p>
                        </div>
                    </label>

                        <div onClick={() => router.push('/products/camera')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/camera' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <span><BsFillSpeakerFill size={25}></BsFillSpeakerFill></span>
                            <p>Camera</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/islamic-accessiories')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/islamic-accessiories' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <span><FaMosque size={25}></FaMosque ></span>
                            <p>Islamic Accessiories</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/gift-item')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/gift-item' ? DashboardCSS.sidebarHeadingSelected : ''}`}
                        >
                            <span><FaGift size={25}></FaGift></span>
                            <p>Gift Items</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/electronics')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/electronics' ? DashboardCSS.sidebarHeadingSelected : ''}`}
                        >
                            <span><PiTelevisionDuotone size={27}></PiTelevisionDuotone></span>
                            <p>Electronics</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/accessories')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/accessories' ? DashboardCSS.sidebarHeadingSelected : ''}`}
                        >
                            <span><BsFan size={25}></BsFan></span>
                            <p>Accessories</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/speaker')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/speaker' ? DashboardCSS.sidebarHeadingSelected : ''}`}
                        >
                            <span><BsFillSpeakerFill size={25}></BsFillSpeakerFill></span>
                            <p>Speaker</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/rgb-light')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/rgb-light' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <span><BsDashCircleDotted size={25}></BsDashCircleDotted></span>
                            <p>RGB Light</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/fan')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/fan' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <span><FaFan size={25}></FaFan></span>
                            <p>Fan</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/trimer')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/trimer' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <img style={{ width: '28px', height: '28px' }} src="https://i.ibb.co/ChpPqSy/clipper-icon-white-vector-16108954-removebg-preview.png" className='w-[28px] h-[28px]' alt="" />
                            <p>Trimer</p>
                        </div>
                    </label>

                    {/* <div
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/best-seller' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                        <span><BsRouterFill size={25}></BsRouterFill></span>
                        <p>Green Screen</p>
                    </div> */}

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/calculator')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/calculator' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <span><BsFillCalculatorFill size={25}></BsFillCalculatorFill></span>
                            <p>Calculator</p>
                        </div>
                    </label>

                    

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/bags-luggage')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/bags-luggage' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <span><MdLuggage size={25}></MdLuggage></span>
                            <p>Bags & Luggage</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/sun-glass')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/sun-glass' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <span><BsSunglasses size={25}></BsSunglasses></span>
                            <p>Sun Glass</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/clothing')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/clothing' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <span><GiLoincloth size={25}></GiLoincloth></span>
                            <p>Clothing</p>
                        </div>
                    </label>
                    

                </div>
            </div>
        </div>
    );
};

export default CustomerSidebar;