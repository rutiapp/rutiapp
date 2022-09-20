import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

const UserBar = () => {
    const currentUser = AuthService.getCurrentUser();
    const iconNavbarSidenav = document.getElementById('navbar');
    const sidenav = document.getElementById('sidenav-main');
    window.addEventListener("resize", navbarColorOnResize);
    const visibleClass = "visible-element"
        if ( sidenav && window.innerWidth > 1200) {
            sidenav.classList.add(visibleClass)
            sidenav.classList.remove('z-index-0')

        }
        function navbarColorOnResize() {
            if(sidenav) {
                if (window.innerWidth > 1200) {
                    sidenav.classList.add(visibleClass)
                    sidenav.classList.remove('z-index-0')
                    iconNavbarSidenav.classList.add('d-none')

                }else {
                    sidenav.classList.remove(visibleClass)
                    sidenav.classList.add('z-index-0')
                    iconNavbarSidenav.classList.remove('d-none')
                }
            }
        }
    return(
<div className="row d-inline">
    <div className="navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4">
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
            <div className="container-fluid py-1 px-3">
            <div className="navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                <nav>
                    <Link to="/dashboard/my"><button className="btn-rutiapp me-2 mt-2">Inicio</button></Link>
                    <Link to="/dashboard/myexersises"><button className="btn-rutiapp me-2 mt-2">Mis ejercicios</button></Link>
                </nav>
            </div>
            </div>
        </nav> 
    </div>
    <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 flexJustifyEnd profileUser" id="navbar">
        <div className="card shadow-lg mx-4">
            <div className="card-body p-3">
                <div className="row gx-4">
                <div className="col-auto">
                    <div className="avatar avatar-xl position-relative">
                    <img src={require('../assets/images/Captura.PNG')} alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                    </div>
                </div>
                <div className="col-auto my-auto">
                    <div className="h-100">
                    <h5 className="mb-1">
                    {currentUser.username}
                    </h5>
                    <p className="mb-0 font-weight-bold text-sm">
                        <span className="me-1">{currentUser.name}</span>
                        <span>{currentUser.surname}</span>

                    </p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                    <div className="nav-wrapper position-relative end-0">
                    <ul className="nav nav-pills nav-fill p-1" role="tablist">
                        <li className="nav-item">
                        <a className="nav-link mb-0 px-0 py-1 active d-flex align-items-center justify-content-center " data-bs-toggle="tab" href="/dashboard/my" role="tab" aria-selected="true">
                            <i className="ni ni-app" />
                            <span className="ms-2">Mi perfil</span>
                        </a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center " data-bs-toggle="tab" href="/dashboard/my" role="tab" aria-selected="false">
                            <i className="ni ni-email-83" />
                            <span className="ms-2">Sugerencias</span>
                        </a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center " data-bs-toggle="tab" href="/dashboard/my" role="tab" aria-selected="false">
                            <i className="ni ni-settings-gear-65" />
                            <span className="ms-2">Ajustes</span>
                        </a>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</div>
)}

export default UserBar