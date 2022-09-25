import { useState, useRef } from "react"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonBreastfeeding, faDumbbell, faVideoCamera, faListUl, faQuestionCircle} from '@fortawesome/free-solid-svg-icons'
import ExersiseService from "../services/exersise.service"
import YoutubeService from "../services/youtube.service";
const CreateExersise = () => {
  const form = useRef()
  const checkBtn = useRef()
  const [name, setName] = useState("")
  const [video_url, setVideo_Url] = useState("")
  const [series, setSeries] = useState("")
  const [repetitions, setRepetitions] = useState("")
  const [help_url, setHelp_Url] = useState("")
  const [successful, setSuccessful] = useState(false)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          ¡Este campo es obligatorio!
        </div>
      )
    }
  }

  const onChangeName = (e) => {
    const name = e.target.value
    setName(name)
  }

  const onChangeVideo_Url = (e) => {
    const video_url = e.target.value
    setVideo_Url(video_url)
  }

  const onChangeSeries = (e) => {
    const series = e.target.value
    setSeries(series)
  }

  const onChangeRepetitions = (e) => {
    const repetitions = e.target.value
    setRepetitions(repetitions)
  }

  const onChangeHelp_Url = (e) => {
    const help_url = e.target.value
    setHelp_Url(help_url)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setSuccessful(false)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
            let id
            if(!video_url) {
              let res = await YoutubeService.searchByKeyword(name)
              id = res.data?.items[0]?.id?.videoId
            }else {
              id = video_url
            }
            ExersiseService.create(name, 'https://www.youtube.com/embed/'+id, series, repetitions, help_url).then(
          (response) => {
            const exersiseCreated = "Ejercicio creado correctamente"
            setMessage(exersiseCreated)
            setSuccessful(true)
            setLoading(false)
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
            setLoading(false)
            setMessage(resMessage)
            setSuccessful(false)
          }
        )
      
    }
  }
  return (
    <Form onSubmit={handleCreate} ref={form} className="create100-form validate-form">
          {!successful && (
            <div>
          <div className="wrap-input100 validate-input" >
             <Input
              type="text"
              className="input100"
              name="name"
              value={name}
              onChange={onChangeName}
              validations={[required]}
              placeholder="Nombre del ejercicio"
            />
            <span className="focus-input100" />
            <span className="symbol-input100">
              <FontAwesomeIcon icon={faDumbbell} />
            </span>
          </div>

          <div className="wrap-input100 validate-input" >
                <Input
                  type="text"
                  className="input100"
                  name="email"
                  value={video_url}
                  onChange={onChangeVideo_Url}
                  placeholder="Url del video de demostración"
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <FontAwesomeIcon icon={faVideoCamera} />
                 </span>
              </div>

              <div className="wrap-input100 validate-input" >
                <Input
                  type="text"
                  className="input100"
                  name="series"
                  value={series}
                  onChange={onChangeSeries}
                  placeholder="Numero de series"
                  validations={[required]}
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <FontAwesomeIcon icon={faListUl} />
                </span>
          </div>

          <div className="wrap-input100 validate-input" >
                <Input
                  type="text"
                  className="input100"
                  name="repetitions"
                  value={repetitions}
                  onChange={onChangeRepetitions}
                  placeholder="Numero de repeticiones"
                  validations={[required]}
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <FontAwesomeIcon icon={faPersonBreastfeeding} />
                </span>
              </div>

              <div className="wrap-input100 validate-input" >
                <Input
                  type="text"
                  className="input100"
                  name="help_url"
                  value={help_url}
                  onChange={onChangeHelp_Url}
                  placeholder="Url de ayuda"
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </span>
              </div>
              <div className="container-login100-form-btn">
            <button className="login100-form-btn" disabled={loading}>
              {loading && (
                <span className=" m-r-5 spinner-border spinner-border-sm"></span>
              )}
              <span>¡Crear Ejercicio!</span>
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
  )
}
export default CreateExersise