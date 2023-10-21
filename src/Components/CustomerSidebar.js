"use client"
import React from 'react';
import DashboardCSS from "../../style/Dashboard.module.css";
import { BsCameraFill, BsDashCircleDotted, BsEarbuds, BsFan, BsFillCalculatorFill, BsFillSpeakerFill, BsRouterFill, BsSunglasses, BsUsbDriveFill, BsWatch } from 'react-icons/bs';
import { GiEarbuds, GiLightBulb, GiOldMicrophone } from 'react-icons/gi';
import { MdIron, MdLuggage, MdSell } from 'react-icons/md';
import { TbFridge } from 'react-icons/tb';
import { BiSolidMemoryCard, BiSolidWebcam } from 'react-icons/bi';
import { FaBlender } from 'react-icons/fa';
import { ImHeadphones } from 'react-icons/im';
import { RiWebcamFill } from 'react-icons/ri';
import { LuCable } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

const CustomerSidebar = () => {
    const router = useRouter(); 
    return (
        <div className={`h-full w-[320px]`}>
            <div style={{ overflow: 'hidden' }} className={`h-full text-black ${DashboardCSS.customerSidebar} ${DashboardCSS.sidebarBackground}`}>
                <img onClick={()=> router.push('/products')} className="block mx-auto py-[
                    6px] w-[150px] h-[100px]" src='https://i.ibb.co/grM5C0K/IMG-20230923-145307-1-removebg-preview.png
                    ' alt="" />
                {/* <h1 style={{color: 'purple'}} className='flex justify-center font-mono text-3xl font-bold py-[24px]'>Bee Raw</h1> */}

                <div className={`${DashboardCSS.content} pb-8`} style={{ overflowY: 'scroll', height: '90vh' }}>
                    <div onClick={()=>router.push('/products/best-seller')}
                        className={`flex items-center gap-x-4 mx-[24px] ${DashboardCSS.sidebarHeading} py-[4px] pl-[16px]`}>
                        <span><MdSell size={25} color={'green'}></MdSell></span>
                        <p>Best seller</p>
                    </div>

                    <div onClick={()=>router.push('/products/tws')}
                        className={``}>
                        <div className={`flex items-center mx-[24px] pl-[16px] py-[4px] gap-x-4 ${DashboardCSS.sidebarHeading}`}>
                            <span><BsEarbuds size={25}></BsEarbuds></span>
                            <p className="">TWS (Bluetooth Ear Bud)</p>
                        </div>
                    </div>

                    <div onClick={()=> router.push('/products/smart-watch')}
                        className={``}>
                        <div className={`flex items-center mx-[24px] pl-[16px] py-[4px] gap-x-4 ${DashboardCSS.sidebarHeading}`}>
                        <span><BsWatch size={25}></BsWatch></span>
                            <p className="">Smart Watch</p>
                        </div>
                    </div>

                    <div onClick={()=> router.push('/products/tripod')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}
                    >
                        <img src="https://i.ibb.co/HCN5nDF/tripod-icon-white-vector-16068940-removebg-preview.png" className='w-[28px] h-[28px]' alt="" />
                        <p>Tripod</p>
                    </div>

                    <div onClick={()=> router.push('/products/speaker')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><BsFillSpeakerFill size={25}></BsFillSpeakerFill></span>
                        <p>Speaker</p>
                    </div>

                    <div  onClick={()=> router.push('/products/microphone')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><GiOldMicrophone size={25}></GiOldMicrophone></span>
                        <p>Microphone</p>
                    </div>

                    <div  onClick={()=> router.push('/products/microphone')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}
                    >
                        <span><BiSolidWebcam size={25}></BiSolidWebcam></span>
                        <p>Webcam</p>
                    </div>

                    <div  onClick={()=> router.push('/products/rgb-light')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}
                    >
                        <span><GiLightBulb size={25}></GiLightBulb></span>
                        <p>RGB Light</p>
                    </div>

                    <div  onClick={()=> router.push('/products/fan')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}
                    >
                        <span><BsFan size={25}></BsFan></span>
                        <p>Fan</p>
                    </div>


                    <div  onClick={()=> router.push('/products/fan')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}
                    >
                       <img src="https://i.ibb.co/ChpPqSy/clipper-icon-white-vector-16108954-removebg-preview.png" className='w-[28px] h-[28px]' alt="" />
                        <p>Trimmer</p>
                    </div>

                    <div  onClick={()=> router.push('/products/ring-light')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><BsDashCircleDotted size={25}></BsDashCircleDotted></span>
                        <p>Ring Light</p>
                    </div>


                    <div  onClick={()=>router.push('/products/neckband')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><GiEarbuds size={25}></GiEarbuds></span>
                        <p>Neck Band</p>
                    </div>

                    <div  onClick={()=>router.push('/products/blender')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><FaBlender size={25}></FaBlender></span>
                        <p>Blender</p>
                    </div>

                    <div  onClick={()=>router.push('/products/headphone')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><ImHeadphones size={25}></ImHeadphones></span>
                        <p>Headphone</p>
                    </div>

                    <div  onClick={()=>router.push('/products/memory-card')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><BiSolidMemoryCard size={25}></BiSolidMemoryCard></span>
                        <p>Memory card</p>
                    </div>

                    {/* <div
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><BsRouterFill size={25}></BsRouterFill></span>
                        <p>Green Screen</p>
                    </div> */}

                    <div  onClick={()=> router.push('/products/ip-camera')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><RiWebcamFill size={25}></RiWebcamFill></span>
                        <p>IP Camera</p>
                    </div>

                    <div  onClick={()=>router.push('/products/cable')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><LuCable size={25}></LuCable></span>
                        <p>Cable</p>
                    </div>


                    <div  onClick={()=>router.push('/products/calculator')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><BsFillCalculatorFill size={25}></BsFillCalculatorFill></span>
                        <p>Calculator</p>
                    </div>


                    <div  onClick={()=> router.push('/products/bags-luggage')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><MdLuggage size={25}></MdLuggage></span>
                        <p>Bags & Luggage</p>
                    </div>


                    <div  onClick={()=> router.push('/products/action-camera')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><BsCameraFill size={25}></BsCameraFill></span>
                        <p>Action Camera</p>
                    </div>


                    <div  onClick={()=>router.push('/products/iron')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><MdIron size={25}></MdIron></span>
                        <p>Iron</p>
                    </div>


                    <div  onClick={()=>router.push('/products/pen-drive')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><BsUsbDriveFill size={25}></BsUsbDriveFill></span>
                        <p>Pen Drive</p>
                    </div>

                    <div  onClick={()=>router.push('/products/sun-glass')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><BsSunglasses size={25}></BsSunglasses></span>
                        <p>Sun Glass</p>
                    </div>


                    <div onClick={()=>router.push('/products/clip-lamp')}
                        className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading}`}>
                        <span><TbFridge size={25}></TbFridge></span>
                        <p>Clip Lamp</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CustomerSidebar;