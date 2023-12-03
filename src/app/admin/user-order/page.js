"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';
import { ImCancelCircle } from 'react-icons/im';
import { MdDoneOutline } from 'react-icons/md';
import { TbCurrencyTaka } from 'react-icons/tb';

import { AdminAPI } from '@/APIcalling/adminAPI';
import Button from '@/Components/button';

import AdminCSS from '../../../../style/AdminCSS.module.css';

const Page = () => {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        AdminAPI.handleGettingOrders().then(res=> {
            setOrders(res)
        });
    },[])
    const handleDeleteOrder = (id) =>{
        
    }
    const [totalPrice, setTotalPrice] = useState('');
    const [seeOrderByAdmin, setSeeOrderByAdmin] = useState(null);
    const [idForTheOrderToDelete, setValue] = useState('');
    const handleCheckOrderByAdmin = (getOrder) => {
        document.getElementById('productDetails').showModal();
        const totalPrice = getOrder?.placedOrderForProduct?.reduce((total, cart) => total + (parseFloat(cart.price) * parseFloat(cart.quantity)), 0);
        setTotalPrice(totalPrice);
        setSeeOrderByAdmin(getOrder);
        setValue(getOrder._id);
    }

    const handleRejectOrder = () =>{
        console.log('hello');
        AdminAPI.handleDeletingOrder(idForTheOrderToDelete).then(res=> {
            const filterOrder = orders.filter(order => order._id !== idForTheOrderToDelete);
            setOrders(filterOrder);
            document.getElementById('productDetails').close();
        });
    }
    const handleAcceptOrder = () =>{
        console.log('hello');
    }
    return (
        <div className='mt-[24px] min-h-screen'>
            <div className='flex lg:justify-end md:justify-end justify-center mb-2 gap-x-2'>
                <button style={{ background: 'purple', borderRadius: '5px' }} className="py-[8px] px-[20px]">Check Orders</button>

                <button onClick={()=>router.push('/admin')} style={{ background: 'purple', borderRadius: '5px' }} className="py-[8px] px-[20px]">Upload Product</button>
            </div>

            {
                orders?.length < 1 ? <div className='w-full min-h-screen flex justify-center items-center'>
                <div>
                <span style={{color: 'purple'}} className="loading loading-infinity w-[250px] h-[150px] "></span>
              <p style={{fontFamily: 'Lucida Sans Unicode'}} className='text-white flex justify-center items-center'>Loading. Please wait...</p>
                </div>
              </div> : <div className="overflow-x-auto w-full">
                <table className="table">
                    <thead>
                        <tr>
                            <th className='text-white'><span className='flex justify-center'>SL No.</span></th>

                            <th className='text-white'><span className='flex justify-center'>Name</span></th>

                            <th className='text-white'><span className='flex justify-center'>Address</span></th>

                            <th className='text-white'><span className='flex justify-center'>Phone</span></th>

                            <th className='text-white'><span className='flex justify-center'>Email</span></th>

                            <th className='text-white'><span className='flex justify-center'>Payment Tr Id</span></th>

                            <th className='text-white'><span className='flex justify-center'>Total</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order, index) =>  <tr onClick={()=> handleCheckOrderByAdmin(order)} key={index} className={`${AdminCSS.orderRow}`}>
                            <th><span className='flex justify-center'>{index + 1}</span></th>

                            <td> <span className='flex justify-center'>{order.name}</span></td>

                            <td> <span className='flex justify-center'>{order.address}</span></td>

                            <td> <span className='flex justify-center'>{order.phoneNumber}</span></td>

                            <td> <span className='flex justify-center'>{order.email}</span></td>

                            <td> <span className='flex justify-center'>{order.paymentTrId}</span></td>

                            <td><span className='flex justify-center items-center'><span>{order?.placedOrderForProduct?.reduce((total, cart) => total + (parseFloat(cart.price) * parseFloat(cart.quantity)), 0)}</span> <span><TbCurrencyTaka color={'white'} size={20}></TbCurrencyTaka></span></span></td>

                        </tr>)
                        }
                       
                    </tbody>
                </table>
            </div>
            }
            



            <dialog id="productDetails" className="modal">
                <div style={{
                    color: 'white',
                    background: 'purple',
                    border: '1px solid white'
                }} className="modal-box">

                    <h1 className='mb-[12px] flex justify-center'>{seeOrderByAdmin?.name} orderd from {seeOrderByAdmin?.address}</h1>

                    <div className="overflow-x-auto w-full">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className='text-white'><span className='flex justify-center'>SL No.</span></th>
                                    <th className='text-white'><span className='flex justify-center'>Image</span></th>
                                    <th className='text-white px-20'><span className='flex justify-center'>Name</span></th>
                                    <th className='text-white'><span className='flex justify-center'>Price</span></th>
                                    <th className='text-white'><span className='flex justify-center'>Quantity</span></th>
                                    <th className='text-white'><span className='flex justify-center'>Color</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    seeOrderByAdmin?.placedOrderForProduct?.map((product, index) => <tr key={index}>
                                        <th><span className='flex justify-center'>{index + 1}</span></th>
                                        <td> <span className='flex justify-center'><img src={product?.productPicture[0]} alt="Product Image" style={{ borderRadius: '0 8px 0 8px' }} className='w-10 h-10' /></span></td>
                                        <td><span className='flex justify-center'>{product?.title}</span></td>
                                        <td><span className='flex justify-center'>{parseFloat(product?.price) * parseFloat(product?.quantity)}</span></td>
                                        <td><span className='flex justify-center'>{product?.quantity}</span></td>
                                        <td><span className='flex justify-center'>{product.color}</span></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className='mt-[25px]'>
                    <div className='lg:flex items-center hidden lg:justify-between md:justify-between gap-x-[48px]'>
                    <div onClick={handleRejectOrder}>
                        <Button background='#DC3545' width='150px'><div className='flex justify-evenly px-3 items-center'><span className='text-white'>Decline</span> <span><ImCancelCircle size={20} color={'white'}></ImCancelCircle></span></div></Button>
                    </div>

                    <div onClick={handleAcceptOrder}>
                        <Button background={'#9F5AE5'} width='150px'><div className='flex justify-evenly px-3 items-center'><span className='text-white'>Accept</span> <span><MdDoneOutline size={20} color={'white'}></MdDoneOutline></span></div></Button>
                    </div>
                </div>

                <div className='grid lg:hidden items-center my-[10px]'>
                    {/* Next work........ */}
                    <div onClick={handleRejectOrder}>
                        <Button background='#DC3545' width='80vw'><div className='flex justify-around px-3 items-center'><span className='text-white'>Decline</span> <span><ImCancelCircle size={25} color={'white'}></ImCancelCircle></span></div></Button>
                    </div>

                    <div onClick={handleAcceptOrder} className='mt-[10px]'>
                        <Button background={'#9F5AE5'} width='80vw'><div className='flex justify-around px-3 items-center'><span className='text-white'>Accept</span> <span><MdDoneOutline size={25} color={'white'}></MdDoneOutline></span></div> </Button>
                    </div>
                </div>
                    
                    </div>
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
