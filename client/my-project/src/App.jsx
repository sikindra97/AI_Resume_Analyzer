
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CoverLetter from "./pages/CoverLetter";
import ATSResult from "./pages/ATSResult";
import AIFeedback from "./components/AIFeedback";

function App() {
  return (
    <Routes>

      {/* Public Home Page */}
      <Route
        path="/"
        element={<Dashboard />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/result"
        element={<ATSResult />}
      />

      <Route
        path="/feedback"
        element={<AIFeedback />}
      />

      <Route
        path="/cover-letter"
        element={<CoverLetter />}
      />

    </Routes>
  );
}

export default App;