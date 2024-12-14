import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveTasks, getTasks } from "../helpers/localStorageHelper";

function Detail({ onNext, onPrev }) {
  const navigate = useNavigate();

  const initialData = getTasks();
  const [formData, setFormData] = useState(
    initialData || {
      firstName: "",
      lastName: "",
      fathersName: "",
      mothersName: "",
      dob: "",
      phoneNumber: "",
      email: "",
      address: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
    }
  );

  const [errors, setErrors] = useState({});

  useEffect(() => {
    saveTasks(formData);
  }, [formData]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) error = `${name === "firstName" ? "First" : "Last"} name is required.`;
        break;
      case "fathersName":
        if (!value.trim()) error = "Father's name is required.";
        break;
      case "mothersName":
        if (!value.trim()) error = "Mother's name is required.";
        break;
      case "dob":
        if (!value) error = "Date of birth is required.";
        break;
      case "phoneNumber":
        if (!/^\d{10}$/.test(value)) error = "Phone number must be 10 digits.";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format.";
        break;
      case "address":
        if (!value.trim()) error = "Address is required.";
        break;
      case "bankName":
        if (!value.trim()) error = "Bank name is required.";
        break;
      case "accountNumber":
        if (!/^\d+$/.test(value)) error = "Account number must be numeric.";
        break;
      case "ifscCode":
        if (!/^\d+$/.test(value)) error = "Invalid IFSC code format.";
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
    if (onPrev) onPrev(); // Trigger progress bar update
    navigate("/preliminary");
  };

  const handleNext = () => {
    if (!validateForm()) {
      const errorMessages = Object.values(errors).filter((error) => error);
      alert(`Please fill the form carefully:\n\n${errorMessages.join("\n")}`);
    } else {
      if (onNext) onNext(); // Trigger progress bar update
      navigate("/kyc");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl h-[90vh] p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center">Personal Details</h2>

        <div className="flex-1 overflow-y-auto border border-gray-300 rounded-md p-4 bg-gray-50">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>
            {[
              { label: "Father's Name", name: "fathersName", type: "text" },
              { label: "Mother's Name", name: "mothersName", type: "text" },
              { label: "Date of Birth", name: "dob", type: "date" },
              { label: "Phone Number", name: "phoneNumber", type: "tel" },
              { label: "Email", name: "email", type: "email" },
              { label: "Address", name: "address", type: "text" },
              { label: "Bank Name", name: "bankName", type: "text" },
              { label: "Account Number", name: "accountNumber", type: "text" },
              { label: "IFSC Code", name: "ifscCode", type: "text" },
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

export default Detail;
