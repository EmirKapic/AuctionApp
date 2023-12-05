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

function App() {
  const [currentUser, setCurrentUser] = useState<User>();
  const navigate = useNavigate();
  function handleLogin(user: User, token: string) {
    setCurrentUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const url = new UrlBuilder().auth().validate().url;
      get(`${url}?token=${token}`).then((res) => {
        if (res.success) {
          setCurrentUser(JSON.parse(localStorage.getItem("user")!));
        }
      });
    }
  }, []);

  return (
    <main className="relative min-h-screen pb-72">
      <UserContext.Provider value={currentUser}>
        <Navbar />
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
        </Routes>
        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      </UserContext.Provider>
    </main>
  );
}

export default App;
