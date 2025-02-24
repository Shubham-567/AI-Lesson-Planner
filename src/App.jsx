import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import LessonPlanner from "./pages/LessonPlanner";
import About from "./pages/About";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route
          path='/lesson-planner'
          element={
            <ProtectedRoute>
              <LessonPlanner />
            </ProtectedRoute>
          }
        />
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
  );
}
