import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import IncidentDetails from "./pages/IncidentDetails";
import Postmortem from "./pages/Postmortem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/incident/:id" element={<IncidentDetails />} />
        <Route path="/postmortem/:id" element={<Postmortem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;