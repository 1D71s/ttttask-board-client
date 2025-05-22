import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BoardsPage from "./pages/BoardPage";
import TasksPage from "./pages/TasksPage";
import Layout from "./components/Layout";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/boards/:boardId" element={<TasksPage />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </Router>
  );
}

export default App;
