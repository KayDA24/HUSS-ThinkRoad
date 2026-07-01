import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProfessorAnalysis } from "./pages/ProfessorAnalysis";
import { ProfessorAssignments } from "./pages/ProfessorAssignments";
import { ProfessorDashboard } from "./pages/ProfessorDashboard";
import { ProfessorSubmissions } from "./pages/ProfessorSubmissions";
import { StudentDashboard } from "./pages/StudentDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
      <Route path="/professor/assignments" element={<ProfessorAssignments />} />
      <Route path="/professor/submissions" element={<ProfessorSubmissions />} />
      <Route path="/professor/analysis" element={<ProfessorAnalysis />} />
      <Route path="/professor/settings" element={<Navigate to="/professor/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
