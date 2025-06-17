import React from 'react';
import AdminNav from './AdminComponents/AdminNav';
import AllComplaints from './AdminComponents/AllComplaints';
import AdminComplaintCards from './AdminComponents/AdminComplaintCards';

const HomepageAdmin = () => {
  return (
    <>
      <AdminNav />
      <main className="min-h-screen bg-gradient-to-r from-amber-100 to-blue-200 py-10 px-4 sm:px-8 lg:px-16">
        {/* Cards Section */}
        <section className="mb-12 max-w-7xl mx-auto">
          <AdminComplaintCards />
        </section>

        {/* Heading */}
        <header className="max-w-7xl mx-auto mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Complaint Management
          </h1>
        </header>

        {/* Complaints List */}
        <section className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-6 sm:p-8 overflow-auto">
          <AllComplaints />
        </section>
      </main>
    </>
  );
};

export default HomepageAdmin;
