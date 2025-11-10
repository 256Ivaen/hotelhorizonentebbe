import React from "react";

import Location from "../components/MapLocation";
import FAQS from "../components/FrequentQuestions";

const Contact = () => {
  return (
    <div>
      <div className="sm:pt-40 sm:pb-20 py-10 lg:px-20 bg-[#01234e] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mx-auto">
        {/* Contact Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Left Side */}
          <div className="flex-1 flex-col justify-center">
            <h1 className="text-5xl text-white mb-4">Contact Us</h1>
            <p className="text-white mb-2">
              Email, call, or complete the form to learn how Polad can be of Help.
            </p>
            <p className="mb-2 text-white">info@poladuganda.com</p>
            <p className="mb-4 text-white">+256 700 202 050 </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <h4 className="font-semibold mb-2 text-white">
                  Feedback and Suggestions
                </h4>
                <p className="text-sm text-white">
                  We value your feedback and strive to improve our services.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-white">
                  Media Inquiries
                </h4>
                <p className="text-sm text-white">
                  Contact us at info@poladuganda.com for any inquiries.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 sm:max-w-[350px] bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl mb-4">Get in Touch</h2>
            <form className="flex flex-col gap-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-1/2 p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-1/2 p-2 border border-gray-300 rounded"
                />
              </div>
              <input
                type="email"
                placeholder="Your email"
                className="p-2 border border-gray-300 rounded"
              />
              <div className="flex gap-4">
                <select className="w-1/4 p-2 border border-gray-300 rounded">
                  <option value="+256">+256</option>
                </select>
                <input
                  type="text"
                  placeholder="Phone number"
                  className="w-3/4 p-2 border border-gray-300 rounded"
                />
              </div>
              <textarea
                placeholder="How can we help?"
                maxLength="120"
                className="p-2 border border-gray-300 rounded h-24"
              />
              <div className="flex flex-col gap-2"></div>
              <button
                type="submit"
                className="bg-[#01234e] text-white py-2 rounded-[100px] transition-all"
              >
                Submit
              </button>
              <p className="text-xs text-center text-gray-500 mt-2">
                By contacting us, you agree to our{" "}
                <a href="#" className="font-bold">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-bold">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
      <Location />
      <FAQS />
    </div>
  );
};

export default Contact;
