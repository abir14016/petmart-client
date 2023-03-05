import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faStethoscope, faShoppingCart, faMoneyCheckDollar, faTruckFast, faBone, faBasketball } from '@fortawesome/free-solid-svg-icons'
import { faFontAwesome, faReact, faNode, faJsSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Service = ({ service }) => {
    library.add(fas, faFontAwesome, faReact, faNode, faJsSquare, faStethoscope, faShoppingCart, faMoneyCheckDollar, faTruckFast, faBone, faBasketball);
    const { title, icon, details, color } = service;
    return (
        <div className='border border-slate-800 p-8'>
            <div className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
                <div>
                    <FontAwesomeIcon style={{ color: `${color}` }} className='text-3xl' icon={icon}></FontAwesomeIcon>
                    <p className='text-xl font-bold'>{title}</p>
                </div>
                <div className='mt-3'>
                    <p className='text-slate-400'>{details}</p>
                </div>
            </div>
        </div>
    );
};

export default Service;