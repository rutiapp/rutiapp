import AuthService from "../services/auth.service";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell} from '@fortawesome/free-solid-svg-icons'
import ExersiseService from "../services/exersise.service";
import WeightService from "../services/weight.service";
import { trackPromise } from 'react-promise-tracker';
const MyExersisesList = () => {
  const currentUser = AuthService.getCurrentUser()
  const [exersises, setExersises] = useState([])
  let navigate = useNavigate()
  const  getExersises = async () => {
    
    trackPromise(ExersiseService.getAllByCreator(currentUser.id)
      .then(response => {
        response.data.map((exersise, index) => {
           WeightService.getLatestWeight(exersise.id).then(weight => {
              exersise.lastWeight = weight.data.quantity_kg
              if(index + 1 === response.data.length) {
                setExersises(response.data) 
              }
              return exersise
          })     
        })
        console.log(exersises)
      })
      .catch(e => {
        console.log(e);
      })
    )
  }
  useEffect(() => {
     getExersises()
  },[])

  const viewExersise = (e,id) => {
    e.preventDefault()
    navigate('/dashboard/myexersises/view/'+id)
  }

  const addWeight = (e,idExersise) => {
    e.preventDefault()
    navigate('/dashboard/myexersises/addWeight/'+idExersise)
  }
  return (
    <div className="container-fluid py-4">
      <div className="row">
              {exersises &&
            exersises.map((exersise, index) => (
        <div className="col-xl-3 col-sm-6 mb-4" key={exersise.id}>
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers" onClick={e => viewExersise(e, exersise.id)}>
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">{exersise.name}</p>
                    <h5 className="font-weight-bolder">
                      {exersise.series}X{exersise.repetitions}
                    </h5>
                       {exersise.lastWeight
        ? <div><p className="mb-0"><span className="text-success text-sm font-weight-bolder m-r-3">{exersise.lastWeight}KG</span>Último Peso</p></div>
        : <div><p className="mb-0"> No hay registrado peso</p></div>
      }            
                  </div>
                  <div>
                    <button onClick={e => addWeight(e,exersise.id)} className="btn-rutiapp mt-2">Añadir Peso</button>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                    <i className="ni text-lg opacity-10" aria-hidden="true">
                    <FontAwesomeIcon icon={faDumbbell} size="lg"/>
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
            ))}
          </div>
          </div>
  );
};
export default MyExersisesList;