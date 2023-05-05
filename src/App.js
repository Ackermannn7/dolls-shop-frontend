import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./scss/app.scss";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
