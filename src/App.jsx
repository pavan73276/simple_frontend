import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Preliminary from "./components/Preliminary";
import Details from "./components/Details";
import KYC from "./components/KYC";
import Parties from "./components/Parties";
import Claim from "./components/Claim";
import Review from "./components/Review";
import Payment from "./components/Payment";
import Profile from "./components/Profile";
import Notification from "./components/Notification";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "material-icons/iconfont/material-icons.css"; // For Material Icons

function App() {
  const steps = [
    { name: "Preliminary", path: "/preliminary" },
    { name: "Your Details", path: "/details" },
    { name: "KYC", path: "/kyc" },
    { name: "Parties", path: "/parties" },
    { name: "Claim", path: "/claim" },
    { name: "Review", path: "/review" },
    { name: "Payment", path: "/payment" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const ProgressBar = () => {
    const navigate = useNavigate();

    const handleStepClick = (index) => {
      if (index <= currentStep) {
        setCurrentStep(index);
        navigate(steps[index].path);
      }
    };

    return (
      <div className="flex items-center mb-8 justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              onClick={() => handleStepClick(index)}
              className={`flex flex-col items-center cursor-pointer ${
                index <= currentStep ? "hover:text-blue-600" : "cursor-not-allowed"
              }`}
            >
              <span
                className={`text-sm font-bold mb-2 ${
                  index <= currentStep ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {step.name}
              </span>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  index < currentStep
                    ? "bg-blue-500"
                    : index === currentStep
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 bg-gray-300 mx-2">
                <div
                  className={`h-full ${
                    index < currentStep ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  style={{ width: "100%" }}
                ></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Top Navbar */}
        <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Jur</h1>
          <div className="flex space-x-4">
            <button
              className="md:hidden w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <span className="material-icons">menu</span>
            </button>
            <Link to="/notification">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                <span className="material-icons">notifications</span>
              </div>
            </Link>
            <Link to="/profile">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                <span className="material-icons">person</span>
              </div>
            </Link>
          </div>
        </header>

        <div className="flex flex-grow">
          {/* Sidebar */}
          <aside
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } md:block md:w-64 bg-white shadow-lg p-4 flex-shrink-0 z-10`}
          >
            <nav className="space-y-6">
              <Link
                to="/preliminary"
                className="flex items-center text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 p-2 rounded-lg"
              >
                <span className="material-icons mr-3">dashboard</span> Dashboard
              </Link>
              <Link
                to="/mycases"
                className="flex items-center text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 p-2 rounded-lg"
              >
                <span className="material-icons mr-3">article</span> My Cases
              </Link>
              <Link
                to="/activity"
                className="flex items-center text-gray-700 font-medium hover:bg-purple-50 hover:text-purple-600 p-2 rounded-lg"
              >
                <span className="material-icons mr-3">event</span> Activity
              </Link>
              <Link
                to="/calendar"
                className="flex items-center text-gray-700 font-medium hover:bg-yellow-50 hover:text-yellow-600 p-2 rounded-lg"
              >
                <span className="material-icons mr-3">calendar_today</span> Calendar
              </Link>
              <Link
                to="/files"
                className="flex items-center text-gray-700 font-medium hover:bg-pink-50 hover:text-pink-600 p-2 rounded-lg"
              >
                <span className="material-icons mr-3">folder</span> Files
              </Link>
              <Link
                to="/open"
                className="flex items-center text-gray-700 font-medium hover:bg-red-50 hover:text-red-600 p-2 rounded-lg"
              >
                <span className="material-icons mr-3">open_in_new</span> Open a Dispute
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 p-6 md:ml-auto md:mr-auto max-w-screen-lg">
            {/* Progress Bar */}
            <ProgressBar />

            {/* Routes for different components */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/preliminary"
                element={<Preliminary onNext={() => setCurrentStep(1)} />}
              />
              <Route
                path="/details"
                element={
                  <Details
                    onNext={() => setCurrentStep(2)}
                    onPrevious={() => setCurrentStep(0)}
                  />
                }
              />
              <Route
                path="/kyc"
                element={
                  <KYC
                    onNext={() => setCurrentStep(3)}
                    onPrevious={() => setCurrentStep(1)}
                  />
                }
              />
              <Route
                path="/parties"
                element={
                  <Parties
                    onNext={() => setCurrentStep(4)}
                    onPrevious={() => setCurrentStep(2)}
                  />
                }
              />
              <Route
                path="/claim"
                element={
                  <Claim
                    onNext={() => setCurrentStep(5)}
                    onPrevious={() => setCurrentStep(3)}
                  />
                }
              />
              <Route
                path="/review"
                element={
                  <Review
                    onNext={() => setCurrentStep(6)}
                    onPrevious={() => setCurrentStep(4)}
                  />
                }
              />
              <Route
                path="/payment"
                element={<Payment onPrevious={() => setCurrentStep(5)} />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notification" element={<Notification />} />
            </Routes>
          </div>
        </div>

        {/* ToastContainer */}
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
