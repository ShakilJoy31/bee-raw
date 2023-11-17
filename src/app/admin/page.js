"use client"
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';

import { AdminAPI } from '@/APIcalling/adminAPI';
import { blackColor } from '@/constants/color-constants';
import {
  dashboardBottomHead,
  otpInputBorderRadius,
  relativePosition,
} from '@/constants/font-constants';
import { url } from '@/constants/image-constants';

import HomeComponentCss from '../../../style/ComponentStyle.module.css';

const Page = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [offer, setOffer] = useState('');
    const [color, setColor] = useState('');
    const [category, setCategory] = useState('Best seller');
    const [availability, setAvailability] = useState('In Stock');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [hostedImage, setHostedImage] = useState()
    const [hostedImages, setHostedImages] = useState([])
    if (picture) {
        const formDataImage = new FormData();
        formDataImage.append("image", picture);
        fetch(url, {
            method: 'POST',
            body: formDataImage,
        })
            .then((res) => res.json())
            .then((result) => {
                setHostedImage(result.data.display_url);
                setHostedImages((prevImages) => [...prevImages, result.data.display_url]);
            });
        setPicture("");
    }
    const [cartAddedMessage, setCartAddedMessage] = useState('');
    const [warning, setWarning] = useState(false);
    setTimeout(function () {
        if (warning) {
            document.getElementById('alReadyExistsOnTheCartModal').close();
            setWarning(false);
        }
    }, 1800);
    const handleSubmitProduct = () => {
        const productData = {
            title: title,
            price: price,
            offerPrice: offerPrice,
            offer: offer,
            color: color,
            category: category,
            availability: availability,
            description: description,
            productPicture: hostedImages,
            quantity: 1
        }
        if (!title || !price || !offerPrice || !offer || !color || !category || !availability || !hostedImages) {
            document.getElementById('alReadyExistsOnTheCartModal').showModal();
            setWarning(true)
            setCartAddedMessage('All fields are required!')
        } else {
            AdminAPI.postingProducts(productData).then(res => {
                if (res.acknowledged === true) {
                    document.getElementById('alReadyExistsOnTheCartModal').showModal();
                    setWarning(true)
                    setCartAddedMessage('Product added successfully!')
                } else {
                    document.getElementById('alReadyExistsOnTheCartModal').showModal();
                    setWarning(true)
                    setCartAddedMessage('OoppS! Failed.')
                }
            })
        }
    }
    const handleRemoveImage = (getImage) => {
        const restImage = hostedImages.filter(img => img !== getImage);
        setHostedImages(restImage);
    }
    const [categories, setCategories] = useState([{ id: 1, category: '' }]);
    const handleCategoryChange = (e, categoryId) => {
        const updatedCategories = categories.map((cat) =>
            cat.id === categoryId ? { ...cat, category: e.target.value } : cat
        );
        setCategories(updatedCategories);
    };
    const addCategory = () => {
        const newId = categories.length + 1;
        setCategories([...categories, { id: newId, category: '' }]);
    };
    return (
        <div className='mt-[24px]'>
            <div className='flex lg:justify-end md:justify-end justify-center mb-2 gap-x-2'>
                <button onClick={() => router.push('/admin/user-order')} style={{ background: 'purple', borderRadius: '5px' }} className="py-[10px] px-[20px]">Check Orders</button>

                <button onClick={handleSubmitProduct} style={{ background: 'purple', borderRadius: '5px' }} className="py-[10px] px-[20px]">Upload Product</button>
            </div>

            <div>
                <div>
                    <span className=''>Title</span>
                    <textarea onChange={(e) => setTitle(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md" />
                </div>
            </div>


            <div>
                <div>
                    <span className=''>Main Price</span>
                    <textarea onChange={(e) => setPrice(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " />
                </div>
            </div>


            <div>
                <div>
                    <span className=''>Offer Price(Will be cut)</span>
                    <textarea onChange={(e) => setOfferPrice(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " />
                </div>
            </div>


            <div>
                <div>
                    <span className=''>Offer</span>
                    <textarea onChange={(e) => setOffer(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " />
                </div>
            </div>


            <div>
                <div>
                    <span className=''>Color</span>
                    <textarea onChange={(e) => setColor(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " />
                </div>
            </div>

            <div>
                <div>
                    <span className=''>Category</span>

                    {categories.map((cat, index) => (
                        <div className='mb-[6px]' key={cat.id}>
                            <div className='flex items-center justify-between gap-x-4'>
                                <select
                                    onChange={(e) => handleCategoryChange(e, cat.id)}
                                    style={{ background: 'purple' }}
                                    className="w-full select focus:outline-none"
                                >
                                    <option>Best seller</option>
                                    <option>Smart Watch</option>
                                    <option>Tripod</option>
                                    <option>Speaker</option>
                                    <option>Microphone</option>
                                    <option>Webcam</option>
                                    <option>RGB Light</option>
                                    <option>Fan</option>
                                    <option>Trimer</option>
                                    <option>Ring Light</option>
                                    <option>Neck Band</option>
                                    <option>Blender</option>
                                    <option>Headphone</option>
                                    <option>Memory card</option>
                                    <option>IP Camera</option>
                                    <option>Cable</option>
                                    <option>Calculator</option>
                                    <option>Bags & Luggage</option>
                                    <option>Action Camera</option>
                                    <option>Iron</option>
                                    <option>Pen Drive</option>
                                    <option>Sun Glass</option>
                                    <option>Clip Lamp</option>
                                </select>

                                {
                                    index + 1 === categories.length ? <button onClick={addCategory} style={{ background: 'purple', borderRadius: '5px' }} className="px-3 py-2">
                                        Add
                                    </button> : ''
                                }

                            </div>
                        </div>
                    ))}

                </div>
            </div>


            <div className='mt-[6px]'>
                <div>
                    <span className=''>Availability</span>
                    <select onChange={(e) => setAvailability(e.target.value)} style={{ background: 'purple' }} className="w-full select focus:outline-none ">
                        <option>In Stock</option>
                        <option>Out of Stock</option>
                    </select>
                </div>
            </div>

            <div className='mt-[6px]'>
                <div>
                    <span className=''>Description</span>
                    <textarea onChange={(e) => setDescription(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input-lg input focus:outline-none " />
                </div>
            </div>


            <div className='flex items-center'>
                <div>
                    <span>Upload Profile Picture</span>
                    <div className='flex gap-x-4 mt-[10px] w-full'>
                        <div
                            style={{
                                borderRadius: otpInputBorderRadius,
                                border: dashboardBottomHead,
                                background: 'purple',
                                color: blackColor,
                            }}
                            className={`$${HomeComponentCss.customInputImageUpload} w-[120px] h-[120px] hover:cursor-pointer mb-[24px]`}
                        >
                            <input onChange={(e) => setPicture(e.target.files[0])}
                                style={{ position: "absolute", opacity: "0" }}
                                type="file"
                                className="h-[120px]"
                            />
                            <span className='flex justify-center mt-[32px]'><AiOutlineCloudUpload size={35} color={'white'}></AiOutlineCloudUpload></span>
                            <p className="flex justify-center text-white">
                                Click to upload
                            </p>
                        </div>
                    </div>

                    <div className='grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5'>
                        {
                            hostedImages.map((image, index) => <div key={index} style={{ position: relativePosition }}>
                                <span onClick={() => handleRemoveImage(image)} style={{ position: 'absolute', top: '5px', right: '5px' }}><RxCross1 size={25} color={'red'}></RxCross1></span>
                                <img
                                    className="w-[120px] h-[120px] rounded-sm"
                                    src={image}
                                    alt=""
                                />
                            </div>)
                        }
                    </div>
                </div>
            </div>

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




// The onchange.  
