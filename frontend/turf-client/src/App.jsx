import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/Pages/Layout";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import "./CSS/index.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import Page_404 from "./Pages/Page_404";
import { ToastContainer} from 'react-toastify';
import ForgotPasswordConfirm from "./Components/Auth/ForgotPasswordConfirm";
import UserActivation from "./Components/Auth/UserActivation";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" exact element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/password/reset" element={<ForgotPasswordConfirm/>} />
            <Route path="/activate/:uid/:token" exact element={<UserActivation/>} />

            {/* user Protected */}

            <Route path="/booking" element={<ProtectedRoute><div>hello</div></ProtectedRoute>} />
            <Route path="*" element={<Page_404/>}/>
          </Routes>
        </Layout>
      </Router>


      <ToastContainer />
    </>
  );
}

export default App;
