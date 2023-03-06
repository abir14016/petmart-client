import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faThumbsUp, } from '@fortawesome/free-solid-svg-icons'
import { faFontAwesome, faReact, faNode, faJsSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Post = ({ post }) => {
    library.add(fas, faFontAwesome, faReact, faNode, faJsSquare, faThumbsUp);
    const { postId, posterName, posterEmail, posterImage, petName, petImage, petPrice, postDate, postTime, details, comments, reacts } = post;
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
                        </div>
                    </div>
                    <div className='flex justify-start text-xs'>
                        <p className='mr-2'>{postTime}</p>
                        <p>{postDate}</p>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <button className='btn btn-xs'>edit</button>
                    <button className='btn btn-xs ml-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            </div>
            <div className='text-left px-4 md:px-6 lg:px-8 mb-2'>
                <div className='mb-3'>
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-start'>
                            <h1 className='text-2xl font-bold mr-2'>{petName}</h1>
                            <p className='text-2xl font-bold text-pink-700'>{petPrice}</p>
                        </div>
                        <div>
                            <button className='btn btn-secondary btn-sm'>Oredr Now</button>
                        </div>
                    </div>
                    <p className='text-xs'>pet code: {postId}</p>
                </div>
                <p className='text-slate-500'>{details}</p>
            </div>
            <div>
                <img className='w-full h-[600px]' src={petImage} alt="petImage" />
            </div>
            <div className='flex justify-between px-4 md:px-6 lg:px-8 mt-2'>
                <div className='flex justify-center items-center font-bold'>
                    <FontAwesomeIcon className='text-xl' icon="fa-solid fa-thumbs-up" />
                    <p className='ml-2'>{reacts.length}</p>
                </div>
                <div className='flex justify-center items-center font-bold'>
                    <p>{comments.length}</p>
                    <p className='ml-2'>comments</p>
                </div>
            </div>
            <div className="divider"></div>
            <div className='flex justify-evenly'>
                <button className='flex justify-center items-center'>
                    <FontAwesomeIcon className='mr-2' icon="fa-solid fa-thumbs-up" />
                    <p>Like</p>
                </button>
                <button className='flex justify-center items-center'>
                    <FontAwesomeIcon className='mr-2' icon="fa-solid fa-comment" />
                    <p>Comment</p>
                </button>
                <button className='flex justify-center items-center'>
                    <FontAwesomeIcon className='mr-2' icon="fa-solid fa-paperclip" />
                    <p>Copy</p>
                </button>
            </div>
        </div>
    );
};

export default Post;