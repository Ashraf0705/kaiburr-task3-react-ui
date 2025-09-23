# Kaiburr Technical Assessment - Task 3: React Web UI

This repository contains the solution for **Task 3**, a feature-rich frontend application built to interact with the Java backend API from Task 1.

The UI is built using **React 19**, **TypeScript**, and the **Ant Design** component library, with a focus on usability and a professional user experience.

---

## 🚀 Features Implemented

- **Task Dashboard:** Displays all tasks in a clean, paginated, and bordered table.
- **Create Tasks:** A user-friendly modal form with validation for adding new tasks.
- **Delete Tasks:** A safe delete operation with a confirmation pop-up.
- **Live Search:** A search bar to dynamically filter tasks by name.
- **Command Execution:** A "Run" button for each task to trigger the backend execution endpoint, with clear loading and success/error feedback.
- **View Execution History:** A dedicated modal to view the complete, timestamped output of all previous command executions for a specific task.
- **Responsive Feedback:** The UI provides constant feedback, including loading spinners, success messages, and clear error alerts.

---

## 🛠️ Technology Stack

- **Framework:** React 19 (using Vite)
- **Language:** TypeScript
- **UI Component Library:** Ant Design
- **API Client:** Axios
- **Package Manager:** npm

---

## 📋 Prerequisites

- **Node.js and npm** installed.
- The **Java Backend API (Task 1)** must be running on `http://localhost:8090`.

---

## ⚙️ How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/kaiburr-task3-react-ui.git
    cd kaiburr-task3-react-ui
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

---

## 📸 Screenshots

### 1. Main Dashboard View
*The main view showing the task list, search bar, and action buttons.*

_**[Drag and drop your "Main View" screenshot here]**_

### 2. Adding a New Task
*The modal form for creating a new task with input validation.*

_**[Drag and drop your "Add Task Modal" screenshot here]**_

### 3. Viewing Command Execution History
*The modal displaying the timestamped output from previously run commands.*

_**[Drag and drop your "Execution History" screenshot here]**_
