import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import Dashboard from "./components/Dashboard";
import TaskForm from "./components/TaskForm";
import SearchAndFilter from "./components/SearchAndFilter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="container mx-auto px-4 py-6 bg-gray-50 min-h-screen shadow-lg rounded-lg">
          {/* Navigation bar */}
          <nav className="flex justify-center space-x-8 mb-8 bg-white p-4 shadow-md rounded-lg">
            <Link
              to="/"
              className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/add-task"
              className="text-lg font-semibold text-gray-700 hover:text-green-500 transition-colors duration-200"
            >
              Add Task
            </Link>
            <Link
              to="/search"
              className="text-lg font-semibold text-gray-700 hover:text-purple-500 transition-colors duration-200"
            >
              Search
            </Link>
          </nav>

          {/* Routes for different components */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-task" element={<TaskForm />} />
            <Route path="/search" element={<SearchAndFilter />} />
          </Routes>
          
          {/* ToastContainer should be here */}
          <ToastContainer />
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;
