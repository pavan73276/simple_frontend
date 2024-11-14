import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskCard from "./TaskCard";

const Dashboard = () => {
  const { tasks, updateTask, deleteTask } = useTaskContext();
  const currentDate = new Date();

  // State to control the visibility of each section
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showOverdue, setShowOverdue] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);

  const upcomingTasks = tasks.filter(
    (task) => !task.completed && new Date(task.dueDate) > currentDate
  );
  const overdueTasks = tasks.filter(
    (task) => !task.completed && new Date(task.dueDate) <= currentDate
  );
  const completedTasks = tasks.filter((task) => task.completed);

  // Handler for delete task with alert
  const handleDeleteTask = (id) => {
    deleteTask(id);
    alert("Task deleted successfully!");
  };

  // Handler for update task with alert
  const handleUpdateTask = (id, updatedTask) => {
    updateTask(id, updatedTask);
    alert("Task updated successfully!");
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Task Manager
        </h1>

        {/* Task Sections */}
        {[
          { label: "Upcoming Tasks", tasks: upcomingTasks, show: showUpcoming, setShow: setShowUpcoming },
          { label: "Overdue Tasks", tasks: overdueTasks, show: showOverdue, setShow: setShowOverdue },
          { label: "Completed Tasks", tasks: completedTasks, show: showCompleted, setShow: setShowCompleted },
        ].map(({ label, tasks, show, setShow }) => (
          <section key={label} className="mb-6 bg-white shadow-lg rounded-lg p-6 transition duration-300 hover:shadow-xl">
            <div
              onClick={() => setShow(!show)}
              className="flex items-center justify-between cursor-pointer text-2xl font-semibold text-gray-700 hover:text-blue-600"
            >
              <span className="flex items-center space-x-2">
                <span className="text-xl font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{label}</span>
              </span>
              <span
                className={`transform transition-transform duration-200 ${show ? "rotate-180" : ""} text-blue-500 text-2xl font-bold`}
              >
                ⮟
              </span>
            </div>
            {show && (
              <div className="mt-4 space-y-4">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      updateTask={(id, updatedTask) => handleUpdateTask(id, updatedTask)} // Update with alert
                      deleteTask={(id) => handleDeleteTask(id)} // Delete with alert
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center italic">No {label.toLowerCase()} available</p>
                )}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
