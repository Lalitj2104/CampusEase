import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";

import User from "./routes/User/User.jsx";
import Admin from "./routes/Admin/Admin.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<User />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
