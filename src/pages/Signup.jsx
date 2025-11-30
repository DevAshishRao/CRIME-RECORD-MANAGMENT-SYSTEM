import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import Alert from '../components/Alert';
import alertContext from '../context/alert/alertContext';

export default function SignUp() {

    // states regarding form elements
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    // for navigating to different pages
    let navigate = useNavigate();

    const { showAlert } = useContext(alertContext);

    // fetching starting point from the env
    const host = import.meta.env.VITE_API_URL;

    // method for resetting the details
    const clearAll = () => {
        let empty = '';
        [setFullName, setUserName, setUserEmail, setUserPassword].forEach(setter => setter(empty));
    }

    // sending data to the API & Backend
    const submitData = async (e) => {

        // preventing default reload
        e.preventDefault();

        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },

            body: JSON.stringify({ username: userName,fullName: fullName, email: userEmail, password: userPassword })
        });

        const json = await response.json();

        if (json.success) {
            localStorage.setItem('token', json.jwtToken);
            showAlert(true, 'Success', 'User created successfully !');
            clearAll();
            navigate('/userprofile');
        } else {
            showAlert(true, 'Danger', Array.isArray(json.result) && json.result.length > 0 ? json.result[0].msg : json.message);
            clearAll();
        }

    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/userprofile');
    }, [])

    return (
        <div className="flex items-center h-screen justify-center bg-linear-150 from-shade1 to-secondary xsz:py-32 md:py-36 lg:py-30 xl:py-16">

            <Alert />

            <div className="flex flex-col items-center xsz:gap-5 lg:gap-7 bg-white xsz:rounded-lg lg:rounded-2xl xsz:px-6 xsz:py-6 xsz:shadow-md lg:shadow-lg xl:shadow-xl sm:w-100 lg:w-2/5 xl:w-2/6">

                {/* Redirection Button for Going back to Home Page */}
                <Link to="/">
                    <button type="button" className="absolute xsz:top-5 xsz:left-5 lg:top-7 lg:left-7 xsz:px-3 xsz:py-1 xsz:text-sm lg:text-base lg:py-2 font-poppins font-semibold text-shade1 xsz:rounded-md lg:rounded-lg xsz:shadow-md lg:shadow-xl active:scale-90 ease-in duration-150 cursor-pointer bg-white"> Back to Home </button>
                </Link>

                {/* Intro & Heading Block */}
                <div className="flex flex-col items-center xsz:gap-3">

                    <div className="bg-shade1/30 xsz:p-3 lg:p-5 rounded-full">
                        <UserPlus className="text-shade1 xsz:w-5 xsz:h-5 lg:w-7 lg:h-7" />
                    </div>

                    <h3 className="font-poppins xsz:text-2xl lg:text-3xl xsz:font-semibold text-secondary/90 "> Create Account </h3>

                    <p className="font-poppins xsz:text-sm text-secondary/70 font-medium">
                        Join us Today & Get Started
                    </p>

                </div>

                {/* Form regarding fetching of User's Details */}
                <form className="flex flex-col items-start xsz:gap-3 xl:gap-4">

                    <div className="flex flex-col items-start xsz:gap-1">
                        <label htmlFor="fullName" className="text-[12px] font-poppins text-secondary font-medium"> Full Name </label>
                        <input type="text" id="fullName" name="fullName" value={fullName} className="xsz:px-2 xsz:py-1 lg:px-3 lg:py-2 font-poppins xsz:text-sm lg:text-base outline-0 xsz:border  border-secondary/80 focus:border-secondary xsz:rounded-md lg:focus:rounded-xl focus:rounded-lg sm:w-80 lg:w-90 ease-in duration-150 xsz:w-65" placeholder="YourName.." required onChange={(e) => setFullName(e.target.value)} />
                    </div>

                    <div className="flex flex-col items-start xsz:gap-1">
                        <label htmlFor="userName" className="text-[12px] font-poppins text-secondary font-medium"> Username </label>
                        <input type="text" id="userName" name="userName" value={userName} className="xsz:px-2 xsz:py-1 lg:px-3 lg:py-2 font-poppins xsz:text-sm lg:text-base outline-0 xsz:border  border-secondary/80 focus:border-secondary xsz:rounded-md lg:focus:rounded-xl focus:rounded-lg sm:w-80 lg:w-90 ease-in duration-150 xsz:w-65" placeholder="userName.." required onChange={(e) => setUserName(e.target.value)} />
                    </div>

                    <div className="flex flex-col items-start xsz:gap-1">
                        <label htmlFor="userEmail" className="text-[12px] font-poppins text-secondary font-medium"> Email </label>
                        <input type="email" id="userEmail" name="userEmail" value={userEmail} className="xsz:px-2 xsz:py-1 lg:px-3 lg:py-2 font-poppins xsz:text-sm lg:text-base outline-0 xsz:border  border-secondary/80 focus:border-secondary xsz:rounded-md lg:focus:rounded-xl focus:rounded-lg sm:w-80 lg:w-90 ease-in duration-150 xsz:w-65" placeholder="example@mail.com" required onChange={(e) => setUserEmail(e.target.value)} />
                    </div>

                    <div className="flex flex-col items-start xsz:gap-1">
                        <label htmlFor="userPassword" className="text-[12px] font-poppins text-secondary font-medium"> Password </label>
                        <input type="password" id="userPassword" name="userEmail" value={userPassword} className="xsz:px-2 xsz:py-1 lg:px-3 lg:py-2 font-poppins xsz:text-sm lg:text-base outline-0 xsz:border  border-secondary/60 focus:border-secondary xsz:rounded-md focus:rounded-xl sm:w-80 lg:w-90 ease-in duration-150 xsz:w-65" placeholder="password.." required onChange={(e) => setUserPassword(e.target.value)} />
                    </div>

                    {/* Sign Up or Login redirection towards user's page */}
                    <div className="flex flex-row items-center xsz:gap-2 lg:gap-3">
                        <button type="submit" className="xsz:px-3 text-white font-poppins font-medium xsz:text-sm lg:text-base bg-shade2 xsz:py-1 cursor-pointer lg:py-2 xsz:rounded-md lg:rounded-lg active:scale-90 ease-in duration-150" onClick={submitData}> Sign Up </button>
                        <button type="button" className="xsz:px-3 text-white font-poppins font-medium xsz:text-sm lg:text-base bg-shade2 xsz:py-1 cursor-pointer lg:py-2 xsz:rounded-md lg:rounded-lg active:scale-90 ease-in duration-150" onClick={clearAll}> Clear All </button>
                    </div>

                </form>

                {/* Redirection towards login if already have an account ! */}
                <div className="flex flex-row items-center xsz:gap-1 lg:gap-2">
                    <p className="xsz:text-sm font-poppins font-semibold text-secondary">
                        Already have an account?
                    </p>
                    <Link to="/login" className="xsz:text-sm cursor-pointer text-shade1 font-poppins font-semibold"> Sign In </Link>
                </div>

            </div>

        </div>
    )
}