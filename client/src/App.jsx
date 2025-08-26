import { Routes, Route } from "react-router-dom";
import User from "./routes/User/User.jsx";
import Admin from "./routes/Admin/Admin.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<User />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  );
}
export default App;
