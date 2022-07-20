import React, { useState, Fragment, useEffect } from 'react';
import { Container, Row, Col, Label, Input, Card, FormGroup, InputGroup, InputGroupText, CardHeader, Table, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import DataGrid, { Column, Editing, Popup, Paging, Lookup, Form, SearchPanel, Scrolling, Pager, Export, HeaderFilter, RequiredRule } from 'devextreme-react/data-grid';

export default function PopupDetailSale(
    {
        controlModal, setControlModal,
        saleData, setSaleData
    }
) {
    //vars
    const [saleDetail, setDetailSale] = useState([]);
    const [listSeller, setSellerList] = useState([]);
    const symbol = "$";

    // User translation
    const { t } = useTranslation();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN_SERVER}api/showSaleDetail/${saleData.id}`)
        .then((response) => {
            setDetailSale(response.data.saleDetail);
        }).catch((error) => {
            console.log(error);
        });
    }, [controlModal]);


    // Get the list of sellers
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/users`)
        .then((res) => {
            setSellerList(res.data.users);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [controlModal]);

    const changeStatusModalDetail = () => {
        setControlModal(!controlModal)
    };
    
    return (
        <Fragment>
            <Modal size="lg" isOpen={controlModal} centered>
                <ModalHeader className="centered">
                    {t("detailSaleTitle")} #{saleData.id}
                    <br></br>
                    {t('date')}: {saleData.createDate}
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm="12" lg="12" xl="12">
                            <div className="table-responsive">
                                <div id="data-grid-demo" className="table-primary">
                                <Table className="table-bordered">
                                        <thead>
                                            <tr>
                                                <th>{t('product')}</th>
                                                <th>{t('code')}</th>
                                                <th>{t('productName')}</th>
                                                <th>{t('quantity')}</th>
                                                <th>{t('price')}</th>
                                                <th>%{t('discount')}</th>
                                                <th>{t('total')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {saleDetail.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td><img className="img-fluid img-60" src={item.link ? item.link : require("../../assets/images/avtar/3.jpg")} alt="" /></td>
                                                        <td>{item.barcode}</td>
                                                        <td>{item.productName}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{symbol}{parseFloat(item.salePrice).toFixed(2)}</td>
                                                        <td>{item.discount}</td>
                                                        <td>{symbol}{parseFloat(item.total).toFixed(2)}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={changeStatusModalDetail} >{t('close')}</Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
}
