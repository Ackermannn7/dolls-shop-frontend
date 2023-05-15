import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./scss/app.scss";
import { Gallery } from "./pages/Gallery";
import { AboutUs } from "./pages/AboutUs";
import { Login } from "./pages/Login";
import { DollsList } from "./pages/DollsList";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dolls-list" element={<DollsList />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
