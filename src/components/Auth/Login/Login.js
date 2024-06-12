import React, { useState, useEffect } from 'react'
import Navbar from '../../Layout/Navbar/Navbar'
import { useForm } from 'react-hook-form'
import image from '../../Assets/pic.svg'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import AuthService from '../../../services/API'
import { useDispatch } from 'react-redux'
import { setLoader, UnsetLoader } from '../../../redux/actions/LoaderActions'
import { checkStore } from '../../../redux/actions/LayoutAction'
const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onTouched"
    });

    const [authError, setAuthError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmit = (data, e) => {
        dispatch(setLoader())
        e.preventDefault();
        let obj = {
            "email": data.email,
            "password": data.password,
            "isStore": data.aopt === "store" ? false : true
        }
        AuthService.Login(obj)
            .then((res) => {
                dispatch(UnsetLoader())

                if (res) {
                    localStorage.setItem("access", res.data.access_token);
                    localStorage.setItem("access", res.data.refresh_token);
                    localStorage.setItem("userid", res.data._id);

                    if (!obj.isStore) {
                        dispatch(checkStore())
                            .then((res) => {
                                localStorage.setItem("user_shop", res.data._id);
                                navigate(`/store/${res.data._id}`);
                            })
                    }

                    localStorage.removeItem("user_shop");
                    navigate("/")
                }
            }).catch((e) => {
                dispatch(UnsetLoader())
                setAuthError(e.response.data.message)
            })
    }
    const handleClick = () => {
        navigate("/forgot");
    }
    const handleClicked = () => {
        navigate("/signup");
    }
    const [toggle, setToggle] = useState(false);
    return (
        <div className='Signup-Page'>
            <div className='Navbar-Signup'>
                <Navbar />
            </div>
            <>
                {/*
                    This example requires updating your template:

                    ```
                    <html class="h-full bg-white">
                    <body class="h-full">
                    ```
                */}
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-6">
                                <div className="flex items-center mb-4 justify-center">
                                    <label className="flex items-center text-gray-700 mr-4">
                                        <input
                                            {...register("aopt", { required: "This field is required" })}
                                            type="radio"
                                            name="aopt"
                                            value="customer"
                                            id="field-customer"
                                            className="mr-2"
                                            required
                                        />
                                        Customer
                                    </label>
                                    <label className="flex items-center text-gray-700">
                                        <input
                                            {...register("aopt", { required: "This field is required" })}
                                            type="radio"
                                            name="aopt"
                                            value="store"
                                            id="field-store"
                                            className="mr-2"
                                        />
                                        Store
                                    </label>
                                </div>
                            </div>

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

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
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

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>

                                <p className='mt-2 text-red-400 text-center capitalize font-medium'>{authError}</p>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Start a 14 day free trial
                            </a>
                        </p>
                    </div>
                </div>
            </>
        </div>
    )
}

export default Login