import React, { useState, Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { Container, Row, Col, Form, Label, Input, Card, FormGroup, InputGroup, InputGroupText, CardHeader, Table, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { classes } from '../../data/layouts';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ReactModal from 'react-modal';

export default function PopupEditUser(
    { 
        openPopup, setOpenPopup,
        employeesList, setEmployeesList,
        idUser, setIdUser,
        userName, setUserName
    }
) {

    //variables estandar
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [validateClass, setValidateClass] = useState(false);
    const infoUserLogin = JSON.parse(localStorage.getItem('infoUserLogin'));
    const navigate = useNavigate();
    const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
    const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();
    const [popover, setPopover] = useState(false)
    const Toggle = () => setPopover(!popover);
    const { t } = useTranslation();
    const [error, setError] = useState({
          'userName': '',
          'email': '',
          'idEmployee':''
    });

    //variables para la modal
    const [estatus, setEstatus] = useState([
        {id:"1", text:'Activo'},
        {id:"0", text:'Inactivo'}
    ]);
    const [email, setEmail] = useState('');
    const [idEmployee, setIdEmployee] = useState('');
    const [statusUser, setStatusUser] = useState('');
    const [dataUser, setDataUser] = useState([]);

    //Evento que sucede al dar clic al botón de crear
    const onSubmit: SubmitHandler<FormValues> = data => {
        console.log(data, idEmployee, statusUser);
    }

    const changeOpenModal = () => {
        setOpenPopup(!openPopup);
    }

    return (
        <Fragment>
            <Modal size="lg" isOpen={openPopup} centered>
                <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>
                    <Label className="col-form-label pt-0" >{userName}</Label>
                        {t("editInfo")}
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >{t("userName")}</Label>
                                <input className="form-control btn-pill" type="text" placeholder={t("placeholderUserName")} name="userName" onChange={(e) => { setUserName(e.target.value)}} defaultValue={userName} {...register('userName', { required: true })} />
                                <span>{errors.userName && t("errorUserName")}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >{t("email")}</Label>
                                <input className="form-control btn-pill" name="email" type="text" placeholder={t("placeholderEmail")} {...register('email', {
                                    required: true,
                                    pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
                                })} onChange={(e) => { setEmail(e.target.value)}} defaultValue={email} />
                                <span>{errors.email && t("errorEmail") || error.email}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >{t("employees")}</Label>
                                <Autocomplete
                                    options={employeesList}
                                    getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                                    defaultValue={employeesList.find(v => v.id === idEmployee)}
                                    classes={{ inputRoot: "form-control btn-pill" }}
                                    id="select-employees"
                                    renderInput={
                                    params => <TextField id="employeesUser"
                                        {...params} placeholder={t("placeholderEmployees")} 
                                        InputProps={{...params.InputProps, disableUnderline: true}}
                                    />}
                                    onChange={(event, newValue) => {
                                        setIdEmployee(newValue !== null ? newValue.id : '');
                                    }}
                                />
                                <input type="hidden"/>
                                <span>{(idEmployee == '' && validateClass) && t("errorEmployee")}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >{t("estatus")}</Label>
                                <Autocomplete
                                    options={estatus}
                                    getOptionLabel={(option) => option.text}
                                    defaultValue={estatus.find(v => v.id === statusUser)}
                                    classes={{ inputRoot: "form-control btn-pill" }}
                                    id="estatus-user"
                                    renderInput={
                                    params => <TextField id="estatusUser"
                                        {...params} placeholder={t("placeHolderSelect")} 
                                        InputProps={{...params.InputProps, disableUnderline: true}}
                                    />}
                                    onChange={(event, newValue) => {
                                        setStatusUser(newValue !== null ? newValue.id : '');
                                    }}
                                />
                                <input type="hidden"/>
                                <span>{(idEmployee == '' && validateClass) && t("errorEmployee")}</span>
                            </FormGroup>
                        </Row> 
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" color="secondary" onClick={changeOpenModal} >{t('close')}</Button>
                        <Button color="primary" type="submit" onClick={() => setValidateClass(true)} >{t('update')}</Button>
                    </ModalFooter>
                </Form>

            </Modal>
        </Fragment>
    );
}