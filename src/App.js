import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./scss/app.scss";
import { Gallery } from "./pages/Gallery";
import { AboutUs } from "./pages/AboutUs";
import { Login } from "./pages/Login";
import { DollsList } from "./pages/DollsList";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FullProduct } from "./pages/FullProduct";
function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dolls" element={<DollsList />} />
        <Route path="/dolls/:id" element={<FullProduct />} />

        <Route path="/gallery" element={<Gallery />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
