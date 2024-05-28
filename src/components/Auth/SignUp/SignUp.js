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

            <div className='middle-portion'>
                <div className='login-heading'>
                    <p>Hate Never Ending Queues <span className='ques'>?</span></p>
                </div>
                <form className='bg-white p-8 rounded-lg shadow-md w-full max-w-md' onSubmit={handleSubmit(onSubmit)}>
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

                    {/* <div className='flex flex-col'>
                        <input className='border border-gray-300 rounded-md p-2' type="email" placeholder='Enter Email Address' name="email" 
                        {...register("email", 
                        { required: "Email is required", 
                        pattern: { 
                            value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 
                            message: "This is not a valid email" } 
                        })} 
                        />
                        <p className='text-red-500'>{errors.email?.message}</p>
                    </div> */}

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

                    {/* <div className='flex flex-col'>
                        <div className='relative'>
                            <input className='border border-gray-300 rounded-md p-2 pr-10' type={toggle ? "text" : "password"} placeholder='Enter New Password' name="password" {...register("password", { required: "password is required", minLength: { value: 8, message: "Password must be more than 8 characters" }, maxLength: { value: 14, message: "Password cannot exceed more than 14 characters" } })} />
                            <span className='absolute inset-y-0 right-0 flex items-center pr-2'>
                                {toggle ? <i className="fa fa-eye-slash" aria-hidden="true" onClick={() => { setToggle(!toggle) }}></i> : <i className="fa fa-eye" aria-hidden="true" onClick={() => { setToggle(!toggle) }}></i>}
                            </span>
                        </div>
                        <p className='text-red-500'>{errors.password?.message}</p>
                    </div> */}

                    <div class="mb-6 relative">
                        <label class="block text-gray-700 mb-2" htmlFor="cpassword">Confirm Password</label>
                        <div class="relative">
                            <input
                                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type={toggle ? "text" : "password"}
                                placeholder="Re-enter Password"
                                name="cpassword"
                                {...register("cpassword", {
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
                        <p class="text-red-500 text-sm">{errors.cpassword?.message}</p>
                    </div>

                    {/* <div className='flex flex-col'>
                        <div className='relative'>
                            <input className='border border-gray-300 rounded-md p-2 pr-10' type={toggle1 ? "text" : "password"} placeholder='Re-enter New Password' name="cpassword" {...register("cpassword", { required: "password is required", minLength: { value: 8, message: "Password must be more than 8 characters" }, maxLength: { value: 14, message: "Password cannot exceed more than 14 characters" } })} />
                            <span className='absolute inset-y-0 right-0 flex items-center pr-2'>
                                {toggle1 ? <i className="fa fa-eye-slash" aria-hidden="true" onClick={() => { setToggle1(!toggle1) }}></i> : <i className="fa fa-eye" aria-hidden="true" onClick={() => { setToggle1(!toggle1) }}></i>}
                            </span>
                        </div>
                        <p className='text-red-500'>{errors.cpassword?.message}</p>
                    </div> */}

                    <button class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200" type="submit">
                        Sign Up
                    </button>
                    <p className='text-center'>Existing users <u className='text-blue-500 cursor-pointer' onClick={handleClicked}>Login</u></p>
                    <span className='text-red-500 text-center font-bold'>{userAlreadyExists}</span>
                </form>
            </div>
            <div className='queue-img'>
                <img className="pic" src={image} alt="logo" />
            </div>

        </div>
    </>)
}
export default SignUp