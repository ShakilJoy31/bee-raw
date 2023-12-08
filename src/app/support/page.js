"use client"
import 'aos/dist/aos.css';

import React from 'react';

import { FaInstagramSquare } from 'react-icons/fa';
import {
  FaFacebookMessenger,
  FaPhone,
} from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io';

import { verificationFieldsRound } from '@/constants/speceing';

import MyServiceCSS from '../../../style/MyServiceCSS.module.css';

const Page = () => {
  return (
    <div className='h-50 my-4'>

      {/* The content... */}
      {/* bg-gradient-to-r from-purple-500 to-pink-500 */}
      {/* bg-gradient-to-r from-cyan-500 to-blue-500 */}
      {/* bg-gradient-to-r from-violet-500 to-fuchsia-500 */}
      <div className="card lg:card-side bg-gradient-to-r from-red-700 to-blue-700 lg:h-[350px] md:h-[350px]">
      <figure className=''>
      <img className='h-full w-[550px]' src="https://i.ibb.co/bPc8PTD/vecteezy-concept-contact-us-or-connected-customer-support-hotline-8015898.jpg" alt="Album" />
    </figure>

        <div className="lg:p-4 md:p-3 p-2 w-full">
          <div>
            <h1 className='mb-1'>Receiever Name <span className='text-red-700 text-xl pt-1'> *</span></h1>
            <div className={`flex items-center ${MyServiceCSS.tableRoomInput}`}>
              <input
                style={{
                  borderRadius: verificationFieldsRound,
                  background: 'white',
                }}
                placeholder="আপনার নামটি লিখুন"
                className="lg:w-[450px] w-full h-[45px] focus:outline-none border-0 pl-1 text-black"
                type="text"
                name=""
                id=""
              />
            </div>
          </div>





          <div>
            <h1 className='mb-1'>Receiever Email <span className='text-red-700 text-xl pt-1'> *</span></h1>
            <div className={`flex items-center ${MyServiceCSS.tableRoomInput}`}>
              <input
                style={{
                  borderRadius: verificationFieldsRound,
                  background: 'white',
                }}
                placeholder="আপনার ইমেলটি লিখুন"
                className="lg:w-[450px] w-full h-[45px] focus:outline-none border-0 pl-1 text-black"
                type="text"
                name=""
                id=""
              />
            </div>
          </div>




          <div>
            <h1 className='mb-1'>Type your message <span className='text-red-700 text-xl pt-1'> *</span></h1>
            <div className={`flex items-center ${MyServiceCSS.tableRoomInput}`}>
              <textarea
                style={{
                  borderRadius: verificationFieldsRound,
                  background: 'white',
                }}
                placeholder="আপনার ম্যাসেজটি লিখুন"
                className={`w-full h-[90px] focus:outline-none border-0 pl-1 text-black`}
                type="text"
                name=""
                id=""
              />
            </div>
          </div>



          <div className="flex justify-between items-center mt-4 lg:pl-1">
            <span><FaPhone size={25}></FaPhone></span>
            <span><FaFacebookMessenger size={25}></FaFacebookMessenger></span>
            <span><FaInstagramSquare size={25}></FaInstagramSquare></span>
            <span><IoLogoWhatsapp size={25}></IoLogoWhatsapp></span>
          <button className={`btn border-0 btn-sm w-[150px] normal-case ${MyServiceCSS.orderExtraItemButton}`}>Send</button>
          </div>
        </div>

      </div>


    </div>
  );
};

export default Page;


// style={{
//   minHeight: '50vh',
//   backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/007/113/040/small/wood-cube-with-phone-email-and-post-icons-on-white-table-over-blur-bokeh-light-background-copy-space-contact-us-free-photo.jpg')",
//   backgroundSize: 'cover',
//   backgroundPosition: 'center'
// }}