import React, { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { Col, Button, Form, Label, FormGroup, Row, Container, Card, CardHeader, CardBody, CardFooter } from 'reactstrap'
import Breadcrumb from '../../layout/breadcrumb'
import axios from 'axios';
import { classes } from '../../data/layouts';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useTranslation } from 'react-i18next';

const UserEdit = () => {

  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [validateClass, setValidateClass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [idEmployee, setIdEmployee] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [status, setStatus] = useState([]);
  const [employees, setEmployees] = useState([]);
  const multiple = false;
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);
  const [error, setError] = useState(
    {
      'idEmployee':''
    }
  );

  const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();

  const onSubmit = (e, data) => {
    if (data !== '') {
      updateUser(userName, email, password, idEmployee, status);
    } else {
      errors.showMessages();
    }
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DOMAIN_SERVER}api/employees`)
    .then((res)=>{
      setEmployees(res.data);
      toast.success(res.data.message);
    })
    .catch((errors)=>{
      console.log(errors);
      setLoading(false);
      setError(errors.response.data.messages);
    });
  }, []); 

  const updateUser = () => {
    setLoading(true);
    const data = { userName: userName, email: email, password:password, passConfirm:passConfirm, idEmployee:idEmployee };
    axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/users`, data)
    .then((res)=>{
      navigate(`${process.env.PUBLIC_URL}/app/users/userList/${layout}`);
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
      setError(err.response.data.messages);
    });
  };

  return (
    <Fragment>
      <Breadcrumb parent={t("users")} title={t("titleUserCreate")}/>
      <Container fluid={true}>
        <Row className="justify-content-md-center">
          <Col sm="12" xl="10">
            <Card>
              <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>
                <CardHeader>
                  <h5>{t("subtitleUserCreate")}</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <FormGroup>
                      <Label className="col-form-label pt-0" >{t("userName")}</Label>
                      <input className="form-control btn-pill" type="text" placeholder={t("placeholderUserName")} name="userName" {...register('userName', { required: true })} onBlur={(e) => { setUserName(e.target.value)}} defaultValue={""} />
                      <span>{errors.userName && t("errorUserName")}</span>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label pt-0" >{t("email")}</Label>
                      <input className="form-control btn-pill" type="email" placeholder={t("placeholderEmail")} name="email"  {...register('email', { required: true })} onBlur={(e) => { setEmail(e.target.value)}} />
                      <span>{errors.email && t("errorEmail")}</span>
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label pt-0" >{t("employees")}</Label>
                      <Typeahead
                        inputProps={{
                          className: 'btn-pill',
                        }}
                        name="idEmployee"
                        id="id"
                        labelKey={employees => `${employees.firstName} ${employees.lastName}`}
                        multiple={multiple}
                        options={employees}
                        placeholder={t("placeholderEmployees")}
                        onChange={(e) => { setIdEmployee(e[0].id)}}
                        />
                    </FormGroup>
                    <FormGroup>
                    <div className="position-relative">
                      <Label htmlFor="exampleInputPassword1">{t("password")}</Label>
                      <input className="form-control btn-pill" type={togglePassword ? "text" : "password"} placeholder={t("placeholderPassword")} name="password" {...register('password', { required: true })} onBlur={(e) => { setPassword(e.target.value)}} />
                      <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}>
                        <span className={togglePassword ? "" : "ss"}></span>
                      </div>
                      <span>{errors.email && t("errorPassword")}</span>
                    </div>
                    </FormGroup>
                    <FormGroup>
                      <div className="position-relative">
                        <Label htmlFor="exampleInputPassword1">{t("confirmPassword")}</Label>
                        <input className="form-control btn-pill" type={togglePassword ? "text" : "password"} placeholder={t("placeholderConfirmPassword")} name="confirmarPassword"  {...register('confirmarPassword', { required: true })} onBlur={(e) => { setPassConfirm(e.target.value)}} />
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                        <span>{errors.confirmarPassword && t("errorConfirmPassword")}</span>
                      </div>
                    </FormGroup>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button className="me-1" disabled={loading ? loading : loading} color="primary" type="submit" onClick={() => setValidateClass(!validateClass)}>{loading ? t("processing") : t("create")}</Button>
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

export default UserEdit;