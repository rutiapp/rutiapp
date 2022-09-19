import React from "react";
import SmallLogo from "./SmallLogo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons'
const Navbar = () => {
  return (
    <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 visible-element" id="sidenav-main">
    <div className="sidenav-header">
      <FontAwesomeIcon icon={faTimes} className="p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"  />
      <a className="navbar-brand m-0" href="/dashboard/my" target="_blank">
        <SmallLogo/>
      </a>
    </div>
    <hr className="horizontal dark mt-0" />
    <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" href="/dashboard/my">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-tv-2 text-primary text-sm opacity-10" />
            </div>
            <span className="nav-link-text ms-1">Inicio</span>
          </a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link " href="/dashboard/myroutines">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10" />
            </div>
            <span className="nav-link-text ms-1">Mis rutinas</span>
          </a>
        </li> */}
        <li className="nav-item">
          <a className="nav-link " href="/dashboard/myexersises">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-credit-card text-success text-sm opacity-10" />
            </div>
            <span className="nav-link-text ms-1">Mis ejercicios</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="/dashboard/myexersises">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-app text-info text-sm opacity-10" />
            </div>
            <span className="nav-link-text ms-1">Mi perfil</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="/dashboard/myexersises">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-world-2 text-danger text-sm opacity-10" />
            </div>
            <span className="nav-link-text ms-1">Ejercicios de la comunidad</span>
          </a>
        </li>
        {/* <li className="nav-item mt-3">
          <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Account pages</h6>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="./pages/profile.html">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-single-02 text-dark text-sm opacity-10" />
            </div>
            <span className="nav-link-text ms-1">Profile</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="./pages/sign-in.html">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-single-copy-04 text-warning text-sm opacity-10" />
            </div>
            <span className="nav-link-text ms-1">Sign In</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="./pages/sign-up.html">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-collection text-info text-sm opacity-10" />
            </div>
            <span className="nav-link-text ms-1">Sign Up</span>
          </a>
        </li> */}
      </ul>
    </div>
    <div className="sidenav-footer mx-3 ">
      
    </div>
  </aside>
  );
};
export default Navbar;