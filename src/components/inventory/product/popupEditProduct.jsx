import React, { useState, Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { Container, Row, Col, Form, Label, Input, Card, FormGroup, InputGroup, InputGroupText, CardHeader, Table, CardBody, Media, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from "axios";
import { SelectBox } from 'devextreme-react/select-box';
import Files from 'react-files';




export default function PopupEditProduct(
    {
        controlOpenModal,
        setControlOpenModal,
        dataProducts,
        setDataProducts,
        setListProducts,
        dataBrand,
        dataProvider,
    }
) {

    const [loading, setLoading] = useState(false);

    // Get the information of the logged user
    const infoUserLogin = JSON.parse(localStorage.getItem('infoUserLogin'));

    // Class allow validate
    const { register, reset, handleSubmit, formState: { errors }, control } = useForm();

    const [validateClass, setValidateClass] = useState(false);

    // User translation
    const { t } = useTranslation();

    // To get the list of providers
    const [idProvider, setIdProvider] = useState("");

    // To get the list of brands
    const [idBrand, setIdBrand] = useState("");

    const [unitSalePrice, setUnitSalePrice] = useState('');

    // Define error array
    const [error, setError] = useState([]);




    const onSubmit: SubmitHandler<FormValues> = data => {
        // If all validations are met we'll call register method
        addStockByProduct(data);

    }


    // Function that allow update the record
    const addStockByProduct = (data) => {

        if (infoUserLogin.id !== null && infoUserLogin.id !== '') {
            setLoading(true);

            // Make sure that the provider and brand are not empty
            if (idProvider === '' || idProvider === undefined || idBrand === '' || idBrand === undefined || unitSalePrice === "") {
                setLoading(false);
                return false;
            }

            let infoCreate = {
                idProvider: idProvider,
                idBrand: idBrand,
                quantity: data.amount,
                unitPurchasePrice: data.unitPrice,
                unitSalePrice: unitSalePrice,
                whoCreated: infoUserLogin.id,
                idProduct: dataProducts.id,
                idBranchOffice: 1,
                idWineries: 1,
                idFirstLevelLocation: 1,
                idSecondLevelLocation: 1,
                idThirdLevelLocation: 1
            };
            

            axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/addStockProduct`, infoCreate)
                .then((response) => {
                    setValidateClass(false);
                    setLoading(false);

                    toast.info(t('successUpdated'));
                    loadProducts();

                })
                .catch((errors) => {
                    setLoading(false);

                    setError(errors.response.data.messages)
                    console.log(errors);
                });

        } else {
            setTimeout(() => {
                toast.error(t('errorLogin'));
            }, 200);
        }

    };

    function loadProducts() {
        axios
            .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/products`)
            .then((response) => {
                setListProducts(response.data.listProducts);
                setControlOpenModal(!controlOpenModal);

            })
            .catch((error) => {
                console.log(error);
            });
    }


    const changeStatusModal = () => {
        setControlOpenModal(!controlOpenModal)
    };

    const handleChangeProvider = (newvalue) => {

        if (newvalue.value !== null) {

            // Set the id
            if (newvalue.value !== undefined) {
                setIdProvider(newvalue.value.id);
            }

        } else {
            // Clear the information 
            setIdProvider('');

        }
    }

    const handleChangeBrand = (newvalue) => {

        if (newvalue.value !== null) {

            // Set the id
            if (newvalue.value !== undefined) {
                setIdBrand(newvalue.value.id);
            }

        } else {
            // Clear the information 
            setIdBrand('');

        }
    }

    // Handle unit purchase price
    const handleUnitPurchasePrice = (e) => {
        if (e !== "" && e >= 0) {
            let salePrice = parseFloat(e * (dataProducts.percentageProfit / 100)) + parseFloat(e);
            if (salePrice !== undefined && salePrice !== null) {
                salePrice = salePrice.toFixed(2);
                setUnitSalePrice(salePrice);
                console.log(salePrice);
            } else {
                setUnitSalePrice('');
            }
        } else {
            setUnitSalePrice('');
        }
    }

    // Handle unit sale price
    const handleUnitSalePrice = (e) => {
        setUnitSalePrice(e);
    }

    useEffect(() => {
        setValidateClass(false)
        reset({
            amount: "",
            unitPrice: "",
            saleUnitPrice: ""
        });

        setIdProvider("");
        setIdBrand("");
        setUnitSalePrice('');

    }, [controlOpenModal])

    return (
        <Fragment>
            <Modal
                size="lg" isOpen={controlOpenModal} centered>
                <Form id='formEditImage' className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>

                    <ModalHeader toggle={changeStatusModal}>
                        {t("addStockMsg")}
                    </ModalHeader>
                    <ModalBody>

                        <Container fluid={true}>
                            <Row style={{ marginTop: '15px' }} >

                                <Col md="4 mb-3">
                                    <Label>{t("provider")}</Label>
                                    <SelectBox
                                        dataSource={dataProvider}
                                        displayExpr="comercialName"
                                        searchEnabled={true}
                                        className={'form-control dxSelectBorder'}
                                        placeholder={t('provider')}
                                        showClearButton={true}
                                        name="selectProvider"
                                        onValueChanged={handleChangeProvider}
                                    />
                                    <input type="hidden" />
                                    <span>{((idProvider === '' || idProvider === undefined) && validateClass) && t("errorProvider")}</span>
                                </Col>
                                <Col md="4 mb-3">
                                    <Label>{t("nameBrand")}</Label>
                                    <SelectBox
                                        dataSource={dataBrand}
                                        displayExpr="name"
                                        searchEnabled={true}
                                        className={'form-control dxSelectBorder'}
                                        placeholder={t('nameBrand')}
                                        showClearButton={true}
                                        name="selectBrand"
                                        onValueChanged={handleChangeBrand}
                                    />
                                    <input type="hidden" />
                                    <span>{((idBrand === '' || idBrand === undefined) && validateClass) && t("errorSubCategory")}</span>
                                </Col>
                                <Col md="4 mb-3">
                                    <Label>{t("amount")}</Label>
                                    <input className="form-control btn-pill" name="amount" type="number" placeholder={t('amount')} {...register('amount', { required: true })} />
                                    <span>{errors.amount && t("errorAmount")}</span>
                                </Col>
                                <Col md="4 mb-3">
                                    <Label>{t("unitPrice")}</Label>
                                    <input className="form-control btn-pill" name="unitPrice" type="number" step="0.001" min="0" max="999999999.999" placeholder={t('unitPrice')} {...register('unitPrice', { required: true })} onBlur={(e) => handleUnitPurchasePrice(e.target.value)} />
                                    <span>{errors.unitPrice && t("errorUnitPrice")}</span>
                                </Col>
                                <Col md="4 mb-3">
                                    <Label>{t("saleUnitPrice")}</Label>
                                    <input className="form-control btn-pill" key={unitSalePrice} name="saleUnitPrice" type="number" step="0.001" min="0" max="999999999.999" placeholder={t('saleUnitPrice')} defaultValue={unitSalePrice} onBlur={(e) => handleUnitSalePrice(e.target.value)} />
                                    <span>{unitSalePrice === '' && validateClass && t("errorUnitSalePrice")}</span>
                                </Col>
                            </Row>

                        </Container >

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={changeStatusModal} >{t('close')}</Button>
                        <Button color="primary" type="submit" onClick={() => setValidateClass(true)} >{t('update')}</Button>
                    </ModalFooter>
                </Form>
                <div className={loading ? 'loader-wrapper back' : 'loader-wrapper back loderhide'}><div className="loader-index">
                    <span></span></div>
                </div>


            </Modal>
        </Fragment>
    );
}
