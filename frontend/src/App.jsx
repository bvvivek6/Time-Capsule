import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Createcapsule from "./components/Createcapsule";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createcapsule" element={<Createcapsule />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
          theme="dark"
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
        />
      </div>
    </Router>
  );
};

export default App;
