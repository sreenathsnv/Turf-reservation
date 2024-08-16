import Home from "./Pages/Home"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from '../src/Pages/Layout'
import Register from './Pages/Register'
import Login from './Pages/Login'
import './CSS/index.css'
function App() {

  return (
    <>

  <Router>
    


      <Layout>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/signup" element={<Register/>} />
        <Route path="/login" element={<Login />} />
      </Routes>

      </Layout>
    </Router>
    </>
  )
}

export default App
