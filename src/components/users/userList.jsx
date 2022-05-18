import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { Container, Row, Col, Card, CardHeader, Table } from "reactstrap";
import axios from "axios";
import { classes } from "../../data/layouts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const UserList = () => {

  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/users`)
      .then((payload) => {
        console.log(payload);
        // setNotes(payload.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const [listUser, setListUser] = useState([]);
  const navigate = useNavigate();

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


  return (
    <Fragment>
      <Breadcrumb parent="Users" title="Lista de usuarios" />
      <Container fluid={true}>
        <Row className="justify-content-md-center">
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{t("listUsers")}</h5>
              </CardHeader>
              <Row className="card-block">
                <Col sm="12" lg="12" xl="12">
                  <div className="table-responsive">
                    <Table>
                      <thead className="table-primary">
                        <tr>
                          <th scope="col">{"Id"}</th>
                          <th scope="col">{t("nameFirst")}</th>
                          <th scope="col">{t("nameLast")}</th>
                          <th scope="col">{t("usrName")}</th>
                        </tr>
                      </thead>
                      <tbody>
                      
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default UserList;
