import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { Container, Row, Col, Card, CardHeader, Table } from "reactstrap";

import axios from "axios";
import { classes } from "../../data/layouts";
import { useNavigate } from "react-router-dom";

const ListUsers = () => {

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/users`)
      .then((payload) => {
        console.log(payload);
        // setNotes(payload.data);
      })
      .catch((error) => {
        console.log(error);
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
                <h5>{"Lista de usuarios"}</h5>
              </CardHeader>
              <Row className="card-block">
                <Col sm="12" lg="12" xl="12">
                  <div className="table-responsive">
                    <Table>
                      <thead className="table-primary">
                        <tr>
                          <th scope="col">{"#"}</th>
                          <th scope="col">{"First Name"}</th>
                          <th scope="col">{"Last Name"}</th>
                          <th scope="col">{"Username"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">{"1"}</th>
                          <td>{"Mark"}</td>
                          <td>{"Otto"}</td>
                          <td>{"@mdo"}</td>
                        </tr>
                        <tr>
                          <th scope="row">{"2"}</th>
                          <td>{"Jacob"}</td>
                          <td>{"Thornton"}</td>
                          <td>{"@fat"}</td>
                        </tr>
                        <tr>
                          <th scope="row">{"3"}</th>
                          <td>{"Larry"}</td>
                          <td>{"the Bird"}</td>
                          <td>{"@twitter"}</td>
                        </tr>
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

export default ListUsers;
