import { STATUS_OPTIONS } from '../../options/selections/TaskStatus';

function TaskEditModal({ task, onClose, onSave, onChange }) {
  const handleInputChange = (field, value) => {
    onChange({ ...task, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <input
          type="text"
          value={task.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Task Title"
          className="border rounded p-2 w-full mb-4"
        />
        <textarea
          value={task.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Task Description"
          className="border rounded p-2 w-full mb-4"
        />
        <select
          value={task.status || ''}
          onChange={(e) => handleInputChange('status', e.target.value)}
          className="border rounded p-2 w-full mb-4"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}

        </select>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 text-gray-800 py-2 px-4 rounded">
            Cancel
          </button>
          <button onClick={() => onSave(task)} className="bg-blue-500 text-white py-2 px-4 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskEditModal;
