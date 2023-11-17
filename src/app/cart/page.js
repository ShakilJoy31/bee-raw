"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';
import { IoTrashBin } from 'react-icons/io5';

import Button from '@/Components/button';
import Divider from '@/Components/Divider';
// import { CustomerAPI } from '@/redux/sagas/customerAPI';
import EmptyCartComponent from '@/Components/EmptyCartComponent';

import { UserStore } from '../../../userStore';

const Page = () => {
    const { user, setUser } = UserStore.useContainer()
    const [cartItem, setCartItem] = useState(null);
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("beeRawCart"))) {
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
    const [productToDelete, setProductToDelete] = useState('');

    const handleDeleteFromCart = () =>{
        const restProduct = cartItem.filter((item, index) => item?._id !== productToDelete);
        console.log(restProduct);
        if(restProduct.length === 0){
            setCartItem(null);
        }else{
            setCartItem(restProduct);
        }
        localStorage.setItem("beeRawCart", JSON.stringify(restProduct));
        setUser(restProduct);
        document.getElementById('deleteProductFromCart').close();
    }
    // setUser(cartItem);
    return (
        <div>
            {
                cartItem !== null ? <div className='min-h-screen text-white'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <span onClick={() => router.back()} className='hover:cursor-pointer'>
                                <BsArrowLeft color={'black'}></BsArrowLeft>
                            </span>
                            <p className='text-black ml-[16px]'>Cart</p>
                        </div>
                    </div>


                    {

                        cartItem?.map((item, index) => <div key={index}>
                            <div className={`lg:flex md:flex grid items-center justify-between`}>
                                <div className='flex items-center'>
                                    <img onClick={() => router.push(`/products/${item._id}`)} style={{ borderRadius: '8px' }} className='lg:w-[250px] lg:h-[200px] md:w-[200px] md:h-[170px] w-[170px] h-[145px]' src={item.productPicture[0]} alt="" />
                                    <div className='ml-[24px]'>
                                        <h1 onClick={() => router.push(`/products/${item._id}`)} className='font-bold mb-[8px] mr-[8px] lg:text-2xl md:text-xl'>{item.title}</h1>

                                        <div className='flex items-center w-full gap-x-3'>
                                                <p style={{ textDecoration: 'line-through' }} className='text-slate-400' onClick={() => {
                                                    router.push(`/products/${item._id}`)
                                                }}>{parseFloat(item.offerPrice) * parseFloat(item.quantity)} ৳</p>

                                                <p onClick={() => {
                                                    router.push(`/products/${item._id}`)
                                                }}>{parseFloat(item.price) * parseFloat(item.quantity)} ৳</p>
                                            </div>
                                        
                                        {/* For mobile... */}
                                        <div className='block lg:hidden md:hidden mt-[8px]'>
                                            <div>
                                                <div className='flex items-center justify-evenly bg-slate-500 rounded-sm w-[125px] text-white hover:cursor-pointer'>
                                                    <p onClick={() => quantityDecrease(item)}><span className=''>-</span></p>
                                                    <p>|</p>
                                                    <p>{item.quantity}</p>
                                                    <p>|</p>
                                                    <p onClick={() => quantityIncrease(item)}><span className=''>+</span></p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* For Computer... */}
                                <div className='hidden lg:flex md:flex justify-end h-full'>
                                    <div className=''>
                                        <div className='flex items-center justify-evenly bg-slate-500 rounded-sm w-[125px] text-white hover:cursor-pointer'>
                                            <p onClick={() => quantityDecrease(item)}><span className=''>-</span></p>
                                            <p>|</p>
                                            <p>{item.quantity}</p>
                                            <p>|</p>
                                            <p onClick={() => quantityIncrease(item)}><span className=''>+</span></p>
                                        </div>
                                        <span onClick={()=> {
                                            document.getElementById('deleteProductFromCart')?.showModal();
                                            setProductToDelete(item?._id)
                                        }} className='flex justify-center mt-[10px] hover:cursor-pointer hover:text-white'><IoTrashBin size={25} color={'red'} /></span>
                                    </div>

                                </div>
                            </div>
                            {
                                index + 1 === cartItem?.length ? '' : <div className='mb-4'>
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
                    <div className='lg:hidden md:hidden items-center justify-center grid my-[25px]'>
                        <div onClick={() => {
                            localStorage.removeItem('beeRawCart')
                            setCartItem(null);
                            setUser(null)
                        }} className='mb-[25px]'>
                            <Button background='#DC3545' width='94vw'><span className='text-white'>Empty Cart</span></Button>
                        </div>

                        <div onClick={() => router.push('/checkout')}>
                            <Button background={'#9F5AE5'} width='94vw'><span className='text-white'>Checkout</span></Button>
                        </div>

                    </div>


                    <div className='lg:flex md:flex items-center justify-end hidden gap-x-[48px] pb-[66px] mt-[48px]'>
                        <div onClick={() => {
                            localStorage.removeItem('beeRawCart')
                            setCartItem(null);
                            setUser(null)
                        }}>
                            <Button background='#DC3545' width='250px'><span className='text-white'>Empty Cart</span></Button>
                        </div>

                        <div onClick={() => router.push('/checkout')}>
                            <Button background={'#9F5AE5'} width='250px'><span className='text-white'>Checkout</span></Button>
                        </div>

                    </div>

                    <dialog id="deleteProductFromCart" className="modal" style={{ maxWidth: '480px', transform: 'translateX(-50%)', left: '50%' }}>
                <div style={{
                    color: 'white',
                    background: '#DC3545',
                    border: '1px solid white'
                }} className="modal-box">
                    <h3 className="flex justify-center text-white">এই বাইঞ্চোদ, প্রোডাক্ট কিন্তু ডিলেট হয়ে যাবে।</h3>

                    <div className='flex justify-between items-center my-[10px] gap-x-2'>
                    
                    <div onClick={()=>{
                        document.getElementById('deleteProductFromCart').close();
                    }}>
                        <Button background='green' width='150px'><div className='flex justify-around px-3 items-center'><span className='text-white'>এই না না</span></div></Button>
                    </div>

                    <div onClick={handleDeleteFromCart} className=''>
                        <Button background={'#9F5AE5'} width='150px'><div className='flex justify-around px-3 items-center'><span className='text-white'>আচ্ছা হোক</span></div> </Button>
                    </div>
                </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>


                </div> : <div className='min-h-screen text-black mx-[48px]'>
                    <EmptyCartComponent></EmptyCartComponent>
                </div>
            }
        </div>

    );
};

export default Page;