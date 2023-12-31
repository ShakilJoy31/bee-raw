"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { TbAlertOctagonFilled } from 'react-icons/tb';

import { AdminAPI } from '@/APIcalling/adminAPI';
import CustomModal from '@/Components/CustomModal';
import { blackColor } from '@/constants/color-constants';
import {
  dashboardBottomHead,
  otpInputBorderRadius,
  relativePosition,
} from '@/constants/font-constants';
import { url } from '@/constants/image-constants';

import HomeComponentCss from '../../../style/ComponentStyle.module.css';
import { BlurForSafety } from '../../../userStore';

const Page = () => {
    const { isModalOpen, setIsModalOpen } = BlurForSafety.useContainer();
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const router = useRouter();
    const [productToEdit, setProductToEdit] = useState('')
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [offer, setOffer] = useState('');
    const [color, setColor] = useState('');
    const [category, setCategory] = useState('Best seller');
    const [categories, setCategories] = useState([{ id: 1, category: '' }]);
    const [availability, setAvailability] = useState('In Stock');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [hostedImage, setHostedImage] = useState()
    const [hostedImages, setHostedImages] = useState([])
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('productToEdit'))) {
            setProductToEdit(JSON.parse(localStorage.getItem('productToEdit')));
            setTitle(JSON.parse(localStorage.getItem('productToEdit')).title);
            setPrice(JSON.parse(localStorage.getItem('productToEdit')).price);
            setOfferPrice(JSON.parse(localStorage.getItem('productToEdit')).offerPrice);
            setOffer(JSON.parse(localStorage.getItem('productToEdit')).offer);
            setColor(JSON.parse(localStorage.getItem('productToEdit')).color);
            setDescription(JSON.parse(localStorage.getItem('productToEdit')).description);
            setHostedImages(JSON.parse(localStorage.getItem('productToEdit')).productPicture);
        }
        if (JSON.parse(localStorage.getItem('editable'))) {
            setIsAdmin(true)
        }
    }, [])
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
            category: categories,
            availability: availability,
            description: description,
            productPicture: hostedImages,
            quantity: 1
        }
        if (productToEdit) {
            AdminAPI.handleUpdateProduct(productToEdit?._id, productData).then(res => {
                if (res) {
                    document.getElementById('alReadyExistsOnTheCartModal').showModal();
                    setWarning(true);
                    setCartAddedMessage('Update successfully!')
                    localStorage.removeItem('productToEdit');
                }
            })
        } else {
            if (!title || !offerPrice || !price || !offer || !color || !category || !availability || !hostedImages) {
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
    }
    const handleRemoveImage = (getImage) => {
        const restImage = hostedImages.filter(img => img !== getImage);
        setHostedImages(restImage);
    }
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
    const handleEditProduct = (e) => {
        if (e.target.value === 'IAMADMIN') {
            localStorage.setItem("editable", JSON.stringify('editable'));
            router.push('/products');
        }
    }
    return (
        <div className={`mt-[24px]`}>
            <div className={`${isModalOpen ? HomeComponentCss.blurred : ''}`}>
                <div className='flex lg:justify-end md:justify-end justify-center mb-2 gap-x-2'>
                    {
                        isAdmin ? '' : <button onClick={() => document.getElementById('productEditConfirmation').showModal()} style={{ background: 'purple', borderRadius: '5px' }} className="py-[5px] px-[3px] md:px-[3px] lg:px-[5px]">Edit Product</button>
                    }

                    <button onClick={() => router.push('/admin/user-order')} style={{ background: 'purple', borderRadius: '5px' }} className="py-[5px] px-[3px] md:px-[3px] lg:px-[5px]">Check Orders</button>

                    <button onClick={handleSubmitProduct} style={{ background: 'purple', borderRadius: '5px' }} className="py-[5px] px-[3px] md:px-[3px] lg:px-[5px]">{productToEdit ? 'Edit' : 'Upload'} Product</button>

                </div>

                <div>
                    <div>
                        <span className=''>Title</span>
                        {
                            productToEdit ? <textarea onChange={(e) => setTitle(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md" value={productToEdit && title} /> : <textarea onChange={(e) => setTitle(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md" placeholder='Type title' />
                        }
                    </div>
                </div>


                <div>
                    <div>
                        <span className=''>Main Price</span>
                        {
                            productToEdit ? <textarea onChange={(e) => setPrice(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " value={productToEdit && price} /> : <textarea onChange={(e) => setPrice(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " placeholder='Type price' />
                        }

                    </div>
                </div>


                <div>
                    <div>
                        <span className=''>Offer Price(Will be cut)</span>
                        {
                            productToEdit ? <textarea onChange={(e) => setOfferPrice(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " value={productToEdit && offerPrice} /> : <textarea onChange={(e) => setOfferPrice(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md" placeholder='Type old price' />
                        }

                    </div>
                </div>


                <div>
                    <div>
                        <span className=''>Offer</span>
                        {
                            productToEdit ? <textarea onChange={(e) => setOffer(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " value={productToEdit && offer} /> : <textarea onChange={(e) => setOffer(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " placeholder='Type offer here' />
                        }

                    </div>
                </div>


                <div>
                    <div>
                        <span className=''>Color</span>
                        {
                            productToEdit ? <textarea onChange={(e) => setColor(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " value={productToEdit && color} /> : <textarea onChange={(e) => setColor(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " placeholder='Type color here' />
                        }

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
                                        <option>Home and Living</option>
                                        <option>Earbud and Headphone</option>
                                        <option>Camera</option>
                                        <option>Islamic Accessiories</option>
                                        <option>Gift Items</option>
                                        <option>Electronics</option>
                                        <option>Accessories</option>
                                        <option>Speaker</option>
                                        <option>RGB Light</option>
                                        <option>Fan</option>
                                        <option>Trimer</option>
                                        <option>Memory card</option>
                                        <option>Calculator</option>
                                        <option>Bags and Luggage</option>
                                        <option>Sun Glass</option>
                                        <option>Clothing</option>
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
                        {
                            productToEdit ? <textarea onChange={(e) => setDescription(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input-lg input focus:outline-none " value={productToEdit && description} /> : <textarea onChange={(e) => setDescription(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input-lg input focus:outline-none " placeholder='Type description here' />
                        }

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
                                className={`$${HomeComponentCss.customInputImageUpload} w-[120px] h-[120px] hover:cursor-pointer`}
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

                        <div className='grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 my-[24px]'>
                            {
                                hostedImages?.map((image, index) => <div key={index} style={{ position: relativePosition }}>
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
            </div>


            <dialog id="alReadyExistsOnTheCartModal" className="modal" style={{ maxWidth: '480px', transform: 'translateX(-50%)', left: '50%' }}>
                <div style={{
                    color: 'white',
                    background: ((cartAddedMessage === 'Product added successfully!' || cartAddedMessage === 'Update successfully!') ? 'green' : '#DC3545'),
                    border: '1px solid white'
                }} className="modal-box">
                    <h3 className="flex justify-center text-white">{cartAddedMessage}</h3>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>


            <dialog id="productEditConfirmation" className="modal" style={{ maxWidth: '480px', transform: 'translateX(-50%)', left: '50%' }}>
                <div style={{
                    color: 'white',
                    background: 'crimson',
                    border: '2px solid white'
                }} className="modal-box">
                    <h3 className="flex justify-center text-white items-center gap-x-2"><span><TbAlertOctagonFilled size={30} color={'black'}></TbAlertOctagonFilled></span> <span>Hey, Attention please!</span></h3>

                    <h3 className="flex justify-center text-white my-2">If you are authenticated, you should obviously know the secret password. Type it below to procceed.</h3>

                    <textarea onChange={(e) => handleEditProduct(e)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " />

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>


            {
                isModalOpen && <div className={`${HomeComponentCss.modalContainer}`}><CustomModal closeModal={closeModal} /></div>
            }


        </div>
    );
};

export default Page;