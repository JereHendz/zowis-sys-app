import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { Container, Row, Col, Card, CardHeader, Table, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import axios from "axios";
import { classes } from "../../data/layouts";
import { useNavigate } from "react-router-dom";
import 'devextreme/dist/css/dx.material.teal.light.css';
import PopupEditEmployee from "./popupEditEmployee";


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


const ListEmployees = () => {
  const [dataEmployee, setDataEmployee] = useState([]);
  const { t } = useTranslation();
  const [listRoles, setListRoles] = useState([]);
  const [listCountries, setListCountries] = useState([]);
  const [listDeparments, setListDeparments] = useState([]);
  const [listMunicipios, setListMunicipios] = useState([]);
  const [dataEmployeePopup, setDataEmployeePopup] = useState([]);

  const navigate = useNavigate();
  // Spaces
  const tab = '\u00A0';
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

      // Autocomplete
  const [valueRol, setValueRol] = useState('');
  const [idCountry, setIdCountry] = useState('');
  const [idDepartment, setIdDepartment] = useState('');
  const [listDeptoSelected, setListDeptoSelected] = useState([]);
  const [objCountry, setObjCountry] = useState([]);
  const [objDepartment, setObjDepartment] = useState([]);
  const [idMunicipio, setIdMunicipio] = useState('');
  const [objMunicipio, setObjMunicipio] = useState([]);
  const [objRol, setObjRol] = useState([]);
  const [statusEmployee, setStatusEmployee] = useState('');
  const [listStatus, setListStatus] = useState([]);


  const [listMunicipioSelected, setListMunicipioSelected] = useState([]);


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

  // Get the list of status 

  useEffect(() => {

    // We pass like parameter 1 because 1 has the general status
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/processstate/${1}`)
      .then((response) => {
        console.log(response.data);
        setListStatus(response.data.listStatus);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const createEmployee = (e) => {
    navigate(`${process.env.PUBLIC_URL}/app/employees/EmployeeCreate/${layout}`);
  };

  const cellRenderAction = (data) => {
    return <div align="center"><i style={{ cursor: 'pointer' }} className="icofont icofont-ui-edit" onClick={() => editEmployee(data)} /></div>;
  }

  const [controlModalEditEmployee, setControlModalEditEmployee] = useState(false);

  const editEmployee = (e) => {
    setDataEmployeePopup(e.data);
    setValueRol(e.data.idRol!==null && e.data.idRol!==0  ? e.data.idRol : '');
    setIdCountry(e.data.idCountry!==null && e.data.idCountry!==0  ? e.data.idCountry : '');
    setIdDepartment(e.data.idDepto!==null && e.data.idDepto!==0  ? e.data.idDepto : '');
    setIdMunicipio(e.data.idMunicipio!==null && e.data.idMunicipio!==0  ? e.data.idMunicipio : '');
    setStatusEmployee(e.data.status!==1 ? e.data.status : 0);

    setObjRol(listRoles.find(v=>{
      return v.id===e.data.idRol;
    }));


    setObjCountry(listCountries.find(v=>{
      return v.id===e.data.idCountry;
    }));


    setListDeptoSelected(listDeparments.filter(v=>{
      return v.idCountry===e.data.idCountry;
    }))

    setObjDepartment(listDeparments.find(v=>{
      return v.id===e.data.idDepto;
    }));

    setListMunicipioSelected(listMunicipios.filter(v=>{
      return v.idDepto===e.data.idDepto;
    }))
   
    setObjMunicipio(listMunicipios.find(v=>{
      return v.id===e.data.idMunicipio;
    }));

    setControlModalEditEmployee(!controlModalEditEmployee);

  }


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

                        {/* Popup */}


                        <PopupEditEmployee
                          controlModalEditEmployee={controlModalEditEmployee}
                          setControlModalEditEmployee={setControlModalEditEmployee}
                          dataEmployeePopup={dataEmployeePopup}
                          listRoles={listRoles}
                          listCountries={listCountries} 
                          valueRol={valueRol}
                          setValueRol={setValueRol}   
                          idCountry={idCountry}
                          setIdCountry={setIdCountry} 
                          listDeptoSelected={listDeptoSelected}
                          objDepartment={objDepartment}
                          setObjDepartment={setObjDepartment}
                          setListDeptoSelected={setListDeptoSelected}
                          idDepartment={idDepartment} 
                          setIdDepartment={setIdDepartment}     
                          listMunicipioSelected={listMunicipioSelected}
                          setListMunicipioSelected={setListMunicipioSelected}
                          objCountry={objCountry}
                          setObjCountry={setObjCountry}
                          setIdMunicipio={setIdMunicipio}     
                          idMunicipio={idMunicipio}     
                          objMunicipio={objMunicipio}   
                          setObjMunicipio={setObjMunicipio}     
                          setObjRol={setObjRol} 
                          objRol={objRol}     
                          setStatusEmployee={setStatusEmployee}
                          statusEmployee={statusEmployee}
                          listStatus={listStatus}
                          dataEmployee={dataEmployee}
                          setDataEmployee={setDataEmployee}

                        />


                        <div className="btn-showcase ">
                          <Button className="btn-pill" color="primary" onClick={createEmployee}><i className="icofont icofont-ui-add"></i>{tab + tab}{t('create')}</Button>
                        </div>

                        <DataGrid
                          dataSource={dataEmployee}
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
                          <Column dataField="status" caption={"Estado del empleado"} >
                            <Lookup dataSource={listStatus} valueExpr="id" displayExpr="name" />
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
