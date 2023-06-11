import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./scss/app.scss";
import { Gallery } from "./pages/Gallery";
import { AboutUs } from "./pages/AboutUs";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { DollsList } from "./pages/DollsList";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FullProduct } from "./pages/FullProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/authorization";
import Cart from "./pages/Cart";
import { UserPage } from "./pages/UserPage";
import { ToastContainer } from "react-toastify";
import { OrderHistory } from "./pages/OrderHistory";
import { OrderDetails } from "./pages/OrderDetails";
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <div className="wrapper">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dolls" element={<DollsList />} />
        <Route path="/dolls/:id" element={<FullProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/me" element={<UserPage />} />
        <Route path="/orderHistory" element={<OrderHistory />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
