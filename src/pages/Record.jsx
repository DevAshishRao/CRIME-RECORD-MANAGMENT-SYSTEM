import React, { useEffect, useContext, useState } from 'react'

// required component
import Alert from '../components/Alert';

// importing the required context
import recordContext from '../context/records/recordContext'

export default function Record() {

  // importing the context
  const { records, setRecords, publicRecords } = useContext(recordContext);

    // storing the searched data
    const [searchText,setSearchText] = useState("");
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


  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }   

  useEffect(() => {
    if(searchText == '') publicRecords();
  }, [searchText])

  const handleSearch = () => {
      if(searchText !== ''){
        const keyword = searchText.trim().toLowerCase();
        const results = records.filter(record => record.title.toLowerCase().includes(keyword) );
        setRecords(results);
      } else publicRecords();
  } 

  return (
    <div className="flex flex-col items-center xsz:gap-3">

      {/* First heading element */}
      <div className="z-10 bg-linear-150 from-bgFirst to-bgSecond flex flex-col xsz:gap-1 2xl:gap-3 justify-center w-full items-center lg:pt-22 xl:pt-26 xl:pb-18  xsz:p-10 sm:py-14 md:pt-18 2xl:pb-20 2xl:pt-32">

        <Alert />

        {/* main header here */}
        <h1 className="text-white font-poppins font-semibold xl:text-4xl 2xl:text-5xl xsz:text-2xl md:text-3xl"> Public Crime Records </h1>
        <p className="text-white font-poppins 2xl:text-lg font-medium xsz:text-sm text-center lg:text-base xl:text-lg">
          Search and access public crime records and case information.
        </p>

      </div>

      {/* form regarding searching records */}
      <div className="flex xsz:flex-col sm:flex-row xsz:gap-3 sm:gap-4 justify-start items-center xsz:rounded-md lg:rounded-lg shadow xsz:shadow-md lg:shadow-lg xl:shadow-xl xsz:w-2/3 xsz:p-3 sm:p-4 lg:px-6 lg:py-5 xsz:my-3 xsz:mx-4 lg:mt-6">

        <input type="text" placeholder="Search by case title" className="xsz:p-2 lg:p-3 xl:px-5 font-poppins font-semibold xsz:text-sm lg:text-base text-secondary xsz:rounded-md lg:rounded-lg focus:outline-none border border-secondary/20 lg:border-2 w-full focus:border-secondary/50" value={searchText} onChange={(e) => { setSearchText(e.target.value) }} required />
        <button className="xsz:w-40 sm:w-50 bg-secondary/90 text-white xsz:px-2 xsz:py-1 sm:px-3 md:py-2 xsz:rounded-md lg:rounded-lg ease-in duration-100 active:scale-95 cursor-pointer font-poppins font-semibold lg:py-3 hover:scale-105" onClick={handleSearch}> Apply Search </button>

      </div>

      {/* Public Records */}
      <div className="xsz:mx-4 xsz:py-3 sm:pt-5 flex flex-col xsz:gap-4 sm:gap-5 lg:gap-8 w-full items-center">

        {
          records?.map((record, index) => {
            return (
              <div key={index} className="flex flex-col justify-start items-start xsz:gap-3 xl:gap-5 xsz:px-4 xsz:py-3 md:px-4  xsz:rounded-md lg:rounded-lg border border-secondary/30 md:border-2 shadow hover:lg:shadow-lg xsz:w-2/3 ease-in duration-100 hover:scale-105">

                <div className="flex flex-row justify-between items-center w-full">
                  <h1 className="xsz:text-lg font-poppins font-semibold lg:font-bold md:text-xl xl:text-2xl text-secondary/80"> {capitalizeFirstLetter(record.title)} </h1>
                  <p className="xsz:text-sm lg:text-base font-poppins font-semibold "> {capitalizeFirstLetter(record.status)} </p>
                </div>

                <div className="flex xsz:flex-col sm:flex-row sm:justify-center xsz:items-start sm:items-center xsz:gap-4 sm:gap-6 lg:gap-8">

                  <div className="flex flex-col xsz:gap-1 justify-start items-start">
                    <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-secondary/70"> Crime Type </h3>
                    <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-secondary/80"> {capitalizeFirstLetter(record.crimeType)} </h3>
                  </div>

                  <div className="flex flex-col xsz:gap-1 justify-start items-start">
                    <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-secondary/70"> Criminal Name </h3>
                    <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-secondary/80"> {capitalizeFirstLetter(record.criminalName)} </h3>
                  </div>

                  <div className="flex flex-col xsz:gap-1 justify-start items-start">
                    <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-secondary/70"> Location </h3>
                    <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-secondary/80"> {capitalizeFirstLetter(record.location)} </h3>
                  </div>

                  <div className="flex flex-col xsz:gap-1 justify-start items-start">
                    <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-secondary/70"> Date Created </h3>
                    <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-secondary/80"> {capitalizeFirstLetter(record.createdAt)} </h3>
                  </div>

                </div>

                <button className="xsz:text-sm lg:text-base font-poppins font-semibold text-white xsz:px-2 xsz:py-1 md:px-3 lg:py-2 xsz:rounded-md hover:rounded-lg hover:scale-105 ease-in duration-100 bg-secondary/90 cursor-pointer active:scale-95" onClick={() => openModal(record)}> View Details </button>

                {isModalOpen && selectedRecord && (
                    <div className="fixed bg-black/50 flex justify-center items-center z-20 bg-white xsz:rounded-md lg:rounded-lg shadow xsz:shadow-md lg:shadow-lg xsz:top-40 xl:top-50 left-10 right-10 sm:left-20 sm:right-20 xl:left-30 xl:right-30">

                        <div className="flex flex-col justify-start items-start xsz:gap-3 xl:gap-5 xsz:p-3 sm:py-4">

                            <div className="flex flex-row justify-between items-center w-full">
                                <h1 className="xsz:text-lg font-poppins font-semibold lg:font-bold md:text-xl xl:text-2xl text-secondary/80"> {capitalizeFirstLetter(selectedRecord.title)} </h1>
                                <p className="xsz:text-sm lg:text-base font-poppins font-semibold "> {capitalizeFirstLetter(selectedRecord.status)} </p>
                                </div>

                                <div className="flex xsz:flex-col sm:flex-row sm:justify-center xsz:items-start sm:items-center xsz:gap-4 sm:gap-6 lg:gap-8">

                                <div className="flex flex-col xsz:gap-1 justify-start items-start">
                                    <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-secondary/70"> Crime Type </h3>
                                    <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-secondary/80"> {capitalizeFirstLetter(selectedRecord.crimeType)} </h3>
                                </div>

                                <div className="flex flex-col xsz:gap-1 justify-start items-start">
                                    <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-secondary/70"> Criminal Name </h3>
                                    <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-secondary/80"> {capitalizeFirstLetter(selectedRecord.criminalName)} </h3>
                                </div>

                                <div className="flex flex-col xsz:gap-1 justify-start items-start">
                                    <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-secondary/70"> Location </h3>
                                    <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-secondary/80"> {capitalizeFirstLetter(selectedRecord.location)} </h3>
                                </div>

                                <div className="flex flex-col xsz:gap-1 justify-start items-start">
                                    <h3 className="xsz:text-[12px] md:text-sm font-poppins font-semibold text-secondary/70"> Date Created </h3>
                                    <h3 className="xsz:text-sm md:text-base font-poppins font-semibold text-secondary/80"> {capitalizeFirstLetter(selectedRecord.createdAt)} </h3>
                                </div>

                            </div>

                            <p className="xsz:text-sm text-secondary lg:text-base font-poppins font-medium ">
                                {capitalizeFirstLetter(selectedRecord.description)}
                            </p>

                            <button className="xsz:text-sm lg:text-base font-poppins font-semibold text-white xsz:px-2 xsz:py-1 md:px-3 lg:py-2 xsz:rounded-md hover:rounded-lg hover:scale-105 ease-in duration-100 bg-secondary/90 cursor-pointer active:scale-95" onClick={closeModal}> Close </button>

                        </div>
                        
                    </div>
                    )}

              </div>
            )}
          
          )
        }

      </div>

    </div>
  )
}
