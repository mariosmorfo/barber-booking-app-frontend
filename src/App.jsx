import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ServicesPage from "./pages/ServicesPage"
import OurTeamPage from "./pages/OurTeamPage"


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
       
       <Route path="/" element={<HomePage/>}/>
       <Route path="/services" element={<ServicesPage/>}/>
       <Route path="/team" element={<OurTeamPage/>}/>
    
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
