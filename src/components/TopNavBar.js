import React from "react";
import SmallLogo from "./SmallLogo";
import UserBar from "./UserBar";
const TopNavbar = () => {
  return (
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
    <div className="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
          <li className="breadcrumb-item text-sm"><a className="opacity-5 text-white" href="javascript:;">RUTIAPP</a></li>
          <li className="breadcrumb-item text-sm text-white active" aria-current="page">MIS RUTINAS</li>
        </ol>
        <h6 className="font-weight-bolder text-white mb-0 fs-35">Mis rutinas</h6>
      </nav>
      <UserBar/>
    </div>
  </nav>
  );
};
export default TopNavbar;