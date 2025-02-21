import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import LessonPlanner from "./pages/LessonPlanner";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/Login' element={<Login />} />

        <Route
          path='/'
          element={
            <ProtectedRoute>
              <LessonPlanner />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
