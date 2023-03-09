import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faThumbsUp, } from '@fortawesome/free-solid-svg-icons'
import { faFontAwesome, faReact, faNode, faJsSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Comment from '../Comment/Comment';
import { toast } from 'react-toastify';

const Post = ({ post, refetch }) => {
    const [seeComments, setSeeComments] = useState(false);

    const handleSeeComments = () => {
        setSeeComments(!seeComments);
    }

    const [user] = useAuthState(auth);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    library.add(fas, faFontAwesome, faReact, faNode, faJsSquare, faThumbsUp);
    const { _id, posterName, posterEmail, posterImage, petName, petImage, petPrice, postMoment, isSold, details, comments, reacts, address } = post;

    const onSubmit = data => {
        console.log(data);
        const updatedPost = {
            posterEmail: posterEmail,
            posterName: posterName,
            posterImage: posterImage,
            postMoment: postMoment,
            isSold: isSold,
            comments: [...comments, {
                commentId: comments.length + 1,
                commenterName: user.displayName,
                commenterEmail: user.email,
                comment: data.comment,
                commenterImage: user.photoURL

            }],
            reacts: reacts,
            address: address,
            details: details,
            petImage: petImage,
            petName: petName,
            petPrice: petPrice
        }

        fetch(`http://localhost:5000/post/${_id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedPost)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    reset();
                    refetch();
                    toast.success("Comment Added Successfully");
                }
            })
    }

    return (
        <div className='border border-blue-700 mb-5 rounded-lg py-6 shadow-lg'>
            <div className='flex justify-between px-4 md:px-6 lg:px-8 mb-4'>
                <div>
                    <div className='flex justify-start items-center mb-2'>
                        <div className="avatar mr-3">
                            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={posterImage} alt="posterImage" />
                            </div>
                        </div>
                        <div className='text-left'>
                            <p className='font-bold text-md'>{posterName}</p>
                            <p className='text-xs text-slate-400'>{posterEmail}</p>
                            <p className='text-xs text-slate-400'>{postMoment}</p>
                        </div>
                    </div>
                    {/* <div className='flex justify-start text-xs'>
                        <p className=''>{postMoment}</p>
                    </div> */}
                </div>
                {
                    (user?.email === posterEmail) && <div className='flex justify-end'>
                        <button className='btn btn-xs'>edit</button>
                        <button className='btn btn-xs ml-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                }
            </div>
            <div className='text-left px-4 md:px-6 lg:px-8 mb-2'>
                <div className='mb-3'>
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-start'>
                            <h1 className='text-2xl font-bold mr-2'>{petName}</h1>
                            <p className='text-2xl font-bold text-pink-700'>{petPrice}</p>
                        </div>
                        <div>
                            {
                                (user?.email !== posterEmail) ? <div>
                                    {
                                        !user ? <Link className='btn btn-secondary btn-xs md:btn-sm' to='/login'>Oredr Now</Link> : <button
                                            className='btn btn-secondary btn-xs md:btn-sm'>
                                            Oredr Now
                                        </button>
                                    }
                                </div> : <div>
                                    {
                                        !user ? <Link className='btn btn-secondary btn-xs md:btn-sm' to='/login'>Oredr Now</Link> : <button
                                            className='btn btn-warning btn-xs md:btn-sm'>
                                            yet to sell
                                        </button>
                                    }
                                </div>
                            }
                            {
                                address && <h6 className='text-xs'>Location: {address}</h6>
                            }
                        </div>
                    </div>
                    <p className='text-xs'>pet code: {_id}</p>
                </div>
                <p className='text-slate-500'>{details}</p>
            </div>
            <div>
                <img className='w-full h-[300px] md:h-[400px] lg:h-[600px]' src={petImage} alt="petImage" />
            </div>
            <div className='flex justify-between px-4 md:px-6 lg:px-8 mt-2'>
                <div className='flex justify-center items-center font-bold'>
                    <FontAwesomeIcon className='text-xl' icon="fa-solid fa-thumbs-up" />
                    <p className='ml-2'>{reacts.length}</p>
                </div>
                <div className='flex justify-center items-center font-bold'>
                    <p>{comments.length}</p>
                    <button
                        onClick={handleSeeComments}
                        className='ml-2 link link-hover'>
                        comments
                    </button>
                </div>
            </div>
            <div className="divider"></div>
            <div className='flex justify-evenly'>
                <button className='flex justify-center items-center'>
                    <FontAwesomeIcon className='mr-2' icon="fa-solid fa-thumbs-up" />
                    <p>Like</p>
                </button>

                <div className="dropdown dropdown-start">
                    <label tabIndex={0} className="flex justify-center items-center cursor-pointer">
                        <FontAwesomeIcon className='mr-2' icon="fa-solid fa-comment" />
                        <p>Comment</p>
                    </label>
                    <form onSubmit={handleSubmit(onSubmit)} tabIndex={0} className="dropdown-content p-2 shadow bg-base-100 rounded-box w-[200px] md:w-[300px] lg:w-[500px] flex justify-between">
                        <div className="form-control w-full max-w-xs">
                            <input
                                type="text"
                                placeholder='your comment'
                                className="input input-sm input-bordered w-full max-w-xs"
                                {...register("comment", {
                                    required: {
                                        value: true,
                                        message: "comment is required"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.comment?.type === 'required' && <span className="label-text-alt text-red-600">{errors.comment.message}</span>}
                            </label>
                        </div>
                        <input
                            className='btn btn-sm btn-primary'
                            type="submit"
                            value="submit"
                        />
                    </form>
                </div>
                <button className='flex justify-center items-center'>
                    <FontAwesomeIcon className='mr-2' icon="fa-solid fa-paperclip" />
                    <p>Copy</p>
                </button>
            </div>

            {
                seeComments && <div className='divider'></div>
            }

            {
                seeComments && <div className='px-4 md:px-6 lg:px-8 mb-4'>
                    <h3 className='text-ms font-bold text-left mb-2'>Comments</h3>
                    <div className='flex flex-col gap-3'>
                        {
                            comments.map(comment => <Comment
                                key={comment.commentId}
                                comment={comment}
                            ></Comment>)
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Post;