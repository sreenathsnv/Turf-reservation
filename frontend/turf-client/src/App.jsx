import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/Pages/Layout";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import "./CSS/index.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import Page_404 from "./Pages/Page_404";
function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" exacct element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* user Protected */}

            <Route path="/booking" element={<ProtectedRoute><div>hello</div></ProtectedRoute>} />
            <Route path="*" element={<Page_404/>}/>
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
