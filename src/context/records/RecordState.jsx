// required hooks from React
import { useState, useContext } from 'react'

// importing the context created
import recordContext from './recordContext'
import alertContext from '../alert/alertContext'

export default function RecordState(props){

    // host/backend link
    const host = import.meta.env.VITE_API_URL;

    // storing our records
    const [records,setRecords] = useState(null);

    // getting the alert method for showing it
    const { showAlert } = useContext(alertContext)

    // 1. Method for fetching user specific notes
    const getUserRecords = async () => {
        
        // getting all user's notes from the backend
        const response = await fetch(`${host}/api/records/getuserdata`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });

        const json = await response.json();
        if(json.success){

            showAlert(true, 'Success','Record fetched Successfully !');
            setRecords(json.records);

        } else {
            showAlert(true,'Danger',Array.isArray(json.result) && json.result.length > 0 ? json.result[0].msg : json.message)
        }

    }

    // 2. Method for creating user's new record
    const createRecord = async (title, description, status, crimeType, criminalName, recordType, location) => {

        // storing response
        const response = await fetch(`${host}/api/records/createrecord`,{

            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },

            body: JSON.stringify({ title, description, status, crimeType, criminalName, recordType, location })
        });

        const json = await response.json();

        if(json.success){
            setRecords(records.concat(json.savedRecord));
            
            let recordData = localStorage.getItem('record');
            if(!recordData) localStorage.setItem('record',JSON.stringify({ available: true,update: false }));

            showAlert(true,'Success','Record created Successfully !');
        } else showAlert(true,"Danger",Array.isArray(json.result) && json.result.length > 0 ? json.result[0].msg : json.message)
    }

    // 3. Method for Updating Existing record
    const updateRecord = async (id,title, description, status, crimeType, criminalName, recordType, location) => {

        if(!(localStorage.getItem('record')) || !title || !description || !status || !crimeType || !criminalName || !recordType || !location){
            showAlert(true,'Danger','One or more record values are missing !');
        }

        // fetching response from backend
        const response = await fetch(`${host}/api/records/updaterecord/${id}`,{

            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, status, crimeType, criminalName, recordType, location })

        })

        const json = await response.json();
        if(json.success){
            setRecords(json.record);
            showAlert(true,'Success','Record Updates Successfully !');

            let recordData = localStorage.getItem('record');
            recorddata.update = true;
        } else showAlert(true,"Danger",Array.isArray(json.result) && json.result.length > 0 ? json.result[0].msg : json.message)

    }

    // 4. Deleting user's existing record
    const deleteRecord = async (id) => {

        // fetchinng user's data before deleting it
        const response = await fetch(`${host}/api/records/deleterecord/${id}`,{

            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }

        });

        const json = await response.json();
        if(json.success){
            const newRecord = records.filter((record) => { return record._id !== id });
            setRecord(newRecord);

            localStorage.removeItem('record');
            showAlert(true,'Success','Record deleted Successfully !');
        } else showAlert(true,"Danger",Array.isArray(json.result) && json.result.length > 0 ? json.result[0].msg : json.message)

    }

    // 5. Public records
    const publicRecords = async () => {

        const response = await fetch(`${host}/api/records/publicrecords`,{
            
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }

        });

        const json = await response.json();
        if(json.success){
            setRecords(json.records);
            showAlert(true,'Success','Record Fetched Successfully !');
        } else showAlert(true,"Danger",Array.isArray(json.result) && json.result.length > 0 ? json.result[0].msg : json.message)

    }

    // returning the context values
    return (
        <recordContext.Provider value={{ records, setRecords, getUserRecords, createRecord, updateRecord, deleteRecord, publicRecords }}>
            { props.children }
        </recordContext.Provider>
    )

}

