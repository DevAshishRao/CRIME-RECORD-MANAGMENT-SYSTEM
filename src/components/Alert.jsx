import React, { useContext } from 'react'
import alertContext from '../context/alert/alertContext'

export default function Alert() {

    const { alert } = useContext(alertContext);

    return (
        <div className={`z-30 fixed w-full xsz:top-8 ${alert.show ? '' : 'hidden'} flex items-center justify-center`}>

            <div className="bg-white  xsz:rounded-md lg:rounded-lg xsz:shadow-md lg:shadow-lg flex xsz:gap-2 flex-row items-center justify-between xsz:px-3 xsz:py-1 lg:py-2">

                {
                    alert.type === 'Success' ?

                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-check-circle-fill xsz:w-5 lg:w-6 text-secondary/80" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>

                        :

                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-shield-fill-exclamation xsz:w-5 lg:w-6 text-secondary/80" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m-.55 8.502L7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0M8.002 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                        </svg>
                }

                <p className="font-poppins xsz:text-sm text-secondary font-medium">
                    {alert.message}
                </p>

            </div>

        </div>
    )
}