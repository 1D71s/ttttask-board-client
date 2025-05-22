import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

export default function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { handleLogout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Manager</h1>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          >
            Выйти
          </button>
        )}
      </header>

      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      <footer className="bg-gray-200 text-center p-4 text-sm text-gray-600">
        © 2025 YourName
      </footer>
    </div>
  );
}
