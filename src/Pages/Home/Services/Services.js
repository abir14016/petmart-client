import React, { useEffect, useState } from 'react';
import serviceImage from "../../../assets/sservices/service.svg";
import Service from '../Home/Service/Service';


const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch("services.json")
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <div>
            <div>
                <div className='flex justify-center'>
                    <img className='w-[100px]' src={serviceImage} alt="serviceImage" />
                </div>
                <div>
                    <h1 className='text-4xl'>Our <span className='text-primary'>Services</span></h1>
                    <h5>services we provide</h5>
                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 md:px-12 lg:px-16 mt-8 md:mt-10 lg:mt-12'>
                        {
                            services.map(service => <Service
                                service={service}
                                key={service._id}
                            ></Service>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;