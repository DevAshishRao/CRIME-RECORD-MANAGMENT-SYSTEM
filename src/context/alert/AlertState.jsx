import React, {useState} from 'react'
import alertContext from './alertContext.jsx'

export default function AlertState(props) {

    const [alert,setAlert] = useState({
        show: false,
        type: '',
        message: ''
    })

    // method for showing and removing after a aparticular time interval
    const showAlert = (state,typ,msg) => {
        setAlert({show: state,type: typ, message: msg});
        setTimeout(() => {
            setAlert({show: false, type: '',message: ''});
        },3000);
    }

    return (
        <alertContext.Provider value = {{alert,showAlert}}>
            {props.children}
        </alertContext.Provider>
    )
}