import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import AllUser from '../AllUser/AllUser';

const AllUsers = () => {
    const { isLoading, data: users, refetch } = useQuery('posts', () =>
        fetch('http://localhost:5000/user').then(res =>
            res.json()
        )
    )

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className=''>
            <h2 className='mt-5 text-bold text-blue-600 font-bold text-left'>Manage all users</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th className='text-primary'>Image</th>
                            <th className='text-primary'>Name</th>
                            <th className='text-primary'>Email</th>
                            <th className='text-primary'>Role</th>
                            <th className='text-primary'>Remove User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map(user => <AllUser
                                key={user._id}
                                user={user}
                                refetch={refetch}
                                users={users}
                            ></AllUser>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;