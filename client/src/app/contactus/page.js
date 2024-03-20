"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

function ContactPage() {
  // State for form inputs
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null); // Define submissionStatus here
  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to handle form submission, e.g., send data to backend
    console.log(form);
    // Optionally reset form fields after submission
    // setForm({ name: "", email: "", subject: "", message: "" });
    try {
      // Send form data to backend server
      await axios.post('http://localhost:3001/admin/submit', form);
      console.log('Form submitted successfully');
      setSubmissionStatus({ success: true, message: 'Form submitted successfully' });
      // Optionally reset form fields after submission
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmissionStatus({ success: false, message: 'Form submission failed. Please try again later.' });
    }
  };

  return (
    <div className="bg-gray-100 pt-24"> {/* Added padding to the top of the container */}
      {/* Contact Section */}
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="mb-8">We consider all the drivers of change gives you the components you need to change to create a truly happiness.</p>
        
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 inline-block">
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subject"
              name="subject"
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              placeholder="Message"
              rows="3"
              value={form.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send
            </button>
          </div>
        </form>
        {submissionStatus && (
        <div style={{ color: submissionStatus.success ? 'green' : 'red' }}>
          {submissionStatus.message}
        </div>
      )}

        {/* Additional Contact Info */}
        <div className="flex flex-wrap justify-around mt-8">
          <div className="text-center p-4">
            <h3 className="font-bold text-lg">Call Us:</h3>
            <p className="text-gray-600">+1-234-567-8900</p>
          </div>
          <div className="text-center p-4">
            <h3 className="font-bold text-lg">Hours:</h3>
            <p className="text-gray-600">Mon-Fri: 8am - 8pm</p>
            <p className="text-gray-600">Sat, Sun: 9am - 10pm</p>
          </div>
          <div className="text-center p-4">
            <h3 className="font-bold text-lg">Our Locations:</h3>
            <p className="text-gray-600">Amman</p>
            <p className="text-gray-600">Aqaba</p>
            <p className="text-gray-600">Zarqa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;