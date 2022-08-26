import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Home from "./pages/Home";
import BoardUser from "./pages/BoardUser";
import BoardAdmin from "./pages/BoardAdmin";
import EventBus from "./common/EventBus";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import MyRoutines from "./pages/MyRoutines";
import MyDashBoard from "./pages/MyDashboard";
import MyExersises from "./pages/MyExersises";
import CreateExersise from "./components/CreateExersise";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<SignUp/>} />
            <Route path='dashboard' element={<Dashboard />}>
                    <Route path='my' element={<MyDashBoard />} />
                    <Route path='myroutines' element={<MyRoutines />} />
                    <Route path='myexersises' element={<MyExersises />} >
                      <Route path='create' element={<CreateExersise />} />
                    </Route>
            </Route>
            <Route path="/user" element={<BoardUser/>} />
            <Route path="/admin" element={<BoardAdmin/>} />
            <Route path="/myroutines" element={<MyRoutines/>} />
          </Routes>
      </div>
  );
};

export default App;
