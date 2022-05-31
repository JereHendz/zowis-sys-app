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
        employeesList,
        dataUser,
        setUserName,
        setEmail,
        statusUser, setStatusUser,
        idEmployee, setIdEmployee,
        statusList,
        setUsersList,
        error, setError
    }
) {

    //variables estandar
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [validateClass, setValidateClass] = useState(false);
    const infoUserLogin = JSON.parse(localStorage.getItem('infoUserLogin'));
    const navigate = useNavigate();
    const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
    const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [textEmployee, setTextEmployee] = useState('');
    const [textStatus, setTextStatus] = useState('');

    //Evento que sucede al dar clic al botón de crear
    const onSubmit: SubmitHandler<FormValues> = data => {
        console.log(data, idEmployee, statusUser);
        updateUser(data);
    }

    const updateUser = (data) => {
        if (infoUserLogin.id !== null && infoUserLogin.id !== '' && dataUser.id !== undefined) {
            if (idEmployee !== "" && idEmployee !== undefined && statusUser !== "" && statusUser !== undefined) {
                setLoading(true);

                const infoUpdate = {
                    idEmployee: idEmployee,
                    phoneNumber: data.phoneNumber,
                    status: statusUser,
                    whoCreated: infoUserLogin.id
                };

                if (data.userName !== dataUser.userName) {
                    infoUpdate.userName = data.userName;
                }

                if (data.email !== dataUser.email) {
                    infoUpdate.email = data.email;
                }

                axios.put(`${process.env.REACT_APP_DOMAIN_SERVER}api/users/${dataUser.id}`, infoUpdate)
                .then((response) => {
                    toast.info(t('successUpdated'));
                    setValidateClass(false);
                    setLoading(false);
                    loadUsers();
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
    }

    function loadUsers() {
        axios
        .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/users`)
        .then((res) => {
            setUsersList(res.data.users);
            setOpenPopup(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function clearData(e){
        setOpenPopup(!openPopup);
        setValidateClass(false);
        reset();
    }

    const onOpenModal = () => {
        reset({
            userName: dataUser.userName,
            email: dataUser.email
        });
    }

    return (
        <Fragment>
            <ReactModal 
            isOpen={openPopup}
            onAfterOpen={onOpenModal}
            ariaHideApp={false}
            className={"backgroundModalReactContent"}
            overlayClassName={"backgroundModalReactOverlay"}
            >
                <Modal isOpen={openPopup} size="lg" centered>
                    <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader>
                            {t("editInfo")}
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <FormGroup>
                                <Label className="col-form-label pt-0" >{t("userName")}</Label>
                                <input className="form-control btn-pill" type="text" placeholder={t("placeholderUserName")}
                                {...register('userName', { 
                                    required: true,
                                    onChange: (e) => { setUserName(e.target.value) }
                                })} />
                                <span>{errors.userName && t("errorUserName")}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="col-form-label pt-0" >{t("email")}</Label>
                                    <input className="form-control btn-pill" name="email" type="text" placeholder={t("placeholderEmail")} onChange={(e) => { setEmail(e.target.value)}} defaultValue={dataUser.email} {...register('email', {
                                        required: true,
                                        pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
                                    })} />
                                    <span>{errors.email && t("errorEmail") || error.email}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="col-form-label pt-0" >{t("employees")}</Label>
                                    <Autocomplete
                                        options={employeesList}
                                        getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                                        defaultValue={employeesList.find(v => v.id === dataUser.idEmployee)}
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
                                        inputValue={textEmployee}
                                        onInputChange={(event, newInputValue) => {
                                            setTextEmployee(newInputValue);
                                        }}
                                    />
                                    <input type="hidden"/>
                                    <span>{(idEmployee == '' && validateClass) && t("errorEmployee")}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="col-form-label pt-0" >{t("selectStatus")}</Label>
                                    <Autocomplete
                                        options={statusList}
                                        getOptionLabel={(option) => option.name}
                                        defaultValue={statusList.find(v => v.id === dataUser.status)}
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
                                        inputValue={textStatus}
                                        onInputChange={(event, newInputValue) => {
                                            setTextStatus(newInputValue);
                                        }}
                                    />
                                    <input type="hidden"/>
                                    <span>{(statusUser == '' && validateClass) && t("errorStatus")}</span>
                                </FormGroup>
                            </Row> 
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="secondary" onClick={clearData} >{t('close')}</Button>
                            <Button color="primary" type="submit" disabled={loading ? loading : loading} onClick={() => setValidateClass(true)} >{loading ? t("processing") : t('update')}</Button>
                        </ModalFooter>
                    </Form>

                </Modal>
            </ReactModal>
        </Fragment>
    );
}