import React from 'react';
import AdminNav from './AdminComponents/AdminNav';
import AllComplaints from './AdminComponents/AllComplaints';

const HomepageAdmin = () => {
  return (
    <>
      <AdminNav />
      <main className="min-h-screen bg-gradient-to-r from-amber-100 to-blue-200 py-10 px-4 sm:px-8 lg:px-16">
        {/* Heading */}
        <header className="max-w-7xl mx-auto mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Complaint Management
          </h1>
        </header>

        {/* Complaints Section (includes cards inside) */}
        <section className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-6 sm:p-8 overflow-auto">
          <AllComplaints />
        </section>
      </main>
    </>
  );
};

export default HomepageAdmin;
