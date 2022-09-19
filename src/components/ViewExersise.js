import { useState, useEffect  } from "react";
import {useParams} from 'react-router-dom'
import ExersiseService from "../services/exersise.service";
import WeightService from "../services/weight.service";
import { Chart } from "./Chart";
const ViewExersise = props => {
    const { id } = useParams()
    const [exersise, setExersise] = useState();
    const [weights, setWeights] = useState([]);

    const getExersise = () => {
        ExersiseService.getById(id)
        .then(response => {
            setExersise(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    const getWeights = () => {
      WeightService.getLastWeights(id)
      .then(response => {
          setWeights(response.data);
          console.log(response.data);
      })
      .catch(e => {
          console.log(e);
      });
  }
    useEffect(() => {
        getExersise()
        getWeights()
    },[])
  
  return (
    <div className="container-fluid">
              {exersise && (
                <section>
                  <div className="row d-flex mt-4">
                      <h6 className="fs-30 d-flex flex-row justify-content-center">{exersise.name}</h6>
                    </div>
                    <div className="row d-flex mt-2">
                      <h6 className="fs-30 d-flex flex-row justify-content-center">{exersise.series}X{exersise.repetitions}</h6>
                    </div>
                    <div className="row d-flex mt-2">
                      <div className="col-md-6">
                        <h6 className="fs-30 d-flex flex-row justify-content-center">EVOLUCION</h6>
                        {
                          weights && (
                            <Chart chartData={weights} />
                          )
                        }
                      </div>
                      <div className="col-md-6">
                        <h6 className="fs-30 d-flex flex-row justify-content-center">VIDEO</h6>
                        <iframe className="container" width="200" height="500" src={exersise.video_url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                      </div>
                    </div>
                    <div className="row d-flex mt-5 text-center m-b-5">
                    <a href={exersise.help_url} target="_blank" rel="noreferrer">
                      <button className="btn-rutiapp">
                        <span>ENLACE DE AYUDA</span>
                      </button>
                    </a>
                    </div>
                </section>
            )}
          </div>
  );
};
export default ViewExersise;