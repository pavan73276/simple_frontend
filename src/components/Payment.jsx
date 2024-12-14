import React from "react";
import { useNavigate } from "react-router-dom";

function Payment({ onPrev }) {
  const navigate = useNavigate();

  const handlePrev = () => {
    if (onPrev) onPrev(); // Update step in App.jsx
    navigate("/review"); // Navigate to Review.jsx
  };

  const handleSubmit = () => {
    // Clear local storage or any other required data reset
    localStorage.clear(); 
    navigate("/preliminary"); // Navigate to Preliminary.jsx and restart progress bar
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl h-[90vh] p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment Details</h2>

        <div className="flex-1 overflow-y-auto border border-gray-300 rounded-md p-4 bg-gray-50">
          {/* Payment details can be added here if needed */}
          <p className="text-gray-700">No payment details required for now.</p>
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
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
