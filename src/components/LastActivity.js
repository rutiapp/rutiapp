
import { useEffect } from "react";
import Moment from 'moment';
function LastActivity(props) {
    useEffect(() => {
      },[])
    return   <p className="text-sm mt-3" key={props.key}>
                <i className="fa fa-arrow-up text-success" />
                <span className="font-weight-bold">Has añadido {props.weight}</span> en <b>{props.name}</b> añadido el día {Moment(props.creation).format('DD-MM-YY')}
            </p>
}

export default LastActivity;