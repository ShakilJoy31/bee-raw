"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import { CustomerAPI } from '@/APIcalling/customerAPI';
import CategorizedProducts from '@/Components/CategorizedProducts';
import PauseOnHover from '@/Components/PauseOnHover';

import {
  ProductsStore,
  UserStore,
} from '../../../userStore';

const Page = () => {
    const { user, setUser } = UserStore.useContainer();
    const { products, setProducts } = ProductsStore.useContainer();
    const router = useRouter();
    const [warning, setWarning] = useState(false);
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('beeRawCartSingle'))) {
            localStorage.removeItem('beeRawCartSingle');
        }
    }, [])

    setTimeout(function () {
        if (warning) {
            document.getElementById('alReadyExistsOnTheCartModal')?.close();
            setWarning(false);
        }
    }, 1800);

    const [cartAddedMessage, setCartAddedMessage] = useState('');
    const handleItemAddToCart = (clickedProduct) => {
        const newParticularMenu = clickedProduct;
        let cart = JSON.parse(localStorage.getItem("beeRawCart")) || [];
        const isAlreadyInCart = cart.find(item => item._id === clickedProduct._id);
        if (!isAlreadyInCart) {
            cart.push(newParticularMenu);
            localStorage.setItem("beeRawCart", JSON.stringify(cart));
            setUser(cart);
            setCartAddedMessage('Product added successfully!')
            document.getElementById('alReadyExistsOnTheCartModal').showModal();
            setWarning(true)
        } else {
            setCartAddedMessage('Item already added!')
            document.getElementById('alReadyExistsOnTheCartModal').showModal();
            setWarning(true)
        }
    }
    const handleBuyNowButton = (product) => {
        // setUser([product]);
        localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
        router.push('/checkout');
    }
    // const dataForDynamicComponent = ['Smart Watch', 'Smart Watch'];


    // Updated one for fetching the data.
    const [catrProducts, setCatrProducts] = useState([]); 
    useEffect(()=>{
        CustomerAPI.getCategorizedProductsForCustomer().then(res => {
            // const filteredProduct = res?.filter(product => product.category[0].category === product.products[0].category[0].category);
            // console.log(filteredProduct);
            setCatrProducts(res);
        })
    },[])
    console.log(catrProducts);
    return (
        <div className='h-full'>
            <h1 className='my-2'> <svg className="gradient-text text-3xl font-bold" width="100%" height="38" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'crimson' }} />
                        <stop offset="50%" style={{ stopColor: 'white' }} />
                        <stop offset="100%" style={{ stopColor: 'rgb(28,97,231)' }} />
                    </linearGradient>
                    {/* <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#ff0000' }} />
                        <stop offset="50%" style={{ stopColor: '#00ff00' }} />
                        <stop offset="100%" style={{ stopColor: '#0000ff' }} />
                    </linearGradient> */}
                </defs>
                <text x="50%" y="30" fill="url(#gradient)" textAnchor="middle">Best Selling Product</text>
            </svg></h1>
            <PauseOnHover></PauseOnHover>


            {/* The Categorized Product */}
            {
                catrProducts.map((byCategory, index) => <div key={index}>
                    <CategorizedProducts byCategory={byCategory}></CategorizedProducts>
                </div>)
            }

            {/* The modal... */}
            <dialog id="alReadyExistsOnTheCartModal" className="modal" style={{ maxWidth: '480px', transform: 'translateX(-50%)', left: '50%' }}>
                <div style={{
                    color: 'white',
                    background: (cartAddedMessage === 'Product added successfully!' ? 'green' : '#DC3545'),
                    border: '1px solid white'
                }} className="modal-box">
                    <h3 className="flex justify-center text-white">{cartAddedMessage}</h3>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default Page;