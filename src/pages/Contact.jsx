import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';


const Contact = ({ isOpen, onClose }) => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, text: '', type: 'success' });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const showAlert = ({ text, type = 'success' }) => {
    setAlert({ show: true, text, type });
    setTimeout(() => setAlert({ show: false, text: '', type: 'success' }), 3000);
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    setLoading(true);
   
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Murari Mohan Tripathi',
          from_email: form.email,
          to_email: 'tripathimurari599@gmail.com',
          message: form.message,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({ text: 'Thank you for your message 😃', type: 'success' });
          setForm({ name: '', email: '', message: '' });
        },
        (error) => {
          console.error(error);
          setLoading(false);
          showAlert({ text: "I didn't receive your message 😢", type: 'danger' });
        }
      );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
      <div className="bg-gray-900 text-white w-full max-w-lg p-6 rounded-xl relative shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-400"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

        {alert.show && (
          <div
            className={`mb-4 px-4 py-2 rounded ${
              alert.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {alert.text}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-4 py-2 bg-gray-800 rounded-md outline-none"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-4 py-2 bg-gray-800 rounded-md outline-none"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={4}
            required
            className="w-full px-4 py-2 bg-gray-800 rounded-md outline-none"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-md"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
