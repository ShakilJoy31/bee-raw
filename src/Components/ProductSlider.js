"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';
import { TbAlertOctagonFilled } from 'react-icons/tb';

import { AdminAPI } from '@/APIcalling/adminAPI';

import DashboardCSS from '../../style/Dashboard.module.css';
import IndividualCSS from '../../style/Individual.module.css';
import {
  ProductsStore,
  UserStore,
} from '../../userStore';
import Button from './button';

const ProductSlider = ({ individualProduct, setIndividualProduct, clickedFor }) => {
    const { user, setUser } = UserStore.useContainer();
    const { products, setProducts } = ProductsStore.useContainer();
    const router = useRouter();
    const [previewImage, setPreviewImage] = useState('');
    const [warning, setWarning] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    useEffect(() => {
        setPreviewImage(individualProduct?.productPicture[0]);
        if (JSON.parse(localStorage.getItem('editable')) === 'editable') {
            setIsEditable(true);
        }
    }, [])

    setTimeout(function () {
        if (warning) {
            document.getElementById('alReadyExistsOnTheCartModal')?.close();
            setWarning(false);
        }
    }, 1800);
    const handleReviewImage = (picture) => {
        setPreviewImage(picture)
    }
    const moreProducts = products.filter(product => individualProduct?.category[0]?.category === product?.category[0]?.category);

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
        localStorage.setItem("beeRawCartSingle", JSON.stringify([updatedProduct]));
    };

    const quantityDecrease = () => {
        if (individualProduct?.quantity > 1) {
            const updatedProduct = { ...individualProduct };
            updatedProduct.quantity = updatedProduct.quantity - 1;
            setIndividualProduct(updatedProduct);
            localStorage.setItem("beeRawCartSingle", JSON.stringify([updatedProduct]));
        }
    };

    const [selectedColor, setSelectedColor] = useState('');
    const handleSelectedColor = (color) => {
        const selectedColor = { ...individualProduct };
        selectedColor.color = color;
        localStorage.setItem("beeRawCartSingle", JSON.stringify([selectedColor]));
        setSelectedColor(color)
    }
    const handleBuyNowButton = () => {
        if (selectedColor === '') {
            document.getElementById('alReadyExistsOnTheCartModal').showModal();
            setWarning(true)
            setMessage('Please select a color you want.');
        } else {
            router.push('/checkout')
        }
    }
    const handleEditByAdmin = () => {
        localStorage.setItem("productToEdit", JSON.stringify(individualProduct));
        router.push('/admin');
    }


    const handleDeleteProductByAdmin = () => {
        AdminAPI.handleDeletingProductByAdmin(individualProduct?._id).then(res => {
            if (res) {
                router.push('/products')
                document.getElementById('beforeDelete').close();
            }
        })
    }
    return (
        <div data-aos="zoom-in-up">
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
                                <img className={`${IndividualCSS.mainImage} w-full`} src={previewImage} />
                            </div>
                        </div>


                        <div className={`${IndividualCSS.previewImageLittle}`}>
                            {
                                individualProduct?.productPicture?.map((picture, index) => <img className={`${IndividualCSS.littleImageOfProduct} ${previewImage === picture ? IndividualCSS.littleImageOfProductSelected : ''}`} onClick={() => handleReviewImage(picture)} key={index} src={picture} />)
                            }
                        </div>
                    </div>


                    {/* Information part........ */}
                    <div className={`${IndividualCSS.headingLeftBorder} lg:pl-3 md:pl-2`}>
                        <h1 style={{ marginBottom: '12px', fontSize: '1.675rem', fontWeight: '700' }}>{individualProduct?.title}</h1>
                        <p style={{ marginBottom: '12px' }}>
                            <span style={{ textDecoration: 'line-through', marginRight: '12px' }} className='text-slate-400'>{'Taka ' + parseFloat(individualProduct?.offerPrice) * parseFloat(individualProduct.quantity) + ' BDT'}</span>

                            {'Taka ' + parseFloat(individualProduct?.price) * parseFloat(individualProduct?.quantity) + ' BDT'}
                        </p>

                        <div className='flex items-center gap-x-6 mt-[12px]'>
                            <p>Color: </p>
                            <div className={`grid grid-cols-3 gap-2 ml-4 `}>
                                {individualProduct?.color?.split(',')?.map((color, index) => (
                                    <p onClick={() => handleSelectedColor(color)} className={`px-3 py-1 hover:cursor-pointer ${selectedColor === color ? 'bg-purple-200 text-black' : 'bg-purple-900 text-white'}`} key={index}>
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
                                <button className={`btn border-0 btn-sm w-[150px] normal-case ${DashboardCSS.IndividualProductBuyNowButton}`}>Add to cart</button>

                                {/* <Button background='#DC3545' width='150px'><span className='text-white'>Add to cart</span></Button> */}
                            </div>

                            <div className={`${IndividualCSS.theButton}`} onClick={handleBuyNowButton}>
                                <button className={`btn border-0 btn-sm w-[150px] normal-case ${DashboardCSS.IndividualProductBuyNowButton}`}>Buy Now</button>

                                {/* <Button background={'rgb(28,97,231)'} width='150px'><span className='text-white'>Buy Now</span></Button> */}
                            </div>

                            {
                                isEditable && <div className={`${IndividualCSS.theButton} hidden lg:block md:block`} onClick={handleEditByAdmin}>
                                    <Button background={'purple'} width='150px'><span className='text-white'>Edit</span></Button>
                                </div>
                            }

                            {
                                isEditable && <div className={`${IndividualCSS.theButton} hidden lg:block md:block`} onClick={() => document.getElementById('beforeDelete').showModal()}>
                                    <Button background={'#DC3545'} width='150px'><span className='text-white'>Delete</span></Button>
                                </div>
                            }

                        </div>

                        {
                            isEditable && <div className={`${IndividualCSS.theButton} lg:hidden block md:hidden`} onClick={handleEditByAdmin}>
                                <Button background={'purple'} width='100%'><span className='text-white'>Edit</span></Button>
                            </div>
                        }

                        {
                            isEditable && <div className={`${IndividualCSS.theButton} lg:hidden block md:hidden mt-[24px]`} onClick={() => document.getElementById('beforeDelete').showModal()}>
                                <Button background={'#DC3545'} width='100%'><span className='text-white'>Delete</span></Button>
                            </div>
                        }

                        {/* Description for mobile. */}
                        <div className='lg:hidden block md:hidden my-[12px]'>
                            <p style={{ whiteSpace: 'pre-line' }}>{individualProduct.description}</p>
                        </div>
                    </div>
                </div>


                {/* Description for computer..... */}
                <div className='lg:flex justify-between hidden md:hidden my-[25px]'>
                    <p style={{ whiteSpace: 'pre-line' }}>{individualProduct.description}</p>
                </div>


                {/* You may also like (Suggestion part........) */}
                <div className='mb-6'>
                    <h1 style={{ marginBottom: '12px', fontSize: '1.675rem', fontWeight: '700' }}>You may also like</h1>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                        {
                            moreProducts.map((product, index) => <div style={{
                                borderRadius: '8px',
                                border: '2px solid crimson'
                            }} key={index} className={`w-full hover:cursor-pointer ${DashboardCSS.imageContainer} ${DashboardCSS.productBackground}`} data-aos="zoom-in-up">
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
                                    <figure><img className='lg:h-[220px] md:h-[200px] h-[180px]' src={product?.productPicture[0]} alt="Product Image" style={{ width: '100%', objectFit: 'cover', borderRadius: '0 8px 0 0' }} /></figure>
                                </div>

                                <div className=''>
                                    <div className='mt-1'>
                                        <div className="px-1">
                                            <h2 onClick={() => {
                                                router.push(`/products/${product._id}`)
                                                localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                                            }} className={`${DashboardCSS.productTitle} h-[50px] lg:h-[50px] block lg:hidden md:hidden`}>{product.title.slice(0, 45)}</h2>

                                            {/* For large screen */}
                                            <h2 onClick={() => {
                                                router.push(`/products/${product._id}`)
                                                localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                                            }} className={`${DashboardCSS.productTitle} h-[50px] lg:h-[50px] hidden lg:block md:block`}>{product.title.slice(0, 50)}</h2>


                                            <div className="flex justify-between items-center">
                                                <div className='flex justify-between items-center w-full'>
                                                    <p style={{ textDecoration: 'line-through', color: 'white' }} className='mb-1' onClick={() => {
                                                        router.push(`/products/${product._id}`)
                                                        localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                                                    }}>{product.offerPrice} ৳</p>

                                                    <p style={{ color: 'white' }} onClick={() => {
                                                        router.push(`/products/${product._id}`)
                                                        localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                                                    }}>{product.price} ৳</p>
                                                </div>
                                            </div>
                                            <button onClick={() => handleBuyNowButton(product)} className={`btn border-0 btn-sm my-1 w-full normal-case ${DashboardCSS.productBuyNowButton}`}>Buy Now</button>
                                        </div>


                                        <div onClick={() => handleItemAddToCart(product)} className=''>
                                            <button className={`btn border-0 btn-sm w-full normal-case ${DashboardCSS.productBuyNowButton}`}>Add to cart</button>

                                        </div>
                                    </div>
                                </div>

                            </div>)
                        }
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


            {/* The warning modal to delete the product*/}
            <dialog id="beforeDelete" className="modal" style={{ maxWidth: '480px', transform: 'translateX(-50%)', left: '50%' }}>
                <div style={{
                    color: 'white',
                    background: '#DC3545',
                    border: '1px solid white'
                }} className="modal-box">
                    <div>
                        <h3 className="flex justify-center text-white items-center gap-x-2"><span><TbAlertOctagonFilled size={30} color={'black'}></TbAlertOctagonFilled></span> <span>Hey, Attention please!</span></h3>
                        <h1 className="flex justify-center">Do you want to delete this product?</h1>
                        <h1 className="flex justify-center">This is not reverseable!</h1>
                        <div className='flex justify-between items-center mt-[24px]'>
                            <div onClick={() => document.getElementById('beforeDelete').close()}>
                                <Button background='green' width='150px'><span className='text-white'>Cancel</span></Button>
                            </div>

                            <div onClick={handleDeleteProductByAdmin} className={`${IndividualCSS.theButton}`}>
                                <Button background={'purple'} width='150px'><span className='text-white'>Delete</span></Button>
                            </div>
                        </div>

                    </div>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>);
};

export default ProductSlider;