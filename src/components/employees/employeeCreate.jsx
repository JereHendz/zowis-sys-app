import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import {
  UserCreate,
  EmailAddress,
  Password,
  Submit,
  Cancel,
  Email,
} from "../../constant";
import axios from "axios";
import { classes } from "../../data/layouts";
import { useNavigate } from "react-router-dom";
import CreateFormEmployee from "./createFormEmployee";
import { useTranslation } from 'react-i18next';


const CreateUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const { t } = useTranslation();


  // Define const that allow see and hide the password
  const [togglePassword, setTogglePassword] = useState(false);

  // Define error array
  const [error, setError] = useState({
    userName: "",
    email: "",
    password: "",
    passConfirm: "",
  });

  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

  const createUser = (e) => {
    setLoading(true);
    const data = {
      userName: userName,
      email: email,
      password: password,
      passConfirm: passConfirm,
    };
    axios
      .post(`${process.env.REACT_APP_DOMAIN_SERVER}api/users`, data)
      .then((payload) => {
        navigate(`${process.env.PUBLIC_URL}/app/users/userEdit/${layout}`);
        console.log(payload);
      })
      .catch((errors) => {
        console.log(errors);
        setLoading(false);
        setError(errors.response.data.messages);
      });
  };

  return (
    <Fragment>
      <Breadcrumb parent="Form" title={t("titleEmployeeCreate")} />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{t("subtitleEmployeeCreate")} </h5>
              </CardHeader>
              <CardBody>
                <CreateFormEmployee />
                <label htmlFor="">{"this is a test "}</label>
                <label htmlFor="">{"this is a test1 "}</label>
                <label htmlFor="">{"this is a test2 "}</label>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CreateUser;
