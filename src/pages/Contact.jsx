import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Contact Me</h2>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information Section */}
        <div className="lg:col-span-1 bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Informasi Kontak</h3>
          <p className="text-gray-700 mb-6">Anda juga dapat menghubungi kami menggunakan informasi berikut.</p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <FaEnvelope className="text-blue-500 mr-3" />
              <span>alziputra12@gmail.com</span>
            </li>
            <li className="flex items-center">
              <FaPhone className="text-blue-500 mr-3" />
              <span>Phone +62 821 8256 8860</span>
            </li>
            <li className="flex items-center">
              <FaMapMarkerAlt className="text-blue-500 mr-3" />
              <span>Bogor Timur, Kota Bogor</span>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-1 bg-gray-100 p-4 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="w-auto">
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">Send me a message</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="message">
                Message
              </label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200">
              Send Message
            </button>
            {status && <p className="mt-4 text-center text-green-600">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
