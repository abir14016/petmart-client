import React from 'react';
import loginImage from "../../../assets/auth/login.webp";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../../Shared/Loading/Loading';

const Login = () => {
    // google authentication
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    // email authentication
    const [
        signInWithEmailAndPassword,
        emailUser,
        emailLoading,
        emailError,
    ] = useSignInWithEmailAndPassword(auth);

    // Login form
    const { register, formState: { errors }, handleSubmit } = useForm();

    // submit button
    const onSubmit = data => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password);
    }
    return (
        <div className='md:flex justify-evenly items-center px-2 md:px-8 lg:px-12 h-screen'>
            <div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-3xl font-bold">Login</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* email field */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "email is required"
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: "plz provide a valid email"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
                                </label>
                            </div>
                            {/* email field */}

                            {/* password field */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Your Password"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Password is required"
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "plz provide 6 characters or longer"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}
                                </label>
                            </div>
                            {/* password field */}

                            {/* email errors and loading */}
                            {emailError && <p className='text-xs text-red-500 mb-2'>{emailError?.message}</p>}
                            {emailLoading && <Loading></Loading>}
                            {/* email errors and loading */}

                            <input
                                className='btn btn-sm btn-primary w-full max-w-xs'
                                type="submit"
                                value="LOGIN"
                            />
                        </form>

                        <div className="divider">or</div>

                        {/* social errors and loading */}
                        {googleError && <p className='text-xs text-red-500 mb-2'>{googleError?.message}</p>}
                        {googleLoading && <Loading></Loading>}
                        {/* social errors and loading */}

                        <div className='flex flex-col gap-3'>
                            <div>
                                <button
                                    onClick={() => signInWithGoogle()}
                                    className="btn btn-outline w-full max-w-xs btn-sm">
                                    Continue with google
                                </button>
                            </div>
                            <div>
                                <button className="btn btn-outline w-full max-w-xs btn-sm">Continue with Facebook</button>
                            </div>
                            <div>
                                <button className="btn btn-outline w-full max-w-xs btn-sm">Continue with Github</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <img src={loginImage} alt="loginImage" />
            </div>
        </div>
    );
};

export default Login;