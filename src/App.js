import React from 'react';
import './index.css';
import SideBar from './layouts/SideBar';
import "./styles/main.scss";
import TopNavbar from './layouts/TopNavbar';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from "./pages/Home.js";
import Govt_schemes from "./pages/Govt_schemes.js";
import Reports from "./pages/Reports.js";
import Report_problem from "./pages/Report_Problem.js";
import Survey_Polls from "./pages/Survey_Polls.js";
import Create_post from "./pages/Create_post.js";
import Create_scheme from "./pages/Create_scheme.js";
import Create_announcement from "./pages/Create_announcement.js";
import MainFeeds from './pages/MainFeeds.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import DashBoard from './layouts/DashBoard';
import { useAuth } from './components/AuthProvider';
import Create_Admin from './pages/Create_Admin';
import Create_Agent from './pages/Create_Agent';
import UploadVotersData from './pages/UploadVotersData';


function App() {

  const { isLoggedIn } = useAuth();


  console.log(isLoggedIn)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Dashboard' element={<DashBoard />}>
          <Route path="/Dashboard" element={<Home />} />
          <Route path="/Dashboard/home" element={<Home />} />
          <Route path="/Dashboard/admin" element={<Create_Admin />} />
          <Route path="/Dashboard/agent" element={<Create_Agent />} />
          <Route path="/Dashboard/votersdata" element={<UploadVotersData />} />
          <Route path="/Dashboard/Mainfeeds" element={<MainFeeds />} />
          <Route path="/Dashboard/create_post" element={<Create_post />} />
          <Route path="/Dashboard/create_post/:id" element={<Create_post />} />
          <Route path="/Dashboard/survey_polls" element={<Survey_Polls />} />
          <Route path="/Dashboard/govt_schemes" element={<Govt_schemes />} />
          <Route path="/Dashboard/create_scheme" element={<Create_scheme />} />
          <Route path="/Dashboard/reports" element={<Reports />} />
          <Route path="/Dashboard/report_problem" element={<Report_problem />} />
          <Route path="/Dashboard/create_announcement" element={<Create_announcement />} />
        </Route>
        {isLoggedIn ? (
          <Route path="/Dashboard" element={<Home />} />
        ) : (
          <Route path="/" element={<Navigate to="/Login" />} />
        )}
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;