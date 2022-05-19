import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { Container, Row, Col, Card, CardHeader, Table, CardBody, Button } from "reactstrap";

import axios from "axios";
import { classes } from "../../data/layouts";
import { useNavigate } from "react-router-dom";
// import 'devextreme/dist/css/dx.light.css';
// import 'devextreme/dist/css/dx.material.blue.light.compact.css';
// import 'devextreme/dist/css/dx.material.orange.light.css';
import 'devextreme/dist/css/dx.material.teal.light.css';
// import 'devextreme/dist/css/dx.softblue.css';

import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Lookup,
  Form,
  SearchPanel,
  Scrolling,
  Pager,
  // Button,
  Export,
  HeaderFilter,
  RequiredRule
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import notify from 'devextreme/ui/notify';
import { Item } from 'devextreme-react/form';
import Toolbar from 'devextreme-react/toolbar';
import { useTranslation } from 'react-i18next';


const notesEditorOptions = { height: 100 };

const ListEmployees = () => {
  const allowedPageSizes = [5, 10, 15];
  const [dataEmployee, setDataEmployee] = useState([]);
  const { t } = useTranslation();
  const [listRoles, setListRoles] = useState([]);
  const [listCountries, setListCountries] = useState([]);
  const [listDeparments, setListDeparments] = useState([]);
  const [listMunicipios, setListMunicipios] = useState([]);

  const navigate = useNavigate();
  // Spaces
  const tab = '\u00A0';
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/employees`)
      .then((response) => {
        console.log(response.data);
        setDataEmployee(response.data.employees);
        setListRoles(response.data.roles);
        setListCountries(response.data.countries);
        setListDeparments(response.data.department);
        setListMunicipios(response.data.municipios);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const createEmployee = (e) => {
    navigate(`${process.env.PUBLIC_URL}/app/employees/EmployeeCreate/${layout}`);
  };


  return (
    <Fragment>
      <Breadcrumb parent="Employee" title={t("titleListEmployee")} />
      <Container fluid={true}>
        <Row >
          <Col sm="12">
            <Card>
              {/* <CardHeader>
                <h5>{t("subtitleListEmployee")}</h5>
              </CardHeader> */}
              <CardBody>

                <Row >
                  <Col sm="12" lg="12" xl="12">
                    <div className="table-responsive">
                      <div id="data-grid-demo" className="table-primary">

                        <div className="btn-showcase ">
                          <Button className="btn-pill" color="primary" onClick={createEmployee}><i className="icofont icofont-ui-add"></i>{tab + tab}{t('create')}</Button>
                        </div>

                        <DataGrid
                          dataSource={dataEmployee}
                          keyExpr="id"
                          showBorders={true}
                          rowAlternationEnabled={true}
                          columnAutoWidth={true}
                        >
                          <HeaderFilter visible={true} allowSearch={true} />
                          <Export enabled={true} />
                          <SearchPanel visible={true} highlightCaseSensitive={true} width={450} />
                          <Scrolling
                            useNative={false}
                            scrollByContent={true}
                            scrollByThumb={true}
                            showScrollbar="onHover" />
                          <Paging defaultPageSize={5} />
                          <Pager
                            showPageSizeSelector={true}
                          />

                          <Editing
                            mode="popup"
                            allowUpdating={false}
                            allowAdding={false}
                            allowDeleting={false}>
                          </Editing>

                          <Column type='buttons' caption={t('actions')}>
                            <Button name='edit' />
                            <Button name='save' />
                            <Button name='btnTest' />

                          </Column>

                          <Column dataField="firstName" caption={t('firstName')} >
                          <RequiredRule />
                          </Column>
                          <Column dataField="lastName" caption={t('lastName')} >
                          <RequiredRule />
                          </Column>
                          <Column dataField="dui" caption={t('dui')} width={125} />
                          <Column dataField="createDate" caption={t('createdDate')} dataType="date" format={"dd-MM-yyyy"} />
                          <Column dataField="phoneNumber" caption={t('phoneNumber')} width={125} />
                          <Column dataField="email" caption={t('email')} width={200} />
                          <Column dataField="address" caption={t("address")} />
                          <Column dataField="idRol" caption={t('positionCompany')} >
                            <Lookup dataSource={listRoles} valueExpr="id" displayExpr="rol" />
                            <RequiredRule />
                          </Column>
                          <Column dataField="idCountry" caption={t('country')} >
                            <Lookup dataSource={listCountries} valueExpr="id" displayExpr="name" />
                          </Column>
                          <Column dataField="idDepto" caption={t('department')} >
                            <Lookup dataSource={listDeparments} valueExpr="id" displayExpr="name" />
                          </Column>
                          <Column dataField="idMunicipio" caption={"Municipio"} >
                            <Lookup dataSource={listMunicipios} valueExpr="id" displayExpr="name" />
                          </Column>
                        </DataGrid>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>

            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ListEmployees;
