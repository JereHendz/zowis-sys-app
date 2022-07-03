import React, { useState, Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { Container, Row, Col, Form, Label, Input, Card, FormGroup, InputGroup, InputGroupText, CardHeader, Table, CardBody, Media, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from "axios";
import { SelectBox } from 'devextreme-react/select-box';
import Files from 'react-files';



export default function PopupImage(
    {
        controlOpenModal,
        setControlOpenModal,
        dataImage,
        isEditPopup,
        visibleCustomer,
        setVisibleCustomer,
        listStatus,
        setDataImage,
        setListBrands,
        setDataImagesProduct,
        productId,
        sizeArrayImage,
        setSizeArrayImage
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

    let arrayFile = [];
    const [clickableB, setClickableB] = useState(false);
    const [files, setFiles] = useState([]);



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
            updateImage(data);
        } else {
            createImages();
        }

    }


    useEffect(() => {
        setValidateClass(false)
        reset({
            productName: dataImage.productName,
        });
        setFiles([]);

    }, [controlOpenModal])


    const handleVisibleCustomer = (newvalue) => {
        if (newvalue.value !== null) {
            // Set the id
            if (newvalue.value !== undefined) {
                setVisibleCustomer(newvalue.value.id);
            }

        } else {
            // Clear the information of Status brand
            setVisibleCustomer('');
        }
    }

    // Function that allow update the record
    const updateImage = (data) => {

        if (infoUserLogin.id !== null && infoUserLogin.id !== '') {
            if (visibleCustomer !== undefined && visibleCustomer !== '') {
                setLoading(true);

                const infoUpdate = {
                    priority: data.priority,
                    visibleCustomer: visibleCustomer,
                    whodidit: infoUserLogin.id
                };

                let formData = new FormData();

                formData.append('infoUpdate', JSON.stringify(infoUpdate));
                formData.append('id', dataImage.id);
                // Upload multiples files
                files.map((file, index) => {
                    formData.append(`file${index}`, file);
                });

                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/uptImage`, formData, config)
                    .then((response) => {
                        setValidateClass(false);
                        setLoading(false);

                        console.log(response);
                        toast.info(t('successUpdated'));
                        loadProductImages();

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

    // Function that allow create a lot image that belong to the product selected 
    const createImages = () => {

        if (infoUserLogin.id !== null && infoUserLogin.id !== '') {
            setLoading(true);

            let formData = new FormData();

            formData.append('id', productId);
            formData.append('whodidit', infoUserLogin.id);

            // Upload multiples files
            files.map((file, index) => {
                formData.append(`file${index}`, file);
            });

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            console.log(files);

            axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/createImages`, formData, config)
                .then((response) => {
                    setValidateClass(false);
                    setLoading(false);
                    toast.info(t('successCreated'));
                    loadProductImages();

                })
                .catch((errors) => {
                    setError(errors.response.data.messages)
                });

        } else {
            setTimeout(() => {
                toast.error(t('errorLogin'));
            }, 200);
        }

    };


    function loadProductImages() {
        axios
            .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/imagesById/${productId}`)
            .then((response) => {
                setDataImagesProduct(response.data.imagesByProduct);
                setControlOpenModal(!controlOpenModal);
                setSizeArrayImage(response.data.imagesByProduct.length);

            })
            .catch((error) => {
                console.log(error);
            });
    }


    const changeStatusModal = () => {
        setControlOpenModal(!controlOpenModal)
    };

    // Enable upload image throug the click on the button upload image
    const uploadImage = () => {
        setClickableB(true);
    }

    // Disable the window that allows upload files

    const blockUploadImage = () => {
        setClickableB(false);
    }


    const handleChangeStatusVisible = (newvalue) => {

        if (newvalue.value !== null) {
            // Set the id
            if (newvalue.value !== undefined) {
                setVisibleCustomer(newvalue.value.id);
            }

        } else {
            // Clear the information 
            setVisibleCustomer('');

        }
    }


    function deleteFile(e) {
        arrayFile = [];
        files.map(v => {
            if (v.id !== e) {
                arrayFile.push(v);
            }
        });
        setFiles(arrayFile);
    }

    const onFilesChange = (file) => {
        if (!isEditPopup) {
            arrayFile = [];

            file.map(v => {
                arrayFile.push(v)
            })
            files.map(v => {
                arrayFile.push(v)
            })
    
            setFiles(arrayFile);
        }else{
            setFiles(file);
        }
       
        setClickableB(false);

    }
    const onFilesError = (error, file) => {
        setFiles(file)
    }

    return (
        <Fragment>
            <Modal
                size="lg" isOpen={controlOpenModal} centered>
                <Form id='formEditImage' className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>

                    <ModalHeader toggle={changeStatusModal}>
                        {isEditPopup ? t("editInfo") : t("createInfo")}
                    </ModalHeader>
                    <ModalBody>
                        {isEditPopup ? (
                            <Container fluid={true}>
                                <Row>
                                    <Col md="12 mb-1" align="center">
                                        {files.length === 0 ? (
                                            <figure className="col-xl-6 col-sm-6">
                                                <Media
                                                    src={dataImage.link}
                                                    alt="Gallery"
                                                    className="img-thumbnail"
                                                />
                                            </figure>
                                        ) : ''}
                                        <CardBody className="fileUploader">
                                            <Files
                                                className='files-dropzone fileContainer'
                                                onChange={onFilesChange}
                                                onError={onFilesError}
                                                accepts={['image/*']}
                                                multiple={false}
                                                maxFileSize={100000000}
                                                minFileSize={0}
                                                clickable={clickableB}
                                            >

                                                <div className="d-flex justify-content-center">
                                                    <input type="button"  className="chooseFileButton me-2" onPointerEnter={uploadImage} onFocus={uploadImage} onPointerLeave={blockUploadImage} value={"Upload Image"} />
                                                </div>

                                                <div className="uploadPicturesWrapper" >

                                                    <div className='files-gallery divImg' >

                                                        {files.map((file, index) =>
                                                            <div className="uploadPictureContainer" key={"up" + index}>
                                                                <div className="deleteImage" onClick={() => deleteFile(file.id)} key={"d" + index} > X</div>
                                                                <img className='files-gallery-item uploadPicture' src={file.preview.url} key={index} alt='' />
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                            </Files>
                                        </CardBody>
                                    </Col>

                                    <Col md="12 mb-1">
                                        <Label>{t("productName")}</Label>
                                        <input className="form-control btn-pill" readOnly name="name" type="text" defaultValue={dataImage.productName} placeholder={t("placeHolderGeneralName")} {...register('productName', { required: true })} />
                                        <span>{errors.productName && t("errorProductName")}</span>

                                    </Col>

                                    <Col md="6 mb-2">
                                        <Label>{t("priority")}</Label>
                                        <input className="form-control btn-pill" min="1" max={sizeArrayImage} autoComplete='off' name="priority" type="number" defaultValue={dataImage.priority} placeholder={t("priority")} {...register('priority', { required: true })} />
                                        <span>{errors.priority && t("errorPriority")}</span>
                                    </Col>
                                    <Col md="6 mb-2">
                                        <Label>{t("visibleCustomer")}</Label>
                                        <SelectBox
                                            dataSource={listStatus}
                                            value={listStatus.find(v => v.id === visibleCustomer)}
                                            displayExpr="name"
                                            searchEnabled={true}
                                            className={'form-control dxSelectBorder'}
                                            placeholder={t('nameBrand')}
                                            showClearButton={true}
                                            name="selectBrand"
                                            onValueChanged={handleChangeStatusVisible}
                                        />
                                        <input type="hidden" />
                                        <span>{((visibleCustomer === '' || visibleCustomer === undefined) && validateClass) && t("errorSubCategory")}</span>
                                    </Col>

                                </Row>

                            </Container >



                        ) : (
                            // To create form
                            <Container fluid={true}>
                                <Row>
                                    <Col md="12 mb-1" align="center">
                                        <CardBody className="fileUploader">
                                            <Files
                                                className='files-dropzone fileContainer'
                                                onChange={onFilesChange}
                                                onError={onFilesError}
                                                accepts={['image/*']}
                                                multiple={true}
                                                maxFileSize={100000000}
                                                minFileSize={0}
                                                clickable={clickableB}>

                                                <div className="d-flex justify-content-center">
                                                    <input type="button"  className="chooseFileButton me-2" onPointerEnter={uploadImage}   onFocus={uploadImage} onPointerLeave={blockUploadImage} value={"Upload Image"} />
                                                </div>

                                                <div className="uploadPicturesWrapper" >

                                                    <div className='files-gallery divImg' >

                                                        {files.map((file, index) =>
                                                            <div className="uploadPictureContainer" key={"up" + index}>
                                                                <div className="deleteImage" onClick={() => deleteFile(file.id)} key={"d" + index} > X</div>
                                                                <img className='files-gallery-item uploadPicture' src={file.preview.url} key={index} alt='' />
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                            </Files>
                                        </CardBody>
                                    </Col>

                                </Row>

                            </Container >
                        )
                        }

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={changeStatusModal} >{t('close')}</Button>
                        <Button color="primary" type="submit" onClick={() => setValidateClass(true)} >{isEditPopup ? t('update') : t('create')}</Button>
                    </ModalFooter>
                </Form>
                <div className={loading ? 'loader-wrapper back' : 'loader-wrapper back loderhide'}><div className="loader-index">
                    <span></span></div>
                </div>


            </Modal>
        </Fragment>
    );
}
