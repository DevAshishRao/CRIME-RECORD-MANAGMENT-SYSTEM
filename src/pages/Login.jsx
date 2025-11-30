import React, { useState,useContext,useEffect } from 'react'
import { LockIcon } from 'lucide-react'
import { Link,useNavigate } from 'react-router-dom'
import Alert from '../components/Alert';
import alertContext from '../context/alert/alertContext';

export default function Login() {

    // state of email and password
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    // showAlert method for showing alert at different conditions
    const {showAlert} = useContext(alertContext);

    let navigate = useNavigate();

    // method for resetting the details
    const clearAll = () => {
        let empty = '';
        setIsChecked(false);
        [setUserEmail, setUserPassword].forEach(setter => setter(empty));
    }

    // fetching starting point from the env
    const host = import.meta.env.VITE_API_URL;

    const submitData = async (e) => {

        e.preventDefault();                         // preventing the default reload of the page on submit event

        // fetching data using fetchAPI
        const response = await fetch(`${host}/api/auth/login`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },

            body: JSON.stringify({email: userEmail,password: userPassword})
        });

        const json = await response.json();

        if(json.success){
            if(isChecked) localStorage.setItem('token',json.jwtToken)
            showAlert(true,'Succcess','User Logged in Successfully !');
            clearAll();
            navigate('/userprofile');
        } else {
            showAlert(true,'Danger',Array.isArray(json.result) &&  json.result.length > 0 ? json.result[0].msg : json.message);
            clearAll();
        }

    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) navigate('/userprofile');
    },[])

    return (
        <div className="flex items-center h-screen justify-center bg-linear-150 from-shade1 to-secondary xsz:py-44 md:py-36 lg:py-30 xl:py-26">

            {/* Using Alert Component here */}
            <Alert />

            <div className="flex flex-col items-center xsz:gap-5 lg:gap-7 bg-white xsz:rounded-lg lg:rounded-2xl xsz:px-6 xsz:py-6 lg:py-6 xl:py-8 xsz:shadow-md lg:shadow-lg xl:shadow-xl sm:w-100 lg:w-2/5 xl:w-2/6">

                {/* Redirection Button for going back to Home Page */}
                <Link to="/">
                    <button type="button" className="absolute xsz:top-5 xsz:left-5 lg:top-7 lg:left-7 xsz:px-3 xsz:py-1 xsz:text-sm lg:text-base lg:py-2 font-poppins font-semibold text-shade1 xsz:rounded-md lg:rounded-lg xsz:shadow-md lg:shadow-xl active:scale-90 ease-in duration-150 cursor-pointer bg-white"> Back to Home </button>
                </Link>

                {/* Intro Block */}
                <div className="flex flex-col items-center xsz:gap-3">

                    <div className="bg-shade1/30 xsz:p-3 lg:p-5 rounded-full">
                        <LockIcon className="text-shade1 xsz:w-5 xsz:h-5 lg:w-7 lg:h-7" />
                    </div>

                    <h3 className="font-poppins xsz:text-2xl lg:text-3xl xsz:font-semibold text-secondary/90 "> Welcome Back </h3>

                    <p className="font-poppins xsz:text-sm text-secondary/70 font-medium">
                        Please sign in to your Account !
                    </p>

                </div>

                {/* Data Block regarding Login/Sign in Section */}
                <form className="flex flex-col items-start xsz:gap-3 xl:gap-4">

                    <div className="flex flex-col items-start xsz:gap-1">
                        <label htmlFor="userEmail" className="text-[12px] font-poppins text-secondary font-medium"> Email </label>
                        <input type="email" id="userEmail" name="userEmail" value={userEmail} className="xsz:px-2 xsz:py-1 lg:px-3 lg:py-2 font-poppins xsz:text-sm lg:text-base outline-0 xsz:border  border-secondary/80 focus:border-secondary xsz:rounded-md lg:focus:rounded-xl focus:rounded-lg sm:w-80 lg:w-90 ease-in duration-150 xsz:w-65" placeholder="example@mail.com" required onChange={(e) => setUserEmail(e.target.value)} />
                    </div>

                    <div className="flex flex-col items-start xsz:gap-1">
                        <label htmlFor="userPassword" className="text-[12px] font-poppins text-secondary font-medium"> Password </label>
                        <input type="password" id="userPassword" name="userEmail" value={userPassword} className="xsz:px-2 xsz:py-1 lg:px-3 lg:py-2 font-poppins xsz:text-sm lg:text-base outline-0 xsz:border  border-secondary/60 focus:border-secondary xsz:rounded-md focus:rounded-xl sm:w-80 lg:w-90 ease-in duration-150 xsz:w-65" placeholder="password.." required onChange={(e) => setUserPassword(e.target.value)} />
                    </div>

                    <div className="flex flex-row items-center justify-center xsz:gap-2">
                        <input type="checkbox" id="userConfirm" onChange={(e) => setIsChecked(e.target.value)} />
                        <label htmlFor="userConfirm" className="xsz:text-sm font-poppins text-secondary font-semibold" > Remember Me </label>
                    </div>

                    {/* Sign Up or Login redirection towards user's page */}
                    <div className="flex flex-row items-center xsz:gap-2 lg:gap-3">
                        <button type="submit" className="xsz:px-3 text-white font-poppins font-medium xsz:text-sm lg:text-base bg-shade2 xsz:py-1 cursor-pointer lg:py-2 xsz:rounded-md lg:rounded-lg active:scale-90 ease-in duration-150" onClick={submitData}> Sign In </button>
                        <button type="button" className="xsz:px-3 text-white font-poppins font-medium xsz:text-sm lg:text-base bg-shade2 xsz:py-1 cursor-pointer lg:py-2 xsz:rounded-md lg:rounded-lg active:scale-90 ease-in duration-150" onClick={clearAll}> Clear All </button>
                    </div>

                </form>

                {/* For creating a new account */}
                <div className="flex flex-row items-center xsz:gap-1 lg:gap-2">
                    <p className="xsz:text-sm font-poppins font-semibold text-secondary">
                        Don't have an account?
                    </p>
                    <Link to="/signup" className="xsz:text-sm cursor-pointer text-shade1 font-poppins font-semibold"> Sign Up </Link>
                </div>

            </div>

        </div>
    )
}