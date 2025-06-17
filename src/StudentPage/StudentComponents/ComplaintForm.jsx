import React, { useState ,useEffect} from 'react';
import { ref, push } from 'firebase/database';
import { db, auth } from '../../firebase';  // Make sure your firebase exports db and auth correctly
import Navbar from './Navbar';
const ComplaintForm = () => {
  // State for all inputs
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low priority');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  useEffect(()=>{
        const user = auth.currentUser;
        if(user){
          setEmail(user.email || '');
        }
      },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const user = auth.currentUser;
      if (!user) {
        setError('User not logged in');
        return;
      }

      

      // Build complaint object
      const complaintData = {
        name,
        roll,
        email,
        phone,
        department,
        date,
        subject,
        description,
        priority,
        status: 'pending',
        timestamp: new Date().toISOString(),
      };

      // Push complaint to user's complaints node
      const complaintRef = ref(db, `users/${user.uid}/complaints`);
      await push(complaintRef, complaintData);

      setSuccess('Complaint submitted successfully!');
      // Clear form
      setName('');
      setRoll('');
      setEmail('');
      setPhone('');
      setDepartment('Computer Science');
      setDate('');
      setSubject('');
      setDescription('');
      setPriority('Low priority');
    } catch (err) {
      setError('Failed to submit complaint: ' + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className='font-semibold hover:shadow-yellow-200 hover:shadow-xl w-3/4 xl:w-[35rem] mt-14 pl-20 xl:pl-8 xl:pt-6 flex justify-center items-center xl:ml-[29rem] ml-11 rounded-xl xl:mt-16 xl:mb-11 bg-gradient-to-r from-cyan-400 to-blue-400'>
        <form onSubmit={handleSubmit} className="w-full">
          {/* Name */}
          <div className='p-2'>
            <label htmlFor="Name">
              <h1 className='hidden md:flex text-white'>Enter your name :</h1>
              <input
                type="text"
                placeholder="     Student's Name"
                className='text-black w-full rounded-md p-1'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Roll Number */}
          <div className='p-2'>
            <label htmlFor="roll">
              <h1 className='hidden md:flex text-white'>Enter your roll number :</h1>
              <input
                type="number"
                placeholder="     Enter Roll number"
                className='w-full rounded-md p-1'
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Email */}
          <div className='p-2'>
            <label htmlFor="email">
              
              <input
                type="email"
                className='w-full rounded-md p-1 text-center text-red-600'
                value={email}
                readOnly
                // onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          {/* Phone */}
          <div className='p-2'>
            <label htmlFor="phoneNumber">
              <h1 className='hidden md:flex text-white'>Enter your phone number :</h1>
              <input
                type="tel"
                placeholder="      phone number"
                maxLength={10}
                className='w-full rounded-md p-1'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Department */}
          <div className='p-2 text-black font-normal'>
            <h1 className='hidden md:flex text-white'>Choose department :</h1>
            <select
              className='w-full rounded-md p-1'
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical">Electrical</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts & wellbeing">Arts & wellbeing</option>
              <option value="Law">Law</option>
              <option value="Hostel">Hostel</option>
              <option value="Library">Library</option>
            </select>
          </div>

          {/* Date */}
          <div className='p-2'>
            <label htmlFor="Date">
              <h1 className='hidden md:flex text-white'>Date of complaint :</h1>
              <input
                type="date"
                className='w-full rounded-md p-1'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Subject */}
          <div className='p-2'>
            <label htmlFor="subject">
              <h1 className='hidden md:flex text-white'>Enter title/subject of complaint (in short) :</h1>
              <input
                type="text"
                placeholder='Enter Subject of complaint'
                className='w-full rounded-md p-1'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Description */}
          <div className='p-2'>
            <label htmlFor="description">
              <h1 className='hidden md:flex text-white'>Describe the issue:</h1>
              <textarea
                placeholder='Add detail of complaint'
                className='w-full rounded-md p-1'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Priority */}
          <div className='p-2'>
            <label htmlFor="priority">
              <h1 className='hidden md:flex text-white'>Choose importance of issue :</h1>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className='w-full rounded-md p-1'
              >
                <option value="Low priority">Low priority</option>
                <option value="Medium priority">Medium priority</option>
                <option value="High priority">High priority</option>
              </select>
            </label>
          </div>

          {/* Attachment (optional) */}
          <div className='p-2'>
            <label htmlFor="attachment">
              <h1 className='hidden md:flex text-white'>Attachments related to issue (optional):</h1>
              <input
                type="file"
                className='w-full rounded-md p-1 text-black'
                disabled
                title="Attachment feature not implemented"
              />
            </label>
          </div>

          {/* Submit button */}
          <div className='p-2'>
            <button
              type="submit"
              className='w-full p-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 font-bold text-lg text-black mt-4'
            >
              Submit
            </button>
          </div>

          {/* Success or error messages */}
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {success && <p className="text-green-600 text-center mt-2">{success}</p>}
        </form>
      </div>
    </>
  );
};

export default ComplaintForm;
