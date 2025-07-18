import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
} from "react-icons/fa";

const ContactUs = () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5f5] via-white to-white flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8 md:p-10">
        <h2 className="text-3xl font-bold text-center text-[#fe4e4e] mb-4">
          Contact Information
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Feel free to reach out to me regarding this task or any opportunity!
        </p>

        <div className="space-y-6 text-gray-800 text-lg">
          <div className="flex items-center gap-4">
            <span className="text-[#fe4e4e]">
              <FaEnvelope />
            </span>
            <span>dev.dardi999@gmail.com</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#fe4e4e]">
              <FaPhoneAlt />
            </span>
            <span>+91-90991 52937</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#fe4e4e]">
              <FaMapMarkerAlt />
            </span>
            <span>Ahmedabad, Gujarat, India</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#fe4e4e]">
              <FaLinkedin />
            </span>
            <a
              href="https://www.linkedin.com/in/dhaval-ardi-519b481b0/?originalSubdomain=in"
              className="hover:underline text-[#fe4e4e] font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/Mr-Dhaval-Ardi
            </a>
          </div>
        </div>

        {/* ✅ Move button here inside the card */}
        <div className="mt-10 text-center">
          <a
            href="/"
            className="inline-block bg-[#fe4e4e] text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-[#e53e3e] transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
