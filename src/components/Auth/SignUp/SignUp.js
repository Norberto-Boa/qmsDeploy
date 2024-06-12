import React, { useState, useEffect } from 'react'
import './SignUp.css'
import Navbar from '../../Layout/Navbar/Navbar'
import { useForm } from 'react-hook-form'
import image from '../../Assets/pic.svg'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../../redux/actions/AuthAction'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../../services/API'
import { setLoader, UnsetLoader } from '../../../redux/actions/LoaderActions'
const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onTouched"
    });

    const [userAlreadyExists, setUserAlreadyExists] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmit = (data, e) => {
        dispatch(setLoader())
        e.preventDefault();
        dispatch(actionCreators.userEmail(data.email));
        dispatch(actionCreators.userPass(data.password));
        localStorage.setItem("email", data.email);
        let obj = {
            "email": data.email,
        }
        AuthService.Signup(obj)
            .then((res) => {
                dispatch(UnsetLoader())
                console.log(res);
                navigate("/otp");
            }).catch((error) => {
                dispatch(UnsetLoader())
                setUserAlreadyExists(error.response.data.message);
                console.log(error);
            })
    }
    const [toggle, setToggle] = useState(false);
    const [toggle1, setToggle1] = useState(false);
    const handleClicked = () => {
        navigate("/login");
    }
    return (<>
        <div className='Signup-Page'>
            <div className='Navbar-Signup'>
                <Navbar />
            </div>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create a new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-4" method="POST" onSubmit={handleSubmit(onSubmit)}>

                        <p class="text-red-500 text-sm">{errors.aopt?.message}</p>

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

                        {/*Password */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Password must be more than 8 characters" },
                                        maxLength: { value: 14, message: "Password cannot exceed more than 14 characters" }
                                    })}
                                />
                                <p class="text-red-500 text-sm">{errors.password?.message}</p>
                            </div>
                        </div>

                        {/*Confirm Password */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="cpassword"
                                    name="cpassword"
                                    type="password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("cpassword",
                                        {
                                            required: "password is required",
                                            minLength: { value: 8, message: "Password must be more than 8 characters" },
                                            maxLength: { value: 14, message: "Password cannot exceed more than 14 characters" }
                                        })}
                                />
                                <p class="text-red-500 text-sm">{errors.cpassword?.message}</p>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>

                            <p className='mt-2 text-red-400 text-center capitalize font-medium'>{ }</p>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an Account{' '}
                        <a href="" onClick={handleClicked} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>

        </div>
    </>)
}
export default SignUp