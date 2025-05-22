import { useState, useEffect } from "react";
import { fetchBoardApi, createBoardApi, deleteBoardApi } from "../api/index";
import { toast } from "react-toastify";

export function useBoards() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllBoards = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchBoardApi();
      setBoards(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch boards");
      toast.error("Failed to fetch boards");
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async (boardData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await createBoardApi(boardData);
      setBoards((prev) => [...prev, data]);
      toast.success("Board created successfully");
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create board");
      toast.error("Failed to create board");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBoard = async (boardId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteBoardApi(boardId);
      setBoards((prev) => prev.filter((board) => board.id !== boardId));
      toast.success("Board deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete board");
      toast.error("Failed to delete board");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBoards();
  }, []);

  return {
    boards,
    loading,
    error,
    fetchAllBoards,
    createBoard,
    deleteBoard,
  };
}
