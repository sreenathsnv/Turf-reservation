import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/Pages/Layout";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import "./CSS/index.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import Page_404 from "./Pages/Page_404";
import { ToastContainer } from 'react-toastify';
import ForgotPasswordConfirm from "./Components/Auth/ForgotPasswordConfirm";
import UserActivation from "./Components/Auth/UserActivation";
import GroupList from "./Components/group/GroupList";
import GroupActivity from "./Pages/Group";
import UserGroupList from "./Components/group/UserGroupList";
import BookingForm from "./Pages/BookingForm";
import Payment from "./Pages/Payment";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Routes that should be wrapped with Layout */}
          <Route path="/" exact element={<Layout><Home /></Layout>} />
          <Route path="/signup" exact element={<Layout><Register /></Layout>} />
          <Route path="/login" exact element={<Layout><Login /></Layout>} />
          <Route path="/password/reset" exact element={<Layout><ForgotPasswordConfirm /></Layout>} />
          <Route path="/activate/:uid/:token" exact element={<Layout><UserActivation /></Layout>} />

          {/* Protected Routes wrapped with Layout */}
          <Route path="/booking" exact element={<Layout><ProtectedRoute><div>hello</div></ProtectedRoute></Layout>} />
          <Route path="/groups" exact element={<Layout><ProtectedRoute><GroupList/></ProtectedRoute></Layout>} />
          <Route path="/groups/:id" exact element={<Layout><ProtectedRoute><GroupActivity/></ProtectedRoute></Layout>} />
          <Route path="/user/groups" exact element={<Layout><ProtectedRoute><UserGroupList/></ProtectedRoute></Layout>} />
          <Route path="/user/groups/:id" exact element={<Layout><ProtectedRoute><GroupActivity/></ProtectedRoute></Layout>} />
          <Route path="/turf/:id/book" exact element={<Layout><ProtectedRoute><BookingForm/></ProtectedRoute></Layout>} />
          <Route path="/turf/:id/payment" exact element={<Layout><ProtectedRoute><Payment/></ProtectedRoute></Layout>} />
          <Route path="*" element={<Layout><Page_404 /></Layout>} />

          {/* Routes that should not be wrapped with Layout */}
          <Route path="/admin/kljwhed" exact element={<div>hello</div>} />
        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
