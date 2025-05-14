
import UserOrders from "./components/profile/UserOrders";
import AllProducts from "./components/products/AllProducts";
import EditProfile from "./components/profile/EditProfile";
import ProductDetail from "./components/products/ProductDetail";
import ConfirmOtp from "./components/confimOtp/ConfirmOtp";
import ProfileDashboard from "./components/profile/ProfileDashboard";
import Header from "./components/header/Header";
import SignIn from "./components/signin/SignIn";
import Signup from "./components/signup/Signup";
import ForgotPassword from "./components/forgot password/ForgotPassword";
import Home from "./page/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Cart from "./components/cart/Cart";
import { Toaster } from "sonner";
import Checkout from "./components/order/Checkout";

const hiddenHeaderRoutes = [
  "/signin",
  "/signup",
  "/confirmotp",
  "/profile",
  "/profile/editprofile",
  "/forgotpassword",
];

function App() {
  const location = useLocation();
  const showHeader = !hiddenHeaderRoutes.includes(location.pathname);
  return (
    <>
      {showHeader && <Header />}

      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<SignIn />} path="/signin" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<ConfirmOtp />} path="/confirmotp" />
        <Route element={<ForgotPassword />} path="/forgotpassword" />
        {/* nested route */}
        <Route element={<ProfileDashboard />} path="/profile">
          <Route element={<UserOrders />} index />
          <Route element={<EditProfile />} path="editprofile" />
        </Route>
        {/* nested route */}
        <Route element={<ProductDetail />} path="/product/:id" />
        <Route element={<Cart />} path="/cart/:userId" />
        <Route element={<Checkout />} path="/checkout/:userId" />
        <Route element={<AllProducts />} path="/allproducts/:id" />
      </Routes>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
