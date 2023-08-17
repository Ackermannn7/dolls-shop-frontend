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
import { addProduct } from "./redux/slices/cart";
import OnTopScrollButton from "./components/OnTopScrollButton";
// import { EditProfile } from "./pages/EditProfile";
function App() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  React.useEffect(() => {
    const cartFromStorage = JSON.parse(localStorage.getItem("cart") || "[]");
    cartFromStorage.forEach((item) => dispatch(addProduct(item)));

    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expirationDate");

    if (token && expirationDate) {
      const currentTime = new Date().getTime();
      const expiresIn = new Date(expirationDate).getTime() - currentTime;
      if (expiresIn <= 0) {
        // Token has expired, remove it from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
      }
    }
  }, [dispatch]);

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);
  return (
    <div className="wrapper">
      <ToastContainer />
      <OnTopScrollButton />
      <Header />
      <div className="routes">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dolls" element={<DollsList />} />
          <Route path="/dolls/:id" element={<FullProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/me" element={<UserPage />} />
          {/* <Route path="/edit" element={<EditProfile />} /> */}
          <Route path="/orderHistory" element={<OrderHistory />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
