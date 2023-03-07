import React from 'react';
import loginImage from "../../../assets/auth/login.webp";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../../Shared/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import registerImage from "../../../assets/auth/regester-2.png";

const Regester = () => {
    // email authentication
    const [
        createUserWithEmailAndPassword,
        emailUser,
        emailLoading,
        emailError,
    ] = useCreateUserWithEmailAndPassword(auth);

    //update name displayName and photoUrl
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    //navigate 
    const navigate = useNavigate()

    // Login form
    const { register, formState: { errors }, handleSubmit } = useForm();

    // submit button
    const onSubmit = async data => {
        // console.log(data);
        await createUserWithEmailAndPassword(data.email, data.password);
        // console.log("registered");
        await updateProfile({ displayName: data.name });
        // console.log("update done");
        setTimeout(() => {
            navigate('/');
        }, 2000);
    }

    if (emailUser) {
        console.log(emailUser);
    }
    return (
        <div className='md:flex flex-row-reverse justify-evenly items-center px-2 md:px-8 lg:px-12 h-screen'>
            <div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-3xl font-bold">Register</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* name field */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'name is required'
                                        }
                                    })}
                                />
                                {errors.name?.type === 'required' && <p className="text-error label-text-alt font-semibold">
                                    {errors.name.message}
                                </p>}
                            </div>
                            {/* name field */}

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
                                            message: 'Password is required'
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                            message: 'password must contain at least 1 number & 1 letter'
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'password must be 8 character or longer'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}
                                    {errors.password?.type === 'pattern' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}
                                </label>
                            </div>
                            {/* password field */}

                            {/* email errors and loading */}
                            {(emailError || updateError) && <p className='text-xs text-left text-red-500 mb-2'>{emailError?.message || updateError.message}</p>}
                            {(emailLoading || updating) && <Loading></Loading>}
                            {/* email errors and loading */}

                            <input
                                className='btn btn-sm btn-primary w-full max-w-xs'
                                type="submit"
                                value="REGISTER"
                            />
                        </form>
                        <p className='text-xs text-end'>Already regestered? <Link className='link link-hover text-blue-500' to="/login">plz login</Link></p>
                    </div>
                </div>
            </div>
            <div>
                <img src={registerImage} alt="registerImage" />
            </div>
        </div>
    );
};

export default Regester;