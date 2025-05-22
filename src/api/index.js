import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const login = (credentials) => api.post("/auth/login", credentials);
export const register = (data) => api.post("/auth/register", data);

export const fetchBoardApi = () => api.get("/boards");
export const createBoardApi = (data) => api.post("/boards", data);
export const deleteBoardApi = (boardId) => api.delete(`/boards/${boardId}`);

export const fetchTasksApi = (boardId, params = {}) => api.get('/tasks', { params: { boardId, ...params } });
export const createTaskApi = (data) => api.post("/tasks", data);
export const updateTaskApi = (taskId, data) => api.put(`/tasks/${taskId}`, data);
export const deleteTaskApi = (taskId) => api.delete(`/tasks/${taskId}`);
