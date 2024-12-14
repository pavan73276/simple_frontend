import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Claim({ onNext, onPrev }) {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handlePrev = () => {
    if (onPrev) onPrev(); // Update step in App.jsx
    navigate("/parties"); // Navigate to Parties.jsx
  };

  const handleNext = () => {
    if (isConfirmed) {
      if (onNext) onNext(); // Trigger progress bar update
      navigate("/review"); // Navigate to Review.jsx
    } else {
      alert("Please confirm your information by checking the checkbox.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl h-[60vh] p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center">Confirmation</h2>

        <div className="flex-1 border border-gray-300 rounded-md p-4 bg-gray-50">
          <p className="mb-4 text-center">
            Please review your information carefully before proceeding.
          </p>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="confirmation"
              checked={isConfirmed}
              onChange={() => setIsConfirmed(!isConfirmed)}
              className="w-4 h-4"
            />
            <label htmlFor="confirmation" className="ml-2 text-gray-700">
              I confirm the information provided is correct.
            </label>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg"
            onClick={handlePrev}
          >
            Prev
          </button>
          <button
            className="py-2 px-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Claim;
