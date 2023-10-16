import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import AboutUs from "./pages/AboutUs/AboutUs";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import ScrollToTop from "./components/Common/ScrollToTop";

function App() {
  return (
    <div>
      <main className="relative min-h-screen pb-72">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
        </Routes>
        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
