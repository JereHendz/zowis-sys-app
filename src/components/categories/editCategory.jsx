import React, { useState, Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { Container, Row, Col, Form, Label, Input, Card, FormGroup, InputGroup, InputGroupText, CardHeader, Table, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function EditCategory(
    { 
        editOpen, setEditOpen,
        setCategoriesList,
        dataCategory,
        statusListCategories,
        setError
    }
) {
    //variables estandar
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [validateClass, setValidateClass] = useState(false);
    const infoUserLogin = JSON.parse(localStorage.getItem('infoUserLogin'));
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [textStatus, setTextStatus] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [statusCategory, setStatusCategory] = useState('');


    useEffect(() => {
        setValidateClass(false)
        reset({
            category: dataCategory.name,
            description: dataCategory.description,
            statusCategory: dataCategory.status
        });
    }, [editOpen]);

    //Evento que sucede al dar clic al botón de crear
    const onSubmit: SubmitHandler<FormValues> = data => {
        updateCategory(data);
    }

    const updateCategory = (data) => {
        if (infoUserLogin.id !== null && infoUserLogin.id !== '' && dataCategory.id !== undefined) {
            if (statusCategory !== "" && statusCategory !== undefined) {
                setLoading(true);

                const infoUpdate = {
                    name: data.category,
                    description: data.description,
                    status: statusCategory,
                    whodidit: infoUserLogin.id
                };

                axios.put(`${process.env.REACT_APP_DOMAIN_SERVER}api/categories/${dataCategory.id}`, infoUpdate)
                .then((response) => {
                    toast.info(t('successUpdated'));
                    setValidateClass(false);
                    setLoading(false);
                    loadCategories();
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

    function loadCategories() {
        axios
        .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/categories`)
        .then((res) => {
            setCategoriesList(res.data.categories);
            setEditOpen(false);
        })
        .catch((err) => {
            console.log(err);
        });
        clearData();
    }

    function clearData(){
        setEditOpen(!editOpen);
        setValidateClass(false);
        reset();
    }

    return (
        <Fragment>
            <Modal isOpen={editOpen} size="lg" centered>
                <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>
                        {t("editInfo")}
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <FormGroup>
                            <Label className="col-form-label pt-0" >{t("category")}</Label>
                            <input className="form-control btn-pill" type="text" placeholder={t("placeholderCategory")}
                            {...register('category', { 
                                required: true,
                                onChange: (e) => { setCategory(e.target.value) }
                            })} />
                            <span>{errors.category && t("errorRequired")}</span>
                            </FormGroup>
                            <Col md="12 mb-2">
                                <Label>{t("description")}</Label>
                                <input type="text" className="form-control btn-pill" rows="3" placeholder={t("placeHolderDescription")} {...register('description',{
                                    onChange: (e) => { setDescription(e.target.value) } 
                                })} />
                            </Col>
                            <FormGroup>
                                <Label className="col-form-label pt-0" >{t("selectStatus")}</Label>
                                <Autocomplete
                                    options={statusListCategories}
                                    getOptionLabel={(option) => option.name}
                                    defaultValue={statusListCategories.find(v => v.id === dataCategory.status)}
                                    classes={{ inputRoot: "form-control btn-pill" }}
                                    id="estatus-category"
                                    renderInput={
                                    params => <TextField id="estatusCategory"
                                        {...params} placeholder={t("placeHolderSelect")} 
                                        InputProps={{...params.InputProps, disableUnderline: true}}
                                    />}
                                    onChange={(event, newValue) => {
                                        setStatusCategory(newValue !== null ? newValue.id : '');
                                    }}
                                    inputValue={textStatus}
                                    onInputChange={(event, newInputValue) => {
                                        setTextStatus(newInputValue);
                                    }}
                                />
                                <input type="hidden"/>
                                <span>{(statusCategory == '' && validateClass) && t("errorStatus")}</span>
                            </FormGroup>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" color="secondary" onClick={clearData} >{t('close')}</Button>
                        <Button color="primary" type="submit" disabled={loading ? loading : loading} onClick={() => setValidateClass(true)} >{loading ? t("processing") : t('update')}</Button>
                    </ModalFooter>
                </Form>

            </Modal>
        </Fragment>
    );
}