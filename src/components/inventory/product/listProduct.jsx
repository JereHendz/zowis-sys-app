import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb";
import { Container, Row, Col, Card, CardHeader, Table, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import axios from "axios";
import { classes } from "../../../data/layouts";
import 'devextreme/dist/css/dx.material.teal.light.css';
import { useNavigate } from "react-router-dom";
import PopupAddStock from "./popupAddStock";


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
import PopupEditProduct from "./popupEditProduct";


const ListProduct = () => {
  const navigate = useNavigate();

  // To traslate the words
  const { t } = useTranslation();

  // To get the information of the brand
  const [dataProducts, setDataProducts] = useState([]);

  // To get the list of products
  const [listProducts, setListProducts] = useState([]);

  // To get the list of status
  const [listStatus, setListStatus] = useState([]);

  // To get the status of products
  const [statusProduct, setStatusProduct] = useState([]);

  // To get the list of providers
  const [dataProvider, setDataProvider] = useState([]);
  const [idProvider, setIdProvider] = useState("");

  // To get the list of brands
  const [dataBrand, setDataBrand] = useState([]);
  const [idBrand, setIdBrand] = useState("");

  // To get the category 
  const [dataCategory, setDataCategory] = useState([]);
  const [idCategory, setIdCategory] = useState("");
  const [dataSubCategory, setDataSubCategory] = useState([]);
  const [idSubCategory, setIdSubCategory] = useState("");
  // Create a copy of the category data
  const [dataSubCategoryCopy, setDataSubCategoryCopy] = useState([]);

// To get the description of the product selected
  const [description, setDescription] = useState('');


  // To determinate if the event is create or edit:  edit:true and create:false
  // const [isEditPopup, setIsEditPopup] = useState(false);



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
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}api/products`)
      .then((response) => {
        setListProducts(response.data.listProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get the list of status only load once time

  useEffect(() => {
    // We pass like parameter 1 because 1 has the general status
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}api/processstate/${1}`)
      .then((response) => {
        setListStatus(response.data.listStatus);
      })
      .catch((error) => {
        console.log(error);
      });
    getProviderAndBrand();
  }, []);



  const createBrand = (e) => {
    navigate(`${process.env.PUBLIC_URL}/app/inventory/product/ProductCreate/${layout}`);

  };

  const cellRenderAction = (data) => {
    return <div align="center">
      <i style={{ cursor: 'pointer' }} className="icofont icofont-ui-edit" onClick={() => editProductPopup(data)} />
      <i style={{ cursor: 'pointer', marginLeft: '7px' }} className="icofont icofont-ui-clip-board" onClick={() => addProductoToStock(data)} />
    </div>;
  }

  const [controlOpenModal, setControlOpenModal] = useState(false);
  const [controlOpenModalEdit, setControlOpenModalEdit] = useState(false);


  const editProductPopup = (e) => {
    setDataProducts(e.data);
    setControlOpenModalEdit(!controlOpenModalEdit);
    setIdSubCategory(e.data.idSubCategory);

    let dataSubCat = dataSubCategoryCopy.filter(item => item.id === e.data.idSubCategory);
    setIdCategory( dataSubCat.length > 0 ? dataSubCat[0].idCategory : '');
    setDataSubCategory(dataSubCategoryCopy.filter(item=>item.idCategory===dataSubCat[0].idCategory));
    setStatusProduct(e.data.status);
  }

  // Add product to the stock

  const addProductoToStock = (e) => {
    setDataProducts(e.data);
    setControlOpenModal(!controlOpenModal);
  }

  function getProviderAndBrand() {
    axios.get(`${process.env.REACT_APP_DOMAIN_SERVER}api/infoFormProduct`)
      .then((res) => {
        setDataCategory(res.data.categories)
        setDataSubCategory(res.data.subCategories)
        setDataSubCategoryCopy(res.data.subCategories)        
        setDataBrand(res.data.brands)
        setDataProvider(res.data.providers)
      })
      .catch((errors) => {
        console.log(errors);
      });
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

                        <div className="btn-showcase ">
                          <Button className="btn-pill" color="primary" onClick={createBrand}><i className="icofont icofont-ui-add"></i>{tab + tab}{t('create')}</Button>
                        </div>

                        <PopupAddStock
                          controlOpenModal={controlOpenModal}
                          setControlOpenModal={setControlOpenModal}
                          dataProducts={dataProducts}
                          setDataProducts={setDataProducts}
                          setListProducts={setListProducts}
                          dataBrand={dataBrand}
                          dataProvider={dataProvider}
                        />

                        <PopupEditProduct
                          controlOpenModalEdit={controlOpenModalEdit}
                          setControlOpenModalEdit={setControlOpenModalEdit}
                          dataProducts={dataProducts}
                          setDataProducts={setDataProducts}
                          setListProducts={setListProducts}
                          dataBrand={dataBrand}
                          dataProvider={dataProvider}
                          dataCategory={dataCategory}
                          idCategory={idCategory}
                          dataSubCategory={dataSubCategory}
                          idSubCategory={idSubCategory}
                          setIdCategory = {setIdCategory}
                          setDataSubCategory = {setDataSubCategory}
                          setIdSubCategory = {setIdSubCategory}
                          description={description}
                          setDescription={setDescription}
                          listStatus={listStatus}
                          statusProduct={statusProduct}
                          setStatusProduct={setStatusProduct}
                        />

                        <DataGrid
                          dataSource={listProducts}
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

                          <Column dataField="productName" caption={t('productName')} >
                            <RequiredRule />
                          </Column>
                          <Column dataField="description" caption={t('description')} >
                            <RequiredRule />
                          </Column>
                          <Column dataField="stockProduct" caption={t('stockProduct')} >
                            <RequiredRule />
                          </Column>
                          <Column dataField="percentageProfit" caption={t('percentageProfit')} >
                            <RequiredRule />
                          </Column>
                          <Column dataField="idSubCategory" caption={t('subcategory')} >
                            <RequiredRule />
                          </Column>
                          <Column dataField="status" caption={t("selectStatus")} >
                            <Lookup dataSource={listStatus} valueExpr="id" displayExpr="name" />
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




export default ListProduct;
