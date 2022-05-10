import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import {Container,Row,Col,Card,CardHeader,CardBody,CardFooter,Form,FormGroup,Label,Input,Button} from 'reactstrap'
import { UserCreate,EmailAddress,Password,Submit,Cancel } from "../../constant";
import axios from 'axios';
import { classes } from '../../data/layouts';
import { useNavigate } from "react-router-dom";

const CreateUser = () => { 
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();

  const createUser = (e) => {
    setLoading(true);
    const data = { userName: userName, email: email, password:password };
      axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/create`, data)
    .then((payload)=>{
      navigate(`${process.env.PUBLIC_URL}/app/users/userEdit/${layout}`);
      console.log(payload);
    })
    .catch((errors)=>{
      console.log(errors);
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
                <Form className="theme-form">
                <FormGroup>
                    <Label className="col-form-label pt-0" >{"User Name"}</Label>
                    <Input className="form-control" type="text" placeholder="Enter the user name" required="" onChange={e => setUserName(e.target.value)} defaultValue={""} />
                    <small className="form-text text-muted">{"We'll never share your user name with anyone else."}</small>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label pt-0" >{EmailAddress}</Label>
                    <Input className="form-control" type="email" placeholder="Enter email" required="" onChange={e => setEmail(e.target.value)} defaultValue={""} />
                    <small className="form-text text-muted">{"We'll never share your email with anyone else."}</small>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="exampleInputPassword1">{Password}</Label>
                    <Input className="form-control" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} defaultValue={""} />
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button color="primary" className="me-1" disabled={loading ? loading : loading} onClick={() => createUser(userName, email, password)}>{loading ? "CREANDO..." : Submit}</Button>
                <Button color="secondary">{Cancel}</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CreateUser;