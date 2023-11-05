"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
} from 'react-icons/bs';

import IndividualCSS from '../../style/Individual.module.css';
import { UserStore } from '../../userStore';
import Button from './button';

const ProductSlider = ({ individualProduct }) => {
    const { user, setUser } = UserStore.useContainer()
    const router = useRouter();
    const [previewImage, setPreviewImage] = useState('');
    const [warning, setWarning] = useState(false);
    useEffect(() => {
        setPreviewImage(individualProduct?.productPicture[0]);
    }, [individualProduct?.productPicture[0]])
    console.log(individualProduct);

    setTimeout(function () {
        if (warning) {
            document.getElementById('alReadyExistsOnTheCartModal').close();
            setWarning(false);
        }
    }, 1800);
    const handleReviewImage = (picture) => {
        setPreviewImage(picture)
    }
    const handleAddToCartButton = () => {
        const newParticularMenu = individualProduct;
        let cart = JSON.parse(localStorage.getItem("beeRawCart")) || [];
        const isAlreadyInCart = cart.find(item => item._id === individualProduct._id);
        if (!isAlreadyInCart) {
            cart.push(newParticularMenu);
            localStorage.setItem("beeRawCart", JSON.stringify(cart));
            setUser(cart);
        } else {
            document.getElementById('alReadyExistsOnTheCartModal').showModal();
            setWarning(true)
        }
    }
    return (
        <div>
            <div style={{ marginTop: '25px' }} className='text-white'>
                <div className={`${IndividualCSS.container}`}>
                    <div>

                        <div style={{position: 'relative'}}>
                            <span className={`${IndividualCSS.inStock}`}>{individualProduct.availability}</span>
                            
                            <div className={`flex items-center ${IndividualCSS.previewImage}`}>
                                <div className={`${IndividualCSS.imageLeftArrow}`} ><span><BsArrowLeftCircleFill color='red' size={25}></BsArrowLeftCircleFill></span></div>

                                <img className={`${IndividualCSS.mainImage}`} src={previewImage} />

                                <div className={`${IndividualCSS.imageRightArrow}`}><span><BsArrowRightCircleFill color='red' size={25}></BsArrowRightCircleFill></span></div>
                            </div>
                        </div>


                        <div className={`${IndividualCSS.previewImageLittle}`}>
                            {
                                individualProduct?.productPicture.map((picture, index) => <img style={{ width: '70px', height: '55px', borderRadius: '8px' }} onClick={() => handleReviewImage(picture)} key={index} src={picture} />)
                            }
                        </div>
                    </div>


                    {/* Information part........ */}
                    <div className={`${IndividualCSS.headingLeftBorder}`}>
                        <h1 style={{ marginBottom: '12px', fontSize: '1.675rem', fontWeight: '700' }}>{individualProduct?.title}</h1>
                        <p style={{ marginBottom: '12px' }}>Price: {individualProduct?.price}</p>
                        <p style={{ height: '120px', overflowY: 'scroll' }}>{individualProduct?.description}</p>
                        <p style={{ marginTop: '12px' }}>Color: {individualProduct?.color}</p>
                    </div>
                </div>

                <div className={`${IndividualCSS.decissionButton}`}>
                    <div onClick={handleAddToCartButton}>
                        <Button background='#DC3545' width='150px'><span className='text-white'>Add to cart</span></Button>
                    </div>

                    <div className={`${IndividualCSS.theButton}`} onClick={() => router.push('/checkout')}>
                        <Button background={'#9F5AE5'} width='150px'><span className='text-white'>Buy Now</span></Button>
                    </div>

                </div>

            </div>


            {/* The warning modal to show that it is already added in the cart...... */}
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
        </div>);
};

export default ProductSlider;