import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import TaskEditModal from '../components/tasks/TaskEditModal';
import { STATUS_OPTIONS } from '../options/selections/TaskStatus';

function TasksPage() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { tasks, loading, createTask, updateTask, deleteTask, fetchAllTasks } = useTasks(boardId);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    fetchAllTasks(selectedStatus && selectedStatus !== 'all' ? { status: selectedStatus } : {})
  }, [selectedStatus]);

  const handleCreateTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      await createTask({ title: newTaskTitle.trim(), description: newTaskDescription.trim() });
      setNewTaskTitle('');
      setNewTaskDescription('');
      fetchAllTasks(selectedStatus);
    } catch (err) {
      console.error('Failed to create task', err);
    }
  };

  const openEditModal = (task) => {
    setEditingTask({ ...task });
  };

  const closeEditModal = () => {
    setEditingTask(null);
  };

  const saveEditModal = async (updatedTask) => {
    try {
      await updateTask(updatedTask.id, updatedTask);
      closeEditModal();
      fetchAllTasks(selectedStatus);
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  return (
    <div className="p-4">
      <button onClick={() => navigate('/boards')} className="mb-4 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">
        ← Back to Boards
      </button>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      <div className="mb-4 flex gap-2">
        {STATUS_OPTIONS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setSelectedStatus(value)}
            className={`px-3 py-1 rounded ${
              selectedStatus === value ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      <div className="flex gap-2 mb-4">
        <input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Task Title"
          className="border rounded p-2 flex-grow"
        />
        <input
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Task Description"
          className="border rounded p-2 flex-grow"
        />
        <button onClick={handleCreateTask} className="bg-blue-500 text-white py-2 px-4 rounded">
          Add
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border-b border-gray-300 py-2">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <span className="font-semibold">{task.title}</span>
                {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
              </div>

              <span className="text-sm text-gray-500 mx-4 whitespace-nowrap">
                {task.status}
              </span>

              <div className="flex gap-2">
                <button onClick={() => openEditModal(task)} className="text-blue-500 hover:underline">
                  Edit
                </button>
                <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {editingTask && (
        <TaskEditModal
          task={editingTask}
          onClose={closeEditModal}
          onSave={saveEditModal}
          onChange={(updatedFields) => setEditingTask(updatedFields)}
        />
      )}
    </div>
  );
}

export default TasksPage;