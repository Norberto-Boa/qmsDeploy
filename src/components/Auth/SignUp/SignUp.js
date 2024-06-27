import React, { useState } from 'react';
import './SignUp.css';
import logo from '../../Assets/logo.png';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../services/API';
import { setLoader, UnsetLoader } from '../../../redux/actions/LoaderActions';
import { AuthBg } from '../auth-bg/Auth-bg';
import { LanguageSelector } from '../i18buttons/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const SignUp = () => {
    const { t } = useTranslation(); // Initialize useTranslation hook
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onTouched"
    });
    const dispatch = useDispatch(); // Initialize useDispatch hook

    const [userAlreadyExists, setUserAlreadyExists] = useState(null);
    const navigate = useNavigate();

    const onSubmit = (data, e) => {
        dispatch(setLoader());
        e.preventDefault();
        let obj = {
            "email": data.email,
            "password": data.password
        };

        AuthService.Signup(obj)
            .then((res) => {
                dispatch(UnsetLoader());
                console.log(res);
                navigate("/otp");
            }).catch((error) => {
                dispatch(UnsetLoader());
                setUserAlreadyExists(error.response.data.message);
                console.log(error);
            });
    };

    const handleClicked = () => {
        navigate("/login");
    };

    return (
        <>
            <div className=''>
                <div className="flex min-h-[90vh] flex-1 flex-col justify-center px-6 py-6 lg:px-8">
                    <LanguageSelector /> {/* Language selector added here */}
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-20 w-auto"
                            src={logo}
                            alt={t('company_name')}
                        />
                        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                            {t('create_account')}
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-4" method="POST" onSubmit={handleSubmit(onSubmit)}>

                            <p className="text-red-500 text-sm">{errors.aopt?.message}</p>

                            {/* Email Address */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    {t('email_label')}
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder={t('email_label')}
                                        required
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        {...register("email", {
                                            required: t('email_required'),
                                            pattern: {
                                                value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                                message: t('valid_email')
                                            }
                                        })}
                                    />
                                </div>
                                <p className="text-red-500 text-sm">{errors.email?.message}</p>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                        {t('password_label')}
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder={t('password_label')}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        {...register("password", {
                                            required: t('password_required'),
                                            minLength: { value: 8, message: t('password_min_length') },
                                            maxLength: { value: 14, message: t('password_max_length') }
                                        })}
                                    />
                                    <p className="text-red-500 text-sm">{errors.password?.message}</p>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                        {t('cpassword_label')}
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="cpassword"
                                        name="cpassword"
                                        type="password"
                                        placeholder={t('cpassword_label')}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        {...register("cpassword", {
                                            required: t('confirm_password_required'),
                                            minLength: { value: 8, message: t('password_min_length') },
                                            maxLength: { value: 14, message: t('password_max_length') }
                                        })}
                                    />
                                    <p className="text-red-500 text-sm">{errors.cpassword?.message}</p>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {t('sign_up_button')}
                                </button>

                                <p className='mt-2 text-red-400 text-center capitalize font-medium'>{userAlreadyExists}</p>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-white">
                            {t('already_account')}{' '}
                            <a href="" onClick={handleClicked} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                {t('signin')}
                            </a>
                        </p>
                    </div>
                </div>

                <AuthBg />
            </div>
        </>
    );
};

export default SignUp;
