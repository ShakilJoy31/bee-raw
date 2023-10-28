"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { MdOutlineDeleteForever } from 'react-icons/md';

import { AdminAPI } from '@/APIcalling/adminAPI';
import Spinner from '@/Components/Spinner';

import AdminCSS from '../../../../style/AdminCSS.module.css';

const Page = () => {
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        AdminAPI.handleGettingOrders().then(res=> {
            setOrders(res)
        });
    },[])
    const handleDeleteOrder = (id) =>{
        AdminAPI.handleDeletingOrder(id).then(res=> {
            const filterOrder = orders.filter(order => order._id !== id);
            setOrders(filterOrder); 
        });
    }
    return (
        <div className='mt-[24px]'>
            <div className='flex lg:justify-end md:justify-end justify-center mb-2 gap-x-2'>
                <button style={{ background: 'purple', borderRadius: '5px' }} className="py-[10px] px-[20px]">Check Orders</button>

                <button style={{ background: 'purple', borderRadius: '5px' }} className="py-[10px] px-[20px]">Upload Product</button>
            </div>

            {
                orders?.length < 1 ? <div className='flex justify-center items-center min-h-screen lg:h-0 md:h-0'><Spinner></Spinner></div> : <div className="overflow-x-auto w-full">
                <table className="table">
                    <thead>
                        <tr>
                            <th className='text-white'><span className='flex justify-center'>SL No.</span></th>

                            <th className='text-white'><span className='flex justify-center'>Name</span></th>

                            <th className='text-white'><span className='flex justify-center'>Address</span></th>

                            <th className='text-white'><span className='flex justify-center'>Phone</span></th>

                            <th className='text-white'><span className='flex justify-center'>Email</span></th>

                            <th className='text-white'><span className='flex justify-center'>Payment Tr Id</span></th>

                            <th className='text-white'><span className='flex justify-center'>Actions</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order, index) =>  <tr key={index} className={`${AdminCSS.orderRow}`}>
                            <th><span className='flex justify-center'>{index}</span></th>

                            <td> <span className='flex justify-center'>{order.name}</span></td>

                            <td> <span className='flex justify-center'>{order.address}</span></td>

                            <td> <span className='flex justify-center'>{order.phoneNumber}</span></td>

                            <td> <span className='flex justify-center'>{order.email}</span></td>

                            <td> <span className='flex justify-center'>{order.paymentTrId}</span></td>

                            <td> <span onClick={()=>handleDeleteOrder(order._id)} className='flex justify-center'><MdOutlineDeleteForever color={'white'} size={30}></MdOutlineDeleteForever></span></td>

                        </tr>)
                        }
                       
                    </tbody>
                </table>
            </div>
            }
            



            {/* <div className='flex items-center'>
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
            </div> */}
        </div>
    );
};

export default Page;




// The onchange.  
