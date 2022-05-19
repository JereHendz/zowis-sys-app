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
import axios from "axios";
import { classes } from "../../data/layouts";
import { useNavigate } from "react-router-dom";
import CreateFormEmployee from "./createFormEmployee";
import { useTranslation } from 'react-i18next';


const CreateEmployee = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

  return (
    <Fragment>
      <Breadcrumb parent="Employee" title={t("titleEmployeeCreate")} />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{t("subtitleEmployeeCreate")} </h5>
              </CardHeader>
              <CardBody>
                <CreateFormEmployee />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CreateEmployee;
