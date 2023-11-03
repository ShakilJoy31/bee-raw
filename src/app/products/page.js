"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import { CustomerAPI } from '@/APIcalling/customerAPI';
import Spinner from '@/Components/Spinner';

import DashboardCSS from '../../../style/Dashboard.module.css';
import { UserStore } from '../../../userStore';

const Page = () => {
    const { user, setUser } = UserStore.useContainer()
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [warning, setWarning] = useState(false);
    useEffect(() => {
        CustomerAPI.handleGettingProducts().then(res => setProducts(res));
    }, [])

    setTimeout(function () {
        if (warning) {
            document.getElementById('alReadyExistsOnTheCartModal').close();
            setWarning(false);
        }
    }, 1800);

    const handleItemAddToCart = (clickedProduct) => {
        const newParticularMenu = clickedProduct;
        let cart = JSON.parse(localStorage.getItem("beeRawCart")) || [];
        const isAlreadyInCart = cart.find(item => item._id === clickedProduct._id);
        if (!isAlreadyInCart) {
            cart.push(newParticularMenu);
            localStorage.setItem("beeRawCart", JSON.stringify(cart));
            setUser(cart);
        } else {
            document.getElementById('alReadyExistsOnTheCartModal').showModal();
            setWarning(true)
        }
    }
    console.log(products);
    return (
        <div className='h-full'>
            {
                products?.length < 1 ? <div className='flex justify-center items-center h-full'><Spinner></Spinner></div> : <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[24px] my-6 w-full' style={{ overflow: 'hidden' }}>

                    {
                        products?.map((product, index) => <div style={{
                            borderRadius: '8px'
                        }} key={index} className={`w-full glass hover:cursor-pointer ${DashboardCSS.imageContainer}`}>
                            <div onClick={() => {
                                {
                                router.push(`/products/${product._id}`)
                                localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                            }
                                localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                            }} className={`${DashboardCSS.imageContainer}`}>
                                <figure><img src={product.productPicture[0]} alt="Product Image" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} /></figure>
                            </div>

                            <div className=''>
                                <div className='mt-4'>
                                    <div className="lg:px-4 px-1">
                                        <h2 onClick={() => {
                                router.push(`/products/${product._id}`)
                                localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                            }} className="h-16 hover:underline">{product.title}</h2>
                                        <div className="flex justify-between items-center py-4">
                                            <div className='grid'>
                                                <p style={{ textDecoration: 'line-through' }} className='text-xl text-slate-400 mb-1' onClick={() => {
                                router.push(`/products/${product._id}`)
                                localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                            }}>{product.price} ৳</p>

                                                <p className='text-xl' onClick={() => {
                                router.push(`/products/${product._id}`)
                                localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                            }}>{product.price} ৳</p>
                                            </div>

                                            <button onClick={() => {
                                                setUser([product]);
                                                router.push('/checkout');
                                                localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                                            }} className="btn btn-primary btn-sm lg:btn-md">Buy Now</button>
                                        </div>
                                    </div>


                                    <div onClick={() => handleItemAddToCart(product)} className=''>
                                        <button className="btn btn-outline btn-error w-full normal-case">Add to cart</button>
                                    </div>
                                </div>
                            </div>

                        </div>)
                    }


                </div>
            }



            <dialog id="alReadyExistsOnTheCartModal" className="modal" style={{ maxWidth: '480px', transform: 'translateX(-50%)', left: '50%' }}>
                <div style={{
                    color: 'white',
                    background: '#DC3545',
                    border: '1px solid white'
                }} className="modal-box">
                    <h3 className="flex justify-center text-white">Item already added!</h3>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default Page;