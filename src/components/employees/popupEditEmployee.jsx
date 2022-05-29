import React, { useState, Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { Container, Row, Col, Form, Label, Input, Card, FormGroup, InputGroup, InputGroupText, CardHeader, Table, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from "axios";
import { SelectBox } from 'devextreme-react/select-box';



export default function PopupEditEmployee(
    {
        controlModalEditEmployee,
        setControlModalEditEmployee,
        dataEmployeePopup, listRoles,
        listCountries,
        valueRol,
        setValueRol,
        idCountry,
        setIdCountry,
        listDeptoSelected,
        objDepartment,
        setObjDepartment,
        setListDeptoSelected,
        idDepartment,
        setIdDepartment,
        listMunicipioSelected,
        setListMunicipioSelected,
        objCountry,
        setObjCountry,
        setIdMunicipio,
        idMunicipio,
        objMunicipio,
        setObjMunicipio,
        setObjRol,
        objRol,
        statusEmployee,
        listStatus,
        setStatusEmployee,
        dataEmployee,
        setDataEmployee
    }
) {

    const [arrayEmployee, setArrayEmployee] = useState(dataEmployeePopup);
    const [loading, setLoading] = useState(false);
    // Get the information of the logged user
    const infoUserLogin = JSON.parse(localStorage.getItem('infoUserLogin'));

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
        updateEmployee(data);

    }


    useEffect(() => {
        setValidateClass(false)
        reset({
            firstName:dataEmployeePopup.firstName,
            lastName:dataEmployeePopup.lastName,
            email:dataEmployeePopup.email
        });
      }, [controlModalEditEmployee])
    

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
        const newArrayEmployee = {
            ...arrayEmployee,
            [name]: value,
        };
        // Sincroniza el estado de nuevo
        setArrayEmployee(newArrayEmployee);

    }

    const handleChangeRol = (newvalue) => {
        if (newvalue.value !== null) {
            // Set the id
            setValueRol(newvalue.value.id);
            setObjRol(newvalue.value);

        } else {
            // Clear the information of Job Position
            setValueRol('');

            setObjRol([]);

        }
    }

    const handleChangeCountry = (newValue) => {
        if (newValue.value !== null) {
            // Set the id of country

            if (newValue.value.length === undefined) {
                setIdCountry(newValue.value.id);
                setObjCountry(newValue.value);
                // Set the id department
                setIdDepartment('');
                setObjDepartment([]);
                setIdMunicipio('');
                setObjMunicipio([]);
                // Get the departments by id country
                axios
                    .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/departments/${newValue.value.id}`)
                    .then((payload) => {
                        // If everything is good, load the array of departments in the Typeahead or select
                        setListDeptoSelected(payload.data);
                    })
                    .catch((error) => {
                        setListDeptoSelected([]);

                    });
            }



        } else {
            // Clear the information of country
            setIdCountry('');
            setObjCountry([]);


            // Reset department's values
            setIdDepartment('');
            setObjDepartment([]);
            setListDeptoSelected([]);

            // Set up the array of municipio to empty

            setIdMunicipio('');
            setObjMunicipio([]);
            setListMunicipioSelected([]);

        }
    }

    const handleChangeDeparment = (newvalue) => {

        if (newvalue.value !== null) {
            if (newvalue.value.length === undefined) {
                // Set the id department
                setIdDepartment(newvalue.value.id);
                setObjDepartment(newvalue.value);
                setIdMunicipio('');
                setObjMunicipio([]);

                // Get the municipios by id depto
                axios
                    .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/municipios/${newvalue.value.id}`)
                    .then((payload) => {
                        setListMunicipioSelected(payload.data);
                    })
                    .catch((error) => {

                        // If something was wrong we clear the information of municipios
                        setListMunicipioSelected([]);
                    });
            }

        } else {

            // Reset department's values
            setIdDepartment('');

            // Set up the array of municipio to empty
            setIdMunicipio('');
            setListMunicipioSelected([]);
            setObjMunicipio([]);
            setObjDepartment([]);

        }
    }


    const handleChangeMunicipioT = (newvalue) => {
        if (newvalue.value !== null) {
            // Set the id
            setIdMunicipio(newvalue.value.id);
            setObjMunicipio(newvalue.value);

        } else {
            // Clear the information of municipio
            setIdMunicipio('');

            setObjMunicipio([]);

        }
    }    

    const handleStatusEmployee = (newvalue) => {
        if (newvalue.value !== null) {
            // Set the id
            if (newvalue.value !== undefined) {
                setStatusEmployee(newvalue.value.id);

            }

        } else {
            // Clear the information of Status employee
            setStatusEmployee('');

        }
    }

    // Function that allow save the record
    const updateEmployee = (data) => {



        if (infoUserLogin.id !== null && infoUserLogin.id !== '' && dataEmployeePopup.id !== undefined) {
            if (valueRol !== "" && valueRol !== undefined && idCountry !== "" && idCountry !== undefined && statusEmployee !== '' && statusEmployee !== undefined) {
                setLoading(true);
                idMunicipio = idMunicipio !== null && idMunicipio !== undefined ? idMunicipio : 0;


                const infoUpdate = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    // email: data.email,
                    idRol: valueRol,
                    dui: data.dui,
                    status: statusEmployee,
                    idCountry,
                    idMunicipio,
                    whoCreated: infoUserLogin.id
                };
                if (data.email !== dataEmployeePopup.email) {
                    infoUpdate.email = data.email;
                }


                axios.put(`${process.env.REACT_APP_DOMAIN_SERVER}api/employees/${dataEmployeePopup.id}`, infoUpdate)
                    .then((response) => {
                        // let { id } = response.data.data;
                        setValidateClass(false);
                        setLoading(false);

                        toast.info(t('successUpdated'));
                        loadEmployee();

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

    function loadEmployee() {
        axios
            .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/loadEmp`)
            .then((response) => {
                setDataEmployee(response.data.employees);
                setControlModalEditEmployee(!controlModalEditEmployee);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const changeStatusModalEmployeeReset = () => {
        setControlModalEditEmployee(false);
    }

    const changeStatusModalEmployee = () => {
        setControlModalEditEmployee(!controlModalEditEmployee)
    };


    return (
        <Fragment>
            <Modal
                size="lg" isOpen={controlModalEditEmployee} toggle={changeStatusModalEmployee} centered>
                <Form id='formEditEmployee' className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>

                    <ModalHeader toggle={changeStatusModalEmployee}>
                        {t("editInfo")}
                    </ModalHeader>
                    <ModalBody>

                        <Row>
                            <Col md="6 mb-2">
                                <Label>{t("firstName")}</Label>
                                <input className="form-control btn-pill " name="firstName" type="text" defaultValue={dataEmployeePopup.firstName} placeholder="Nombres" onChange={handleChange} {...register('firstName', { required: true })} />
                                <span>{errors.firstName && t("errorFirstName")}</span>
                                {/* <div className="valid-feedback">{"Looks good!"}</div> */}
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("lastName")}</Label>
                                <input className="form-control btn-pill" name="lastName" type="text" placeholder="Apellidos" defaultValue={dataEmployeePopup.lastName} onChange={handleChange} {...register('lastName', { required: true })} />
                                <span>{errors.lastName && t("errorLastName")}</span>
                                <div className="valid-feedback">{"Looks good!"}</div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="6 mb-2">
                                <Label>{"Dui"}</Label>
                                <input className="form-control btn-pill" name="dui" type="text" placeholder="Dui" defaultValue={dataEmployeePopup.dui} onChange={handleChange} {...register('dui')} />
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("phoneNumber")}</Label>
                                <input className="form-control btn-pill" name="phoneNumber" type="text" placeholder="Teléfono" defaultValue={dataEmployeePopup.phoneNumber} onChange={handleChange} {...register('phoneNumber', { required: true })} />
                                <span>{errors.phoneNumber && t("errorPhoneNumber")}</span>
                                <div className="valid-feedback">{"Looks good!"}</div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="6 mb-2">
                                <Label>{t("email")}</Label>
                                <input className="form-control btn-pill" name="email" type="text" placeholder={t('email')} defaultValue={dataEmployeePopup.email} onChange={handleChange} {...register('email', {
                                    required: true,
                                    pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                                })} />
                                <span>{errors.email && t("errorEmail") || error.email}</span>

                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("positionCompany")}</Label>
                                <SelectBox
                                    dataSource={listRoles}
                                    displayExpr="rol"
                                    className={'form-control dxSelectBorder'}
                                    value={objRol}
                                    searchEnabled={true}
                                    placeholder={t('placeHolderPositionCompany')}
                                    showClearButton={true}
                                    name="selectRol"
                                    onValueChanged={handleChangeRol}
                                />

                                <input type="hidden" />
                                <span>{((valueRol === '' || valueRol === undefined) && validateClass) && t("errorPositionCompany")}</span>
                                <div className="valid-feedback">{"Looks good!"}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6 mb-2">
                                <Label>{t("selectCountry")}</Label>
                                <SelectBox
                                    dataSource={listCountries}
                                    displayExpr="name"
                                    value={objCountry}
                                    searchEnabled={true}
                                    className={'form-control dxSelectBorder'}
                                    placeholder={t('placeHolderCountry')}
                                    showClearButton={true}
                                    name="selectCountry"
                                    onValueChanged={handleChangeCountry}
                                />
                                <input type="hidden" />
                                <span>{((idCountry === '' || idCountry === undefined) && validateClass) && t("errorCountry")}</span>

                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("selectDepartment")}</Label>
                                <SelectBox
                                    dataSource={listDeptoSelected}
                                    displayExpr="name"
                                    value={objDepartment}
                                    searchEnabled={true}
                                    className={'form-control dxSelectBorder'}
                                    placeholder={t('placeHolderDepartment')}
                                    showClearButton={true}
                                    name="selectDepartment"
                                    onValueChanged={handleChangeDeparment}

                                />
                            </Col>

                        </Row>

                        <Row>
                            <Col md="6 mb-2">
                                <Label>{t("selectMunicipio")}</Label>
                                <SelectBox
                                    dataSource={listMunicipioSelected}
                                    displayExpr="name"
                                    value={objMunicipio}
                                    searchEnabled={true}
                                    className={'form-control dxSelectBorder'}
                                    placeholder={t('placeHolderMunicipio')}
                                    showClearButton={true}
                                    name="selectMunicipio"
                                    onValueChanged={handleChangeMunicipioT}
                                />
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("selectStatus")}</Label>
                                <SelectBox
                                    dataSource={listStatus}
                                    displayExpr="name"
                                    value={listStatus.find(v => v.id === statusEmployee)}
                                    searchEnabled={true}
                                    className={'form-control dxSelectBorder'}
                                    placeholder={t('placeHolderMunicipio')}
                                    showClearButton={true}
                                    name="selectStatus"
                                    onValueChanged={handleStatusEmployee}
                                />
                                <input type="hidden" />
                                <span>{((statusEmployee === '' || statusEmployee === undefined) && validateClass) && t("errorStatus")}</span>
                                <div className="valid-feedback">{"Looks good!"}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12 mb-2">
                                <Label>{t("address")}</Label>
                                {/* <Input type="textarea" className="form-control btn-pill"  rows="2" name="address" placeholder={t("address")} defaultValue={dataEmployeePopup.address} onChange={handleChange}  {...register('address', { required: true })} /> */}
                                <input type="text" className="form-control btn-pill" name="city" rows="3" placeholder={t("address")} defaultValue={dataEmployeePopup.address} onChange={handleChange}  {...register('address', { required: true })} />
                                <span>{errors.address && t("address")}</span>
                                <div className="invalid-feedback">{"Ingrese una dirección por favor."}</div>
                            </Col>
                        </Row>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={changeStatusModalEmployeeReset} >{t('close')}</Button>
                        <Button color="primary" type="submit" onClick={() => setValidateClass(true)} >{t('update')}</Button>
                    </ModalFooter>
                </Form>

            </Modal>
        </Fragment>
    );
}
