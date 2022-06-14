import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../../layout/breadcrumb";
import { Container, Row, Col, Card, CardHeader, Table, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import axios from "axios";
import { classes } from "../../../data/layouts";
import 'devextreme/dist/css/dx.material.teal.light.css';
import PopupBrand from "./popupBrand";


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


const ListProduct = () => {
  // To traslate the words
  const { t } = useTranslation();

  // To get the information of the brand
  const [dataProducts, setDataProducts] = useState([]);

  // To get the list of brands
  const [listProducts, setListProducts] = useState([]);

  // To get the list of status
  const [listStatus, setListStatus] = useState([]);

  // To get the status of brands
  const [statusProduct, setStatusProduct] = useState([]);

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
    // We pass like parameter 1 because 1 has the general status
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/processstate/${1}`)
      .then((response) => {
        setListStatus(response.data.listStatus);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const createBrand = (e) => {
    
  };

  const cellRenderAction = (data) => {
    return <div align="center"><i style={{ cursor: 'pointer' }} className="icofont icofont-ui-edit" onClick={() => editPopupBrand(data)} /></div>;
  }

  const [controlOpenModal, setControlOpenModal] = useState(false);

  const editPopupBrand = (e) => {
    // setDataBrands(e.data);
  }


  return (
    <Fragment>
      <Breadcrumb parent="Products" title={t("titleListProducts")} />
      <Container fluid={true}>
        <Row className="justify-content-md-center">
          <Col sm="12" xl="10">
            <Card>
              <CardBody>
                <Row >
                  <Col sm="12" lg="12" xl="12">
                    <div className="table-responsive">
                      <div id="data-grid-demo" className="table-primary">

                        <div className="btn-showcase ">
                          <Button className="btn-pill" color="primary" onClick={createBrand}><i className="icofont icofont-ui-add"></i>{tab + tab}{t('create')}</Button>
                        </div>

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
