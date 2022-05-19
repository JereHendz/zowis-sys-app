import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { Container, Row, Col, Card, CardHeader, Table, CardBody } from "reactstrap";
import axios from "axios";
import { classes } from "../../data/layouts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import 'devextreme/dist/css/dx.material.teal.light.css';
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
  Button,
  Toolbar,
  Export
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';

const UserList = () => {

  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/users`)
      .then((payload) => {
        console.log(payload);
        setListUser(payload.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const [listUser, setListUser] = useState([]);
  const navigate = useNavigate();
  const notesEditorOptions = { height: 100 };

  // Define error array
  const [error, setError] = useState({
    userName: "",
    email: "",
    password: "",
    passConfirm: "",
  });

  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout = localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const allowedPageSizes = [5, 10, 15];

  const onAddButtonClick= (e)=>{
    console.log("jere");
  }

  return (
    <Fragment>
      <Breadcrumb parent="Users" title={t("titleListUsers")} />
      <Container fluid={true}>
        <Row className="justify-content-md-center">
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{t("subtitleListUsers")}</h5>
              </CardHeader>
              <CardBody>
                <Row >
                  <Col sm="12" lg="12" xl="12">
                    <div className="table-responsive">
                      <div id="data-grid-demo" className="table-primary">
                        <DataGrid
                          dataSource={listUser}
                          keyExpr="id"
                          showBorders={true}
                          rowAlternationEnabled={true}
                          onRowInserting={onAddButtonClick}
                        >
                          <Export enabled={true} />
                          <SearchPanel visible={true} highlightCaseSensitive={true} />
                          {/* <AllowColumnResizing /> */}
                          <Scrolling
                            useNative={false}
                            scrollByContent={true}
                            scrollByThumb={true}
                            showScrollbar="onHover" />
                          <Paging defaultPageSize={5} />
                          <Pager
                            showPageSizeSelector={true}
                          />
                          <Column type='buttons'>
                            <Button name='edit' />
                            <Button name='save' />
                          </Column>
                          <Column dataField="userName" caption={t('userName')} />
                          <Column dataField="email" caption={t('email')} />
                          <Column dataField="createDate" caption={t('createDate')} width={200} />
                          <Toolbar>
                            <Item name='addRowButton'  onClick={onAddButtonClick} />
                            <Item name='addRowButtonJe'  />
                            <Item name='exportButton' />
                            <Item name='searchPanel' showText='always' />
                          </Toolbar>
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

export default UserList;
