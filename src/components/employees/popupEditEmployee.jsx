import React, { useState, Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { Container, Row, Col, Form, Label, Input, Card, FormGroup, InputGroup, InputGroupText, CardHeader, Table, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from 'react-i18next';
import { Typeahead } from 'react-bootstrap-typeahead';
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { classes } from '../../data/layouts';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { map } from 'leaflet';



export default function PopupEditEmployee(
    { controlModalEditEmployee, changeStatusModalEmployee,
        dataEmployeePopup, listRoles,
        listCountries,
        valueRol,
        setValueRol,
        idCountry,
        setIdCountry,
        listDeptoSelected,
        listDeptoSelectedDefault,
        setListDeptoSelected,
        idDepartment,
        setIdDepartment,
        listMunicipioSelected,
        setListMunicipioSelected,
        listMunicipioSelectedDefault,
        setIdMunicipio,
        idMunicipio,
        objMunicipio,
        setObjMunicipio
    }
) {

    const [arrayEmployee, setArrayEmployee] = useState(dataEmployeePopup);
    const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
    const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // Get the information of the logged user
    const infoUserLogin = JSON.parse(localStorage.getItem('infoUserLogin'));

    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const [validateClass, setValidateClass] = useState(false);
    const [roles, setRoles] = useState([]);


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dui, setDui] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [idRol, setIdRol] = useState('');
    const [address, setAddress] = useState('');

    // References to control Typeahead
    const refCountry = React.useRef();
    const refDepto = React.useRef();
    const refMunicipio = React.useRef();
    const refRol = React.useRef();
    const refRolInput = React.useRef();

    const multiple = false

    const { t } = useTranslation();

    // Autocomplete
    const [inputValueRol, setInputValueRol] = useState('');
    const [inputValueCountry, setInputValueCountry] = useState('');
    const [inputValueDepto, setInputValueDepto] = useState('');
    const [inputValueMunicipio, setInputValueMunicipio] = useState('');




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
        // createEmployee(data);
        console.log(data);
        console.log(valueRol);

    }

    // Function that executed when the deparment change value


    const handleChangeCountry = (event, newValue) => {
        if (newValue !== null) {
            // Set the id of country

            setIdCountry(newValue.id);
            // Get the departments by id country
            axios
                .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/departments/${newValue.id}`)
                .then((payload) => {
                    // If everything is good, load the array of departments in the Typeahead or select
                    setIdDepartment('');
                    setInputValueDepto('');
                    setListDeptoSelected(payload.data);
                    console.log(payload.data);
                })
                .catch((error) => {
                    setListDeptoSelected([]);
                    setIdCountry(newValue.id);

                });

        } else {
            // Clear the information of country
            setIdCountry('');
            setInputValueCountry('');

            // Reset department's values
            setIdDepartment('');
            setInputValueDepto('');
            setListDeptoSelected([]);

            // Set up the array of municipio to empty
            setIdMunicipio('');
            setInputValueMunicipio('');
            setListMunicipioSelected([]);
        }
    }

    const handleChangeDeparment = (event, newvalue) => {
        if (newvalue !== null) {
            // Set the id department
            setIdDepartment(newvalue.id);

            // Get the municipios by id depto
            axios
                .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/municipios/${newvalue.id}`)
                .then((payload) => {
                    // dataEmployeePopup.idMunicipio='';
                    setIdMunicipio('');
                    setInputValueMunicipio('');
                    setListMunicipioSelected(payload.data);
                })
                .catch((error) => {
                    setListMunicipioSelected([]);
                });

        } else {

            // Reset department's values
            setIdDepartment('');
            setInputValueDepto('');
            // setListDeptoSelected([]);

            // Set up the array of municipio to empty
            setIdMunicipio('');
            setInputValueMunicipio('');
            setListMunicipioSelected([]);
        }
    }


    const handleChangeMunicipio = (event, newvalue) => {
        if (newvalue !== null) {
            // Set the id
            setIdMunicipio(newvalue.id);


        } else {
            // Clear the information of municipio
            setIdMunicipio('');
            setInputValueMunicipio('');
        }
    }


    const handleChangeMunicipioT = (event, newvalue) => {
        if (newvalue !== null) {
            // Set the id
            // setIdMunicipio(newvalue.id);
            setObjMunicipio(newvalue);



        } else {
            // Clear the information of municipio
            setIdMunicipio('');
            setInputValueMunicipio('');
            setObjMunicipio([]);

        }
    }

    // Function that allow save the record
    const createEmployee = (data) => {

        if (infoUserLogin.id !== null && infoUserLogin.id !== '') {
            if (idRol !== "" && idCountry !== "") {
                setLoading(true);
                const info = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    dui, idRol, idCountry,
                    idDepartment, idMunicipio,
                    whoCreated: infoUserLogin.id
                };

                axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/employees`, info)
                    .then((res) => {
                        toast.info(t('successCreated'));
                        setTimeout(() => {
                            navigate(`${process.env.PUBLIC_URL}/app/employees/listEmployees/${layout}`);
                        }, 400);
                    })
                    .catch((err) => {
                        setLoading(false);
                        setError(err.response.data.messages);
                    });
            }
        } else {
            setTimeout(() => {
                toast.error(t('errorLogin'));
            }, 200);
        }

    };



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

        console.log(newArrayEmployee);
    }

    const defaultValueMunicipio = (data) => {

        let obj= listMunicipioSelected.find(v => v.id === idMunicipio ? idMunicipio : 0)
        console.log(obj); 
       return  obj!==undefined ? obj : 0;

        // return listMunicipioSelected.find(v => v.id === dataEmployeePopup.idMunicipio ? dataEmployeePopup.idMunicipio : '')

    }

    const valueM=(data)=>{
       return  listMunicipioSelected.find(v => v.id === idMunicipio ? idMunicipio : '')
    }

    return (
        <Fragment>
            <Modal size="lg" isOpen={controlModalEditEmployee} toggle={changeStatusModalEmployee} centered>
                <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>

                    <ModalHeader toggle={changeStatusModalEmployee}>
                        {t("editInfo")}
                    </ModalHeader>
                    <ModalBody>

                        <Row>
                            <Col md="6 mb-2">
                                <Label>{t("firstName")}</Label>
                                <input className="form-control" name="firstName" type="text" defaultValue={dataEmployeePopup.firstName} placeholder="Nombres" onChange={handleChange} {...register('firstName', { required: true })} />
                                <span>{errors.firstName && t("errorFirstName")}</span>
                                {/* <div className="valid-feedback">{"Looks good!"}</div> */}
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("lastName")}</Label>
                                <input className="form-control" name="lastName" type="text" placeholder="Apellidos" defaultValue={dataEmployeePopup.lastName} onChange={handleChange} {...register('lastName', { required: true })} />
                                <span>{errors.lastName && t("errorLastName")}</span>
                                <div className="valid-feedback">{"Looks good!"}</div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="6 mb-2">
                                <Label>{"Dui"}</Label>
                                <input className="form-control" name="dui" type="text" placeholder="Dui" defaultValue={dataEmployeePopup.dui} onChange={handleChange} />
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("phoneNumber")}</Label>
                                <input className="form-control" name="phoneNumber" type="text" placeholder="Teléfono" defaultValue={dataEmployeePopup.phoneNumber} onChange={handleChange} {...register('phoneNumber', { required: true })} />
                                <span>{errors.phoneNumber && t("errorPhoneNumber")}</span>
                                <div className="valid-feedback">{"Looks good!"}</div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="6 mb-2">
                                <Label>{t("email")}</Label>
                                <input className="form-control" name="email" type="text" placeholder={t('email')} defaultValue={dataEmployeePopup.email} onChange={handleChange} {...register('email', {
                                    required: true,
                                    pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                                })} />
                                <span>{errors.email && t("errorEmail") || error.email}</span>

                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("positionCompany")}</Label>

                                {/* <div>{`value: ${valueRol !== null ? `'${valueRol}'` : 'null'}`}</div>
                                <div>{`inputValue: '${inputValueRol}'`}</div> */}
                                <Autocomplete
                                    getOptionLabel={(option) => option.rol}
                                    defaultValue={listRoles.find(v => v.id === dataEmployeePopup.idRol)}

                                    classes={{ inputRoot: "form-control" }}
                                    inputValue={inputValueRol}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValueRol(newInputValue);
                                    }}
                                    id="select-roles"
                                    options={listRoles}
                                    renderInput={(params) => <TextField
                                        {...params} />}
                                    onChange={(event, newValue) => {
                                        setValueRol(newValue !== null ? newValue.id : '');
                                    }}
                                />

                                <input type="hidden" />
                                <span>{(valueRol === '' && validateClass) && t("errorPositionCompany")}</span>
                                <div className="valid-feedback">{"Looks good!"}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6 mb-2">
                                <Label>{t("selectCountry")}</Label>
                                <Autocomplete
                                    defaultValue={listCountries.find(country => country.id === dataEmployeePopup.idCountry ? dataEmployeePopup.idCountry : '')}
                                    getOptionLabel={(option) => option.name}
                                    // onChange={(event, newValue) => {
                                    //     setIdCountry(newValue !== null ? newValue.id : '');
                                    // }}
                                    onChange={handleChangeCountry}
                                    inputValue={inputValueCountry}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValueCountry(newInputValue !== null ? newInputValue : '');
                                    }}
                                    classes={{ inputRoot: "form-control" }}
                                    id="select-country"
                                    options={listCountries}
                                    renderInput={(params) => <TextField
                                        {...params} />}
                                />
                                <input type="hidden" />
                                <span>{(idCountry === '' && validateClass) && t("errorCountry")}</span>

                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("selectDepartment")}</Label>
                                <Autocomplete
                                    defaultValue={listDeptoSelected.find(v => v.id === dataEmployeePopup.idDepto ? dataEmployeePopup.idDepto : '')}
                                    getOptionLabel={(option) => option.name}
                                    inputValue={inputValueDepto}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValueDepto(newInputValue !== null ? newInputValue : '');
                                    }}
                                    onChange={handleChangeDeparment}
                                    classes={{ inputRoot: "form-control" }}
                                    id="select-department"
                                    options={listDeptoSelected}
                                    renderInput={(params) => <TextField
                                        {...params} placeholder={t("placeHolderDepartment")} />}
                                />
                            </Col>

                        </Row>

                        <Row>
                            <Col md="6 mb-2">
                                <Label>{t("selectMunicipio")}</Label>
                                <div>{`value: ${idMunicipio !== null ? `'${idMunicipio}'` : 'null'}`}</div>
                                <div>{`inputValue: '${inputValueMunicipio}'`}</div>
                                <Autocomplete
                                    defaultValue={objMunicipio}
                                    options={listMunicipioSelected}
                                    // onChange={(_, newValue) => setObjMunicipio(newValue)}
                                    // value={objMunicipio}
                                    getOptionLabel={(option) => option.name}
                                    // getOptionSelected={(option, value) => option.name === value.name}
                                    // defaultValue={defaultValueMunicipio}
                                    // value= {valueM}

                                    // getOptionSelected={(option, value) => {
                                    //     console.log("jere");
                                    //     console.log(value);
                                    //     return option.id === value.id
                                    // }}
                                    // getOptionSelected={(listMunicipioSelected, idMunicipio) => listMunicipioSelected.id === idMunicipio}
                                    onChange={handleChangeMunicipioT}

                                    // getOptionSelected={(option, value) => option.idMunicipio === value.idMunicipio}

                                    // getOptionLabel={(option, value) => option.id === value.id}
                                    // isOptionEqualToValue={(listMunicipioSelected, value) => listMunicipioSelected.id === value.id}
                                    inputValue={inputValueMunicipio}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValueMunicipio(newInputValue !== null ? newInputValue : '');
                                    }}
                                    classes={{ inputRoot: "form-control" }}
                                    id="select-municipio"
                                    renderInput={(params) => <TextField
                                        {...params} placeholder={t("placeHolderMunicipio")} />}
                                />
                            </Col>
                            <Col md="6 mb-2">
                                <Label>{t("address")}</Label>
                                <input className="form-control" name="city" type="text" placeholder={t("address")} defaultValue={dataEmployeePopup.address} onChange={handleChange}  {...register('address', { required: true })} />
                                <span>{errors.address && t("address")}</span>
                                <div className="invalid-feedback">{"Ingrese una dirección por favor."}</div>
                            </Col>
                        </Row>

                        {/* <Button color="primary" type="submit">{t("create")}</Button> */}

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={changeStatusModalEmployee} >{t('close')}</Button>
                        <Button color="primary" type="submit" onClick={() => setValidateClass(true)} >{t('update')}</Button>
                    </ModalFooter>
                </Form>

            </Modal>
        </Fragment>
    );
}

// export default PopupEditEmployee;