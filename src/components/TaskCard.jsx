// src/components/TaskCard.js
import React, { useState } from "react";

const TaskCard = ({ task, updateTask, deleteTask, readOnly = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    dueDate: task.dueDate,
    description: task.description,
    priority: task.priority,
    completed: task.completed,
  });

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = () => {
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    const newStatus = !editedTask.completed;
    setEditedTask((prev) => ({ ...prev, completed: newStatus }));
    updateTask(task.id, { ...task, completed: newStatus });
  };

  const handleDeleteClick = () => {
    deleteTask(task.id);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 mb-5">
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Task Title"
            disabled={readOnly}
          />
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={readOnly}
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Task Description"
            rows="3"
            disabled={readOnly}
          />
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={readOnly}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          {!readOnly && (
            <div className="flex justify-end space-x-2">
              <button onClick={handleSaveClick} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                Cancel
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              checked={editedTask.completed}
              onChange={handleCheckboxChange}
              className={`mr-3 h-6 w-6 rounded ${editedTask.completed ? 'bg-green-500' : 'bg-gray-300'}`}
              disabled={readOnly}
            />
            <h3 className={`text-xl font-semibold ${editedTask.completed ? 'line-through text-gray-500' : 'text-blue-700'}`}>
              {task.title}
            </h3>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-gray-600">Due Date:</p>
            <p className="text-gray-700">{new Date(task.dueDate).toLocaleDateString()}</p>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-gray-600">Description:</p>
            <p className="text-gray-700">{task.description}</p>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-gray-600">Priority:</p>
            <p className={`font-semibold ${task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
              {task.priority}
            </p>
          </div>

          {!readOnly && (
            <>
              <button onClick={handleEditClick} className="w-full mt-4 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600">
                Edit Task
              </button>
              <button onClick={handleDeleteClick} className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                Delete Task
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
