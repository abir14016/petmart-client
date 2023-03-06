import React from 'react';
import loginImage from "../../../assets/auth/login.webp";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const Login = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    if (user) {
        console.log(user);
    }
    return (
        <div className='md:flex justify-evenly items-center px-2 md:px-8 lg:px-12 h-screen'>
            <div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-3xl font-bold">Login</h2>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary btn-md">Login</button>
                        </div>
                        <div className="divider">or</div>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <button
                                    onClick={() => signInWithGoogle()}
                                    className="btn btn-outline btn-wide btn-sm">
                                    Continue with google
                                </button>
                            </div>
                            <div>
                                <button className="btn btn-outline btn-wide btn-sm">Continue with Facebook</button>
                            </div>
                            <div>
                                <button className="btn btn-outline btn-wide btn-sm">Continue with Github</button>
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