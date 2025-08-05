import { BrowserRouter } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/footer"
import MainSection from "./components/MainSection/MainSection"


function App() {
 

  return (
    <>
    <BrowserRouter>
    
    <Header/>
    <MainSection/>
    <Footer/>
  
    </BrowserRouter>
    </>
  )
}

export default App
