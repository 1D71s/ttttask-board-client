import { useState } from "react";
import { login, register } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const { data } = await login(credentials);
      if (!data.token) {
        toast.error(data.message || "Login failed");
      }
      toast.success("Login successful!");
      localStorage.setItem("token", data.token);
      setError(null);
      navigate("/boards");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleRegister = async (details) => {
    try {
      const { data } = await register(details);
      setUser(data.user);
      toast.success("Registration successful!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.info("Logged out successfully.");
    navigate("/");
  };

  return { user, error, handleLogin, handleRegister, handleLogout };
}

export default useAuth;
