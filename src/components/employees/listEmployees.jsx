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
// import 'devextreme/dist/css/dx.material.lime.light.compact.css';

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
  Export
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
  const [listUser, setListUser] = useState([]);
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
      .then((payload) => {
        console.log(payload);
        setDataEmployee(payload.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const createEmployee = (e)=> {
    navigate(`${process.env.PUBLIC_URL}/app/employees/EmployeeCreate/${layout}`);
  };

  return (
    <Fragment>
      <Breadcrumb parent="Users" title={t("titleListEmployee")} />
      <Container fluid={true}>
        <Row >
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{t("subtitleListEmployee")}</h5>
              </CardHeader>
              <CardBody>

                <Row >
                  <Col sm="12" lg="12" xl="12">
                    <div className="table-responsive">

                      <div id="data-grid-demo" className="table-primary">
                        <Toolbar className="marginBtnCreateEmployee">
                          <Item location="before">
                            <div className="btn-showcase">
                              <Button className="btn-pill" color="primary" onClick={createEmployee}><i className="icofont icofont-ui-add"></i>{tab + tab}{t('create')}</Button>
                              {/* <Button className="btn-pill" color="success">{SuccessButton}</Button> */}
                            </div>
                          </Item>
                        </Toolbar>
                        <DataGrid
                          dataSource={dataEmployee}
                          keyExpr="id"
                          showBorders={true}
                          rowAlternationEnabled={true}
                        >
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
                            allowUpdating={true}
                            allowAdding={false}
                            allowDeleting={false}>
                            <Popup title="Employee Info" showTitle={true} width={700} height={525} />
                            <Form>
                              <Item itemType="group" colCount={2} colSpan={2}>
                                <Item dataField="FirstName" />
                                <Item dataField="LastName" />
                                <Item dataField="Prefix" />
                                <Item dataField="BirthDate" />
                                <Item dataField="Position" />
                                <Item dataField="HireDate" />
                                <Item
                                  dataField="Notes"
                                  editorType="dxTextArea"
                                  colSpan={2}
                                  editorOptions={[notesEditorOptions]} />
                              </Item>

                              <Item itemType="group" caption="Home Address" colCount={2} colSpan={2}>
                                <Item dataField="StateID" />
                                <Item dataField="Address" />
                              </Item>
                            </Form>
                          </Editing>
                          {/* <Column dataField="Prefix" caption="Title" width={70} /> */}
                          <Column type='buttons'>
                            {/* <Button icon='add'
                              onClick={onAddButtonClick}
                              visible={isAddButtonVisible}
                            /> */}
                            <Button name='edit' />
                            <Button name='save' />
                          </Column>
                          <Column dataField="firstName" caption={t('firstName')} />
                          <Column dataField="lastName" caption={t('lastName')} />
                          <Column dataField="dui" caption={t('dui')} width={125} />
                          {/* <Column dataField="HireDate" dataType="date" /> */}
                          <Column dataField="phoneNumber" caption={t('phoneNumber')} width={125} />
                          <Column dataField="email" caption={t('email')} width={200} />


                          {/* <Column dataField="phoneNumber" caption={t('phoneNumber')} width={125}>
                          <Lookup dataSource={[]} valueExpr="ID" displayExpr="Name" />
                        </Column> */}
                          <Column dataField="Address" caption={t("address")} />
                          <Column dataField="Notes" visible={false} />
                          {/* <Toolbar>
                            <Item name='exportButton' />
                            <Item name='searchPanel' showText='always' />
                          </Toolbar> */}
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
