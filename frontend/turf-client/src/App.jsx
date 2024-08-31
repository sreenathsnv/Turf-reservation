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
import PaymentPage from "./Pages/Payment";
import PaymentSuccessPage from "./Pages/PaymentSuccess";
import TurfPage from "./Pages/TurfMain";
import ResendActivation from "./Components/Auth/ResendActivation";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import AdminDashboard from "./Pages/AdminDashBoard";
import CreatePlayForm from "./Pages/Createroom";
import UserProfile from "./Pages/userProfile";
import BookingPage from "./Pages/BookingPage";
import AdminAnalysis from "./Pages/AdminAnalysis";

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
          <Route path="/resend/activation/form" exact element={<Layout><ResendActivation/></Layout>} />
          <Route path="/activate/:uid/:token" exact element={<Layout><UserActivation /></Layout>} />

          {/* Protected Routes wrapped with Layout */}
          <Route path="/bookings" exact element={<Layout><ProtectedRoute><BookingPage/></ProtectedRoute></Layout>} />
          <Route path="/user/:id/profile" exact element={<Layout><ProtectedRoute><UserProfile/></ProtectedRoute></Layout>} />
          <Route path="/groups" exact element={<Layout><ProtectedRoute><GroupList/></ProtectedRoute></Layout>} />
          <Route path="/group/create" exact element={<Layout><ProtectedRoute><CreatePlayForm/></ProtectedRoute></Layout>} />
          <Route path="/groups/:id" exact element={<Layout><ProtectedRoute><GroupActivity/></ProtectedRoute></Layout>} />
          <Route path="/user/groups" exact element={<Layout><ProtectedRoute><UserGroupList/></ProtectedRoute></Layout>} />
          <Route path="/user/groups/:id" exact element={<Layout><ProtectedRoute><GroupActivity/></ProtectedRoute></Layout>} />
          <Route path="/turf/:id/book" exact element={<Layout><ProtectedRoute><BookingForm/></ProtectedRoute></Layout>} />
          <Route path="/turf/:id/payment" exact element={<Layout><ProtectedRoute><PaymentPage/></ProtectedRoute></Layout>} />
          <Route path="/payment/success" exact element={<Layout><ProtectedRoute><PaymentSuccessPage/></ProtectedRoute></Layout>} />
          <Route path="/turf/:id/view" exact element={<Layout><TurfPage/></Layout>} />
          <Route path="*" element={<Layout><Page_404 /></Layout>} />

          {/* Routes that should not be wrapped with Layout */}
          <Route path="/admin" exact element={<ProtectedAdminRoute><AdminDashboard/></ProtectedAdminRoute>} />
          <Route path="/admin/analysis" exact element={<ProtectedAdminRoute><AdminAnalysis/></ProtectedAdminRoute>} />
        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
