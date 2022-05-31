import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import axios from "axios";
import { classes } from "../../data/layouts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import 'devextreme/dist/css/dx.material.teal.light.css';
import DataGrid, {
  Column,  Editing, Paging,  Lookup,  SearchPanel,  Scrolling,  Pager,   Export, HeaderFilter,  RequiredRule} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import EditCategory from "./editCategory";
import CreateCategory from "./createCategory";

const CategoriesList = () => {
  //variables estandar
  const { t } = useTranslation();
  const navigate = useNavigate();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout = localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

  //variables para la lista de categorias
  const [categoriesList, setCategoriesList] = useState([]);
  const [statusListCategories, setStatusListCategories] = useState([]);

  const tab = '\u00A0';

  //variables para la modal
  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const [dataCategory, setDataCategory] = useState([]);
  const [error, setError] = useState({
    'category': '',
  });


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/categories`)
      .then((res) => {
        setCategoriesList(res.data.categories);
        setStatusListCategories(res.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //redirección al formulario de creación
  const createCategory = (e) => {
    setCreateOpen(!createOpen);
  };

  //funcion que renderiza el botón de edición en la tabla
  const cellRenderAction = (data) => {
    return <div align="center"><i style={{ cursor: 'pointer' }} className="icofont icofont-ui-edit" onClick={() => editCategory(data)} /></div>;
  }

  //funcion para levantar la modal de edición de un usuario
  const editCategory = (e) => {
    setDataCategory(e.data);
    setEditOpen(!editOpen);
  }

  return (
    <Fragment>
      <Breadcrumb parent={t("categories")} title={t("titleListCategories")} />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Row >
                  <Col sm="12" lg="12" xl="12">
                    <div className="table-responsive">
                      <div id="data-grid-demo" className="table-primary">
                          <CreateCategory
                            createOpen={createOpen} setCreateOpen={setCreateOpen}
                            setCategoriesList={setCategoriesList}
                            error={error} setError={setError}
                          /> 
                        <EditCategory
                          editOpen={editOpen} setEditOpen={setEditOpen}
                          dataCategory={dataCategory} setDataCategory={setDataCategory}
                          error={error} setError={setError}
                          setCategoriesList={setCategoriesList}
                          statusListCategories={statusListCategories}
                        />
                        <div className="btn-showcase ">
                          <Button className="btn-pill" color="primary" onClick={createCategory}><i className="icofont icofont-ui-add"></i>{tab + tab}{t('create')}</Button>
                        </div>
                        <DataGrid
                          dataSource={categoriesList}
                          keyExpr="id"
                          showBorders={true}
                          rowAlternationEnabled={true}
                          columnAutoWidth={true}
                          t={t}
                        >
                          <HeaderFilter visible={true} allowSearch={true} />
                          <Export enabled={true} />
                          <SearchPanel visible={true} highlightCaseSensitive={true} width={450} />
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
                          <Column dataField="name" caption={t('category')} >
                            <RequiredRule />
                          </Column>
                          <Column dataField="description" caption={t('description')} />
                          <Column dataField="status" caption={t('selectStatus')} >
                            <Lookup dataSource={statusListCategories} valueExpr="id" displayExpr={"name"} />
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

export default CategoriesList;
