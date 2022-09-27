import AuthService from "../services/auth.service"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell, faSearch} from '@fortawesome/free-solid-svg-icons'
import ExersiseService from "../services/exersise.service"
import WeightService from "../services/weight.service"
import Input from "react-validation/build/input"
import Form from "react-validation/build/form"
import { trackPromise } from 'react-promise-tracker'
const MyExersisesList = () => {
  const currentUser = AuthService.getCurrentUser()
  const [exersises, setExersises] = useState([])
  const [totalExersises, setTotalExersises] = useState([])
  const [search, setSearch] = useState(null)
  const form = useRef()
  let navigate = useNavigate()
  const  getExersises = async () => {
    
    trackPromise(ExersiseService.getAllByCreator(currentUser.id)
      .then(response => {
        response.data.map((exersise, index) => {
           WeightService.getLatestWeight(exersise.id).then(weight => {
              exersise.lastWeight = weight.data.quantity_kg
              if(index + 1 === response.data.length) {
                setExersises(response.data)
                setTotalExersises(response.data) 
              }
              return exersise
          })     
        })
        console.log(exersises)
      })
      .catch(e => {
        console.log(e)
      })
    )
  }

  const onChangeSearch = (e) => {
    const search = e.target.value
    console.log(search)
    setSearch(search)
  }
  useEffect(() => {
    if(search) {
      const newExersises = totalExersises.filter(value => value.name.toLowerCase().includes(search.toLowerCase()))
      setExersises(newExersises)
    }
  },[search])

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
      <div className="row mb-3">
        <div class="ms-md-auto pe-md-3 d-flex">
              <div className="input-group justify-content-center align-items-center">
                <span className="align-items-center m-r-5"><FontAwesomeIcon icon={faSearch} size="lg"/></span>
                <Form ref={form}>
                <Input
              type="text"
              className="form-control"
              name="search"
              value={search}
              onChange={onChangeSearch}
              placeholder="Introduce nombre de ejercicio ..."
            />
                </Form>
              </div>
        </div>
      </div>
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
  )
}
export default MyExersisesList;