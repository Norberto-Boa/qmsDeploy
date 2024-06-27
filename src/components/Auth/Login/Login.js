import React, { useState } from 'react';
import logo from '../../Assets/logo.png';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import AuthService from '../../../services/API';
import { useDispatch } from 'react-redux';
import { setLoader, UnsetLoader } from '../../../redux/actions/LoaderActions';
import { checkStore } from '../../../redux/actions/LayoutAction';
import { AuthBg } from '../auth-bg/Auth-bg';
import { useTranslation } from 'react-i18next';
import { changeLocale } from '../../../redux/actions/LocaleActions';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const dispatch = useDispatch();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        dispatch(changeLocale(lng));
    };

    return (
        <div className="flex justify-center items-center mb-4">
            <button className="px-2 py-1 rounded bg-white text-gray-800" onClick={() => changeLanguage('en')}>
                EN
            </button>
            <button className="px-2 py-1 rounded bg-white text-gray-800 ml-2" onClick={() => changeLanguage('pt')}>
                PT
            </button>
            {/* Add more buttons for other languages as needed */}
        </div>
    );
};

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onTouched"
    });
    const { t, i18n } = useTranslation();
    const [authError, setAuthError] = useState(null);
    const [loader, setOwnLoader] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (data, e) => {
        dispatch(setLoader())
        setOwnLoader(true);
        e.preventDefault();
        let obj = {
            "email": data.email,
            "password": data.password,
            "isStore": data.aopt === "store" ? false : true
        }
        AuthService.Login(obj)
            .then((res) => {
                dispatch(UnsetLoader());
                setOwnLoader(false);

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
                setOwnLoader(false);
                setAuthError(e.response.data.message)
            })
    };

    const handleForgotPasswordClick = () => {
        navigate("/forgot");
    };

    const handleSignUpClick = () => {
        navigate("/signup");
    };


    return (
        <div className="relative">
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-6 lg:px-8 z-10">
                <LanguageSelector /> {/* Language selector added here */}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-20 w-auto"
                        src={logo}
                        alt="Your Company"
                    />
                    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        {t('signin_title')}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6">
                            <div className="flex items-center mb-4 justify-center">
                                <label className="flex items-center text-white mr-4">
                                    <input
                                        {...register("aopt", { required: t('This field is required') })}
                                        type="radio"
                                        name="aopt"
                                        value="customer"
                                        id="field-customer"
                                        className="mr-2"
                                        required
                                    />
                                    {t('customer')}
                                </label>
                                <label className="flex items-center text-white">
                                    <input
                                        {...register("aopt", { required: t('This field is required') })}
                                        type="radio"
                                        name="aopt"
                                        value="store"
                                        id="field-store"
                                        className="mr-2"
                                    />
                                    {t('store')}
                                </label>
                            </div>
                        </div>

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
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("email", {
                                        required: t('Email is required'),
                                        pattern: {
                                            value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                            message: t('This is not a valid email')
                                        }
                                    })}
                                />
                            </div>
                            <p className="text-red-500 text-sm">{errors.email?.message}</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    {t('password_label')}
                                </label>
                                <div className="text-sm">
                                    <a href="" onClick={handleForgotPasswordClick} className="font-semibold text-white hover:text-blue-std">
                                        {t('forgot_password')}
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
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("password", {
                                        required: t('Password is required'),
                                        minLength: { value: 8, message: t('Password must be more than 8 characters') },
                                        maxLength: { value: 14, message: t('Password cannot exceed more than 14 characters') }
                                    })}
                                />
                                <p className="text-red-500 text-sm">{errors.password?.message}</p>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`flex w-full justify-center disabled:opacity-70 rounded-md bg-blue-std px-3 py-1.5 text-sm font-semibold leading-6 transition-all duration-300 text-white shadow-sm hover:bg-blue-std-heavy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                disabled={loader}
                            >
                                {loader ? t('loading') : t('signin_button')}
                            </button>

                            <p className='mt-2 text-red-400 text-center capitalize font-medium'>{authError}</p>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-white">
                        {t('not_a_member')}{' '}
                        <a href="" onClick={handleSignUpClick} className="font-semibold leading-6 text-blue-400 hover:text-blue-std">
                            {t('create_account')}
                        </a>
                    </p>
                </div>
            </div>

            <AuthBg />
        </div>
    )
}

export default Login;
