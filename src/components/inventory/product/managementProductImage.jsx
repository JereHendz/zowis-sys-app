import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb";
import { Container, Row, Col, Card, Media, CardHeader, Table, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";

import axios from "axios";
import { classes } from "../../../data/layouts";
import 'devextreme/dist/css/dx.material.teal.light.css';
import { useNavigate } from "react-router-dom";
import { SelectBox } from 'devextreme-react/select-box';
import PopupImage from "./popupImage";
import { toast } from 'react-toastify';




import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Lookup,
  Form,
  SearchPanel,
  Scrolling,
  Pager,
  // Button,
  Export,
  HeaderFilter,
  RequiredRule
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import notify from 'devextreme/ui/notify';
import { Item } from 'devextreme-react/form';
import Toolbar from 'devextreme-react/toolbar';
import { useTranslation } from 'react-i18next';


const ManagementProductImage = () => {
  const navigate = useNavigate();

  // To traslate the words
  const { t } = useTranslation();

  // To get the information of the images prodcuts
  const [dataImagesProduct, setDataImagesProduct] = useState([]);

  // To get the list of product
  const [listProducts, setListProducts] = useState([]);
  const [productId, setProductId] = useState('');

  const [dataImage, setDataImage] = useState([]);


  // To get the list of status
  const [listStatus, setListStatus] = useState([]);

  // To get the status of brands
  const [statusProduct, setStatusProduct] = useState([]);

  // To determinate if the event is create or edit:  edit:true and create:false
  const [isEditPopup, setIsEditPopup] = useState(false);

  const [visibleCustomer, setVisibleCustomer] = useState(false);

  // Know the size of the image array
  const [sizeArrayImage, setSizeArrayImage] = useState(false);




  // Spaces
  const tab = '\u00A0';

  // To control the menu
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();


  // Use effect is launch one time when the page load
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/products`)
      .then((response) => {
        setListProducts(response.data.listProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get the list of status only load once time

  useEffect(() => {
    // We pass like parameter 3 because 1 has the image status: visble y no visible
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/processstate/${3}`)
      .then((response) => {
        setListStatus(response.data.listStatus);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  function searchImagesByProduct() {
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/imagesById/${productId}`)
      .then((response) => {
        setDataImagesProduct(response.data.imagesByProduct);
        setSizeArrayImage(response.data.imagesByProduct.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const createBrand = (e) => {

    if (productId !== '') {
      setIsEditPopup(false);
      setControlOpenModal(!controlOpenModal);
    } else {
      toast.error(t('errorSelectProduct'));
    }

  };


  const cellRenderAction = (data) => {
    return <div align="center"><i style={{ cursor: 'pointer' }} className="icofont icofont-ui-edit" onClick={() => editImageProduct(data)} /></div>;
  }

  const cellRenderActionImage = (data) => {
    return <div align="center">
      <Media src={data.data.link} alt="" className="img-fluid" height={200} width={100} />

    </div>;
  }

  const [controlOpenModal, setControlOpenModal] = useState(false);

  const editImageProduct = (e) => {
    setDataImage(e.data);
    setIsEditPopup(true);
    setVisibleCustomer(e.data.visibleCustomer);
    setControlOpenModal(!controlOpenModal);
  }

  const handleChangeProduct = (newvalue) => {
    if (newvalue.value !== null) {
      // Set the id
      if (newvalue.value !== undefined) {
        setProductId(newvalue.value.id);
        // Search product
        axios
          .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/imagesById/${newvalue.value.id}`)
          .then((response) => {
            setDataImagesProduct(response.data.imagesByProduct);
            setSizeArrayImage(response.data.imagesByProduct.length);
            if (response.data.imagesByProduct.length <= 0) {
              toast.warning(t("msgExistImage"));
            }             
           
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      setProductId('');
    }
  }


  return (
    <Fragment>
      <Breadcrumb parent="Products" title={t("titleListProducts")} />
      <Container fluid={true}>
        <Row className="justify-content-md-center">
          <Col sm="12" xl="12">
            <Card>
              <CardBody>
                <Row >
                  <Col sm="12" lg="12" xl="12">
                    <div className="table-responsive">
                      <div id="data-grid-demo" className="table-primary">

                        {/* Popup */}
                        <PopupImage
                          controlOpenModal={controlOpenModal}
                          setControlOpenModal={setControlOpenModal}
                          dataImage={dataImage}
                          setDataImage={setDataImage}
                          isEditPopup={isEditPopup}
                          visibleCustomer={visibleCustomer}
                          setVisibleCustomer={setVisibleCustomer}
                          listStatus={listStatus}
                          setDataImagesProduct={setDataImagesProduct}
                          productId={productId}
                          sizeArrayImage={sizeArrayImage}
                          setSizeArrayImage={setSizeArrayImage}

                        />

                        <Row style={{ marginBottom: '25px' }}>
                          <Col md="6 mb-2">
                            <Label>{t("placeHolderSelectProdut")}</Label>
                            <SelectBox
                              dataSource={listProducts}
                              displayExpr="productName"
                              className={'form-control dxSelectBorder'}
                              searchEnabled={true}
                              placeholder={t('placeHolderSelectProdut')}
                              showClearButton={true}
                              name="selectProduct"
                              onValueChanged={handleChangeProduct}
                            />

                            {/* <input type="hidden" /> */}
                            {/* <span>{((productId === '' || productId === undefined)) && t("errorSelectProduct")}</span> */}
                            {/* <div className="valid-feedback">{"Looks good!"}</div> */}

                          </Col>
                          {/* <Col md="6 mb-2" >
                            <Button className="btn-pill btn-air-light" style={{ marginTop: '26px' }} color="light" onClick={searchImagesByProduct}><i className="icofont icofont-ui-search"></i>{tab + tab}{t('btnSearch')}</Button>

                          </Col> */}
                        </Row>

                        <div className="btn-showcase ">
                          <Button className="btn-pill" color="primary" onClick={createBrand}><i className="icofont icofont-ui-add"></i>{tab + tab}{t('create')}</Button>
                        </div>

                        <DataGrid
                          dataSource={dataImagesProduct}
                          keyExpr="id"
                          showBorders={true}
                          rowAlternationEnabled={true}
                          columnAutoWidth={true}
                          t={t}
                        >
                          <HeaderFilter visible={true} allowSearch={true} />
                          <Export enabled={true} />
                          <SearchPanel visible={true} highlightCaseSensitive={true} width={350} />
                          <Scrolling
                            useNative={false}
                            scrollByContent={true}
                            scrollByThumb={true}
                            showScrollbar="onHover" />
                          <Paging defaultPageSize={5} />
                          <Pager
                            showPageSizeSelector={true}
                          />

                          <Editing
                            mode="popup"
                            allowUpdating={false}
                            allowAdding={false}
                            allowDeleting={false}>
                          </Editing>

                          <Column caption={t('actions')} cellRender={cellRenderAction} width={100} />

                          <Column dataField="link" caption={t('image')} cellRender={cellRenderActionImage} alignment='center' >
                            <RequiredRule />
                          </Column>
                          <Column dataField="priority" caption={t('priority')} >
                            <RequiredRule />
                          </Column>
                          <Column dataField="productName" caption={t('productName')} >
                            <RequiredRule />
                          </Column>
                          <Column dataField="visibleCustomer" caption={t('visibleCustomer')} >
                            <RequiredRule />
                          </Column>
                        </DataGrid>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>

            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );

};




export default ManagementProductImage;
