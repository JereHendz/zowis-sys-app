import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { Container, Row, Col, Card, CardHeader, Table, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import 'devextreme/dist/css/dx.material.teal.light.css';
import PopupProvider from "./popupProvider";
import DataGrid, { Column, Editing, Popup, Paging, Lookup, Form, SearchPanel, Scrolling, Pager, Export, HeaderFilter, RequiredRule } from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { useTranslation } from 'react-i18next';

const ProvidersList = () => {
  // To traslate the words
  const { t } = useTranslation();

  // Spaces
  const tab = '\u00A0';

  // To get the information of the sub categories
  const [dataProvider, setDataProvider] = useState([]);

  // To get the information of the categories
  const [listProviders, setListProviders] = useState([]);

  // To get the list of status
  const [listStatus, setListStatus] = useState([]);

  // To determinate if the event is create or edit:  edit:true and create:false
  const [isEdit, setIsEdit] = useState(false);

  const [controlModal, setControlModal] = useState(false);

    // To get the status of Provider
    const [statusProvider, setStatusProvider] = useState('');

  // Use effect is launch one time when the page load
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/providers`)
      .then((response) => {
        setListProviders(response.data.providers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get the list of status only load once time
  useEffect(() => {
    // We pass like parameter 1 because 1 has the general status
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/processstate/${1}`)
      .then((response) => {
        setListStatus(response.data.listStatus);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  const cellRenderAction = (data) => {
    return <div align="center"><i style={{ cursor: 'pointer' }} className="icofont icofont-ui-edit" onClick={() => editProvider(data)} /></div>;
  }

  const createProvider = (e) => {
    setDataProvider(
      {
        commercialName: "",
        giro: "",
        document: "",
        address: "",
        email: "",
        phoneNumber: "",
        status: "",
      }
    );
    setIsEdit(false);
    setControlModal(!controlModal);
  };

  const editProvider = (e) => {
    setIsEdit(true);
    setDataProvider(e.data);
    setControlModal(!controlModal);
    setStatusProvider(e.data.status);
  }

  return (
    <Fragment>
      <Breadcrumb parent="SubCategories" title={t("titleListSubcategories")} />
      <Container fluid={true}>
        <Row className="justify-content-md-center">
          <Col sm="12">
            <Card>
              <CardBody>
                <Row >
                  <Col sm="12" lg="12" xl="12">
                    <div className="table-responsive">
                      <div id="data-grid-demo" className="table-primary">

                        {/* Popup */}
                        <PopupProvider
                          controlModal={controlModal} setControlModal={setControlModal}
                          dataProvider={dataProvider}
                          isEdit={isEdit}
                          listStatus={listStatus}
                          setListProviders={setListProviders}
                          statusProvider={statusProvider} setStatusProvider={setStatusProvider}
                        />

                        <div className="btn-showcase ">
                          <Button className="btn-pill" color="primary" onClick={createProvider}><i className="icofont icofont-ui-add"></i>{tab + tab}{t('create')}</Button>
                        </div>

                        <DataGrid
                          dataSource={listProviders}
                          keyExpr="id"
                          showBorders={true}
                          rowAlternationEnabled={true}
                          columnAutoWidth={true}
                          t={t}
                        >
                          <HeaderFilter visible={true} allowSearch={true} />
                          <Export enabled={true} />
                          <SearchPanel visible={true} highlightCaseSensitive={true} width={350} />
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
                          <Column dataField="comercialName" caption={t('provider')} >
                            <RequiredRule />
                          </Column>
                          <Column dataField="document" caption={t('document')} >
                            <RequiredRule />
                          </Column>
                          <Column dataField="email" caption={t('email')} >
                            <RequiredRule />
                          </Column>
                          <Column dataField="phoneNumber" caption={t('phoneNumber')} >
                            <RequiredRule />
                          </Column>
                          <Column dataField="giro" caption={t('giro')} >
                            <RequiredRule />
                          </Column>
                          <Column dataField="address" caption={t('address')} >
                            <RequiredRule />
                          </Column>
                          <Column dataField="status" caption={t("selectStatus")} >
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

export default ProvidersList;
