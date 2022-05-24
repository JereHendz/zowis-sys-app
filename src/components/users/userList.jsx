import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import axios from "axios";
import { classes } from "../../data/layouts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import 'devextreme/dist/css/dx.material.teal.light.css';
import DataGrid, {
  Column,  Editing, Paging,  Lookup,  SearchPanel,  Scrolling,  Pager,   Export, HeaderFilter,  RequiredRule} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';

const UserList = () => {

  const { t } = useTranslation();
  const [usersList, setUsersList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const navigate = useNavigate();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout = localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const tab = '\u00A0';

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/users`)
      .then((res) => {
        setUsersList(res.data.users);
        setEmployeesList(res.data.employees);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createEmployee = (e) => {
    navigate(`${process.env.PUBLIC_URL}/app/users/userCreate/${layout}`);
  };

  const cellRenderAction = (data) => {
    return <div align="center"><i style={{ cursor: 'pointer' }} className="icofont icofont-ui-edit" onClick={() => editEmployee(data)} /></div>;
  }

  const editEmployee = (e) => {
    console.log('test');
  }

  const getEmployeeComplete = (emp) => {
    return emp ? emp.firstName + ' ' + emp.lastName : '';
  }

  return (
    <Fragment>
      <Breadcrumb parent="Employee" title={t("titleListUsers")} />
      <Container fluid={true}>
        <Row >
          <Col sm="12">
            <Card>
              <CardBody>
                <Row >
                  <Col sm="12" lg="12" xl="12">
                    <div className="table-responsive">
                      <div id="data-grid-demo" className="table-primary">
                        <div className="btn-showcase ">
                          <Button className="btn-pill" color="primary" onClick={createEmployee}><i className="icofont icofont-ui-add"></i>{tab + tab}{t('create')}</Button>
                        </div>
                        <DataGrid
                          dataSource={usersList}
                          keyExpr="id"
                          showBorders={true}
                          rowAlternationEnabled={true}
                          columnAutoWidth={true}
                          t={t}
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
                          <Column caption={t('actions')} cellRender={cellRenderAction} width={100} />
                          <Column dataField="userName" caption={t('userName')} >
                            <RequiredRule />
                          </Column>
                          <Column dataField="email" caption={t('email')} />
                          <Column dataField="idEmployee" caption={t('employee')} >
                            <Lookup dataSource={employeesList} valueExpr="id" displayExpr={getEmployeeComplete} />
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

export default UserList;
