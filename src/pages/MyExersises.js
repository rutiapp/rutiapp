import { React } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonRunning} from '@fortawesome/free-solid-svg-icons'
import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer";
const MyExersises = () => {
  return (
    
    <div className="container-fluid py-4">
  <div className="row">
    <div className="col-12">
      <div className="card mb-4">
        <div className="card-header pb-0 my-routines-table-header">
        <Link to="/dashboard/myexersises">
          <h6><FontAwesomeIcon icon={faPersonRunning} size="lg"/> MIS EJERCICIOS</h6>
          </Link>
          <Link to="/dashboard/myexersises/create">
          <button className="btn-rutiapp ms-5">
              <span>Crear ejercicio</span>
            </button>
          </Link>
        </div>
        <div className="card-body px-0 pt-0 pb-2">
            <Outlet/>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</div>

  );
};
export default MyExersises;