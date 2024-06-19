import React, { useState, useEffect } from 'react'
import Navbar from '../../Layout/Navbar/Navbar'
import { useForm } from 'react-hook-form'
import image from '../../Assets/pic.svg'
import './ForgotPass.css'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthService from '../../../services/API'
import { useDispatch } from 'react-redux'
import { setLoader, UnsetLoader } from '../../../redux/actions/LoaderActions'
const Forgot = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onTouched"
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmit = (data, e) => {
        dispatch(setLoader())
        e.preventDefault();
        localStorage.setItem("forgot", 1);
        let obj = {
            "username": data.email
        }
        localStorage.setItem("emailj", data.email);
        AuthService.forgot(obj)
            .then((res) => {
                dispatch(UnsetLoader())
                console.log(res);
                navigate("/otp");
            }).catch((e) => {
                dispatch(UnsetLoader())
                console.log(e);
            })

    }
    return (
        <div className='Signup-Page'>
            <div className='Navbar-Signup'>
                <Navbar />
            </div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Recover Your Password
                    </h2>
                </div>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-4" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        {/* Email Address */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                            message: "This is not a valid email"
                                        }
                                    })}
                                />
                            </div>
                            <p class="text-red-500 text-sm">{errors.email?.message}</p>
                        </div>


                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Send OTP
                            </button>

                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" onClick={() => navigate("/login")} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Create an Account
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Forgot