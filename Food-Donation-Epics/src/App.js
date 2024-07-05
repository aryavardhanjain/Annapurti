import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import RegisterNgo from "./Pages/RegisterNgo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import LoginUser from "./Pages/LoginUser";
import Maps from "./Pages/logged-in-routes/Maps";
import PrivateRouter from "./Components/PrivateRouter";
import Applicationform from "./Pages/logged-in-routes/Applicationform";
import Verified from "./Pages/Verified";
import About from "./Pages/About";
import RegisterUser from "./Pages/RegisterUser";
import UserDashboard from "./Pages/logged-in-routes/UserDashboard";
import EventDescription from "./Pages/logged-in-routes/EventDescription";
import NgoDashboard from "./Pages/logged-in-routes/NgoDashboard";
import EditNgo from "./Pages/logged-in-routes/EditNgo";
import ReportNgo from "./Pages/logged-in-routes/ReportNgo";
import RateNgo from "./Pages/logged-in-routes/RateNgo";
import EditUser from "./Pages/logged-in-routes/EditUser";
import NgoProfile from "./Pages/logged-in-routes/NgoProfile";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* <Route path="/userProfile" element={<UserDashboard />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/registerNgo" element={<RegisterNgo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userLogin" element={<LoginUser />} />
        <Route path="/userRegister" element={<RegisterUser />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/sign" element={<SignAndLog />} />
        <Route path="/maps" element={<Maps />} /> */}
        <Route path="/verification" element={<Verified />} />
        <Route path="/ngo" element={<PrivateRouter />}>
          <Route path="application" element={<Applicationform />} />
          <Route path="dashboard" element={<NgoDashboard />} />
          <Route path="edit" element={<EditNgo />} />
          <Route path="report" element={<ReportNgo />} />
          <Route path="rate" element={<RateNgo />} />
          <Route path="profile" element={<NgoProfile />} />
        </Route>
        <Route path="/user" element={<PrivateRouter />}>
          <Route path="application" element={<Applicationform />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="edit" element={<EditUser />} />
        </Route>
        <Route path="/event" element={<PrivateRouter />}>
          <Route path="maps" element={<Maps />} />
          <Route path="description" element={<EventDescription />} />
        </Route>
        {/* <Route path="/event/description" element={<EventDescription />} /> */}
        <Route path="/event/maps" element={<Maps />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
