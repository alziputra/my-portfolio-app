import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Contact = () => {
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

        {/* Social Media Links */}
        <div className="lg:col-span-1 bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Ikuti Saya</h3>
          <p className="text-gray-700 mb-6">Hubungi melalui profil media sosial saya.</p>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/in/alzirahmana/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <FaLinkedinIn size={24} />
            </a>
            <a href="https://github.com/alziputra" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
              <FaGithub size={24} />
            </a>
            <a href="https://www.instagram.com/alzi_rahmana/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
