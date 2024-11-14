// src/components/SearchAndFilter.js
import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import { AiOutlineSearch } from "react-icons/ai";

const SearchAndFilter = () => {
  const { tasks } = useTaskContext();
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const currentDate = new Date();

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === "" || task.priority === priorityFilter;

    const isUpcoming = !task.completed && new Date(task.dueDate) > currentDate;
    const isOverdue = !task.completed && new Date(task.dueDate) <= currentDate;
    const isCompleted = task.completed;

    const matchesStatus =
      (statusFilter === "Upcoming" && isUpcoming) ||
      (statusFilter === "Overdue" && isOverdue) ||
      (statusFilter === "Completed" && isCompleted) ||
      statusFilter === "";

    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 border-t-4 border-sky-400">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Advanced Task Search</h1>

        <div className="flex flex-wrap gap-6 mb-8 justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[200px]">
            <AiOutlineSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Type keywords"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-300 transition text-gray-600"
            />
          </div>

          {/* Priority Filter Dropdown */}
          <div className="flex-1 min-w-[150px]">
            <label className="block text-gray-500 font-semibold mb-1">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-300 transition"
            >
              <option value="">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Status Filter Dropdown */}
          <div className="flex-1 min-w-[150px]">
            <label className="block text-gray-500 font-semibold mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-300 transition"
            >
              <option value="">All</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Overdue">Overdue</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          {filteredTasks.length > 0 ? (
            <div className="grid gap-4">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} readOnly={true} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No tasks match the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
