import React from 'react'
import { BrowserRouter as Router , Routes , Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FilterProductPage from './pages/Product'
import ContactPage from './pages/Contact'
import AboutPage from './pages/About'
export default function App() {
  return (
  <Router>

    <Routes>
      <Route path="/" element={
      <div>
            <Navbar/>
           <Home/>
           </div>

       
      }/>
      <Route path="/product" element={
        <div>
              <Navbar/>
<FilterProductPage/>   </div>
      }/>

      <Route path="/contact" element={
<div>
  <Navbar/>
  <ContactPage/>
</div>
      }/>
      <Route path="/about" element={
        <div>
          <Navbar/>
            <AboutPage/>
        </div>
      
      }/>
    </Routes>
    <Footer/>
  </Router>
  )
}
