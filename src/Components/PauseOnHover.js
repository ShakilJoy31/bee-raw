import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { useRef } from 'react';

import { useRouter } from 'next/navigation';
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
} from 'react-icons/bs';
import Slider from 'react-slick';

import DashboardCSS from '../../style/Dashboard.module.css';

const SimpleSlider = ({ products }) => {
    const router = useRouter();
    const sliderRef = useRef();
    const onlyBestSeller = products.filter((product) => product?.category === 'Best seller');
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const handleNextSlide = () => {
        sliderRef.current.slickNext();
    };
    const handlePrevSlide = () => {
        sliderRef.current.slickPrev();
    };

    return (
        <div className='mt-[12px] bg-black'>
            <div className='flex justify-between items-center px-2' style={{zIndex: '3'}}>
                <button className='mb-[-210px]' style={{zIndex: '3'}} onClick={handlePrevSlide}><BsArrowLeftCircleFill size={25} color={'purple'}></BsArrowLeftCircleFill></button>
                <button className='mb-[-210px]' style={{zIndex: '3'}} onClick={handleNextSlide}><BsArrowRightCircleFill size={25} color={'purple'}></BsArrowRightCircleFill></button>
            </div>
            <Slider ref={sliderRef} {...settings}>
                {onlyBestSeller?.map((product, index) => (
                    <div onClick={()=> router.push(`/products/${product._id}`)} key={index} className={`w-full px-2 hover:cursor-pointer ${DashboardCSS.carslImgContainer}`}>
                        <div style={{ position: 'absolute', top: '0', zIndex: '1' }} className=''>
                        </div>
                        <div style={{position: 'absolute', bottom: '10px', zIndex:'3'}} className='px-2 w-full'>
                            <h1 className='h-8'>{product.title.length > 35 ? (product.title.slice(0, 35)+'...') : product.title}</h1>
                            <div className='flex justify-between items-center'>
                                <p style={{ textDecoration: 'line-through' }} className='text-slate-400' >{product.offerPrice} ৳</p>
                                <p className='mr-4'>{product.price} ৳</p>
                            </div>
                        </div>
                        <div className={`${DashboardCSS.carslImgContainer}`}>
                            <figure><img src={product?.productPicture[0]} alt="Product Image" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px' }} /></figure>
                        </div>
                        <div
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            width: '100%',
                            height: '50%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                            zIndex: '2',
                        }}
                    ></div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SimpleSlider;



// filter: 'brightness(0.5)', webkitFilter: 'brightness(0.5)'


// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// import React from 'react';

// import Slider from 'react-slick';

// import DashboardCSS from '../../style/Dashboard.module.css';

// const SimpleSlider = ({ products }) => {
//     const onlyBestSeller = products.filter(product => product?.category === 'Best seller');
//     console.log(products);
//     var settings = {
//         dots: true,
//         infinite: true,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         pauseOnHover: true,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 3,
//                     infinite: true,
//                     dots: true
//                 }
//             },
//             {
//                 breakpoint: 600,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 2,
//                     initialSlide: 2
//                 }
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1
//                 }
//             }
//         ]
//     };
//     console.log(onlyBestSeller);
//     return (
//         <div className='mt-[24px] bg-black'>
//             <Slider {...settings}>
//                 {
//                     onlyBestSeller?.map((product, index) => <div key={index} className={`w-full px-2 hover:cursor-pointer ${DashboardCSS.carslImgContainer}`}>
//                         <div style={{ position: 'absolute', top: '0', zIndex: '1' }} className='flex justify-between w-full'>
//                             <div>
//                                 <img className='h-full' src="https://i.ibb.co/XYxDz3W/Rectangle-223.png" alt="" />
//                                 <p style={{ position: 'absolute', top: '20px', transform: 'rotate(-45deg)' }}>{product?.offer}% off</p>
//                             </div>
//                         </div>
//                         <div className={`${DashboardCSS.carslImgContainer}`}>
//                             <figure><img src={product?.productPicture[0]} alt="Product Image" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '0 8px 0 8px' }} /></figure>
//                         </div>
//                     </div>)
//                 }
//             </Slider>
//         </div>
//     );
// };

// export default SimpleSlider;