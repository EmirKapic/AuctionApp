import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import AboutUs from './pages/AboutUs/AboutUs'
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions'
import ScrollToTop from './components/Common/ScrollToTop'

function App() {
	/*
		the footer wont stick to the bottom if not enough content
		tried every solution under the sun but dont seem to work
		help appreciated
	*/
  	return (
    <div className='wrapper'>
      <main className='content'>
        <Navbar/>
		<ScrollToTop/>
        <Routes>	
			<Route path="/" element={<main>hi</main>}/>
			<Route path="/about" element={<AboutUs/>}/>
			<Route path="/privacy" element={<PrivacyPolicy/>}/>
			<Route path="/terms" element={<TermsAndConditions/>} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
