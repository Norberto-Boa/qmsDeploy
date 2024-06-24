import React from 'react'
import './Navbar.css';
import logo from '../../Assets/logo.png';
import { Bars3Icon, BellIcon, XMarkIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const navigation = [
    { name: 'Dashboard', href: '/', path: "/", current: true },
    { name: 'MyStore', href: '/create-store', path: "/create-store", current: false },
]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



const Navbar = () => {
    const [user, setUser] = useState();
    const [shop, setShop] = useState();
    const location = useLocation();

    console.log(location.pathname)

    useEffect(() => {
        setUser(localStorage.getItem("userid"));
        setShop(localStorage.getItem("user_shop"))
    }, [])
    const navigate = useNavigate();
    const signingOut = () => {
        localStorage.clear();
        navigate("/login");
    }

    const qrScan = () => {
        navigate("/qrcode");
    }
    const logoClick = () => {
        navigate("/");
    }
    return (
        <Disclosure as="nav" className="bg-navbar-bg bg-no-repeat bg-cover">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            {user ?
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div> : null
                            }
                            <div className={`flex flex-1 items-center ${user ? "justify-center" : "justify-start"} sm:items-center sm:justify-start`}>
                                <div className="flex flex-shrink-0 items-center cursor-pointer" onClick={logoClick}>
                                    <img
                                        className="h-14 w-auto"
                                        src={logo}
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {user ? navigation.map((item) => (

                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    location.pathname == item.path ? 'border border-white text-white !font-bold' : 'text-white hover:bg-blue-std-heavy hover:text-zinc-50',
                                                    !shop ? 'cursor-not-allowed' : null,
                                                    'rounded-md px-3 py-2 text-sm font-medium transition-all duration-150'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        )) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {user ? <button
                                    type="button"
                                    className="relative rounded-full p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    onClick={signingOut}
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Log Out</span>
                                    <ArrowLeftEndOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                                    :
                                    <a target="_blank" className=" rounded-md p-2 transition-all hover:bg-gray-900 text-gray-400 hover:text-white " href='https://anytech-webpage.vercel.app/'>www.anytechsols.com</a>
                                }


                                {/* Profile dropdown
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </MenuButton>
                                    </div>
                                    <Transition
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <MenuItem>
                                                {({ focus }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Profile
                                                    </a>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {({ focus }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Settings
                                                    </a>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {({ focus }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu> */}
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="sm:hidden">

                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {user ? navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        location.pathname == item.path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </DisclosureButton>
                            )) : null}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}

export default Navbar