import React from "react";


const EmailVerification = ({ onMarkVerified }) => {
  return (
    <div className="my-4 text-center">
      <button
        type="button"
        onClick={() => {
          alert("Verification email will be sent after registration.");
          onMarkVerified(true); // just mark as verified for now
        }}
        className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
      >
        Send Verification Email
      </button>
    </div>
  );
};


export default EmailVerification;
