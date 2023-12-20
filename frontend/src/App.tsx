import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import AboutUs from "./pages/AboutUs/AboutUs";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import ScrollToTop from "./components/Common/ScrollToTop";
import LandingPage from "pages/LandingPage/LandingPage";
import Product from "pages/Product/Product";
import Shop from "pages/Shop/Shop";
import User from "models/User";
import { useEffect, useState } from "react";
import { UserContext } from "contexts/UserContext";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";
import GuestRoute from "components/Common/GuestRoute";
import get from "services/fetching/Get";
import UrlBuilder from "services/UrlBuilder";
import UserProfile from "pages/UserProfile/UserProfile";
import SellForm from "pages/SellingProcess/SellForm";
import ProtectedRoute from "components/Common/ProtectedRoute";
import PaymentSuccess from "pages/Payment/PaymentSuccess";
import PaymentFailure from "pages/Payment/PaymentFailure";

function App() {
  const [currentUser, setCurrentUser] = useState<User>();
  const navigate = useNavigate();
  function handleLogin(user: User, token: string) {
    setCurrentUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  }

  function handleLogout() {
    setCurrentUser(undefined);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const url = new UrlBuilder().auth().validate().url;
      get(`${url}?token=${token}`).then((res) => {
        if (res.success) {
          setCurrentUser(JSON.parse(localStorage.getItem("user")!));
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      });
    }
  }, []);

  return (
    <main className="relative min-h-screen pb-72">
      <UserContext.Provider value={currentUser}>
        <Navbar onLogout={handleLogout} />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop/about" element={<AboutUs />} />
          <Route path="/shop/privacy" element={<PrivacyPolicy />} />
          <Route path="/shop/terms" element={<TermsAndConditions />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/products/:id" element={<Product />} />
          <Route element={<GuestRoute />}>
            <Route
              path="/account/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/account/register"
              element={<Register handleRegister={handleLogin} />}
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/account"
              element={
                <UserProfile
                  updateUserContext={(user) => {
                    setCurrentUser(user);
                    localStorage.setItem("user", JSON.stringify(user));
                  }}
                />
              }
            />
            <Route path="/account/sell" element={<SellForm />} />
          </Route>
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/fail" element={<PaymentFailure />} />
        </Routes>
        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      </UserContext.Provider>
    </main>
  );
}

export default App;
