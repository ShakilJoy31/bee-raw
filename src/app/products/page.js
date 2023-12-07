"use client"
import 'aos/dist/aos.css';

import React, {
  useEffect,
  useState,
} from 'react';

import Aos from 'aos';
import {
  usePathname,
  useRouter,
} from 'next/navigation';

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
    const pathname = usePathname();
    const [warning, setWarning] = useState(false);
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('beeRawCartSingle'))) {
            localStorage.removeItem('beeRawCartSingle');
        }
        Aos.init({ duration: 500 });
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

    // Updated one for fetching the data.
    const [catrProducts, setCatrProducts] = useState([]);
    useEffect(() => {
        CustomerAPI.getCategorizedProductsForCustomer().then(res => {
            // const filteredProduct = res?.filter(product => product.category[0].category === product.products[0].category[0].category);
            // console.log(filteredProduct);
            setCatrProducts(res);
        })
    }, [])
    const handleClickedCategoryForMore = (getCategory) => {
        console.log(getCategory);
        if (getCategory === 'Best seller') {
            router.push('/products/best-seller');
        }
        else if (getCategory === 'Smart Watch') {
            router.push('/products/smart-watch');
        }
        else if (getCategory === 'Home and Living') {
            router.push('/products/home&living');
        }
        else if (getCategory === 'Earbud and Headphone') {
            router.push('/products/headphone');
        }
        else if (getCategory === 'Camera') {
            router.push('/products/camera');
        }
        else if (getCategory === 'Islamic Accessiories') {
            router.push('/products/islamic-accessiories');
        }
        else if (getCategory === 'Gift Items') {
            router.push('/products/gift-item');

        }
        else if (getCategory === 'Electronics') {
            router.push('/products/electronics');

        }
        else if (getCategory === 'Accessories') {
            router.push('/products/accessories');

        }
        else if (getCategory === 'Speaker') {
            router.push('/products/speaker');

        }
        else if (getCategory === 'RGB Light') {
            router.push('/products/rgb-light');

        }
        else if (getCategory === 'Fan') {
            router.push('/products/fan');

        }
        else if (getCategory === 'Trimer') {
            router.push('/products/trimer');

        }
        else if (getCategory === 'Calculator') {
            router.push('/products/calculator');

        }
        else if (getCategory === 'Bags and Luggage') {
            router.push('/products/bags-luggage');

        }
        else if (getCategory === 'Sun Glass') {
            router.push('/products/sun-glass');

        }
        else if (getCategory === 'Clothing') {
            router.push('/products/clothing');

        }
    }

    return (
        <div className='h-full'>
            {/* Best products */}
            {
                (products?.length < 1 && catrProducts.length < 1) ? <div className='w-full min-h-screen items-center flex justify-center'>
                    <div>
                        <span style={{ color: 'crimson' }} className="loading loading-ring w-24 h-24 block mx-auto"></span>
                        {/* <span className="loading loading-ring loading-lg"></span> */}
                        <p style={{ fontFamily: 'Lucida Sans Unicode' }} className='text-white flex justify-center'>Loading. Please wait...</p>
                    </div>
                </div> : <div data-aos="zoom-in-up">
                    <PauseOnHover></PauseOnHover>
                </div>
            }

            {/* The Categorized Product */}
            {
                catrProducts.map((byCategory, index) => <div key={index} data-aos="zoom-in-up">
                    <CategorizedProducts byCategory={byCategory} handleClickedCategoryForMore={handleClickedCategoryForMore}></CategorizedProducts>
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












// Code for scrolling controll. 
 // const [scrollPosition, setScrollPosition] = useState(0);
    // const handleScroll = () => {
    //     setScrollPosition(window.scrollY);
    // };

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    // useEffect(() => {
    //     if(scrollPosition > 100){
    //         localStorage.setItem('scrollPosition', scrollPosition.toString());
    //     }
    // }, [scrollPosition]);
    // const [toScrollerAfterReturn, setToScrolledAfterReturn] = useState(0);
    // useEffect(() => {
    //     const isScrolledPosition = parseInt(localStorage.getItem('scrollPosition'), 10); 
    //     console.log(isScrolledPosition);
    //     if(isScrolledPosition && catrProducts){
    //         setToScrolledAfterReturn(isScrolledPosition);
    //     }
    // }, []);
    // console.log(scrollPosition);

    // if(scrollPosition < 1){
    //     console.log('in the window');
    //     window.scrollTo(0, toScrollerAfterReturn);
    //     if(scrollPosition > 100){
    //         console.log('to remove');
    //         localStorage.removeItem('scrollPosition')
    //     }
    // }