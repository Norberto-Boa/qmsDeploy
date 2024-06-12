import React, { useState, useEffect } from 'react'
import Navbar from '../../Layout/Navbar/Navbar'
import image from '../../Assets/pic.svg'
import './OTP.css'
import OtpInput from 'react-otp-input';
import AuthService from '../../../services/API'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setLoader, UnsetLoader } from '../../../redux/actions/LoaderActions';
const Otp = () => {
    const [state, setState] = useState('');
    const [flag, setFlag] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const handleChange = (otp) => setState(otp);
    const x = localStorage.getItem("forgot");
    const { email, pass } = useSelector((state) => state.AuthReducer);
    const style = {
        gap: "2rem",
        marginBottom: "1rem",
        justifyContent: "space-between",
        alignItem: "center",
        display: "flex"
    }
    const handleClick = () => {
        setMinutes(1);
        let mail = localStorage.getItem("email");
        AuthService.resendotp(mail);
    }
    const navigate = useNavigate();
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        dispatch(setLoader())
        e.preventDefault();
        if (localStorage.getItem("forgot") === '1') {
            localStorage.removeItem("forgot");
            let obj = {
                "email": localStorage.getItem("emailj"),
                "userOtp": state
            }
            AuthService.otp(obj)
                .then((res) => {
                    dispatch(UnsetLoader())
                    console.log(res);
                    navigate("/reset");
                }).catch((e) => {
                    dispatch(UnsetLoader())

                    console.log(e);
                })
        } else {
            let obj = {
                "email": email,
                "otp": state,
                "password": pass,
            }
            AuthService.otp(obj)
                .then((res) => {
                    dispatch(UnsetLoader())

                    console.log(res);
                    navigate("/detail");
                }).catch((e) => {
                    dispatch(UnsetLoader())
                    console.log(e);
                })
        }
    }
    return (<>
        <div className='Signup-Page'>
            <div className='Navbar-Signup'>
                <Navbar />
            </div>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mb-4 min-h-full flex-1 flex-col justify-center items-center flex'>
                <div className='flex  mx-auto justify-center items-center'>
                    {/*
                    x === '1' ? <div className='login-heading'>
                        <p>Check your email <span className='ques'>.</span></p>
                    </div> : <div className='otp-heading'>
                        <p>Let us verify your email <span className='ques'>.</span></p>
                    </div>
                */}

                    <div>
                        <form className='' onSubmit={(e) => handleSubmit(e)}>
                            <p className='text-2xl text-slate-800 font-bold text-center mb-2 p-4'>Enter OTP</p>
                            <div className=''>
                                <OtpInput
                                    value={state}
                                    onChange={handleChange}
                                    numInputs={4}
                                    hasErrored={flag}
                                    errorStyle={{ border: "3px solid red", borderRadius: "15px" }}
                                    containerStyle={style}
                                    inputStyle={{ width: "3rem", height: "3rem", border: "2px solid black", borderRadius: "8px", fontFamily: "Source Sans Pro", fontWeight: "900", fontSize: "3em", color: "#304D6D" }}
                                />
                                <button className='w-full bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600 transition duration-200 font-bold' type='submit'>Verify</button>
                            </div>
                            <p className="mt-2 text-center text-sm text-gray-500">
                                Did not Receive the OTP?{' '}
                                <a href="" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Resend OTP
                                </a>
                            </p>
                            {/* <p className='text-center'>Didn't receive! {
                                minutes === 0 && seconds === 0
                                    ? <u onClick={handleClick} className='cursor-pointer'>Resend OTP</u>
                                    : <p className='timer'> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                            }
                            </p> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Otp