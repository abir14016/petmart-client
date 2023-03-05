import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo/logo.png';

const Header = () => {
    const menuItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">Services</Link></li>
        <li><Link to="/posts">Posts</Link></li>
        <li className="dropdown dropdown-hover">
            <label tabIndex={0}>
                Suppliments
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box md:w-52 lg:w-72 text-sm">
                <li><Link to="#">Cat Food</Link></li>
                <li><Link to="#">Dog Food</Link></li>
                <li><Link to="#">Bird Food</Link></li>
                <li><Link to="#">Pet Toys</Link></li>
            </ul>
        </li>
        <li><Link to="/">About</Link></li>
    </>
    return (
        <div className="navbar bg-transparent px-o md:px-8 lg:px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/">
                    <div className='flex justify-start items-center'>
                        <img className='w-[50px]' src={logo} alt="logo" />
                        <p className='md:ml-2 md:text-3xl md:font-extrabold'>pet<span className='text-orange-700'>Mart</span></p>
                    </div>
                </Link>
            </div>

            {/* menu items for desktop */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end flex">
                <button className='btn btn-primary'>Login</button>
                <div className="dropdown dropdown-end ml-2">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dropdown dropdown-end ml-2">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='' />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="#">Update Profile</Link></li>
                        <li><Link to="#">Dashboard</Link></li>
                        <li><button>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;