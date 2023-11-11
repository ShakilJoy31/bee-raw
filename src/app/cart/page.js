"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';

import Button from '@/Components/button';
import Divider from '@/Components/Divider';
// import { CustomerAPI } from '@/redux/sagas/customerAPI';
import EmptyCartComponent from '@/Components/EmptyCartComponent';

import { UserStore } from '../../../userStore';

const Page = () => {
  const { user, setUser } = UserStore.useContainer()
    const [cartItem, setCartItem] = useState(null); 
    useEffect(() => {
        if(JSON.parse(localStorage.getItem("beeRawCart"))){
            setCartItem((JSON.parse(localStorage.getItem("beeRawCart"))))
        }
      }, []);
    
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [confirm, setConfirm] = useState(false); 
    
    // Working for the quantity...
    const quantityIncrease = (targetMenu) => {
        const updatedCart = cartItem.map((item) => {
          if (item._id === targetMenu._id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        });
        localStorage.setItem("beeRawCart", JSON.stringify(updatedCart));
        setCartItem(updatedCart);
      };
      
      const quantityDecrease = (targetMenu) => {
        const updatedCart = cartItem.map((item) => {
          if (item._id === targetMenu._id && item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          } else {
            return item;
          }
        });
        localStorage.setItem("beeRawCart", JSON.stringify(updatedCart));
        setCartItem(updatedCart);
      };
const totalPrice = cartItem?.reduce((total, cart) => total + (parseFloat(cart.price) * parseFloat(cart.quantity)), 0);

      const [orderDuplicateError, setOrderDuplicateError] = useState('');
    //   const handlePlaceOrderButton = () =>{
    //     const userId = (JSON.parse(localStorage.getItem("loggedInUser"))).data.data.user._id;
    //     const token = (JSON.parse(localStorage.getItem("loggedInUser")).headers.token)
    //     const itemsAccordingToCart = cartItem.map((item) => {
    //         return {
    //           name: item.name,
    //           description: item.description,
    //           businessId: item.businessId,
    //           itemId: item._id,
    //           quantity: item.serving[0].quantity,
    //           servingName: "Tbl1"
    //         };
    //       })
    //     const placeOrderData = {
    //         items: itemsAccordingToCart,
    //         service: {
    //             serviceType:"TABLE",
    //             serviceId: "64fb0ca38ce17739e4492346"
    //         },
    //           businessId: cartItem[0].businessId,
    //             date: date,
    //         time: time
    //       }
    //       CustomerAPI.placingOrder(userId, token, placeOrderData).then((res) => {
    //         if (res.data) {
    //             localStorage.setItem("placedOrderRes", JSON.stringify(res));
    //             setWarning(true)
    //             document.getElementById('alreadyBookedModal').showModal();
    //             setOrderDuplicateError('Congratulations! Table booked.');
    //         }else{
    //             setWarning(true)
    //             document.getElementById('alreadyBookedModal').showModal();
    //             setOrderDuplicateError(res.response.data.error.message); 
    //         }
    //     })
    //   }
    setUser(cartItem);
    return (
        <div>
            {
                cartItem ? <div className='min-h-screen text-white'>
                    <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                    <span onClick={() => router.back()} className='hover:cursor-pointer'>
                        <BsArrowLeft color={'black'}></BsArrowLeft>
                    </span>
                    <p className='text-black ml-[16px]'>Cart</p>
                </div>
                    </div>
                
    
                {
                
                cartItem?.map((item, index) => <div onClick={()=> router.push(`/products/${item._id}`)} key={index}>
                <div className={`lg:flex md:flex grid items-center justify-between`}>
                    <div className='flex items-center'>
                        <img style={{ borderRadius: '8px' }} className='lg:w-[250px] lg:h-[200px] md:w-[200px] md:h-[170px] w-[170px] h-[145px]' src={item.productPicture[0]} alt="" />
                        <div className='ml-[24px]'>
                            <h1 className='font-bold mb-[8px] mr-[8px] lg:text-2xl md:text-xl'>{item.title}</h1>
                            <p>{parseFloat(item.price) * parseFloat(item.quantity)}</p>

                            <div className='block lg:hidden md:hidden mt-[8px]'>
                        <div>
                        <div className='flex items-center justify-evenly bg-slate-500 rounded-sm w-[125px] text-white hover:cursor-pointer'>
                            <p onClick={()=>quantityDecrease(item)}><span className=''>-</span></p>
                            <p>|</p>
                            <p>{item.quantity}</p>
                            <p>|</p>
                            <p onClick={()=>quantityIncrease(item)}><span className=''>+</span></p>
                        </div>
                        </div>
                        
                    </div>
                        </div>
                    </div>
    
                    <div className='hidden lg:block md:block'>
                        <div className='flex justify-end'>
                        <div className='flex items-center justify-evenly bg-slate-500 rounded-sm w-[125px] text-white hover:cursor-pointer'>
                            <p onClick={()=>quantityDecrease(item)}><span className=''>-</span></p>
                            <p>|</p>
                            <p>{item.quantity}</p>
                            <p>|</p>
                            <p onClick={()=>quantityIncrease(item)}><span className=''>+</span></p>
                        </div>
                        </div>
                        
                    </div>
                </div>
               {
                index + 1 === cartItem?.length ? '' :  <div className='mb-4'>
                <Divider color={'rgba(18, 18, 18, 0.15)'}></Divider>
            </div>
               }
    
            </div>)
                
                }
                
    
                {/* Any Suggestion */}
                <div className='mt-[48px]'>
                    <h1 style={{ fontSize: '16px' }} className='font-bold mb-[8px]'>Any Suggestion</h1>

                    <input style={{
                        borderRadius: '8px',
                        border: '1px solid rgba(18, 18, 18, 0.16)',
                        background: 'rgba(229, 229, 229, 0.40)'
                    }} placeholder="যেমন: ঠিকানায় পৌছানোর ৫ মিনিট আগে একটা নক দিয়েন" className="w-full focus:outline-none py-[8px] pl-2" ></input>
                </div>
    
                {/* Promo code and order calculation */}
                <div className='mt-[48px] flex lg:justify-end md:justify-end'>
                    

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
    
                {/* Empty cart and add date time button */}
                <div className='lg:hidden md:hidden items-center justify-center grid my-[12px]'>
                    <div onClick={()=> {
                        localStorage.removeItem('beeRawCart')
                        setCartItem(null);
                    }} className='mb-[10px]'>
                        <Button background='#DC3545' width='94vw'><span className='text-white'>Empty Cart</span></Button>
                    </div>
    
                    <div onClick={()=> router.push('/checkout')}>
                        <Button background={'#9F5AE5'} width='94vw'><span className='text-white'>Checkout</span></Button>
                    </div>
                    
                </div>


                <div className='lg:flex md:flex items-center justify-end hidden gap-x-[48px] pb-[66px] mt-[48px]'>
                    <div onClick={()=> {
                        localStorage.removeItem('beeRawCart')
                        setCartItem(null);
                    }}>
                        <Button background='#DC3545' width='250px'><span className='text-white'>Empty Cart</span></Button>
                    </div>
    
                    <div onClick={()=> router.push('/checkout')}>
                        <Button background={'#9F5AE5'} width='250px'><span className='text-white'>Checkout</span></Button>
                    </div>
                    
                </div>
    
            </div> : <div className='min-h-screen text-black mx-[48px]'>
                <EmptyCartComponent></EmptyCartComponent>
            </div>
            }
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