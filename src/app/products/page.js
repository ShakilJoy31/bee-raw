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
            {/* Best products */}
            {
                products.length < 1 ? <div className='w-full min-h-screen flex justify-center items-center'>
                <div>
                    <span style={{ color: 'crimson' }} className="loading loading-infinity w-[250px] h-[150px] "></span>
                    <p style={{ fontFamily: 'Lucida Sans Unicode' }} className='text-white flex justify-center items-center'>Loading. Please wait...</p>
                </div>
            </div> : <div>
            <PauseOnHover></PauseOnHover>
            </div>
            }

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