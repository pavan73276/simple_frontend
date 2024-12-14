import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Review({ onNext, onPrev }) {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handlePrev = () => {
    if (onPrev) onPrev(); // Update step in App.jsx
    navigate("/claim"); // Navigate to Claim.jsx
  };

  const handleNext = () => {
    if (isConfirmed) {
      if (onNext) onNext(); // Trigger progress bar update
      navigate("/payment"); // Navigate to Payment.jsx
    } else {
      alert("Please confirm the information by checking the checkbox.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl h-[90vh] p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center">Review Details</h2>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="confirmation"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="confirmation" className="ml-2 text-gray-700">
            I confirm all details are correct.
          </label>
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

export default Review;
