import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    // Placeholder submit
    setTimeout(() => {
      setLoading(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSuccess("Your message has been sent successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
         <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Contact <span className="text-orange-500">Us</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions or suggestions? Send us a message and we’ll get back
            to you as soon as possible.
          </p>
        </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Send a Message</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/** Floating Inputs */}
              {["name", "email", "subject"].map((field) => (
                <div key={field} className="relative z-0 w-full mb-5 group">
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="peer block w-full px-4 py-3 text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:border-orange-400 focus:ring focus:ring-orange-200 focus:outline-none transition"
                  />
                  <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-orange-500">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                </div>
              ))}

              {/* Message Textarea */}
              <div className="relative z-0 w-full group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  rows={5}
                  required
                  className="peer block w-full px-4 py-3 text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:border-orange-400 focus:ring focus:ring-orange-200 focus:outline-none transition"
                ></textarea>
                <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-orange-500">
                  Message
                </label>
              </div>

              {/* Submit Button */}
              <div className="text-center mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-xl text-white font-semibold bg-gradient-to-r from-[#ff8a0c] to-[#07a0e3] hover:scale-105 transition transform shadow-lg"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
                {success && (
                  <p className="text-green-500 mt-3 font-medium">{success}</p>
                )}
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="bg-white shadow-2xl rounded-3xl p-8 hover:shadow-3xl transition duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact Info</h2>
              <div className="flex items-center gap-3 mb-4">
                <FaEnvelope className="text-orange-500 text-xl" />
                <span className="text-gray-700">support@plateshare.com</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <FaPhoneAlt className="text-orange-500 text-xl" />
                <span className="text-gray-700">+880 1234 567890</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-orange-500 text-xl" />
                <span className="text-gray-700">123, Dhanmondi, Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-orange-100 rounded-2xl p-6 text-center hover:scale-105 transition transform">
              <h3 className="text-xl font-semibold text-orange-600 mb-2">We are here to help!</h3>
              <p className="text-gray-700 text-sm">
                Our support team is available 24/7 to answer your questions.
              </p>
            </div>
          </div>
        </div>

        {/* Optional Map */}
        <div className="mt-12 rounded-3xl overflow-hidden shadow-2xl">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8898753138747!2d90.36512091543027!3d23.746466394592894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8783b84a2e9%3A0xd75f83f4a8b1b5b8!2sDhanmondi%2C%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
            width="100%"
            height="300"
            className="border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;


