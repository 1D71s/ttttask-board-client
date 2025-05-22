import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function LoginForm() {
  const { handleLogin, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin({ username, password });
    } catch {
      toast.error("Login failed! Check your username and password.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Login
      </button>

      {error && <p className="mt-3 text-red-600 text-center">{error}</p>}
    </form>
  );
}
