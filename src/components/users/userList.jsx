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
import PopupEditUser from "./popupEditUser";

const UserList = () => {
  //variables estandar
  const { t } = useTranslation();
  const navigate = useNavigate();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout = localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

  //variables para la lista de usuarios
  const [usersList, setUsersList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const tab = '\u00A0';

  //variables para la modal
  const [openPopup, setOpenPopup] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [idUser, setIdUser] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [statusUser, setStatusUser] = useState('');
  const [idEmployee, setIdEmployee] = useState('');
  const [error, setError] = useState({
    'userName': '',
    'email': '',
    'idEmployee':''
  });
  const [keyUserName, setKeyUserName] = useState('')


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/users`)
      .then((res) => {
        setUsersList(res.data.users);
        setEmployeesList(res.data.employees);
        setStatusList(res.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //redirección al formulario de creación
  const createEmployee = (e) => {
    navigate(`${process.env.PUBLIC_URL}/app/users/userCreate/${layout}`);
  };

  //funcion que renderiza el botón de edición en la tabla
  const cellRenderAction = (data) => {
    return <div align="center"><i style={{ cursor: 'pointer' }} className="icofont icofont-ui-edit" onClick={() => editUser(data)} /></div>;
  }

  //funcion para levantar la modal de edición de un usuario
  const editUser = (e) => {
    console.log(e.data);
    setDataUser(e.data);
    setIdUser(e.data.id);
    setUserName(e.data.userName);
    setEmail(e.data.email);
    setIdEmployee(e.data.idEmployee);
    setStatusUser(e.data.status);
    setOpenPopup(true);
    setKeyUserName(Math.random());
  }

  //funcion que devuelve el empleado concatenado para el lookup
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
                      <PopupEditUser
                        openPopup={openPopup} setOpenPopup={setOpenPopup}
                        employeesList={employeesList} setEmployeesList={setEmployeesList}
                        idUser={idUser} setIdUser={setIdUser}
                        userName={userName} setUserName={setUserName}
                        email={email} setEmail={setEmail}
                        idEmployee={idEmployee} setIdEmployee={setIdEmployee}
                        statusList={statusList} setStatusList={setStatusList}
                        statusUser={statusUser} setStatusUser={setStatusUser}
                        dataUser={dataUser} setDataUser={setDataUser}
                        setUsersList={setUsersList}
                        error={error} setError={setError}
                        keyUserName={keyUserName} setKeyUserName={setKeyUserName}
                      />
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
