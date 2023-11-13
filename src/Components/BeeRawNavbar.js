"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { BsMinecartLoaded } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { LuMenu } from 'react-icons/lu';
import { MdSupportAgent } from 'react-icons/md';

import { CustomerAPI } from '@/APIcalling/customerAPI';
// import { SlMenu } from 'react-icons/si';
import { verificationFieldsRound } from '@/constants/speceing';

import MyServiceCSS from '../../style/MyServiceCSS.module.css';
import {
  ProductsStore,
  UserStore,
} from '../../userStore';
import CustomerSidebar from '../Components/CustomerSidebar';

const Page = () => {
  // Next work
  const { user, setUser } = UserStore.useContainer();
  const {products, setProducts} = ProductsStore.useContainer();
  const [data, setData] = useState([]);
  useEffect(()=>{
    CustomerAPI.handleGettingProducts().then(res => {
      setData(res)
      setProducts(res)
    });
  },[])
  console.log(products);
  const router = useRouter();
  const handleCartFromNavbar = () => {
    if (JSON.parse(localStorage.getItem('beeRawCartSingle'))) {
      localStorage.removeItem('addedProduct');
      localStorage.removeItem('beeRawCartSingle');
    }
    router.push('/cart')
  }
  const [cartItem, setCartItem] = useState(0);
    useEffect(() => {
        if(user?.length === 0){
            setCartItem((JSON.parse(localStorage.getItem("beeRawCart")))?.length)
        }else{
          setCartItem(user?.length)
        }
      }, [user]);


      const handleSearchProducts = (theValue) => {
        const foundProducts = data.filter((product, index) => (product.title).toLowerCase().match(theValue));
        if(!theValue){
          setProducts(data);
      }
      else{
          setProducts(foundProducts);
      }
      }

    return (
        <div>
                <div className="lg:flex md:flex justify-between items-center lg:pt-[24px] md:pt-[18px] pt-0">
                  {/* For mobile user */}
                  <div className='flex items-center lg:hidden md:hidden w-full justify-between mb-2'>

                    <div>
                      <div className="drawer">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                          <label htmlFor="my-drawer" className="drawer-button"><span className='hover:cursor-pointer'><LuMenu color={'white'} size={25}></LuMenu></span></label>
                        </div>
                        <div style={{ zIndex: '2' }} className="drawer-side">
                          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                          <CustomerSidebar></CustomerSidebar>
                        </div>
                      </div>
                    </div>

                    <div>
                      <img onClick={() => router.push('/products')} className="block mx-auto hover:cursor-pointer w-[180px] h-[60px]" src='https://i.ibb.co/X4wqGHL/IMG-20231028-225506-1-removebg-preview.png' alt="" />
                    </div>

                    <span className=''>
                      <IoMdNotificationsOutline
                        color={'white'}
                        size={30}
                      ></IoMdNotificationsOutline>
                    </span>

                    <span className=''>
                      <MdSupportAgent
                        color={'white'}
                        size={30}
                      ></MdSupportAgent>
                    </span>

                    <div className="indicator hover:cursor-pointer">
                        <span style={{
                          background: 'purple',
                          borderRadius: '50%',
                          fontSize: '12px'
                        }} className="px-[6px] text-white indicator-item">{cartItem === 0 ? '' : cartItem}</span>
                      <span onClick={handleCartFromNavbar} className='hover:cursor-pointer'><BsMinecartLoaded color={'white'}
                        size={25}></BsMinecartLoaded></span>
                    </div>

                  </div>

                  <div className={`flex items-center ${MyServiceCSS.tableRoomInput} w-full lg:w-[450px]`}>
                    <span className="mx-3">
                      <BiSearch color={'purple'} size={25}></BiSearch>
                    </span>
                    <input onChange={(e)=> handleSearchProducts(e.target.value)}
                      style={{
                        borderRadius: verificationFieldsRound,
                        background: 'white',
                      }}
                      placeholder="Type product title here"
                      className="w-full h-[35px] focus:outline-none border-0 pl-1 text-black"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>

                  <div className="lg:flex items-center hidden">

                    <div className="indicator hover:cursor-pointer">
                        <span style={{
                          background: 'purple',
                          borderRadius: '50%',
                          fontSize: '12px'
                        }} className="px-[6px] text-white indicator-item">{cartItem === 0 ? '' : cartItem}</span>
                      <span onClick={handleCartFromNavbar} className='hover:cursor-pointer'><BsMinecartLoaded color={'white'}
                        size={25}></BsMinecartLoaded></span>
                    </div>

                    <span className='mx-[24px]'>
                      <IoMdNotificationsOutline
                        color={'white'}
                        size={30}
                      ></IoMdNotificationsOutline>
                    </span>
                    <i style={{ color: 'white', fontFamily: 'monospace' }} className='text-xl'>Be Raw, Buy Raw</i>

                  </div>
                </div>
              </div>
    );
};

export default Page;