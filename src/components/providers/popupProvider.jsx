import React, { useState, Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { Container, Row, Col, Form, Label, Input, Card, FormGroup, InputGroup, InputGroupText, CardHeader, Table, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from "axios";
import { SelectBox } from 'devextreme-react/select-box';

export default function PopupProvider(
    {
        controlModal, setControlModal,
        dataProvider,
        isEdit,
        listStatus,
        setListProviders,
        statusProvider,
        setStatusProvider,
    }
) {

    const [loading, setLoading] = useState(false);

    // Get the information of the logged user
    const infoUserLogin = JSON.parse(localStorage.getItem('infoUserLogin'));

    // Class allow validate
    const { register, reset, handleSubmit, formState: { errors }, control } = useForm();

    const [validateClass, setValidateClass] = useState(false);

    //for errors setup
    const [error, setError] = useState({});

    // User translation
    const { t } = useTranslation();

    const onSubmit: SubmitHandler<FormValues> = data => {
        // If all validations are met we'll call register method
        if (isEdit) {
            updateProvider(data);
        }else{

            createProvider(data);
        }
    }

    useEffect(() => {
        setValidateClass(false);
        reset({
            commercialName: dataProvider.commercialName,
            giro: dataProvider.giro,
            document: dataProvider.document,
            address: dataProvider.address,
            email: dataProvider.email,
            phoneNumber: dataProvider.phoneNumber,
        });
    }, [controlModal])

    const handleStatusProvider = (newvalue) => {
        if (newvalue.value !== null && newvalue.value !== undefined) {
            // Set the id
            setStatusProvider(newvalue.value.id);
        } else {
            // Clear the information of Status brand
            setStatusProvider('');
        }
    }

    const changeStatusModalProvider = () => {
        setControlModal(!controlModal)
    };

    // Function that allow save a new record
    const createProvider = (data) => {
        if (infoUserLogin.id !== null && infoUserLogin.id !== '' ) {
            //validation empy fields
            setLoading(true);

            const infoCreate = {
                comercialName: data.comercialName,
                giro         : data.giro,
                document     : data.document,
                address      : data.address,
                email        : data.email,
                phoneNumber  : data.phoneNumber,
                whoCreated   : infoUserLogin.id
            };
            axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/providers`, infoCreate)
            .then((response) => {
                setValidateClass(false);
                setLoading(false);
                toast.info(t('successCreated'));

                // Load the list of brands
                loadProviders();

            })
            .catch((errors) => {
                setError(errors.response.data.messages)
                console.log(errors);
            });
        } else {
            setTimeout(() => {
                toast.error(t('errorLogin'));
            }, 200);
        }
    };

    // Function that allow update the record
    const updateProvider = (data) => {
        if (infoUserLogin.id !== null && infoUserLogin.id !== '' && dataProvider.id !== undefined) {
            //validation empy fields
            if(statusProvider !== undefined && statusProvider !== ''){
                setLoading(true);

                const infoUpdate = {
                    comercialName: data.comercialName,
                    giro         : data.giro,
                    document     : data.document,
                    address      : data.address,
                    email        : data.email,
                    phoneNumber  : data.phoneNumber,
                    status       : statusProvider,
                    whodidit     : infoUserLogin.id
                };
                axios.put(`${process.env.REACT_APP_DOMAIN_SERVER}api/providers/${dataProvider.id}`, infoUpdate)
                .then((response) => {
                    setValidateClass(false);
                    setLoading(false);

                    toast.info(t('successUpdated'));
                    loadProviders();

                })
                .catch((errors) => {
                    setError(errors.response.data.messages)
                    console.log(errors);
                });
            }
        } else {
            setTimeout(() => {
                toast.error(t('errorLogin'));
            }, 200);
        }

    };
     

    //function to reload the subcategories
    function loadProviders() {
        axios
            .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/providers`)
            .then((response) => {
                setListProviders(response.data.providers);
                setControlModal(!controlModal);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <Fragment>
            <Modal
                size="lg" isOpen={controlModal} centered>
                <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>

                    <ModalHeader toggle={changeStatusModalProvider}>
                        {isEdit ? t("editInfo") : t("createInfo")}
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md="6 mb-2">
                                <Label>{t("provider")}</Label>
                                <input className="form-control btn-pill" type="text" defaultValue={dataProvider.comercialName} placeholder={t("placeHolderProvider")} {...register('comercialName', { required: true })} />
                                <span>{errors.comercialName && t("errorRequired")}</span>
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("giro")}</Label>
                                <input className="form-control btn-pill" type="text" defaultValue={dataProvider.giro} placeholder={t("placeHolderGiro")} {...register('giro', { required: true })} />
                                <span>{errors.giro && t("errorRequired")}</span>
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("document")}</Label>
                                <input className="form-control btn-pill" type="text" defaultValue={dataProvider.documnet} placeholder={t("placeHolderDocument")} {...register('document', { required: true })} />
                                <span>{errors.document && t("errorRequired")}</span>
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("email")}</Label>
                                <input className="form-control btn-pill" type="text" placeholder={t("placeholderEmail")} defaultValue={dataProvider.email} {...register('email', {
                                        required: true,
                                        pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
                                    })} />
                                <span>{errors.email && t("errorEmail")}</span>
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("phoneNumber")}</Label>
                                <input className="form-control btn-pill" type="text" defaultValue={dataProvider.phoneNumber} placeholder={t("placeHolderPhoneNumber")} {...register('phoneNumber', { required: true })} />
                                <span>{errors.phoneNumber && t("errorRequired")}</span>
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("address")}</Label>
                                <input className="form-control btn-pill" type="text" defaultValue={dataProvider.address} placeholder={t("placeHolderAddress")} {...register('address', { required: true })} />
                                <span>{errors.address && t("errorRequired")}</span>
                            </Col>
                            {   isEdit ?
                                <Col md="6 mb-2">
                                        <Label>{t("selectStatus")}</Label>
                                        <SelectBox
                                            dataSource={listStatus}
                                            displayExpr="name"
                                            value={listStatus.find(v => v.id === statusProvider)}
                                            searchEnabled={true}
                                            className={'form-control dxSelectBorder'}
                                            placeholder={t('selectStatus')}
                                            showClearButton={true}
                                            name="selectStatus"
                                            onValueChanged={handleStatusProvider}
                                        />
                                        <input type="hidden" />
                                        <span>{((statusProvider === '' || statusProvider === undefined) && validateClass) && t("errorRequired")}</span>
                                    </Col>
                                :   '' 
                            }
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={changeStatusModalProvider} >{t('close')}</Button>
                        <Button color="primary" type="submit" disabled={loading ? loading : loading} onClick={() => setValidateClass(true)} >{ loading ? t("processing") : isEdit ? t('update') : t('create') }</Button>
                    </ModalFooter>
                </Form>

            </Modal>
        </Fragment>
    );
}
