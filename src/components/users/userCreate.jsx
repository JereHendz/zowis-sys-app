import React, { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { Col, Button, Form, Label, FormGroup, Row, Container, Card, CardHeader, CardBody, CardFooter, Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import Breadcrumb from '../../layout/breadcrumb'
import axios from 'axios';
import { classes } from '../../data/layouts';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useTranslation } from 'react-i18next';

const UserCreateForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [validateClass, setValidateClass] = useState(false);
  const infoUserLogin = JSON.parse(localStorage.getItem('infoUserLogin'));

  const onSubmit = (e, data) => {
    if (data !== '') {
      createUser();
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
  const multiple = false;
  const { t } = useTranslation();

  // Define const that allow see and hide the password
  const [togglePassword, setTogglePassword]=useState(false);

  // Define error array
  const [error, setError] = useState(
    {
      'userName': '',
      'email': '',
      'idEmployee':'',
      'password': '',
      'passConfirm': ''
    }
  );

  const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();
  const [popover, setPopover] = useState(false)
  const Toggle = () => setPopover(!popover);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DOMAIN_SERVER}api/employees`)
    .then((res)=>{
      setEmployees(res.data.employees);
    })
    .catch((errors)=>{
      console.log(errors);
    });
  }, []); 

  const createUser = () => {
    if(idEmployee == ''){
      return 0;
    }
    setLoading(true);
    const data = { userName: userName, email: email, password:password, passConfirm:passConfirm, idEmployee:idEmployee };
    axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/users`, data)
    .then((res)=>{
      navigate(`${process.env.PUBLIC_URL}/app/users/userList/${layout}`);
    })
    .catch((err)=>{
      setLoading(false);
      setError(err.response.data.messages);
    });
  };

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
                      <Label className="col-form-label pt-0" >{t("userName")}</Label>
                      <input className="form-control btn-pill" type="text" placeholder={t("placeholderUserName")} name="userName" {...register('userName', { required: true })} onBlur={(e) => { setUserName(e.target.value)}} defaultValue={""} />
                      <span>{errors.userName && t("errorUserName")}</span>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label pt-0" >{t("email")}</Label>
                      <input className="form-control btn-pill" name="email" type="text" placeholder={t("placeholderEmail")} onChange={e => setEmail(e.target.value)} {...register('email', {
                        required: true,
                        pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                      })} />
                      <span>{errors.email && t("errorEmail") || error.email}</span>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label pt-0" >{t("employees")}</Label>
                      <Typeahead
                        inputProps={{
                          className: 'btn-pill'
                        }}
                        id="id"
                        labelKey={employees => `${employees.firstName} ${employees.lastName}`}
                        multiple={multiple}
                        options={employees}
                        placeholder={t("placeholderEmployees")}
                        onChange={handleChange}
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
                         })} onBlur={(e) => { setPassword(e.target.value)}} />
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
                        <input className="form-control btn-pill" type={togglePassword ? "text" : "password"} placeholder={t("placeholderPassConfirm")} name="passConfirm"  {...register('passConfirm', { required: true })} onBlur={(e) => { setPassConfirm(e.target.value)}} />
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                        <span>{(password != passConfirm && validateClass) && t("errorMatchPassword")}</span>
                      </div>
                    </FormGroup>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button className="me-1" disabled={loading ? loading : loading} color="primary" type="submit" onClick={() => setValidateClass(true)}>{loading ? t("processing") : t("create")}</Button>
                  <Button color="secondary">{t("cancel")}</Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default UserCreateForm;