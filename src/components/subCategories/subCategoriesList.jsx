import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { Container, Row, Col, Card, CardHeader, Table, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { classes } from "../../data/layouts";
import 'devextreme/dist/css/dx.material.teal.light.css';
import DataGrid, { Column,  Editing,  Popup,  Paging,  Lookup,  Form,  SearchPanel,  Scrolling,  Pager, Export,  HeaderFilter,  RequiredRule} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { useTranslation } from 'react-i18next';
import PopupSubCategory from "./popupSubCategories";


const ListSubCategories = () => {
  // To traslate the words
  const { t } = useTranslation();

  // To get the information of the sub categories
  const [dataSubCategory, setDataSubCategory] = useState([]);

  // To get the information of the categories
  const [listCategories, setListCategories] = useState([]);

  // To get the list of SubCategories
  const [listSubCategories, setListSubCategories] = useState([]);

  // To get the list of status
  const [listStatus, setListStatus] = useState([]);

  // To get the status of SubCategories
  const [statusSubCategory, setStatusSubCategory] = useState('');

  // To determinate if the event is create or edit:  edit:true and create:false
  const [isEditPopup, setIsEditPopup] = useState(false);

  const [controlOpenModal, setControlOpenModal] = useState(false);

  // Spaces
  const tab = '\u00A0';

  // Use effect is launch one time when the page load
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/subcategories`)
      .then((response) => {
        setListSubCategories(response.data.sub_categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Use effect is launch one time when the page load
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/categories`)
      .then((response) => {
        setListCategories(response.data.categories);
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

  const cellRenderAction = (data) => {
    return <div align="center"><i style={{ cursor: 'pointer' }} className="icofont icofont-ui-edit" onClick={() => editPopupSubCategory(data)} /></div>;
  }

  const createSubCategory = (e) => {
    setDataSubCategory(
      {
        createDate: "",
        description: "",
        id: "",
        name: "",
        idCategory: "",
      }
    );
    setIsEditPopup(false);
    setControlOpenModal(!controlOpenModal);
  };

  const editPopupSubCategory = (e) => {
    setIsEditPopup(true);
    setDataSubCategory(e.data);
    setStatusSubCategory(e.data.status);
    setControlOpenModal(!controlOpenModal);
  }


  return (
    <Fragment>
      <Breadcrumb parent="SubCategories" title={t("titleListSubcategories")} />
      <Container fluid={true}>
        <Row className="justify-content-md-center">
          <Col sm="12" xl="10">
            <Card>
              <CardBody>
                <Row >
                  <Col sm="12" lg="12" xl="12">
                    <div className="table-responsive">
                      <div id="data-grid-demo" className="table-primary">

                        {/* Popup */}
                        <PopupSubCategory
                          controlOpenModal={controlOpenModal}
                          setControlOpenModal={setControlOpenModal}
                          dataSubCategory={dataSubCategory}
                          setDataSubCategory={setDataSubCategory}
                          isEditPopup={isEditPopup}
                          statusSubCategory={statusSubCategory}
                          setStatusSubCategory={setStatusSubCategory}
                          listStatus={listStatus}
                          setListSubCategories={setListSubCategories}
                          listCategories={listCategories}
                        />


                        <div className="btn-showcase ">
                          <Button className="btn-pill" color="primary" onClick={createSubCategory}><i className="icofont icofont-ui-add"></i>{tab + tab}{t('create')}</Button>
                        </div>

                        <DataGrid
                          dataSource={listSubCategories}
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

                          <Column dataField="idCategory" caption={t("category")} >
                            <Lookup dataSource={listCategories} valueExpr="id" displayExpr="name" />
                          </Column>
                          <Column dataField="name" caption={t('subcategory')} >
                            <RequiredRule />
                          </Column>
                          <Column dataField="description" caption={t('description')} >
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

export default ListSubCategories;
