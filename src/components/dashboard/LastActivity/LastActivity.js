
import { useEffect } from "react";
import Moment from 'moment';
import "./lastactivity.css";
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function LastActivity(props) {
    useEffect(() => {
      },[])
    return   <div className="container d-flex justify-content-center">
              <div className="activity mt-3 p-3 last-activity-text ">
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0">
                  <FontAwesomeIcon icon={faDumbbell} size="2x" />
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h6 className="mt-2 mb-0 last-activity-text">Has añadido <span className="mx-1">{props.weight}</span>KG en <span className="mx-1">{props.name}</span> </h6>
                    <small className="text">{Moment(props.creation).format('DD-MM-YY HH:MM:ss')}</small>
                  </div>
                </div>
              </div>
            </div>
}

export default LastActivity;