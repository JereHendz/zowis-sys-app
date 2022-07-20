import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { Container, Row, Col, Card, CardHeader, Table, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import 'devextreme/dist/css/dx.material.teal.light.css';
import PopupDeatilSale from "./popupDetailSale";
import DataGrid, { Column, Editing, Popup, Paging, Lookup, Form, SearchPanel, Scrolling, Pager, Export, HeaderFilter, RequiredRule } from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { classes } from '../../data/layouts';

const SalesList = () => {
    // To traslate the words
    const { t } = useTranslation();

    //To navigate to other pages
    const navigate = useNavigate();

    //defaults values for layout
    const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
    const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();

    // Spaces
    const tab = '\u00A0';

    // To get the information of the sub categories
    const [dataSale, setDataSale] = useState([]);

    // To get the information of the categories
    const [listSales, setListSales] = useState([]);

    // To get the information of the categories
    const [listClients, setListClients] = useState([]);

    // To get the list of status
    const [listStatus, setListStatus] = useState([]);

    //modal data
    const [controlModal, setControlModal] = useState(false);
    const [saleData, setSaleData] = useState([]);


    // Use effect is launch one time when the page load
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/sales`)
            .then((response) => {
                setListSales(response.data.sales);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    // Get the list of status only load once time
    useEffect(() => {
        // We pass like parameter 2 because 2 has the status for sales
        axios.get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/processstate/${2}`)
            .then((response) => {
                setListStatus(response.data.listStatus);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    // Get the list of clients
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/clients`)
            .then((response) => {
                setListClients(response.data.clients);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    const cellRenderAction = (data) => {
        return <div align="center"><i style={{ cursor: 'pointer' }} className="icofont icofont-ui-edit" onClick={() => editSale(data)} /></div>;
    }

    const createSale = (e) => {
        navigate(`${process.env.PUBLIC_URL}/app/sales/createSale/${layout}`);
    };

    const editSale = (e) => {
        setSaleData(e.data);
        setControlModal(!controlModal);
    };

    const getEmploye = (item) => {
        if (!item) {
          return '';
        }
    
        return `${item.firstName} ${item.lastName}`;
    }

    return (
        <Fragment>
            <Breadcrumb parent={t('sales')} title={t("titleSales")} />
            <Container fluid={true}>
                <Row className="justify-content-md-center">
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <Row >
                                    {/* Popup */}
                                    <PopupDeatilSale
                                    controlModal={controlModal} setControlModal={setControlModal}
                                    saleData={saleData} setSaleData={setSaleData}
                                    />
                                    <Col sm="12" lg="12" xl="12">
                                        <div className="table-responsive">
                                            <div id="data-grid-demo" className="table-primary">
                                                <div className="btn-showcase ">
                                                    <Button className="btn-pill" color="primary" onClick={createSale}><i className="icofont icofont-ui-add"></i>{tab + tab}{t('create')}</Button>
                                                </div>

                                                <DataGrid
                                                    dataSource={listSales}
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
                                                    <Column dataField="id" caption={t('orderNumber')} >
                                                        <RequiredRule />
                                                    </Column>
                                                    <Column dataField="idClient" caption={t("client")} >
                                                        <Lookup dataSource={listClients} valueExpr="id" displayExpr={getEmploye} />
                                                    </Column>
                                                    <Column dataField="subTotal" caption={t('subTotal')} >
                                                        <RequiredRule />
                                                    </Column>
                                                    <Column dataField="discount" caption={t('discount')} >
                                                        <RequiredRule />
                                                    </Column>
                                                    <Column dataField="total" caption={t('total')} >
                                                        <RequiredRule />
                                                    </Column>
                                                    <Column dataField="paymentType" caption={t('paymentType')} >
                                                        <RequiredRule />
                                                    </Column>
                                                    <Column dataField="createDate" caption={t('date')} >
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

export default SalesList;
