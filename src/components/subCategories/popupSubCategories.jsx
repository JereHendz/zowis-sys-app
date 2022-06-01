import React, { useState, Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { Container, Row, Col, Form, Label, Input, Card, FormGroup, InputGroup, InputGroupText, CardHeader, Table, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from "axios";
import { SelectBox } from 'devextreme-react/select-box';



export default function PopupSubCategory(
    {
        controlOpenModal,
        setControlOpenModal,
        dataSubCategory,
        setDataSubCategory,
        isEditPopup,
        statusSubCategory,
        setStatusSubCategory,
        listStatus,
        setListSubCategories,
        listCategories,
    }
) {

    const [loading, setLoading] = useState(false);

    // Get the information of the logged user
    const infoUserLogin = JSON.parse(localStorage.getItem('infoUserLogin'));

    // Class allow validate
    const { register, reset, handleSubmit, formState: { errors }, control } = useForm();

    const [validateClass, setValidateClass] = useState(false);

    const [error, setError] = useState({});

    // User translation
    const { t } = useTranslation();

    //Modal variables
    const [idCategory, setIdCategory] = useState('');


    const onSubmit: SubmitHandler<FormValues> = data => {
        // If all validations are met we'll call register method
        if (isEditPopup) {
             updateSubCategory(data);
        }else{

            createSubCategory(data);
        }
    }

    useEffect(() => {
        setValidateClass(false);
        reset({
            name: dataSubCategory.name,
            description: dataSubCategory.description,
        });

        setIdCategory(dataSubCategory.idCategory);
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
        const newArraySubCategory = {
            ...dataSubCategory,
            [name]: value,
        };
        // Sincroniza el estado de nuevo
        setDataSubCategory(newArraySubCategory);

    }

    const handleCategory = (newvalue) => {
        if (newvalue.value !== null) {
            // Set the id
            if (newvalue.value !== undefined) {
                setIdCategory(newvalue.value.id);
            }

        } else {
            // Clear the information of Status brand
            setIdCategory('');
        }
    }

    const handleStatusSubCategory = (newvalue) => {
        if (newvalue.value !== null) {
            // Set the id
            if (newvalue.value !== undefined) {
                setStatusSubCategory(newvalue.value.id);
            }

        } else {
            // Clear the information of Status brand
            setStatusSubCategory('');
        }
    }

    const changeStatusModalSubCategory = () => {
        setControlOpenModal(!controlOpenModal)
    };

    // Function that allow save a new record
    const createSubCategory = (data) => {
        if (infoUserLogin.id !== null && infoUserLogin.id !== '' ) {
            //validation empy fields
            if(idCategory !== undefined && idCategory !== ''){
                setLoading(true);

                const infoCreate = {
                    name: data.name,
                    description: dataSubCategory.description,
                    idCategory: idCategory,
                    whoCreated: infoUserLogin.id
                };
                axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/subcategories`, infoCreate)
                .then((response) => {
                    setValidateClass(false);
                    setLoading(false);
                    toast.info(t('successCreated'));

                    // Load the list of brands
                    loadSubCategories();

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

    // Function that allow update the record
    const updateSubCategory = (data) => {
        if (infoUserLogin.id !== null && infoUserLogin.id !== '' && dataSubCategory.id !== undefined) {
            //validation empy fields
            if(statusSubCategory !== undefined && statusSubCategory !== '' && idCategory !== undefined && idCategory !== ''){
                setLoading(true);

                const infoUpdate = {
                    name: data.name,
                    description: dataSubCategory.description,
                    idCategory: idCategory,
                    status: statusSubCategory,
                    whodidit: infoUserLogin.id
                };
                axios.put(`${process.env.REACT_APP_DOMAIN_SERVER}api/subcategories/${dataSubCategory.id}`, infoUpdate)
                .then((response) => {
                    setValidateClass(false);
                    setLoading(false);

                    toast.info(t('successUpdated'));
                    loadSubCategories();

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
    function loadSubCategories() {
        axios
            .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/subcategories`)
            .then((response) => {
                setListSubCategories(response.data.sub_categories);
                setControlOpenModal(!controlOpenModal);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <Fragment>
            <Modal
                size="lg" isOpen={controlOpenModal} centered>
                <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>

                    <ModalHeader toggle={changeStatusModalSubCategory}>
                        {isEditPopup ? t("editInfo") : t("createInfo")}
                    </ModalHeader>
                    <ModalBody>
                        {isEditPopup ? (
                            <Row>
                                <Col md="4 mb-2">
                                    <Label>{t("category")}</Label>
                                    <SelectBox
                                        dataSource={listCategories}
                                        displayExpr="name"
                                        value={listCategories.find(v => v.id === idCategory)}
                                        searchEnabled={true}
                                        className={'form-control dxSelectBorder'}
                                        placeholder={t('placeholderSelectCategory')}
                                        showClearButton={true}
                                        name="selectCategory"
                                        onValueChanged={handleCategory}
                                    />
                                    <input type="hidden" />
                                    <span>{((idCategory === '' || idCategory === undefined) && validateClass) && t("errorRequired")}</span>
                                </Col>
                                <Col md="4 mb-2">
                                    <Label>{t("subcategory")}</Label>
                                    <input className="form-control btn-pill " name="name" type="text" defaultValue={dataSubCategory.name} placeholder={t("placeHolderGeneralName")} {...register('name', { required: true })} />
                                    <span>{errors.name && t("errorRequired")}</span>
                                </Col>
                                <Col md="4 mb-2">
                                    <Label>{t("selectStatus")}</Label>
                                    <SelectBox
                                        dataSource={listStatus}
                                        displayExpr="name"
                                        value={listStatus.find(v => v.id === statusSubCategory)}
                                        searchEnabled={true}
                                        className={'form-control dxSelectBorder'}
                                        placeholder={t('selectStatus')}
                                        showClearButton={true}
                                        name="selectStatus"
                                        onValueChanged={handleStatusSubCategory}
                                    />
                                    <input type="hidden" />
                                    <span>{((statusSubCategory === '' || statusSubCategory === undefined) && validateClass) && t("errorRequired")}</span>
                                </Col>
                            </Row>
                        ) : (
                            // To create form
                            <Row>
                                <Col md="6 mb-2">
                                    <Label>{t("category")}</Label>
                                    <SelectBox
                                        dataSource={listCategories}
                                        displayExpr="name"
                                        value={listCategories.find(v => v.id === idCategory)}
                                        searchEnabled={true}
                                        className={'form-control dxSelectBorder'}
                                        placeholder={t('placeholderSelectCategory')}
                                        showClearButton={true}
                                        name="selectCategory"
                                        onValueChanged={handleCategory}
                                    />
                                    <input type="hidden" />
                                    <span>{((idCategory === '' || idCategory === undefined) && validateClass) && t("errorRequired")}</span>
                                    <div className="valid-feedback">{"Looks good!"}</div>
                                </Col>
                                <Col md="6 mb-1">
                                    <Label>{t("subcategory")}</Label>
                                    <input className="form-control btn-pill " name="name" type="text" defaultValue={dataSubCategory.name} placeholder={t("placeHolderGeneralName")} {...register('name', { required: true })} />
                                    <span>{errors.name && t("errorRequired")}</span>
                                </Col>

                            </Row>
                        )}

                        <Row>
                            <Col md="12 mb-2">
                                <Label>{t("description")}</Label>
                                <Input type="textarea" className="form-control btn-pill" rows="2" name="description" placeholder={t("descriptionBrand")} defaultValue={dataSubCategory.description} onChange={handleChange} />
                            </Col>
                        </Row>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={changeStatusModalSubCategory} >{t('close')}</Button>
                        <Button color="primary" type="submit" disabled={loading ? loading : loading} onClick={() => setValidateClass(true)} >{ loading ? t("processing") : isEditPopup ? t('update') : t('create') }</Button>
                    </ModalFooter>
                </Form>

            </Modal>
        </Fragment>
    );
}
