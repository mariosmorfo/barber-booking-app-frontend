import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ServicesPage from "./pages/ServicesPage"
import OurTeamPage from "./pages/OurTeamPage"
import RegisterPage from "./pages/RegisterPage"


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
       
       <Route path="/" element={<HomePage/>}/>
       <Route path="/services" element={<ServicesPage/>}/>
       <Route path="/team" element={<OurTeamPage/>}/>
       <Route path="/register" element={<RegisterPage/>}/>
    
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
