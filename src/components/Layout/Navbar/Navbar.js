import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../../Assets/logo.png';
import portuguese from '../../Assets/portuguese-flag.png'
import english from '../../Assets/english-flag.png'
import { Bars3Icon, XMarkIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocale } from '../../../redux/actions/LocaleActions';
// import { classNames } from '../../utils';

const navigation = [
    { name: 'Dashboard', href: '/', path: "/", current: true },
    { name: 'MyStore', href: '/create-store', path: "/create-store", current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [shop, setShop] = useState();


    useEffect(() => {
        setUser(localStorage.getItem("userid"));
        setShop(localStorage.getItem("user_shop"));
    }, []);

    const signingOut = () => {
        localStorage.clear();
        navigate("/login");
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        dispatch(changeLocale(lng));
    };

    return (
        <Disclosure as="nav" className="bg-navbar-bg bg-no-repeat bg-cover">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            {user ? (
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div>
                            ) : null}
                            <div className={`flex flex-1 items-center ${user ? "justify-center" : "justify-start"} sm:items-center sm:justify-start`}>
                                <div className="flex flex-shrink-0 items-center cursor-pointer" onClick={() => navigate("/")}>
                                    <img
                                        className="h-14 w-auto"
                                        src={logo}
                                        alt={t('company_name')}
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {user && navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    location.pathname === item.path ? 'border border-white text-white font-bold' : 'text-white hover:bg-blue-std-heavy hover:text-zinc-50',
                                                    !shop && item.name === "MyStore" ? 'cursor-not-allowed pointer-events-none opacity-70' : null,
                                                    'rounded-md px-3 py-2 text-sm font-medium transition-all duration-150'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {t(item.name.toLowerCase())}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="flex items-center">
                                    <button onClick={() => changeLanguage('en')} className={`p-2 rounded-md ${i18n.language == 'en' ? "border border-white" : ""}`}>
                                        <img src={english} alt="English" className="w-8" />
                                    </button>
                                    <button onClick={() => changeLanguage('pt')} className={`p-2 rounded-md ${i18n.language == 'pt' ? "border border-white" : ""}`}>
                                        <img src={portuguese} alt="Português" className="w-8" />
                                    </button>
                                </div>
                                {user ? (
                                    <button
                                        type="button"
                                        className="relative rounded-full p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        onClick={signingOut}
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">{t('log_out')}</span>
                                        <ArrowLeftEndOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                ) : (
                                    <a target="_blank" rel="noreferrer" className="rounded-md p-2 transition-all hover:bg-gray-900 text-gray-400 hover:text-white" href='https://anytech-webpage.vercel.app/'>
                                        {t('visit_website')}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    <DisclosurePanel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {user && navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        location.pathname === item.path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {t(item.name.toLowerCase())}
                                </DisclosureButton>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
};

export default Navbar;
