import React from 'react'
import StatusCard from './StudentComponents/StatusCard';
import ComplaintStatusPage from './ComplaintStatusPage';
import Navbar from './StudentComponents/Navbar';
const Homepage = () => {
  return (
    <>
    <Navbar />
    <div className='h-[100vh] w-[100vw'>
      <div className='  bg-slate-100  mt-[-30px]'>
    <StatusCard />
      
    </div>
    <div className=''>
      <ComplaintStatusPage />  
    </div>
    </div>
    

    </>
  )
}

export default Homepage
