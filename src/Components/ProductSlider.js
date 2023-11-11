"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import DashboardCSS from '../../style/Dashboard.module.css';
import IndividualCSS from '../../style/Individual.module.css';
import { UserStore } from '../../userStore';
import Button from './button';

const ProductSlider = ({ individualProduct, setIndividualProduct }) => {
    const { user, setUser } = UserStore.useContainer()
    const router = useRouter();
    const [previewImage, setPreviewImage] = useState('');
    const [warning, setWarning] = useState(false);
    useEffect(() => {
        setPreviewImage(individualProduct?.productPicture[0]);
    }, [individualProduct?.productPicture[0]])

    setTimeout(function () {
        if (warning) {
            document.getElementById('alReadyExistsOnTheCartModal').close();
            setWarning(false);
        }
    }, 1800);
    const handleReviewImage = (picture) => {
        setPreviewImage(picture)
    }
    const [message, setMessage] = useState('');
    const handleAddToCartButton = () => {
        const newParticularMenu = individualProduct;
        let cart = JSON.parse(localStorage.getItem("beeRawCart")) || [];
        const isAlreadyInCart = cart.find(item => item._id === individualProduct._id);
        if (!isAlreadyInCart) {
            cart.push(newParticularMenu);
            localStorage.setItem("beeRawCart", JSON.stringify(cart));
            setUser(cart);
            document.getElementById('alReadyExistsOnTheCartModal').showModal();
            setWarning(true)
            setMessage('Added to cart successfully!');
        } else {
            document.getElementById('alReadyExistsOnTheCartModal').showModal();
            setWarning(true)
            setMessage('Item already in the cart.');
        }
    }

    const quantityIncrease = () => {
        const updatedProduct = { ...individualProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        setIndividualProduct(updatedProduct);
    };

    const quantityDecrease = () => {
        if (individualProduct?.quantity > 1) {
            const updatedProduct = { ...individualProduct };
            updatedProduct.quantity = updatedProduct.quantity - 1;
            setIndividualProduct(updatedProduct);
        }
    };
    const [selectedColor, setSelectedColor] = useState(''); 
    console.log(individualProduct?.description);
    const handleBuyNowButton =() =>{
        if(JSON.parse(localStorage.getItem('addedProduct'))){
            localStorage.removeItem('addedProduct');
        }
        router.push('/checkout')
    }
    return (
        <div>
            <div style={{ marginTop: '25px' }} className='text-white'>
                <div className={`${IndividualCSS.container}`}>
                    <div>

                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                            <div className={`${IndividualCSS.previewImage}`}>
                            <div style={{ position: 'absolute', top: '0', zIndex: '1' }} className='flex justify-between w-full'>
                        <div>
                            <img className='h-full' src="https://i.ibb.co/XYxDz3W/Rectangle-223.png" alt="" />
                            <p style={{ position: 'absolute', top: '20px', transform: 'rotate(-45deg)' }}>{individualProduct?.offer}% off</p>
                        </div>
                    </div>
                            <span style={{ zIndex: '1' }} className={`${IndividualCSS.inStockSuggestion}`}>{individualProduct.availability}</span>
                                <img className={`${IndividualCSS.mainImage}`} src={previewImage} />
                            </div>
                        </div>


                        <div className={`${IndividualCSS.previewImageLittle}`}>
                            {
                                individualProduct?.productPicture.map((picture, index) => <img className={`${IndividualCSS.littleImageOfProduct} ${previewImage === picture ? IndividualCSS.littleImageOfProductSelected : ''}`} onClick={() => handleReviewImage(picture)} key={index} src={picture} />)
                            }
                        </div>
                    </div>


                    {/* Information part........ */}
                    <div className={`${IndividualCSS.headingLeftBorder} lg:pl-3 md:pl-2`}>
                        <h1 style={{ marginBottom: '12px', fontSize: '1.675rem', fontWeight: '700' }}>{individualProduct?.title}</h1>
                        <p style={{ marginBottom: '12px' }}><span style={{ textDecoration: 'line-through', marginRight: '12px' }} className='text-slate-400'>{'Taka ' + individualProduct.offerPrice + ' BDT'}</span> {'Taka ' + individualProduct?.price + ' BDT'}</p>

                        <div className='flex items-center gap-x-6 mt-[12px]'>
                            <p>Color: </p>
                            <div className={`grid grid-cols-3 gap-2 ml-4 `}>
                                {individualProduct.color.split(',').map((color, index) => (
                                    <p onClick={()=>setSelectedColor(color)} className={`px-3 py-1 hover:cursor-pointer ${selectedColor === color ? 'bg-purple-200 text-black':'bg-purple-900 text-white'}`} key={index}>
                                        {color}
                                    </p>
                                ))}
                            </div>

                        </div>

                        {/* Counting quantity */}
                        <div className='flex items-center mt-[12px]'>
                            <p>Quantity: </p>
                            <div className='ml-4'>
                                <div className='flex items-center justify-evenly bg-slate-500 rounded-sm w-[125px] text-white hover:cursor-pointer'>
                                    <p onClick={() => quantityDecrease()}><span className=''>-</span></p>
                                    <p>|</p>
                                    <p>{individualProduct.quantity}</p>
                                    <p>|</p>
                                    <p onClick={() => quantityIncrease()}><span className=''>+</span></p>
                                </div>
                            </div>
                        </div>

                        <div className={`${IndividualCSS.decissionButton}`}>
                            <div onClick={handleAddToCartButton}>
                                <Button background='#DC3545' width='150px'><span className='text-white'>Add to cart</span></Button>
                            </div>

                            <div className={`${IndividualCSS.theButton}`} onClick={handleBuyNowButton}>
                                <Button background={'#9F5AE5'} width='150px'><span className='text-white'>Buy Now</span></Button>
                            </div>

                        </div>

                        <div className='lg:hidden block md:hidden my-[12px]'>
                            <p className='mb-4'>
                                <span className='font-bold text-xl'>Feature : </span> <br></br>
                                RAM: 196KB
                                <br></br>
                                ROM: 1MB+64MB
                                <br></br>
                                Wireless charging capability
                                <br></br>
                                Shows notification of Calls / Email / SMS / WhatsApp / WeChat & etc</p>

                            <p>
                                <span className='font-bold text-xl'>Specification : </span> <br></br>
                                Product Name : T900 Ultra smart watch
                                <br></br>
                                System Requirements : Android5.0+ / ios10.0+
                                <br></br>
                                Charge Mode : Wireless charging
                                <br></br>
                                Battery Capacity : 230 MAH
                                <br></br>
                                Standby time : 65days
                                <br></br>
                                Usage time : About 10 days
                                <br></br>
                                Button Method : Full screen touch
                                <br></br>
                                APP: Hiwatch Pro
                                <br></br>
                                Bracelet Memory : 128M
                                <br></br>
                                IP67 life waterproof
                                <br></br>
                                Screen Display : 2.02-inch IPS screen, resolution 240*286
                            </p>
                        </div>
                    </div>
                </div>



                <div className='lg:flex justify-between hidden md:hidden my-[25px]'>
                    {/* <p>{individualProduct.description}</p> */}
                    <p>
                        <span className='font-bold text-xl'>Feature : </span> <br></br>
                        RAM: 196KB
                        <br></br>
                        ROM: 1MB+64MB
                        <br></br>
                        Wireless charging capability
                        <br></br>
                        Shows notification of Calls / Email / SMS / WhatsApp / WeChat & etc</p>

                    <p>
                        <span className='font-bold text-xl'>Specification : </span> <br></br>
                        Product Name : T900 Ultra smart watch
                        <br></br>
                        System Requirements : Android5.0+ / ios10.0+
                        <br></br>
                        Charge Mode : Wireless charging
                        <br></br>
                        Battery Capacity : 230 MAH
                        <br></br>
                        Standby time : 65days
                        <br></br>
                        Usage time : About 10 days
                        <br></br>
                        Button Method : Full screen touch
                        <br></br>
                        APP: Hiwatch Pro
                        <br></br>
                        Bracelet Memory : 128M
                        <br></br>
                        IP67 life waterproof
                        <br></br>
                        Screen Display : 2.02-inch IPS screen, resolution 240*286
                    </p>
                </div>


                {/* You may also like (Suggestion part........) */}
                <div className='mb-6'>
                    <h1 style={{ marginBottom: '12px', fontSize: '1.675rem', fontWeight: '700' }}>You may also like</h1>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                        <div style={{
                            borderRadius: '8px',
                            position: 'relative',
                            zIndex: '0'
                        }} className={`w-full glass hover:cursor-pointer ${DashboardCSS.imageContainer}`}>
                            <div style={{ position: 'absolute', top: '0', zIndex: '1' }} className='flex justify-between w-full'>
                        <div>
                            <img className='h-full' src="https://i.ibb.co/XYxDz3W/Rectangle-223.png" alt="" />
                            <p style={{ position: 'absolute', top: '20px', transform: 'rotate(-45deg)' }}>{individualProduct?.offer}% off</p>
                        </div>
                    </div>
                            <span style={{ zIndex: '1' }} className={`${IndividualCSS.inStockSuggestion}`}>{individualProduct.availability}</span>
                            <div onClick={() => {
                                {
                                    router.push(`/products/${individualProduct._id}`)
                                    localStorage.setItem("beeRawCartSingle", JSON.stringify([individualProduct]));
                                }
                                localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                            }} className={`${DashboardCSS.imageContainer}`}>
                                <figure><img src={individualProduct.productPicture[0]} alt="Product Image" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} /></figure>
                            </div>

                            <div className=''>
                                <div className='mt-4'>
                                    <div className="lg:px-4 px-1">
                                        <h2 onClick={() => {
                                            router.push(`/products/${individualProduct._id}`)
                                            localStorage.setItem("beeRawCartSingle", JSON.stringify([individualProduct]));
                                        }} className="h-16 hover:underline">{individualProduct.title}</h2>

                                        <div className=''>
                                            <p className='my-[12px] flex justify-between items-center'><span style={{ textDecoration: 'line-through', marginRight: '12px' }} className='text-slate-400'>{individualProduct.offerPrice + ' BDT'}</span> {individualProduct?.price + ' BDT'}</p>
                                        </div>
                                    </div>



                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {/* The warning modal to show that it is already added in the cart...... */}
            <dialog id="alReadyExistsOnTheCartModal" className="modal" style={{ maxWidth: '480px', transform: 'translateX(-50%)', left: '50%' }}>
                <div style={{
                    color: 'white',
                    background: (message === 'Added to cart successfully!' ? 'green' : '#DC3545'),
                    border: '1px solid white'
                }} className="modal-box">
                    <h3 className="flex justify-center text-white">{message}</h3>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>);
};

export default ProductSlider;