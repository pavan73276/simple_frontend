# To-Do List Application

A simple and intuitive front-end application for managing personal tasks. This to-do list app allows users to add, edit, delete, and organize tasks stored in the browser's local storage, ensuring data persists between sessions.

## Overview

This project provides an easy-to-use task management tool where users can:
- Add new tasks with titles, descriptions, due dates, and priority levels.
- Mark tasks as complete.
- Filter tasks based on priority and status (completed, overdue, or upcoming).
- Edit and delete tasks directly from the task list.
- Store tasks locally, allowing data persistence without a backend.

Built with **React** and **Tailwind CSS**, this application focuses on functionality, simplicity, and responsive design.

## Setup Instructions

### Prerequisites

- **Node.js** (v12 or higher)
- **NPM** (comes with Node.js) or **Yarn**

### Installation

To set up the project on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/to-do-list-app.git
   cd to-do-list-app


2. Install dependencies:
npm install

3. Start the development server:
npm start

4. Open your browser and navigate to http://localhost:3000 to see the application.


Assumptions Made During Development
Local Storage as Primary Data Source:

Tasks are stored in the browser’s local storage since there is no backend database.
Basic Task Attributes:

Each task includes a title, description, due date, priority level (High, Medium, Low), and completion status.
No Authentication:

Tasks are accessible only on the same device and browser.
Read-Only Task Display in Search/Filter View:

Task modification options (edit, delete, complete) are disabled in filtered or search mode for clarity.
Basic Styling with Tailwind CSS:

Tailwind CSS is used for a responsive, mobile-friendly design.
Additional Information
Features
Task Management: Add, edit, delete, and mark tasks as complete.
Filtering & Search: Find tasks by title, priority, and status (upcoming, overdue, or completed).
Responsive Design: Adapts layout to various screen sizes.
Local Storage: Ensures tasks persist in the browser.
Project Structure
components/ - Contains UI components like TaskForm, TaskCard, and SearchAndFilter.
context/ - Provides TaskContext for global task management.
App.js - The main app component that integrates all components.
Future Improvements
If more time were available, possible enhancements could include:

Adding a backend database for cross-device task persistence.
User authentication for personalized to-do lists.
Additional task categories and color-coded priorities.
Dark mode for accessibility.