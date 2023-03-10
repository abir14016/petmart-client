import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import { useQuery } from 'react-query'
import Loading from '../Shared/Loading/Loading';
import { useForm } from "react-hook-form";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import date from 'date-and-time';
import axios from 'axios';
import { toast } from 'react-toastify';
import UseAdmin from '../../hooks/UseAdmin';

const Posts = () => {
    const [user] = useAuthState(auth);
    const [admin] = UseAdmin(user);

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const { isLoading, data: posts, refetch } = useQuery('posts', () =>
        fetch('http://localhost:5000/post').then(res =>
            res.json()
        )
    )

    if (isLoading) {
        return <Loading></Loading>
    }

    const reversedPosts = [...posts].reverse();

    const pattern = date.compile('MMM D, h:m A');
    const postMoment = date.format(new Date(), pattern);

    const imageStorageKey = "8acfe57a0358d8f000330360b14c85d9";

    const onSubmit = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

        fetch(url, {
            method: "POST",
            body: formData
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    const img = result.data.url;
                    console.log(img);
                    const currentPost = {
                        posterEmail: user?.email,
                        posterName: user?.displayName,
                        posterImage: user?.photoURL,
                        postMoment: postMoment,
                        isSold: false,
                        comments: [],
                        reacts: [],
                        address: data.address,
                        details: data.details,
                        petImage: img,
                        petName: data.petName,
                        petPrice: data.petPrice
                    }

                    //send new post to database
                    axios.post(`http://localhost:5000/post`, currentPost)
                        .then(response => {
                            const { data } = response;
                            if (data.insertedId) {
                                reset();
                                refetch();
                                toast.success("Post Added Successfully");
                            }
                        })
                }
            })
    }
    return (
        <div className="md:grid grid-cols-3 gap-4 px-2 md:px-8 lg:px-16">
            <div className="col-span-1 md:h-screen md:sticky top-[10%] overflow-y-scroll pb:5 md:pb-10">
                <div className="card w-full bg-base-100 shadow-xl h-screen">
                    <div className="card-body">
                        <h2 className="text-center text-3xl font-bold">Create Post</h2>

                        {/* name field */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={user?.displayName}
                                readOnly
                                disabled
                                className="input input-sm input-bordered w-full max-w-xs"
                                {...register("posterName")}
                            />
                        </div>
                        {/* name field */}

                        {/* email field */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={user?.email}
                                readOnly
                                disabled
                                className="input input-sm input-bordered w-full max-w-xs"
                                {...register("posterEmail")}
                            />
                        </div>
                        {/* email field */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Address field */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Addredd</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder='Your Address'
                                    className="input input-sm input-bordered w-full max-w-xs"
                                    {...register("address", {
                                        required: {
                                            value: true,
                                            message: "Address is required"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.address?.type === 'required' && <span className="label-text-alt text-red-600">{errors.address.message}</span>}
                                </label>
                            </div>
                            {/* Address field */}

                            {/* pet name field */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Pet Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder='pet catagory or name'
                                    className="input input-sm input-bordered w-full max-w-xs"
                                    {...register("petName", {
                                        required: {
                                            value: true,
                                            message: "Pet name is required"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.petName?.type === 'required' && <span className="label-text-alt text-red-600">{errors.petName.message}</span>}
                                </label>
                            </div>
                            {/* pet name field */}

                            {/* pet price field */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Pet Price</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder='pet price'
                                    className="input input-sm input-bordered w-full max-w-xs"
                                    {...register("petPrice", {
                                        required: {
                                            value: true,
                                            message: "Price is required"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.petPrice?.type === 'required' && <span className="label-text-alt text-red-600">{errors.petPrice.message}</span>}
                                </label>
                            </div>
                            {/* pet price field */}

                            {/* details field */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Details</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder='type details'
                                    className="input input-sm input-bordered w-full max-w-xs"
                                    {...register("details", {
                                        required: {
                                            value: true,
                                            message: "details is required"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.details?.type === 'required' && <span className="label-text-alt text-red-600">{errors.details.message}</span>}
                                </label>
                            </div>
                            {/* pet details field */}

                            {/* photo field */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Your pet Photo</span>
                                </label>
                                <input
                                    type="file"
                                    className="input input-bordered w-full max-w-xs text-sm file:cursor-pointer file:mr-3 file:mt-1 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-slate-600
                                    hover:file:bg-slate-400"
                                    {...register("image", {
                                        required: {
                                            value: true,
                                            message: "image is required"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.image?.type === 'required' && <span className="label-text-alt text-red-600">{errors.image.message}</span>}
                                </label>
                            </div>
                            {/* photo field */}

                            <input
                                disabled={(!user || admin)}
                                className='btn btn-sm btn-primary w-full max-w-xs'
                                type="submit"
                                value="POST"
                            />
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-span-2">
                {
                    reversedPosts.map(post => <Post
                        key={post._id}
                        post={post}
                        refetch={refetch}
                    ></Post>)
                }
            </div>
        </div>
    );
};

export default Posts;