import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../../firebase.init';
import UseAdmin from '../../../hooks/UseAdmin';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = UseAdmin(user);
    return (
        <div className="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content px-2 md:px-8 lg:px-10">
                {/* <!-- Page content here --> */}
                <h4 className='text-primary font-bold text-left'>{user.displayName},</h4>
                {
                    admin ? <h2 className='text-3xl text-left font-bold text-purple-600'>Welcome to your <span className='text-pink-600'>admin</span> dashboard</h2> : <h2 className='text-3xl text-left font-bold text-purple-600'>Welcome to your <span className='text-pink-600'>customer</span> dashboard</h2>
                }
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    {
                        !admin && <li><Link className='font-semibold link link-hover link-primary' to='/dashboard'>my Orders</Link></li>
                    }
                    {
                        !admin && <li><Link className='font-semibold link link-hover link-primary' to='/dashboard/myreview'>my review</Link></li>
                    }

                    {
                        admin && <li><Link className='font-semibold link link-hover link-primary' to='/dashboard'>all users</Link></li>
                    }
                    {
                        admin && <li><Link className='font-semibold link link-hover link-primary' to='/dashboard/allorders'>all orders</Link></li>
                    }
                    {/* {
                        !admin && <li><Link className='text-blue-700 font-semibold' to='/dashboard/myorders'>Orders</Link></li>
                    } */}
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;