import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveTasks, getTasks } from "../helpers/localStorageHelper";

function KYC({ onNext, onPrev }) {
  const navigate = useNavigate();

  const initialData = getTasks();
  const [formData, setFormData] = useState(
    initialData || {
      aadhaarNumber: "",
      panNumber: "",
      passportNumber: "",
      drivingLicense: "",
      voterID: "",
      gstNumber: "",
      companyName: "",
      companyAddress: "",
    }
  );

  const [errors, setErrors] = useState({});

  useEffect(() => {
    saveTasks(formData);
  }, [formData]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "aadhaarNumber":
        if (!/^\d{12}$/.test(value)) error = "Aadhaar number must be 12 digits.";
        break;
      case "panNumber":
        if (!/^\d+$/.test(value)) error = "Invalid PAN number format.";
        break;
      case "passportNumber":
        if (!/^\d+$/.test(value)) error = "Invalid passport number format.";
        break;
      case "drivingLicense":
        if (!value.trim()) error = "Driving license is required.";
        break;
      case "voterID":
        if (!value.trim()) error = "Voter ID is required.";
        break;
      case "gstNumber":
        if (!value.trim()) error = "Invalid GST number format.";
        break;
      case "companyName":
        if (!value.trim()) error = "Company name is required.";
        break;
      case "companyAddress":
        if (!value.trim()) error = "Company address is required.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePrev = () => {
    if (onPrev) onPrev(); // Update step in App.jsx
    navigate("/details"); // Navigate to the Details component
  };
  

  const handleNext = () => {
    if (!validateForm()) {
      const errorMessages = Object.values(errors).filter((error) => error);
      alert(`Please fill the form carefully:\n\n${errorMessages.join("\n")}`);
    } else {
      if (onNext) onNext(); // Trigger progress bar update
      navigate("/parties");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl h-[90vh] p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center">KYC Details</h2>

        <div className="flex-1 overflow-y-auto border border-gray-300 rounded-md p-4 bg-gray-50">
          <form className="space-y-4">
            {[
              { label: "Aadhaar Number", name: "aadhaarNumber", type: "text" },
              { label: "PAN Number", name: "panNumber", type: "text" },
              { label: "Passport Number", name: "passportNumber", type: "text" },
              { label: "Driving License", name: "drivingLicense", type: "text" },
              { label: "Voter ID", name: "voterID", type: "text" },
              { label: "GST Number", name: "gstNumber", type: "text" },
              { label: "Company Name", name: "companyName", type: "text" },
              { label: "Company Address", name: "companyAddress", type: "text" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-gray-700 font-medium mb-1">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}
          </form>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
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

export default KYC;
