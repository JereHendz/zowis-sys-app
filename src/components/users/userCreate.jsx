import React, { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { Col, Button, Form, Label, FormGroup, Row, Container, Card, CardBody, CardFooter, Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import Breadcrumb from '../../layout/breadcrumb'
import axios from 'axios';
import { classes } from '../../data/layouts';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";


const UserCreateForm = () => {

  //declaracion de constantes de hooks
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [validateClass, setValidateClass] = useState(false);
  const infoUserLogin = JSON.parse(localStorage.getItem('infoUserLogin'));
  const navigate = useNavigate();
  const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();
  const [popover, setPopover] = useState(false)
  const Toggle = () => setPopover(!popover);
  const { t } = useTranslation();

  //declaracion de constantes locales del archivo
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [idEmployee, setIdEmployee] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [employees, setEmployees] = useState([]);
  const multiple = false;
  const [togglePassword, setTogglePassword]=useState(false);
  //array que recibe los errores del modelo de base de datos
  const [error, setError] = useState(
    {
      'userName': '',
      'email': '',
      'idEmployee':'',
      'password': '',
      'passConfirm': ''
    }
  );

  //llamado de empleados al cargar la página
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DOMAIN_SERVER}api/employees`)
    .then((res)=>{
      setEmployees(res.data.employees);
    })
    .catch((errors)=>{
      console.log(errors);
    });
  }, []); 

  //Evento que sucede al dar clic al botón de crear
  const onSubmit: SubmitHandler<FormValues> = data => {
    // If all validations are met we'll call register method
    createUser(data);
  }

  //funcion para crear empleado
  const createUser = (data) => {
    if(idEmployee == '' || password != passConfirm){
      return 0;
    }
    if (infoUserLogin.id !== null && infoUserLogin.id !== '') {
      //seteamos la variable que hace que el botón cambie el texto
      setLoading(true);
      //creacion de objeto que enviaremso a la api para registrar
      const info = { 
        userName: data.userName, 
        email: data.email, 
        password: data.password, 
        passConfirm: data.passConfirm, 
        idEmployee: idEmployee,
        whoCreated: infoUserLogin.id,
      };

      //llamada de api con envio de parametros del usuario a crear
      axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/users`, info)
      .then((res)=>{//si la petición es exitosa redirigimos a la lista de usuarios
        console.log(res.data);
        toast.info(t('successCreated'));
        navigate(`${process.env.PUBLIC_URL}/app/users/userList/${layout}`);
      })
      .catch((err)=>{//si recibimos un error
        setLoading(false);
        setError(err.response.data.messages);
        toast.error(t('errorCreate'));
      });
    } else {
      setTimeout(() => {
        toast.error(t('errorLogin'));
      }, 200);
    }
  };

  //funcion que lee el cambio de un empleado en el select
  function handleChange(e){
    if(e.length > 0){
      var aux = e[0].id;
      setIdEmployee(aux);
    }else{
      setIdEmployee("");
    }
  }
  
  return (
    <Fragment>
      <Breadcrumb parent={t("users")} title={t("titleUserCreate")}/>
      <Container fluid={true}>
        <Row className="justify-content-md-center">
          <Col sm="12" xl="10">
            <Card>
              <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>
                <CardBody>
                  <Row>
                    <FormGroup>
                      <Label className="col-form-label pt-0" >{t("userName")}</Label>
                      <input className="form-control btn-pill" type="text" placeholder={t("placeholderUserName")} name="userName" {...register('userName', { required: true })} onChange={(e) => { setUserName(e.target.value)}} defaultValue={""} />
                      <span>{errors.userName && t("errorUserName")}</span>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label pt-0" >{t("email")}</Label>
                      <input className="form-control btn-pill" name="email" type="text" placeholder={t("placeholderEmail")} {...register('email', {
                        required: true,
                        pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
                      })} onChange={(e) => { setEmail(e.target.value)}} />
                      <span>{errors.email && t("errorEmail") || error.email}</span>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label pt-0" >{t("employees")}</Label>
                      <Autocomplete
                        getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                        classes={{ inputRoot: "form-control btn-pill" }}
                        onInputChange={(event, newVal) => {
                            setIdEmployee(newVal);
                        }}
                        id="select-employees"
                        options={employees}
                        renderInput={
                          params => <TextField id="emplyeesUser"
                            {...params} placeholder={t("placeholderEmployees")} 
                            InputProps={{...params.InputProps, disableUnderline: true}}
                        />}
                        onChange={(event, newValue) => {
                          setIdEmployee(newValue !== null ? newValue.id : '');
                        }}
                      />
                      <input type="hidden"/>
                      <span>{(idEmployee == '' && validateClass) && t("errorEmployee")}</span>
                    </FormGroup>
                    <FormGroup>
                      <div className="position-relative">
                        <Label className="col-form-label pt-0">{t("password")}</Label>
                        <input id={"spamError"} className="form-control btn-pill" type={togglePassword ? "text" : "password"} placeholder={t("placeholderPassword")} name="password" {...register('password', { 
                          required: true,
                          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/
                         })} onChange={(e) => { setPassword(e.target.value)}} />
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}>
                          <span style={{ width: "100px" }} className={togglePassword ? "" : "show"}></span>
                        </div>
                        <span>{(errors.password || error.password || (password.length < 6 && validateClass)) && t("errorPassword")}</span>
                        <Popover
                          placement={"bottom"}
                          isOpen={popover}
                          target={"spamError"}
                          toggle={Toggle}
                          trigger={"hover"}
                          props={{
                            style: { height: 'auto' },
                          }}
                        >
                          <PopoverHeader style={{ backgroundColor: "#dc3545e6", color: '#fff' }}>{t("headPopPass")}</PopoverHeader>
                          <PopoverBody style={{ color: "#dc3545e6"}}>
                            {t("bodyPopPass1")}
                            <br></br>
                            {t("bodyPopPass2")}
                            <br></br>
                            {t("bodyPopPass3")}
                            <br></br>
                            {t("bodyPopPass4")}
                          </PopoverBody>
                        </Popover>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <div className="position-relative">
                        <Label className="col-form-label pt-0">{t("passConfirm")}</Label>
                        <input className="form-control btn-pill" type={togglePassword ? "text" : "password"} placeholder={t("placeholderPassConfirm")} name="passConfirm"  {...register('passConfirm', { required: true })} onChange={(e) => { setPassConfirm(e.target.value)}} />
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                        <span>{(password != passConfirm && validateClass) && t("errorMatchPassword")}</span>
                      </div>
                    </FormGroup>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button className="me-1" color="primary" type="submit" onClick={() => setValidateClass(true)}>{loading ? t("processing") : t("create")}</Button>
                  <Button type="button" color="secondary" onClick={() => {
                                                                          reset({
                                                                            userName: "",
                                                                            email: "",
                                                                            password: "",
                                                                            passConfirm: ""
                                                                          }, {
                                                                            keepErrors: true, 
                                                                            keepDirty: true,
                                                                            keepIsSubmitted: false,
                                                                            keepTouched: false,
                                                                            keepIsValid: false,
                                                                            keepSubmitCount: false,
                                                                          });
                                                                        }} >{t("cancel")}</Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
// disabled={loading ? loading : loading}

export default UserCreateForm;