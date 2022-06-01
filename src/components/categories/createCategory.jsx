import React, { useState, Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { Row, Form, Label, Col, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function CreateCategory({
    createOpen, setCreateOpen,
    setCategoriesList, error, setError
}){

    //variables estandar
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [validateClass, setValidateClass] = useState(false);
    const infoUserLogin = JSON.parse(localStorage.getItem('infoUserLogin'));
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    //variables de categoría
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');


    //Evento que sucede al dar clic al botón de crear
    const onSubmit: SubmitHandler<FormValues> = data => {
        createCategory(data);
    }

    const createCategory = (data) => {
        if (infoUserLogin.id !== null && infoUserLogin.id !== '') {
            setLoading(true);

            const info = {
                name: category,
                description: description,
                whoCreated: infoUserLogin.id
            };

            axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/categories`, info)
            .then((response) => {
                toast.info(t('successCreated'));
                setValidateClass(false);
                setLoading(false);
                loadCategories();
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
    }

    function loadCategories() {
        reset();
        axios
        .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/categories`)
        .then((res) => {
            setCategoriesList(res.data.categories);
            setCreateOpen(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function clearData(e){
        setCreateOpen(!createOpen);
        setValidateClass(false);
        reset();
    }

    return (
        <Fragment>
            <Modal isOpen={createOpen} size="lg" centered>
                <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>
                        {t("newRecord")}
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
                                <Input type="textarea" className="form-control btn-pill" rows="2" placeholder={t("placeHolderDescription")} 
                                onChange= {(e) => setDescription(e.target.value) } />
                            </Col>
                        </Row> 
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" color="secondary" onClick={clearData} >{t('close')}</Button>
                        <Button color="primary" type="submit" disabled={loading ? loading : loading} onClick={() => setValidateClass(true)} >{loading ? t("processing") : t('create')}</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </Fragment>
    );
}