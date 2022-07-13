import React, { useState, Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { Container, Row, Col, Form, Label, Input, Card, FormGroup, InputGroup, InputGroupText, CardHeader, Table, CardBody, Media, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from "axios";
import { SelectBox } from 'devextreme-react/select-box';
import Files from 'react-files';
import { data } from 'autoprefixer';




export default function PopupEditProduct(
    {
        controlOpenModalEdit,
        setControlOpenModalEdit,
        dataProducts,
        setDataProducts,
        setListProducts,
        dataBrand,
        dataProvider,
        dataCategory,
        idCategory,
        dataSubCategory,
        idSubCategory,
        setIdCategory,
        setDataSubCategory,
        setIdSubCategory,
        description,
        setDescription,
        listStatus,
        statusProduct,
        setStatusProduct
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
        updateProduct(data);

    }


    // Function that allow update the record
    const updateProduct = (data) => {

        if (infoUserLogin.id !== null && infoUserLogin.id !== '') {
            setLoading(true);

            // Make sure that the category is not empty
            if (idCategory === '' || idSubCategory === "") {
                setLoading(false);
                return false;
            }

            // Make sure that the status  is not empty
            if (statusProduct === '' || statusProduct === undefined || statusProduct === null) {
                setLoading(false);
                return false;
            }

            const informationProduct = {
                productCode: data.productCode,
                barcode: data.barcode,
                productName: data.productName,
                description: description,
                stockProduct: data.stockProduct,
                stockLimit: data.stockLimit,
                percentageProfit: data.percentageProfit,
                productDiscount: data.productDiscount,
                idSubCategory: idSubCategory,
                whodidit: infoUserLogin.id,
                unitSalePriceAvg: data.unitSalePriceAvg,
                status:statusProduct
            };

            let idProduct = dataProducts.id;

            axios.put(`${process.env.REACT_APP_DOMAIN_SERVER}api/products/${idProduct}`, informationProduct)
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
                setControlOpenModalEdit(!controlOpenModalEdit);

            })
            .catch((error) => {
                console.log(error);
            });
    }


    const changeStatusModal = () => {
        setControlOpenModalEdit(!controlOpenModalEdit)
    };


    const handleChangeCategory = (newvalue) => {
        if (newvalue.value !== null) {
            // Set the id
            if (newvalue.value !== undefined) {
                setIdCategory(newvalue.value.id);

                // Clean object in sub-category
                setIdSubCategory('');
                setDataSubCategory([]);

                // Get the sub categories by id category
                axios
                    .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/subCateByIdCate/${newvalue.value.id}`)
                    .then((payload) => {
                        // If everything is good, load the array of category
                        setDataSubCategory(payload.data.sub_category);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

        } else {
            // Clear the information 
            setIdCategory('');
            // Clean object in sub-category
            setIdSubCategory('');
            setDataSubCategory([]);

        }
    }


    const handleChangeSubCategory = (newvalue) => {

        if (newvalue.value !== null) {

            // Set the id
            if (newvalue.value !== undefined) {
                setIdSubCategory(newvalue.value.id);
            }

        } else {
            // Clear the information 
            setIdSubCategory('');

        }
    }

    const handleStatusProduct = (newvalue) => {
        if (newvalue.value !== null && newvalue.value !== undefined) {
            // Set the id
            setStatusProduct(newvalue.value.id);
        } else {
            // Clear the information of Status product
            setStatusProduct('');
        }
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

    }, [controlOpenModalEdit])

    return (
        <Fragment>
            <Modal
                size="lg" isOpen={controlOpenModalEdit} centered>
                <Form id='formEditImage' className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>

                    <ModalHeader toggle={changeStatusModal}>
                        {t("titleEditProduct")}
                    </ModalHeader>
                    <ModalBody>

                        <Row style={{ marginTop: '15px' }} >
                            <Col md="6 mb-2">
                                <Label>{t("productCode")}</Label>
                                <input className="form-control btn-pill" name="productCode" type="number" placeholder={t('productCode')} {...register('productCode', { required: true })} defaultValue={dataProducts.productCode} />
                                <span>{errors.productCode && t("errorProductCode")}</span>
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("barcode")}</Label>
                                <input className="form-control btn-pill" name="barcode" type="text" placeholder={t('barcode')} {...register('barcode', { required: true })} defaultValue={dataProducts.barcode} />
                                <span>{errors.barcode && t("errorBarcode")}</span>
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("productName")}</Label>
                                <input className="form-control btn-pill" name="productName" type="text" placeholder={t('productName')} {...register('productName', { required: true })} defaultValue={dataProducts.productName} />
                                <span>{errors.productName && t("errorProductName")}</span>
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("stock")}</Label>
                                <input className="form-control btn-pill" name="stockProduct" type="number" placeholder={t('stockProduct')} {...register('stockProduct', { required: true })} defaultValue={dataProducts.stockProduct} />
                                <span>{errors.stockProduct && t("errorAmount")}</span>
                            </Col>
                            <Col md="6 mb-3">
                                <Label>{t("stockLimit")}</Label>
                                <input className="form-control btn-pill" name="stockLimit" type="number" placeholder={t('stockLimit')} {...register('stockLimit', { required: true })} defaultValue={dataProducts.stockLimit} />
                                <span>{errors.stockLimit && t("errorStockLimit")}</span>
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("percentageProfit")}</Label>
                                <input className="form-control btn-pill" name="percentageProfit" type="number" step="0.001" min="0" max="999999999.999" placeholder={t('percentageProfit')} {...register('percentageProfit', { required: true })} defaultValue={dataProducts.percentageProfit} />
                                <span>{errors.percentageProfit && t("errorPercentageProfit")}</span>
                            </Col>

                            <Col md="6 mb-2">
                                <Label>{t("productDiscount")}</Label>
                                <input className="form-control btn-pill" name="productDiscount" type="number" step="0.001" min="0" max="999999999.999" placeholder={t('productDiscount')} {...register('productDiscount', { required: true })} defaultValue={dataProducts.productDiscount} />
                                <span>{errors.productDiscount && t("errorProductDiscount")}</span>
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("saleUnitPrice")}</Label>
                                <input className="form-control btn-pill" name="unitSalePriceAvg" type="number" step="0.001" min="0" max="999999999.999" placeholder={t('unitSalePriceAvg')} {...register('unitSalePriceAvg', { required: true })} defaultValue={dataProducts.unitSalePriceAvg} />
                                <span>{errors.unitSalePriceAvg && t("errorUnitSalePriceAvg")}</span>
                            </Col>

                            <Col md="6 mb-2">
                                <Label>{t("category")}</Label>
                                <SelectBox
                                    dataSource={dataCategory}
                                    value={dataCategory.length > 0 ? dataCategory.find(v => v.id === idCategory) : ''}
                                    displayExpr="name"
                                    searchEnabled={true}
                                    className={'form-control dxSelectBorder'}
                                    placeholder={t('category')}
                                    showClearButton={true}
                                    name="selectCountry"
                                    onValueChanged={handleChangeCategory}
                                />
                                <input type="hidden" />
                                <span>{((idCategory === '' || idCategory === undefined) && validateClass) && t("errorCategory")}</span>
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("subcategory")}</Label>
                                <SelectBox
                                    dataSource={dataSubCategory}
                                    displayExpr="name"
                                    value={dataSubCategory.length > 0 ? dataSubCategory.find(v => v.id === idSubCategory) : ''}
                                    searchEnabled={true}
                                    className={'form-control dxSelectBorder'}
                                    placeholder={t('category')}
                                    showClearButton={true}
                                    name="selectSubCategory"
                                    onValueChanged={handleChangeSubCategory}
                                />
                                <input type="hidden" />
                                <span>{((idSubCategory === '' || idSubCategory === undefined) && validateClass) && t("errorSubCategory")}</span>
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("selectStatus")}</Label>
                                <SelectBox
                                    dataSource={listStatus}
                                    displayExpr="name"
                                    value={listStatus.find(v => v.id === statusProduct)}
                                    searchEnabled={true}
                                    className={'form-control dxSelectBorder'}
                                    placeholder={t('selectStatus')}
                                    showClearButton={true}
                                    name="selectStatus"
                                    onValueChanged={handleStatusProduct}
                                />
                                <input type="hidden" />
                                <span>{((statusProduct === '' || statusProduct === undefined) && validateClass) && t("errorRequired")}</span>
                            </Col>

                            <Col md="12 mb-1">
                                <Label>{t("description")}</Label>
                                <Input type="textarea" className="form-control btn-pill" rows="2" name="description" placeholder={t("description")} onChange={(ev) => { setDescription(ev.target.value) }} defaultValue={dataProducts.description} />
                            </Col>

                        </Row>


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
