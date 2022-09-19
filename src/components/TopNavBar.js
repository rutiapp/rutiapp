import React from "react";
import UserBar from "./UserBar";
const TopNavbar = () => {
  let currentUrl = window.location.pathname
  let localitation = ''
  if(currentUrl.includes("myroutines")) {
    localitation = "MIS RUTINAS"
  } else if(currentUrl.includes("myexersises")) {
    localitation = "MIS EJERCICIOS"
  } else if(currentUrl.includes("my")) {
    localitation = "MI RESUMEN"
  }

  return (
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
    <div className="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
          <li className="breadcrumb-item text-sm"><span className="opacity-5 text-white">RUTIAPP</span></li>
          <li className="breadcrumb-item text-sm text-white active" aria-current="page">{localitation}</li>
        </ol>
        <h6 className="font-weight-bolder text-white mb-0 fs-35">{localitation}</h6>
      </nav>
      <UserBar/>
    </div>
  </nav>
  );
};
export default TopNavbar;