import React, { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { Col, Button, Form, Label, FormGroup, Row, Container, Card, CardHeader, CardBody, CardFooter, Popover, PopoverHeader, PopoverBody, Progress, Input } from 'reactstrap'
import Breadcrumb from '../../../layout/breadcrumb'
import axios from 'axios';
import { classes } from '../../../data/layouts';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { SelectBox } from 'devextreme-react/select-box';
import { height } from '@mui/system';
import Files from 'react-files';


const ProductCreate = () => {

  //declaracion de constantes de hooks
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [validateClass, setValidateClass] = useState(false);
  const infoUserLogin = JSON.parse(localStorage.getItem('infoUserLogin'));
  const navigate = useNavigate();
  const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();
  const [popover, setPopover] = useState(false)
  const Toggle = () => setPopover(!popover);
  const { t } = useTranslation();

  //declaracion de constantes locales del archivo
  const [loading, setLoading] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);
  const [idCategory, setIdCategory] = useState("");
  const [dataSubCategory, setDataSubCategory] = useState([]);
  const [idSubCategory, setIdSubCategory] = useState("");
  const [dataBrand, setDataBrand] = useState([]);
  const [idBrand, setIdBrand] = useState("");
  const [dataProvider, setDataProvider] = useState([]);
  const [idProvider, setIdProvider] = useState("");
  const [showAddStock, setShowAddStock] = useState(false);
  const [description, setDescription] = useState('');
  const [percentageProfit, setPercentageProfit] = useState('');
  const [unitSalePrice, setUnitSalePrice] = useState('');


  let arrayFile = [];
  const [clickableB, setClickableB] = useState(false);

  //array que recibe los errores del modelo de base de datos
  const [error, setError] = useState(
    {
      'productName': '',
      'description': '',
      'stockLimit': '',
      'percentageProfit': '',
      'idSubCategory': ''
    }
  );

  //Load information when opening the page
  useEffect(() => {
    getCategory();
  }, []);

  function getCategory() {
    axios.get(`${process.env.REACT_APP_DOMAIN_SERVER}api/infoFormProduct`)
      .then((res) => {
        setDataCategory(res.data.categories)
        // setDataSubCategory(res.data.subCategories)
        setDataBrand(res.data.brands)
        setDataProvider(res.data.providers)

      })
      .catch((errors) => {
        console.log(errors);
      });
  }



  //Evento que sucede al dar clic al botón de crear
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // If all validations are met we'll call register method

    createProduct(data);
  }

  //Function to create product
  const createProduct = (data) => {

    if (infoUserLogin.id !== null && infoUserLogin.id !== '') {
      let detailProduct = {};
      setLoading(true);

      // Make sure that the category is not empty
      if (idCategory === '' || idSubCategory === "") {
        return false;
      }

      // Make sure that the unit price sale is not empty
      if (unitSalePrice === '' || unitSalePrice === undefined || unitSalePrice === null) {
        return false;
      }
      
      const informationProduct = {
        productName: data.productName,
        description: description,
        stockProduct: 0,
        stockLimit: data.stockLimit,
        percentageProfit: data.percentageProfit,
        idSubCategory: idSubCategory,
        whoCreated: infoUserLogin.id,
        barcode: data.barcode
      };
      // If showAddStock is false that means the user doesn't want to add stock
      if (showAddStock === false) {
        detailProduct = {};

      } else {

        // Information to make the first charge

        if (idProvider === '' || idBrand === "") {
          return false;
        }

        detailProduct = {
          idProvider: idProvider,
          idBrand: idBrand,
          quantity: data.amount,
          unitPurchasePrice: data.unitPrice,
          unitSalePrice: unitSalePrice,
          idBranchOffice: 1,
          idWineries: 1,
          idFirstLevelLocation: 1,
          idSecondLevelLocation: 1,
          idThirdLevelLocation: 1
        };

      }

      // Create formData because we are gonna send images
      let formData = new FormData();

      formData.append('productName', data.productName);
      formData.append("informationProduct", JSON.stringify(informationProduct));
      formData.append("detailProduct", JSON.stringify(detailProduct));

      // Upload multiples files
      files.map((file, index) => {
        formData.append(`file${index}`, file);
      });

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }

      axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/products`, formData, config)
        .then((res) => {
          setLoading(false);
          toast.info(t('successCreated'));
          navigate(`${process.env.PUBLIC_URL}/app/inventory/product/ListProduct/${layout}`);
        })
        .catch((err) => {
          //si recibimos un error
          setLoading(false);
          // setError(err.response.data.messages);
          toast.error(t('errorCreate'));
        });
    } else {
      toast.error(t('errorLoginSesion'));
    }

  };


  function clearData(e) {
    reset({
      productName: "",
      description: "",
      stockLimit: "",
      percentageProfit: ""
    }, {
      keepErrors: true,
      keepDirty: true,
      keepIsSubmitted: false,
      keepTouched: false,
      keepIsValid: false,
      keepSubmitCount: false,
    });
    setIdCategory('');
    setIdSubCategory('');
    setIdBrand('');
    setValidateClass(false);
    setFiles([]);

  }


  const handleChangeCategory = (newvalue) => {
    if (newvalue.value !== null) {
      // Set the id
      if (newvalue.value !== undefined) {
        setIdCategory(newvalue.value.id);

        // Clean object in sub-category
        setIdSubCategory('');
        setDataSubCategory([]);

        // Get the sub categories by id category
        axios
          .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/subCateByIdCate/${newvalue.value.id}`)
          .then((payload) => {
            // If everything is good, load the array of departments in the Typeahead or select
            setDataSubCategory(payload.data.sub_category);
          })
          .catch((error) => {
            console.log(error);
          });

      }

    } else {
      // Clear the information 
      setIdCategory('');

      // Clean object in sub-category
      setIdSubCategory('');
      setDataSubCategory([]);

    }
  }


  const handleChangeSubCategory = (newvalue) => {

    if (newvalue.value !== null) {

      // Set the id
      if (newvalue.value !== undefined) {
        setIdSubCategory(newvalue.value.id);
      }

    } else {
      // Clear the information 
      setIdSubCategory('');

    }
  }


  const handleRadioButton = (event) => {
    // If the value target is 1  the answer was yes
    if (event.target.value === '1') {
      setShowAddStock(true);

    } else {
      setShowAddStock(false);
    }
    setValidateClass(false)

  }

  const handleChangeProvider = (newvalue) => {

    if (newvalue.value !== null) {

      // Set the id
      if (newvalue.value !== undefined) {
        setIdProvider(newvalue.value.id);
      }

    } else {
      // Clear the information 
      setIdProvider('');

    }
  }

  const handleChangeBrand = (newvalue) => {

    if (newvalue.value !== null) {

      // Set the id
      if (newvalue.value !== undefined) {
        setIdBrand(newvalue.value.id);
      }

    } else {
      // Clear the information 
      setIdBrand('');

    }
  }


  const [files, setFiles] = useState([]);

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
    arrayFile = [];

    file.map(v => {
      arrayFile.push(v)
    })
    files.map(v => {
      arrayFile.push(v)
    })

    setFiles(arrayFile);
    setClickableB(false);

  }
  const onFilesError = (error, file) => {
    setFiles(file)
  }

  // Enable upload image throug the click on the button upload image
  const uploadImage = () => {
    setClickableB(true);
  }

  // Disable the window that allows upload files

  const blockUploadImage = () => {
    setClickableB(false);
  }

  // Handle unit purchase price
  const handleUnitPurchasePrice = (e) => {
    if (e !== "" && e >= 0) {
      let salePrice = parseFloat(e * (percentageProfit / 100)) + parseFloat(e);

      if (salePrice !== undefined && salePrice !== null) {
        salePrice = salePrice.toFixed(2);
        setUnitSalePrice(salePrice);
      } else {
        setUnitSalePrice('');

      }
    }
    // jere
  }

  // Handle percentage profit
  const handlePercentageProfit = (e) => {
    if (e !== "" && e >= 0) {
      setPercentageProfit(e);
    } else {
      setPercentageProfit("");

    }
  }

  return (
    <Fragment>
      <Breadcrumb parent={t("product")} title={t("titleCreateProduct")} />
      <Container fluid={true}>
        <Row className="justify-content-md-center">
          <Col sm="12" >
            <Card>
              <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>
                <CardBody>
                  {/* General Information */}
                  <Col className="col-12">
                    <h6 className="sub-title ">{t("generalInformation")}</h6>

                  </Col>

                  <Row style={{ marginTop: '15px' }}>
                    <Col md="4 mb-3">
                      <Label>{t("productName")}</Label>
                      <input className="form-control btn-pill" name="productName" type="text" placeholder={t('productName')} {...register('productName', { required: true })} />
                      <span>{errors.productName && t("errorProductName")}</span>
                    </Col>
                    <Col md="4 mb-3">
                      <Label>{t("category")}</Label>
                      <SelectBox
                        dataSource={dataCategory}
                        value={dataCategory.length > 0 ? dataCategory.find(v => v.id === idCategory) : ''}
                        displayExpr="name"
                        searchEnabled={true}
                        className={'form-control dxSelectBorder'}
                        placeholder={t('category')}
                        showClearButton={true}
                        name="selectCountry"
                        onValueChanged={handleChangeCategory}
                      />
                      <input type="hidden" />
                      <span>{((idCategory === '' || idCategory === undefined) && validateClass) && t("errorCategory")}</span>
                    </Col>
                    <Col md="4 mb-3">
                      <Label>{t("subcategory")}</Label>
                      <SelectBox
                        dataSource={dataSubCategory}
                        displayExpr="name"
                        value={dataSubCategory.length > 0 ? dataSubCategory.find(v => v.id === idSubCategory) : ''}
                        searchEnabled={true}
                        className={'form-control dxSelectBorder'}
                        placeholder={t('category')}
                        showClearButton={true}
                        name="selectSubCategory"
                        onValueChanged={handleChangeSubCategory}
                      />
                      <input type="hidden" />
                      <span>{((idSubCategory === '' || idSubCategory === undefined) && validateClass) && t("errorSubCategory")}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4 mb-3">
                      <Label>{t("stockLimit")}</Label>
                      <input className="form-control btn-pill" name="stockLimit" type="number" placeholder={t('stockLimit')} {...register('stockLimit', { required: true })} />
                      <span>{errors.stockLimit && t("errorStockLimit")}</span>
                    </Col>
                    <Col md="4 mb-3">
                      <Label>{t("percentageProfit")}</Label>
                      <input className="form-control btn-pill" name="percentageProfit" type="number" step="0.001" min="0" max="999999999.999" placeholder={t('percentageProfit')} {...register('percentageProfit', { required: true })} onBlur={(e) => handlePercentageProfit(e.target.value)} />
                      <span>{errors.percentageProfit && t("errorPercentageProfit")}</span>
                    </Col>
                    <Col md="4 mb-3">
                      <Label>{t("questionRbtAddProduct")}</Label>
                      <FormGroup className="m-t-15 m-checkbox-inline mb-0 custom-radio-ml" onChange={handleRadioButton}>
                        <div className="radio radio-primary">
                          <Input id="radioinline1" type="radio" name="radio1" value="1" />
                          <Label className="mb-0" for="radioinline1">{t("positiveAnswer")}</Label>
                        </div>
                        <div className="radio radio-primary">
                          <Input id="radioinline2" type="radio" name="radio1" value="2" defaultChecked />
                          <Label className="mb-0" for="radioinline2">{t('negativeAnswer')}</Label>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                 
                  <Row>
                  <Col md="4 mb-3">
                    <Label>{t("barcode")}</Label>
                    <input className="form-control btn-pill" name="barcode" type="text" placeholder={t('barcode')} {...register('barcode', { required: true })} />
                    <span>{errors.barcode && t("errorBarcode")}</span>
                    {/* <div className="valid-feedback">{"Looks good!"}</div> */}
                  </Col>
                    <Col md="12 mb-1">
                      <Label>{t("description")}</Label>
                      <Input type="textarea" className="form-control btn-pill" rows="2" name="description" placeholder={t("description")} onChange={(ev) => { setDescription(ev.target.value) }} />
                    </Col>
                  </Row>
                  {/* End general information */}


                  {/* Add stock */}


                  <div style={{ display: showAddStock ? 'block' : 'none' }}>
                    <Row style={{ marginTop: '15px' }} >
                      <Col className="col-12" style={{ marginBottom: '15px' }}>
                        <h6 className="sub-title ">{t("enterProduct")}</h6>

                      </Col>

                      <Col md="4 mb-3">
                        <Label>{t("provider")}</Label>
                        <SelectBox
                          dataSource={dataProvider}
                          displayExpr="comercialName"
                          searchEnabled={true}
                          className={'form-control dxSelectBorder'}
                          placeholder={t('provider')}
                          showClearButton={true}
                          name="selectProvider"
                          onValueChanged={handleChangeProvider}
                        />
                        <input type="hidden" />
                        <span>{((idProvider === '' || idProvider === undefined) && validateClass) && t("errorProvider")}</span>
                      </Col>
                      <Col md="4 mb-3">
                        <Label>{t("nameBrand")}</Label>
                        <SelectBox
                          dataSource={dataBrand}
                          displayExpr="name"
                          searchEnabled={true}
                          className={'form-control dxSelectBorder'}
                          placeholder={t('nameBrand')}
                          showClearButton={true}
                          name="selectBrand"
                          onValueChanged={handleChangeBrand}
                        />
                        <input type="hidden" />
                        <span>{((idBrand === '' || idBrand === undefined) && validateClass) && t("errorSubCategory")}</span>
                      </Col>
                      <Col md="4 mb-3">
                        <Label>{t("amount")}</Label>
                        <input className="form-control btn-pill" name="amount" type="number" placeholder={t('amount')} {...register('amount', { required: showAddStock ? true : false })} />
                        <span>{errors.amount && t("errorAmount")}</span>
                      </Col>
                    </Row>
                    <Row>

                      <Col md="4 mb-3">
                        <Label>{t("unitPrice")}</Label>
                        <input className="form-control btn-pill" name="unitPrice" type="number" step="0.001" min="0" max="999999999.999" placeholder={t('unitPrice')} {...register('unitPrice', { required: showAddStock ? true : false })} onBlur={(e) => handleUnitPurchasePrice(e.target.value)} />
                        <span>{errors.unitPrice && t("errorUnitPrice")}</span>
                      </Col>
                      <Col md="4 mb-3">
                        <Label>{t("saleUnitPrice")}</Label>
                        <input className="form-control btn-pill" name="saleUnitPrice" type="number" step="0.001" min="0" max="999999999.999" placeholder={t('saleUnitPrice')} defaultValue={unitSalePrice} />
                        {
                          showAddStock ? (
                            <span>{unitSalePrice === '' && validateClass && t("errorUnitSalePrice")}</span>
                          ) : ''
                        }
                      </Col>

                    </Row>
                  </div>
                  {/* End add stock */}

                  {/* Upload images */}
                  <Row>
                    <Col md="12 mb-2">
                      <Label>{t("productPhotos")}</Label>
                      <Row >
                        <Col sm="12">
                          <Card>
                            <CardHeader>
                              <h5>{t("choosePicture")}</h5>
                            </CardHeader>
                            <CardBody className="fileUploader">
                              <Files
                                className='files-dropzone fileContainer'
                                onChange={onFilesChange}
                                onError={onFilesError}
                                accepts={['image/*']}
                                multiple={true}
                                maxFileSize={100000000}
                                minFileSize={0}
                                clickable={clickableB}
                              >

                                <div className="d-flex justify-content-center">
                                  <input type="button" className="chooseFileButton me-2" onPointerEnter={uploadImage} onPointerLeave={blockUploadImage} value={"Upload Image"} />
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
                              {/* devjson cloudinary*/}

                            </CardBody>
                          </Card>
                        </Col>
                      </Row>

                    </Col>
                  </Row>


                </CardBody>
                <CardFooter>
                  <Button className="me-1" color="primary" type="submit" disabled={loading ? loading : loading} onClick={() => setValidateClass(true)}>{loading ? t("processing") : t("create")}</Button>
                  <Button type="button" color="secondary" onClick={clearData} >{t("cancel")}</Button>
                </CardFooter>
              </Form>


              {/* Loader  */}
              {/* loderhide */}
              <div className={loading ? 'loader-wrapper back' : 'loader-wrapper back loderhide'}><div className="loader-index">
                <span></span></div>
              </div>

            </Card>
          </Col>
        </Row>
      </Container >


    </Fragment >
  );
};

export default ProductCreate;