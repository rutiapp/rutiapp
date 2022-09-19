import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import "../styles/dashboard.css";
import "../styles/icons.css";
import "../styles/svg.css";
import Navbar from "../components/Navbar";
import TopNavbar from "../components/TopNavBar";
import { Outlet  } from "react-router-dom";
const Dashboard = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
        if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
      }
    );
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