import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <main className="relative min-h-screen pb-72">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop/about" element={<AboutUs />} />
        <Route path="/shop/privacy" element={<PrivacyPolicy />} />
        <Route path="/shop/terms" element={<TermsAndConditions />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/products/:id" element={<Product />} />
      </Routes>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </main>
  );
}

export default App;
