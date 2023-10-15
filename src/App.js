import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Home from "./pages/Home";
import EventBus from "./common/EventBus";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import MyRoutines from "./pages/MyRoutines";
import MyDashBoard from "./pages/MyDashboard";
import MyExersises from "./pages/MyExersises";
import CreateExersise from "./components/CreateExersise";
import MyExersisesList from "./components/MyExersisesList";
import ViewExersise from "./components/ViewExersise";
import CreateWeight from "./components/CreateWeight";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import UpdateExersise from "./components/UpdateExersise";

const App = () => {

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path='dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path='' element={<MyDashBoard />} />
          <Route path='my' element={<MyDashBoard />} />
          <Route path='myroutines' element={<MyRoutines />} />
          <Route path='myexersises' element={<MyExersises />} >
            <Route path='' element={<MyExersisesList />} />
            <Route path='create' element={<CreateExersise />} />
            <Route path='view/:id' element={<ViewExersise />} />
            <Route path='addWeight/:idExersise' element={<CreateWeight />} />
            <Route path='update/:id' element={<UpdateExersise />} />
          </Route>
        </Route>
        <Route path="/myroutines" element={<MyRoutines />} />
      </Routes>
    </div>
  );
};

export default App;
