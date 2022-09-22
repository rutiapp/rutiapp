import { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScaleUnbalanced} from '@fortawesome/free-solid-svg-icons'
import WeightService from "../services/weight.service"
import {useParams} from 'react-router-dom' 
const CreateWeight = () => {
  const form = useRef();
  const checkBtn = useRef();
  const { idExersise } = useParams()
  const [weight, setWeight] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeWeight = (e) => {
    const weight = e.target.value;
    setWeight(weight);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
        WeightService.create(weight,idExersise ).then(
        (response) => {
          const weightCreated = "¡Peso registrado!"
          setMessage(weightCreated);
          setSuccessful(true);
          setLoading(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };
  return (
    <Form onSubmit={handleCreate} ref={form} className="create100-form validate-form">
          {!successful && (
            <div>
          <div className="wrap-input100 validate-input" >
             <Input
              type="text"
              className="input100"
              name="weight"
              value={weight}
              onChange={onChangeWeight}
              placeholder="Kg a registrar"
            />
            <span className="focus-input100" />
            <span className="symbol-input100">
              <FontAwesomeIcon icon={faScaleUnbalanced} />
            </span>
          </div>
              <div className="container-login100-form-btn">
            <button className="login100-form-btn m-b-10" disabled={loading}>
              {loading && (
                <span className=" m-r-5 spinner-border spinner-border-sm"></span>
              )}
              <span>Guardar Peso</span>
            </button>
          </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success bold" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ disabled: true }} ref={checkBtn} />
        </Form>
  );
};
export default CreateWeight;