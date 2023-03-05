import React from 'react';
import bannerImage from '../../../assets/banner/hero_image_01.png'

const Banner = () => {
    return (
        <div className="md:grid grid-cols-5 gap-4 mt-10 md:mt-0 h-screen">
            <div className="col-span-2 flex items-center justify-center">
                <div>
                    <h1 className='text-5xl font-extrabold text-[#ed6436]'>PetMart</h1>
                    <h5>Biggest online pet market in Bangladesh</h5>
                    <h5>Biggest online pet market in Bangladesh</h5>
                    <h5>Biggest online pet market in Bangladesh</h5>
                </div>
            </div>
            <div className="col-span-3 mt-5 md:mt-0">
                <img src={bannerImage} alt="bannerImage" />
            </div>
        </div>
    );
};

export default Banner;