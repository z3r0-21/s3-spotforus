import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    topic: '',
    message: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Submitting topic: ${formData.topic} and message: ${formData.message}`);
    setFormData({
      topic: '',
      message: '',
    });
  };
  

  return (
    <div className="bg-white rounded-lg shadow-lg px-2 sm:px-4">
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-gray-800">Complaints/Feedback</h2>
            <label htmlFor="topic" className="block text-gray-700 text-sm font-bold my-2">
                Topic:
            </label>
            <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mt-4 mb-2">
                Message:
            </label>
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
            >
                Send
            </button>
        </form>
    </div>
  );
}

export default ContactForm;
