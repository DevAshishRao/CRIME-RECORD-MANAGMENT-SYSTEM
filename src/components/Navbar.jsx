import React, { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {

    // user Checks
    const [user, setUser] = useState(false);
    let navigate = useNavigate();

    // method for toggling menu icon
    const toggleMenu = () => {
        document.querySelector('.menuList').classList.remove('xsz:-translate-y-90');
        document.querySelector('.bi-x-square-fill').classList.remove('hidden');
    }

    const closeMenu = () => {
        document.querySelector('.menuList').classList.add('xsz:-translate-y-90');
        document.querySelector('.bi-x-square-fill').classList.add('hidden');
    }

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) setUser(true);
        else setUser(false);
    }, [token]);

    const logOut = () => {
        localStorage.removeItem('token');
        setUser(false);
        navigate('/');
    }

    return (
        <div className="z-10 bg-white fixed flex flex-row items-center justify-between top-0 left-0 right-0 xsz:shadow-md lg:shadow-lg xsz:px-3 xsz:py-2 sm:py-3 sm:px-5 lg:px-8 lg:py-4 xl:px-12">

            {/* Site Name and ImageIcon/Logo */}
            <Link to="/">
                <div className="flex flex-row items-center xsz:gap-2 cursor-pointer">
                    <Lock className="text-shade1 xsz:w-5 xsz:h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7" />
                    <h3 className="font-poppins md:text-lg xsz:font-semibold text-shade1 xl:text-xl"> CRMS </h3>
                </div>
            </Link>

            <div className="menuList flex xsz:flex-col md:flex-row items-center md:gap-3 xl:gap-6 font-poppins text-secondary/90 xsz:text-sm lg:text-base font-semibold xsz:absolute top-0 left-0 right-0 xsz:pt-10 xsz:pb-4 xsz:gap-2 xsz:bg-white md:bg-transparent xsz:shadow-md md:shadow-none md:relative md:p-0 xsz:-translate-y-90 md:translate-0 ease-in-out duration-400">
                <Link to="/records" className="hover:underline hover:underline-offset-8 hover:text-shade1 ease-in duration-150"> Records </Link>
                <Link to="/signup" className="hover:underline hover:underline-offset-8 hover:text-shade1 ease-in duration-150"> Get Started </Link>
                <button className={`${user ? 'hidden' : ''} md:hidden hover:underline hover:underline-offset-8 hover:text-shade1 ease-in duration-150`} onClick={() => { navigate('/login') }}> Log In </button>
                <button className={`${user ? 'hidden' : ''} md:hidden hover:underline hover:underline-offset-8 hover:text-shade1 ease-in duration-150`} onClick={() => { navigate('/signup') }}> Sign Up </button>
                <button className={`${user ? '' : 'hidden'} md:hidden hover:underline hover:underline-offset-8 hover:text-shade1 ease-in duration-150`} onClick={logOut}> Logout </button>
            </div>

            {/* Close Icon in order to close the MenuBar */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="z-20 absolute top-3 right-4 bi bi-x-square-fill xsz:w-7 text-secondary/90 active:scale-90 ease-in duration-100 hidden" viewBox="0 0 16 16" onClick={closeMenu}>
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
            </svg>

            {/* Menu Icon regarding checking Menu Options */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-list w-6 md:hidden text-shade1 active:scale-90 ease-in duration-100" viewBox="0 0 16 16" onClick={toggleMenu}>
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>

            <div className="md:flex flex-row items-center md:gap-2 lg:gap-3 xsz:hidden">
                <Link to="/login" className={`${user ? 'hidden': ''} md:text-sm xl:text-base text-white bg-shade1 md:rounded-md lg:rounded-lg active:scale-90 ease-in duration-150 md:shadow-md xl:shadow-lg md:px-3 md:py-1 font-poppins font-medium cursor-pointer`}> Log In </Link>
                <Link to="/signup" className={`${user ? 'hidden': ''} md:text-sm xl:text-base text-white bg-shade1 md:rounded-md lg:rounded-lg active:scale-90 ease-in duration-150 md:shadow-md xl:shadow-lg md:px-3 md:py-1 font-poppins font-medium cursor-pointer`}> Sign Up </Link>
                <button className={`${user ? '': 'hidden'} md:text-sm xl:text-base text-white bg-shade1 md:rounded-md lg:rounded-lg active:scale-90 ease-in duration-150 md:shadow-md xl:shadow-lg md:px-3 md:py-1 font-poppins font-medium cursor-pointer`} onClick={logOut} > Logout </button>
            </div>

        </div>
    )
}