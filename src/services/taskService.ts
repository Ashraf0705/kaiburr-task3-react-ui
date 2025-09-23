import axios from 'axios';

// IMPORTANT: Base URL should NOT include the '/tasks' path.
// This allows for more flexible apiClient usage if you add other controllers.
const API_BASE_URL = 'http://localhost:8090';

// Define TypeScript interfaces for our data models
export interface TaskExecution {
    startTime: string;
    endTime: string;
    output: string;
}

export interface Task {
    id: string;
    name: string;
    owner: string;
    command: string;
    taskExecutions?: TaskExecution[];
}

// Create an instance of axios for our API
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- API Functions ---

// Fetch all tasks by calling the explicit '/tasks' endpoint
export const getTasks = async (): Promise<Task[]> => {
    const response = await apiClient.get('/tasks'); // More explicit path
    return response.data;
};

// Create a new task
export const createTask = async (taskData: Omit<Task, 'id'>): Promise<Task> => {
    const response = await apiClient.put('/tasks', taskData); // More explicit path
    return response.data;
};

// Delete a task by its ID
export const deleteTask = async (taskId: string): Promise<void> => {
    await apiClient.delete(`/tasks/${taskId}`); // More explicit path
};

// Execute a task's command
export const executeTask = async (taskId: string): Promise<Task> => {
    const response = await apiClient.post(`/tasks/${taskId}/executions`); // More explicit path
    return response.data;
};

// Search tasks by name
export const searchTasksByName = async (name: string): Promise<Task[]> => {
    const response = await apiClient.get('/tasks', { params: { name } }); // More explicit path
    return response.data;
};