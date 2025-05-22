import { useState, useEffect, useCallback } from "react";
import {
  fetchTasksApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
} from "../api/index";
import { toast } from "react-toastify";

export function useTasks(boardId) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllTasks = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const queryParams = {
            ...(params.status && params.status !== 'all' ? { status: params.status } : {}),
            };
            const { data } = await fetchTasksApi(boardId, queryParams);
            setTasks(data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch tasks");
            toast.error(err.response?.data?.message || "Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    }, [boardId]);


    const createTask = useCallback(async (taskData) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await createTaskApi({ ...taskData, boardId });
            setTasks((prev) => [...prev, data]);
            toast.success("Task created successfully");
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create task");
            toast.error(err.response?.data?.message || "Failed to create task");
        } finally {
            setLoading(false);
        }
    }, [boardId]);

    const updateTask = useCallback(async (taskId, updatedData) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await updateTaskApi(taskId, updatedData);
            setTasks((prev) =>
                prev.map((task) => (task.id === taskId ? { ...task, ...data } : task))
            );
            toast.success("Task updated successfully");
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update task");
            toast.error(err.response?.data?.message || "Failed to update task");
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteTask = useCallback(async (taskId) => {
        setLoading(true);
        setError(null);
        try {
            await deleteTaskApi(taskId);
            setTasks((prev) => prev.filter((task) => task.id !== taskId));
            toast.success("Task deleted successfully");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete task");
            toast.error(err.response?.data?.message || "Failed to delete task");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (boardId) {
            fetchAllTasks();
        }
    }, [boardId, fetchAllTasks]);

    return {
        tasks,
        loading,
        error,
        fetchAllTasks,
        createTask,
        updateTask,
        deleteTask,
    };
}
