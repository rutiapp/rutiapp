import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import "../styles/icons.css";
import "../styles/svg.css";
import Navbar from "../components/Navbar";
import TopNavbar from "../components/TopNavBar";
import { Outlet  } from "react-router-dom";
const Dashboard = () => {
  useEffect(() => {
  }, []);
  return (
    <div>
  <div className="min-height-300 bg-primary position-absolute w-100" />
  <Navbar/>
  <main className="main-content position-relative border-radius-lg ">
    {/* Navbar */}
    <TopNavbar/>
    {/* End Navbar */}
    <Outlet />  
  </main>
</div>

)};
export default Dashboard;