import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveTasks, getTasks } from "../helpers/localStorageHelper"; // Import the helper functions

const Parties = ({ onNext, onPrevious }) => {
  const navigate = useNavigate();

  // State management
  const [contractValue, setContractValue] = useState("");
  const [claimValue, setClaimValue] = useState("");
  const [place, setPlace] = useState("");
  const [language, setLanguage] = useState("");
  const [isPlaceMentioned, setIsPlaceMentioned] = useState(null);
  const [isLanguageMentioned, setIsLanguageMentioned] = useState(null);
  const [statementFile, setStatementFile] = useState(null);
  const [contractFile, setContractFile] = useState(null);
  const [agreementFile, setAgreementFile] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);

  const contractPercentage = contractValue
    ? ((claimValue / contractValue) * 100).toFixed(2)
    : 0;

  useEffect(() => {
    // Load tasks from local storage when the component mounts
    const savedTasks = getTasks();
    if (savedTasks) {
      setContractValue(savedTasks.contractValue || "");
      setClaimValue(savedTasks.claimValue || "");
      setPlace(savedTasks.place || "");
      setLanguage(savedTasks.language || "");
      setIsPlaceMentioned(savedTasks.isPlaceMentioned);
      setIsLanguageMentioned(savedTasks.isLanguageMentioned);
    }
  }, []);

  // Input validation
  const handleFileUpload = (e, setFile) => {
    const file = e.target.files[0];
    if (file && file.size > 100 * 1024) {
      toast.error("File size must not exceed 100 KB!");
      return;
    }
    setFile(file);
  };

  const handleAdditionalFiles = (e) => {
    const files = e.target.files;
    if (additionalFiles.length + files.length > 3) {
      toast.error("You can upload a maximum of 3 additional files.");
      return;
    }
    const validFiles = Array.from(files).filter(
      (file) => file.size <= 100 * 1024
    );

    if (validFiles.length < files.length) {
      toast.error("Some files exceed the 100 KB limit!");
    }

    setAdditionalFiles([...additionalFiles, ...validFiles]);
  };

  const handleNext = () => {
    if (!contractValue || !claimValue || !place || !language) {
      toast.error("Please fill out all required fields!");
      return;
    }

    if (!statementFile || !contractFile || !agreementFile) {
      toast.error("Please upload all mandatory files!");
      return;
    }

    const tasks = {
      contractValue,
      claimValue,
      place,
      language,
      isPlaceMentioned,
      isLanguageMentioned,
      statementFile,
      contractFile,
      agreementFile,
      additionalFiles
    };

    saveTasks(tasks); // Save all filled details to local storage

    onNext();
    navigate("/claim"); // Navigate to Claim.jsx
  };

  return (
    <div className="space-y-8">
      {/* Step Progress */}
      <h2 className="text-xl font-bold text-blue-600">File your Claim</h2>

      {/* First Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Claim Value */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="material-icons text-blue-500">attach_money</span>
            <span className="font-bold">Claim Value</span>
          </div>
          <input
            type="number"
            placeholder="Contract Value"
            value={contractValue}
            onChange={(e) => setContractValue(e.target.value)}
            className="w-full border rounded p-2"
          />
          <input
            type="number"
            placeholder="Claim Value"
            value={claimValue}
            onChange={(e) => setClaimValue(e.target.value)}
            className="w-full border rounded p-2 mt-2"
          />
          <span className="text-sm text-orange-500">
            {claimValue && `(${contractPercentage}% of Contract Value)`}
          </span>
        </div>

        {/* Place */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="material-icons text-blue-500">place</span>
            <span className="font-bold">Place</span>
          </div>
          <select
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Select Place</option>
            <option value="Place A">Place A</option>
            <option value="Place B">Place B</option>
          </select>
          <div className="mt-2">
            <label>
              <input
                type="radio"
                value="yes"
                checked={isPlaceMentioned === "yes"}
                onChange={() => setIsPlaceMentioned("yes")}
              />{" "}
              Yes
            </label>
            <label className="ml-4">
              <input
                type="radio"
                value="no"
                checked={isPlaceMentioned === "no"}
                onChange={() => setIsPlaceMentioned("no")}
              />{" "}
              No
            </label>
          </div>
        </div>

        {/* Language */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="material-icons text-blue-500">language</span>
            <span className="font-bold">Language</span>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
          </select>
          <div className="mt-2">
            <label>
              <input
                type="radio"
                value="yes"
                checked={isLanguageMentioned === "yes"}
                onChange={() => setIsLanguageMentioned("yes")}
              />{" "}
              Yes
            </label>
            <label className="ml-4">
              <input
                type="radio"
                value="no"
                checked={isLanguageMentioned === "no"}
                onChange={() => setIsLanguageMentioned("no")}
              />{" "}
              No
            </label>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Statement */}
        <div>
          <p className="font-bold">Statement</p>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileUpload(e, setStatementFile)}
          />
        </div>

        {/* Agreement under Disputes */}
        <div>
          <p className="font-bold">Agreement under Disputes</p>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileUpload(e, setContractFile)}
          />
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileUpload(e, setAgreementFile)}
            className="mt-2"
          />
        </div>

        {/* Additional Documents */}
        <div>
          <p className="font-bold">Additional Documentation</p>
          <label className="flex items-center cursor-pointer">
            <span className="material-icons text-blue-500 text-3xl">add_circle</span>
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleAdditionalFiles}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => {
            onPrevious();
            navigate("/kyc");
          }}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Parties;
