import React from "react";
import { useNavigate } from "react-router-dom";
const ComplainCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ComplaintForm');
  };
  return (
    <>
      <div className="flex flex-row items-center justify-between  h-24 px-4 xl:mt-8 mt-8 bg-slate-200">
        <span className="font-bold text-xl xl:text-2xl">My Complaints</span>
        <button
          className="rounded-full  text-white bg-red-600 py-2 px-4 xl:py-4 xl:px-6 xl:mr-8"
          onClick={handleClick}
        >
          + New Complaint
        </button>
      </div>
    </>
  );
};

export default ComplainCard;
