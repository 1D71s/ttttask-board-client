import { useState, useEffect } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/boards");
        }
    }, [navigate]);

    const switchLogin = () => { setIsLogin(true);}

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
            {isLogin ? <LoginForm /> : <RegisterForm switchLogin={switchLogin}/>}

            <button
                onClick={() => setIsLogin(!isLogin)}
                className="mt-6 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200 transition"
            >
                {isLogin ? "Switch to Register" : "Switch to Login"}
            </button>
        </div>
  );
}
