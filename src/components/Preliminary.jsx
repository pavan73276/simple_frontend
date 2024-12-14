import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Preliminary({ onNext }) {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleNext = () => {
    if (isChecked) {
      onNext(); // Trigger progress bar update
      navigate("/details"); // Navigate to the next step
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      {/* Main Block */}
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl h-[90vh] p-6 flex flex-col">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-center">
          Terms and Conditions
        </h2>

        {/* Scrollable Terms Section */}
        <div className="flex-1 overflow-y-auto border border-gray-300 rounded-md p-4 bg-gray-50 text-justify">
          <p>
            By accessing and using our services, you agree to comply with the
            following terms and conditions. These terms outline your rights and
            responsibilities as a user, as well as the guidelines governing your
            use of our services. Our services are designed to provide secure and
            efficient solutions, but we expect users to utilize them responsibly
            and in accordance with applicable laws. You agree not to engage in
            any activities that may harm, disrupt, or interfere with the
            services or the rights of other users. We reserve the right to
            modify these terms at any time. Any changes will be communicated
            through our platform, and it is your responsibility to review them
            periodically. Continued use of our services after updates
            constitutes your acceptance of the revised terms. Furthermore, jrx
            is committed to protecting your data and privacy. We implement
            industry-standard security measures to safeguard your information,
            but users must also play a role in maintaining the confidentiality
            of their account details. Payment terms, service limitations, and
            intellectual property rights are clearly outlined, and any
            unauthorized use will be subject to legal action. By agreeing to
            these terms, you also acknowledge that jrx holds the right to
            suspend or terminate services in cases of misuse or non-compliance.
            If you have any questions or concerns regarding these terms, please
            contact us for clarification. Your continued use of our services
            signifies your acceptance of these terms and conditions.
          </p>
        </div>

        {/* Checkbox and Navigation Buttons */}
        <div className="mt-4 flex items-center justify-between">
          {/* Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="terms" className="text-gray-700">
              I accept the terms and conditions.
            </label>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              className="bg-gray-400 text-white py-2 px-6 rounded-lg cursor-not-allowed"
              disabled
            >
              Prev
            </button>
            <button
              className={`py-2 px-6 rounded-lg ${
                isChecked
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
              disabled={!isChecked}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preliminary;
