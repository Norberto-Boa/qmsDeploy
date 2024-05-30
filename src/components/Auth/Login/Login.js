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
            <div className='middle-portion'>
                <div className='login-heading'>
                    <p>Welcome Back <span className='ques'>!</span></p>
                </div>

                <form class="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
                    <div class="mb-6">
                        <div class="flex items-center mb-4 justify-center">
                            <label class="flex items-center text-gray-700 mr-4">
                                <input
                                    {...register("aopt", { required: "This field is required" })}
                                    type="radio"
                                    name="aopt"
                                    value="customer"
                                    id="field-customer"
                                    class="mr-2"
                                />
                                Customer
                            </label>
                            <label class="flex items-center text-gray-700">
                                <input
                                    {...register("aopt", { required: "This field is required" })}
                                    type="radio"
                                    name="aopt"
                                    value="store"
                                    id="field-store"
                                    class="mr-2"
                                />
                                Store
                            </label>
                        </div>
                        <p class="text-red-500 text-sm">{errors.aopt?.message}</p>
                    </div>

                    <div class="mb-6">
                        <label class="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="email"
                            placeholder="Enter Email Address"
                            name="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                    message: "This is not a valid email"
                                }
                            })}
                        />
                        <p class="text-red-500 text-sm">{errors.email?.message}</p>
                    </div>

                    <div class="mb-6 relative">
                        <label class="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <div class="relative">
                            <input
                                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type={toggle ? "text" : "password"}
                                placeholder="Enter Password"
                                name="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 8, message: "Password must be more than 8 characters" },
                                    maxLength: { value: 14, message: "Password cannot exceed more than 14 characters" }
                                })}
                            />
                            <span
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={() => { setToggle(!toggle) }}
                            >
                                <i class={`fa ${toggle ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </span>
                        </div>
                        <p class="text-red-500 text-sm">{errors.password?.message}</p>
                    </div>

                    <p class="text-blue-600 cursor-pointer mb-4" onClick={handleClick}>
                        <u>Forgot password?</u>
                    </p>

                    <button class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200" type="submit">
                        Login
                    </button>

                    <p className='text-xl mb-2 text-red-400'>{authError}</p>


                    <p class="mt-4 text-center text-gray-600">
                        Create New Account <span class="text-blue-600 cursor-pointer" onClick={handleClicked}>Signup</span>
                    </p>
                </form>
            </div>
            <div className='queue-img'>
                <img className="pic" src={image} alt="logo" />
            </div>
        </div>
    )
}

export default Login