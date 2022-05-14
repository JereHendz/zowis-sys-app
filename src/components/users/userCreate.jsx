import React, { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { Col, Button, Form, Label, Input, FormGroup, Row, Container, Card, CardHeader, CardBody, CardFooter } from 'reactstrap'
import { UserCreate, Submit,Cancel,Password, Email, Empleados } from '../../constant'
import Breadcrumb from '../../layout/breadcrumb'
import axios from 'axios';
import { classes } from '../../data/layouts';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const TooltipForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [validateClass, setValidateClass] = useState(false);
  const onSubmit = (e, data) => {
    e.preventDefault();
    if (data !== '') {
      alert('You submitted the form and stuff!');
    } else {
      errors.showMessages();
    }
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [idEmployee, setIdEmployee] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [employees, setEmployees] = useState([]);

  // Define const that allow see and hide the password
  const [togglePassword, setTogglePassword]=useState(false);

  // Define error array
  const [error, setError] = useState(
    {
      'userName':'',
      'email':'',
      'idEmployee':'',
      'password':'',
      'passConfirm':''
    }
  );

  const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DOMAIN_SERVER}api/employees`)
    .then((res)=>{
      //navigate(`${process.env.PUBLIC_URL}/app/users/userEdit/${layout}`);
      setEmployees(res.data);
      setEmail(res.data[0].email);
      toast.success(res.data.message);
    })
    .catch((errors)=>{
      console.log(errors);
      setLoading(false);
      setError(errors.response.data.messages);
    });
  }, []); 


  const createUser = (e) => {
    setLoading(true);
    const data = { userName: userName, email: email, password:password, passConfirm:passConfirm, idEmployee:idEmployee };
    axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/users`, data)
    .then((payload)=>{
      navigate(`${process.env.PUBLIC_URL}/app/users/userEdit/${layout}`);
      console.log(payload);
    })
    .catch((errors)=>{
      console.log(errors);
      setLoading(false);
      setError(errors.response.data.messages);
    });
  };

  return (
    <Fragment>
      <Breadcrumb parent="Users" title="Create Users"/>
      <Container fluid={true}>
        <Row className="justify-content-md-center">
          <Col sm="12" xl="10">
            <Card>
              <CardHeader>
                <h5>{UserCreate}</h5>
                <span>{"Aquí puedes crear tus usuarios."}</span>
              </CardHeader>
              <CardBody>
                <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <FormGroup>
                      <Label className="col-form-label pt-0" >{"User Name"}</Label>
                      <input className="form-control" type="text" placeholder="Enter the user name" name="userName" {...register('userName', { required: true })} onChange={e => setUserName(e.target.value)} defaultValue={""} />
                      <span>{errors.userName && 'Debe ingresar un nombre de usuario'}</span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label pt-0" >{Email}</Label>
                      <input className="form-control" type="email" placeholder="Enter email" name="email"  {...register('email', { required: true })}/>
                      <span>{errors.email && 'Debe ingrear un email'}</span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label pt-0" >{Empleados}</Label>
                      <select className="form-control" name="email"  {...register('email', { required: true })} onChange={e => setIdEmployee(e.target.value)} defaultValue={""}>
                      <option value={""}>{"Seleccione una opción"}</option>
                        {
                          employees.length > 0 ?
                            employees.map((employee) => {
                              return (
                                <option value={employee.id}>{employee.firstName+" "+employee.lastName}</option>
                              );
                            })
                          : <option value={""}>{"No hay data"}</option>
                        }
                      </select>
                      <span>{errors.idEmployee && 'Debe seleccionar un empleado'}</span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </FormGroup>
                    <FormGroup>
                    <div className="position-relative">
                      <Label htmlFor="exampleInputPassword1">{Password}</Label>
                      <input className="form-control" type={togglePassword ? "text" : "password"} placeholder="Password" name="password" {...register('password', { required: true })} />
                      <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                      <span>{errors.email && 'Debe ingresar una contraseña'}</span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </div>
                    </FormGroup>
                    <FormGroup>
                      <div className="position-relative">
                        <Label htmlFor="exampleInputPassword1">Confirmar contraseña</Label>
                        <input className="form-control" type={togglePassword ? "text" : "password"} placeholder="Password" name="confirmarPassword"  {...register('confirmarPassword', { required: true })} />
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                        <span>{errors.confirmarPassword && 'Debe confirmar la contraseña'}</span>
                        <div className="valid-feedback">{"Looks good!"}</div>
                      </div>
                    </FormGroup>
                  </Row>
                  <CardFooter>
                    <Button className="me-1" disabled={loading ? loading : loading} color="primary" type="submit" onClick={() => setValidateClass(!validateClass)}>{loading ? "CREANDO..." : Submit}</Button>
                    <Button color="secondary">{Cancel}</Button>
                  </CardFooter>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default TooltipForm;