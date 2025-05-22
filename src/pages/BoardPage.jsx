import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardModal from "../components/board/BoardModal";
import { useBoards } from "../hooks/useBoards";

function BoardsPage() {
  const { boards, createBoard, deleteBoard, loading, error } = useBoards();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateBoard = async (boardData) => {
    await createBoard(boardData);
    setIsModalOpen(false);
  };

  const handleDeleteBoard = async (e, boardId) => {
    e.stopPropagation(); 
    if (window.confirm("Are you sure you want to delete this board?")) {
      await deleteBoard(boardId);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex justify-between items-center">
        Your Boards
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Board
        </button>
      </h1>

      {loading && <p>Loading boards...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {boards.map((board) => (
          <div
            key={board.id}
            onClick={() => navigate(`/boards/${board.id}`)}
            className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200 cursor-pointer relative"
          >
            <h3 className="font-semibold text-lg mb-2">{board.name}</h3>

            <p className="text-sm text-gray-600 mb-4">
              Tasks: {board.Tasks ? board.Tasks.length : 0}
            </p>

            <button
              onClick={(e) => handleDeleteBoard(e, board.id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              title="Delete board"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <BoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateBoard}
      />
    </div>
  );
}

export default BoardsPage;
