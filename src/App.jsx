import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import LessonPlanner from "./pages/LessonPlanner";
import About from "./pages/About";
import FAQs from "./pages/FAQ";
import Register from "./pages/Register";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route
          path='/lesson-planner'
          element={
            <ProtectedRoute>
              <LessonPlanner />
            </ProtectedRoute>
          }
        />
        <Route path='/about' element={<About />} />
        <Route path='/faqs' element={<FAQs />} />
      </Routes>
    </Router>
  );
}
