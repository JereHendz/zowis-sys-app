import React, { useState, Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { Container, Row, Col, Form, Label, Input, Card, FormGroup, InputGroup, InputGroupText, CardHeader, Table, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from "axios";
import { SelectBox } from 'devextreme-react/select-box';



export default function PopupBrand(
    {
        controlOpenModal,
        setControlOpenModal,
        dataBrands,
        isEditPopup,
        statusBrand,
        setStatusBrand,
        listStatus,
        setDataBrands,
        setListBrands
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

    // Define error array
    const [error, setError] = useState(
        {
            'firstName': '',
            'lastName': '',
            'dui': '',
            'phoneNumber': '',
            'email': '',
            'idRol': '',
            'idCountry': '',
            'idDepartment': '',
            'idMunicipio': '',
            'address': ''
        }
    );


    const onSubmit: SubmitHandler<FormValues> = data => {
        // If all validations are met we'll call register method
        if (isEditPopup) {
            updateBrand(data);
        } else {

            createBrand(data);
        }

    }


    useEffect(() => {
        setValidateClass(false)
        reset({
            name: dataBrands.name,
            description: dataBrands.description,
        });
    }, [controlOpenModal])


    function handleChange(evt) {

        /*
          evt.target es el elemento que ejecuto el evento
          name identifica el input y value describe el valor actual
        */
        const { target } = evt;
        const { name, value } = target;
        /*
          Este snippet:
          1. Clona el estado actual
          2. Reemplaza solo el valor del
             input que ejecutó el evento
        */
        const newArrayBrand = {
            ...dataBrands,
            [name]: value,
        };
        // Sincroniza el estado de nuevo
        setDataBrands(newArrayBrand);

    }



    const handleStatusBrand = (newvalue) => {
        if (newvalue.value !== null) {
            // Set the id
            if (newvalue.value !== undefined) {
                setStatusBrand(newvalue.value.id);
            }

        } else {
            // Clear the information of Status brand
            setStatusBrand('');
        }
    }

    // Function that allow update the record
    const updateBrand = (data) => {



        if (infoUserLogin.id !== null && infoUserLogin.id !== '') {
            if (dataBrands.id !== undefined && statusBrand !== undefined && statusBrand !== '') {
                setLoading(true);



                const infoUpdate = {
                    name: data.name,
                    description: dataBrands.description,
                    status: statusBrand,
                    whodidit: infoUserLogin.id
                };
                axios.put(`${process.env.REACT_APP_DOMAIN_SERVER}api/brands/${dataBrands.id}`, infoUpdate)
                    .then((response) => {
                        setValidateClass(false);
                        setLoading(false);

                        toast.info(t('successUpdated'));
                        loadBrands();

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

    function loadBrands() {
        axios
            .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/brands`)
            .then((response) => {
                setListBrands(response.data.listBrands);
                setControlOpenModal(!controlOpenModal);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const changeStatusModalBrand = () => {
        setControlOpenModal(!controlOpenModal)
    };


    // Function that allow save a new record
    const createBrand = (data) => {



        if (infoUserLogin.id !== null && infoUserLogin.id !== '') {
            setLoading(true);

            const infoCreate = {
                name: data.name,
                description: dataBrands.description,
                whoCreated: infoUserLogin.id
            };
            axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/brands`, infoCreate)
                .then((response) => {
                    setValidateClass(false);
                    setLoading(false);
                    toast.info(t('successCreated'));

                    // Load the list of brands
                    loadBrands();

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


    return (
        <Fragment>
            <Modal
                size="lg" isOpen={controlOpenModal} centered>
                <Form id='formEditBrand' className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>

                    <ModalHeader toggle={changeStatusModalBrand}>
                        {isEditPopup ? t("editInfo") : t("createInfo")}
                    </ModalHeader>
                    <ModalBody>
                        {isEditPopup ? (
                            <Row>

                                <Col md="6 mb-2">
                                    <Label>{t("nameBrand")}</Label>
                                    <input className="form-control btn-pill " name="name" type="text" defaultValue={dataBrands.name} placeholder={t("placeHolderGeneralName")} {...register('name', { required: true })} />
                                    <span>{errors.name && t("errorBrandName")}</span>
                                    {/* <div className="valid-feedback">{"Looks good!"}</div> */}
                                </Col>


                                <Col md="6 mb-2">
                                    <Label>{t("selectStatus")}</Label>
                                    <SelectBox
                                        dataSource={listStatus}
                                        displayExpr="name"
                                        value={listStatus.find(v => v.id === statusBrand)}
                                        searchEnabled={true}
                                        className={'form-control dxSelectBorder'}
                                        placeholder={t('selectStatus')}
                                        showClearButton={true}
                                        name="selectStatus"
                                        onValueChanged={handleStatusBrand}
                                    />
                                    <input type="hidden" />
                                    <span>{((statusBrand === '' || statusBrand === undefined) && validateClass) && t("errorStatus")}</span>
                                    <div className="valid-feedback">{"Looks good!"}</div>
                                </Col>

                            </Row>
                        ) : (
                            // To create form
                            <Row>

                                <Col md="12 mb-1">
                                    <Label>{t("nameBrand")}</Label>
                                    <input className="form-control btn-pill " name="name" type="text" defaultValue={dataBrands.name} placeholder={t("placeHolderGeneralName")} {...register('name', { required: true })} />
                                    <span>{errors.name && t("errorBrandName")}</span>
                                </Col>

                            </Row>
                        )}

                        <Row>
                            <Col md="12 mb-2">
                                <Label>{t("descriptionBrand")}</Label>
                                <Input type="textarea" className="form-control btn-pill" rows="2" name="description" placeholder={t("descriptionBrand")} defaultValue={dataBrands.description} onChange={handleChange} />
                            </Col>
                        </Row>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={changeStatusModalBrand} >{t('close')}</Button>
                        <Button color="primary" type="submit" onClick={() => setValidateClass(true)} >{isEditPopup ? t('update') : t('create')}</Button>
                    </ModalFooter>
                </Form>

            </Modal>
        </Fragment>
    );
}
