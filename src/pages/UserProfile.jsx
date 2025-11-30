import React, { useEffect, useState, useContext } from 'react'
import { User, Plus, XCircle } from 'lucide-react'
import Alert from '../components/Alert';
import alertContext from '../context/alert/alertContext';
import recordContext from '../context/records/recordContext'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function UserProfile() {

    // host url
    const host = import.meta.env.VITE_API_URL;

    // context for showing alert
    const { showAlert } = useContext(alertContext);
    const { records, getUserRecords, deleteRecord, createRecord, updateRecord } = useContext(recordContext)

    // object for storing user details
    const [userDetails, setUserDetails] = useState({
        username: '',
        fullName: '',
        category: '',
        createdAt: ''
    })

    const [newRecord,setNewRecord] = useState({
        title: '',
        description: '',
        status: '',
        crimeType: '',
        criminalName: '',
        recordType: '',
        location: ''
    })

    // storing the searched data
        const [selectedRecord, setSelectedRecord] = useState(null);
        const [isModalOpen, setIsModalOpen] = useState(false);
    
        const openModal = (record) => {
          setSelectedRecord(record);
          setIsModalOpen(true);
        };
    
        const closeModal = () => {
          setIsModalOpen(false);
          setSelectedRecord(null);
        };

        // opening form regarding creation
        const [formCreate,setFormCreate] = useState(false);
        const [formUpdate,setFormUpdate] = useState(false);


    function capitalizeFirstLetter(str) {
        if (!str || typeof str !== "string") return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const resetForm = () => {
        setNewRecord({
            title: "",
            description: "",
            status: "",
            crimeType: "",
            criminalName: "",
            recordType: "",
            location: ""
        });
        };

    // usenNavigate regarding routing
    let navigate = useNavigate();

    // object for fetching details regarding the user account
    const fetchUserDetails = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });

        const json = await response.json();
        if (json.success) {
            showAlert(true, 'Success', 'User Data fetched Successfully !');
            const userData = json.user;
            setUserDetails({ username: userData.username, fullName: userData.fullName, category: userData.category, createdAt: userData.createdAt })
        } else {
            showAlert(true, 'Danger', Array.isArray(json.result) && json.result.length > 0 ? json.result[0].msg : json.message);
        }
    }

    // effecting when the data got changed
    useEffect(() => {
        fetchUserDetails();
        getUserRecords();
    }, [])

    return (
      <div className="flex flex-col items-center xsz:gap-3">
        <Alert />

        <div className="z-10 bg-linear-150 from-bgFirst to-bgSecond flex flex-col xsz:gap-1 2xl:gap-3 justify-center w-full items-center lg:pt-22 xl:pt-26 xl:pb-18  xsz:p-14 sm:py-14 md:pt-18 2xl:pb-20 2xl:pt-32">
        <Navbar />
          <div className="flex xsz:flex-col sm:flex-row justify-between items-center xsz:gap-5 md:gap-8 lg:gap-10">
            <User className="text-white bg-secondary/40 xsz:w-30 xsz:h-30 md:w-40 md:h-40 xsz:p-4 md:p-5 rounded-full" />
            <div className="flex flex-col justify-center items-start xsz:gap-3 lg:gap-5">
              <h1 className="font-poppins font-semibold xsz:text-xl text-white sm:text-2xl md:text-3xl xl:text-4xl">
                {userDetails.username &&
                  capitalizeFirstLetter(userDetails.username)}
              </h1>

              <div className="flex xsz:flex-col sm:flex-row sm:justify-center xsz:items-start sm:items-center xsz:gap-4 sm:gap-6 lg:gap-8">
                <div className="flex flex-col xsz:gap-1 justify-start items-start">
                  <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-white/70">
                    Full Name
                  </h3>
                  <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-white/80">
                    
                    {userDetails.fullName
                      ? userDetails.fullName &&
                        capitalizeFirstLetter(userDetails.fullName)
                      : "Unavailable"}
                  </h3>
                </div>

                <div className="flex flex-col xsz:gap-1 justify-start items-start">
                  <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-white/70">
                    
                    Category
                  </h3>
                  <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-white/80">
                    
                    {userDetails.category &&
                      capitalizeFirstLetter(userDetails.category)}
                  </h3>
                </div>

                <Plus
                  className="xsz:w-10 xsz:h-10 bg-secondary/40 text-white xsz:p-2 rounded-full cursor-pointer ease-in duration-100 active:scale-90"
                  onClick={() => {
                    setFormCreate(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Available Records of particular user */}
        <div className="xsz:mx-4 xsz:py-3 sm:pt-5 flex flex-col xsz:gap-4 sm:gap-5 lg:gap-8 w-full items-center">
          {records?.map((record, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-start items-start xsz:gap-3 xl:gap-5 xsz:px-4 xsz:py-3 md:px-4  xsz:rounded-md lg:rounded-lg border border-secondary/30 md:border-2 shadow xsz:w-2/3 ease-in duration-100 hover:shadow-lg"
              >
                <div className="flex flex-row justify-between items-center w-full">
                  <h1 className="xsz:text-lg font-poppins font-semibold lg:font-bold md:text-xl xl:text-2xl text-secondary/80">
          
                    {capitalizeFirstLetter(record.title)}
                  </h1>
                  <p className="xsz:text-sm lg:text-base font-poppins font-semibold ">
                    
                    {capitalizeFirstLetter(record.status)}
                  </p>
                </div>

                <div className="flex xsz:flex-col sm:flex-row sm:justify-center xsz:items-start sm:items-center xsz:gap-4 sm:gap-6 lg:gap-8">
                  <div className="flex flex-col xsz:gap-1 justify-start items-start">
                    <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-secondary/70">
                      
                      Crime Type
                    </h3>
                    <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-secondary/80">
                      
                      {capitalizeFirstLetter(record.crimeType)}
                    </h3>
                  </div>

                  <div className="flex flex-col xsz:gap-1 justify-start items-start">
                    <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-secondary/70">
                      
                      Criminal Name
                    </h3>
                    <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-secondary/80">
                      
                      {capitalizeFirstLetter(record.criminalName)}
                    </h3>
                  </div>

                  <div className="flex flex-col xsz:gap-1 justify-start items-start">
                    <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-secondary/70">
                      
                      Location
                    </h3>
                    <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-secondary/80">
                      
                      {capitalizeFirstLetter(record.location)}
                    </h3>
                  </div>

                  <div className="flex flex-col xsz:gap-1 justify-start items-start">
                    <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-secondary/70">
                      
                      Date Created
                    </h3>
                    <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-secondary/80">
                      
                      {capitalizeFirstLetter(record.createdAt)}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-row xsz:gap-3 lg:gap-5 items-center">
                  <button
                    className="xsz:text-sm lg:text-base font-poppins font-semibold text-white xsz:px-2 xsz:py-1 md:px-3 lg:py-2 xsz:rounded-md hover:rounded-lg hover:scale-105 ease-in duration-100 bg-secondary/90 cursor-pointer active:scale-95"
                    onClick={() => openModal(record)}
                  >
                    
                    View Details
                  </button>
                  <button
                    className="xsz:text-sm lg:text-base font-poppins font-semibold text-white xsz:px-2 xsz:py-1 md:px-3 lg:py-2 xsz:rounded-md hover:rounded-lg hover:scale-105 ease-in duration-100 bg-secondary/90 cursor-pointer active:scale-95"
                    onClick={() => {
                      deleteRecord(record._id);
                    }}
                  >
                    Delete Record
                  </button>
                </div>

                {isModalOpen && selectedRecord && (
                  <div className="fixed flex justify-center items-center z-20 bg-white xsz:rounded-md lg:rounded-lg shadow xsz:shadow-md lg:shadow-lg xsz:top-40 xl:top-50 left-10 right-10 sm:left-20 sm:right-20 xl:left-30 xl:right-30">
                    <div className="flex flex-col justify-start items-start xsz:gap-3 xl:gap-5 xsz:p-3 sm:py-4">
                      <div className="flex flex-row justify-between items-center w-full">
                        <h1 className="xsz:text-lg font-poppins font-semibold lg:font-bold md:text-xl xl:text-2xl text-secondary/80">
                          
                          {capitalizeFirstLetter(selectedRecord.title)}
                        </h1>
                        <p className="xsz:text-sm lg:text-base font-poppins font-semibold ">
                         
                          {capitalizeFirstLetter(selectedRecord.status)}
                        </p>
                      </div>

                      <div className="flex xsz:flex-col sm:flex-row sm:justify-center xsz:items-start sm:items-center xsz:gap-4 sm:gap-6 lg:gap-8">
                        <div className="flex flex-col xsz:gap-1 justify-start items-start">
                          <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-secondary/70">
                            
                            Crime Type
                          </h3>
                          <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-secondary/80">
                            
                            {capitalizeFirstLetter(
                              selectedRecord.crimeType
                            )}
                          </h3>
                        </div>

                        <div className="flex flex-col xsz:gap-1 justify-start items-start">
                          <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-secondary/70">
                            {" "}
                            Criminal Name{" "}
                          </h3>
                          <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-secondary/80">
                            {" "}
                            {capitalizeFirstLetter(
                              selectedRecord.criminalName
                            )}{" "}
                          </h3>
                        </div>

                        <div className="flex flex-col xsz:gap-1 justify-start items-start">
                          <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-secondary/70">
                            {" "}
                            Location{" "}
                          </h3>
                          <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-secondary/80">
                            {" "}
                            {capitalizeFirstLetter(
                              selectedRecord.location
                            )}{" "}
                          </h3>
                        </div>

                        <div className="flex flex-col xsz:gap-1 justify-start items-start">
                          <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-secondary/70">
                            {" "}
                            Date Created{" "}
                          </h3>
                          <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-secondary/80">
                            {" "}
                            {capitalizeFirstLetter(
                              selectedRecord.createdAt
                            )}{" "}
                          </h3>
                        </div>
                      </div>

                      <p className="xsz:text-sm text-secondary lg:text-base font-poppins font-medium ">
                        {capitalizeFirstLetter(selectedRecord.description)}
                      </p>

                      <button
                        className="xsz:text-sm lg:text-base font-poppins font-semibold text-white xsz:px-2 xsz:py-1 md:px-3 lg:py-2 xsz:rounded-md hover:rounded-lg hover:scale-105 ease-in duration-100 bg-secondary/90 cursor-pointer active:scale-95"
                        onClick={closeModal}
                      >
                        {" "}
                        Close{" "}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {formCreate && (
          <div
            className="fixed z-50 xsz:top-10 xsz:left-10 xsz:right-10 md:left-30 md:right-30 lg:left-40 lg:right-40 bg-white xsz:px-3 xsz:py-2 xsz:rounded-md lg:rounded-lg shadow xsz:shadow-md lg:shadow-lg">
            <div className="flex flex-col items-start xsz:gap-3 lg:gap-4 xsz:px-3 xsz:py-2">
              <div className="flex flex-row justify-between items-center w-full">
                <h1 className="xsz:text-lg md:text-xl font-poppins font-semibold text-secondary/90">Create New Record</h1>
                <XCircle className="xsz:w-10 xsz:h-10 lg:w-12 lg:h-12 xsz:p-1 text-secondary/80 ease-in duration-100 active:scale-90 cursor-pointer"  onClick={() => setFormCreate(false)} />
              </div>
                <form className="flex flex-col items-start w-full xsz:gap-3 lg:gap-4" onSubmit={(e) => e.preventDefault()}>

                    <div className="flex flex-col items-start w-full xsz:gap-2 lg:gap-3">
                        <input type="text" placeholder="Title of the Record" className="focus:outline-none xsz:text-sm lg:text-base font-poppins font-medium border border-secondary/40 focus:border-secondary/70 lg:border-2 xsz:rounded-md lg:rounded-lg xsz:px-2 xsz:py-1 lg:px-3 lg:py-2 w-full" value={newRecord.title} onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })} required />
                        <textarea type="text" placeholder="Description of Record" className="focus:outline-none xsz:text-sm lg:text-base font-poppins font-medium border border-secondary/40 focus:border-secondary/70 lg:border-2 xsz:rounded-md lg:rounded-lg xsz:px-2 xsz:py-1 lg:px-3 lg:py-2 w-full resize-none" rows={3} value={newRecord.description} onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })} required> </textarea>
                        <select className="focus:outline-none xsz:text-sm lg:text-base border-none xsz:p-2 lg:p-4 xsz:rounded-md lg:rounded-lg font-poppins font-medium " value={newRecord.status} onChange={(e) => setNewRecord({ ...newRecord, status: e.target.value })}>
                            <option value="active"> Active </option>
                            <option value="closed"> Closed </option>
                        </select>
                        <input type="text" placeholder="Crime Type" className="focus:outline-none xsz:text-sm lg:text-base font-poppins font-medium border border-secondary/40 focus:border-secondary/70 lg:border-2 xsz:rounded-md lg:rounded-lg xsz:px-2 xsz:py-1 lg:px-3 lg:py-2 w-full" value={newRecord.crimeType} onChange={(e) => setNewRecord({ ...newRecord, crimeType: e.target.value })} required />
                        <input type="text" placeholder="Criminal Name" className="focus:outline-none xsz:text-sm lg:text-base font-poppins font-medium border border-secondary/40 focus:border-secondary/70 lg:border-2 xsz:rounded-md lg:rounded-lg xsz:px-2 xsz:py-1 lg:px-3 lg:py-2 w-full" value={newRecord.criminalName} onChange={(e) => setNewRecord({ ...newRecord, criminalName: e.target.value })} required />
                        <select className="focus:outline-none xsz:text-sm lg:text-base border-none xsz:p-2 lg:p-4 xsz:rounded-md lg:rounded-lg font-poppins font-medium " value={newRecord.recordType} onChange={(e) => setNewRecord({ ...newRecord, recordType: e.target.value })} required>
                            <option value="public"> Public </option>
                            <option value="private"> Private </option>
                        </select>
                        <input type="text" placeholder="Location of the Crime" className="focus:outline-none xsz:text-sm lg:text-base font-poppins font-medium border border-secondary/40 focus:border-secondary/70 lg:border-2 xsz:rounded-md lg:rounded-lg xsz:px-2 xsz:py-1 lg:px-3 lg:py-2 w-full" value={newRecord.location} onChange={(e) => setNewRecord({ ...newRecord, location: e.target.value })} required />
                    </div>

                    <div className="flex flex-row items-center xsz:gap-2 lg:gap-3">
                        <input
                            type="button" value="Submit"
                            className="xsz:text-sm lg:text-base text-white bg-secondary/80 xsz:px-2 xsz:py-1 lg:px-3 lg:py-2 xsz:rounded-md lg:rounded-lg ease-in duration-100 active:scale-90 cursor-pointer"
                            onClick={async () => {
                                const res = await createRecord(
                                    newRecord.title,
                                    newRecord.description,
                                    newRecord.status,
                                    newRecord.crimeType,
                                    newRecord.criminalName,
                                    newRecord.recordType,
                                    newRecord.location
                                );
                                    getUserRecords();
                                    resetForm();
                                    setFormCreate(false);  // close only when success
                            }}
                            />
                        <button type="button" className="xsz:text-sm lg:text-base text-white bg-secondary/80 xsz:px-2 xsz:py-1 lg:px-3 lg:py-2 xsz:rounded-md lg:rounded-lg ease-in duration-100 active:scale-90 cursor-pointer" onClick={resetForm}> Clear </button>
                    </div>

                </form>
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
}
