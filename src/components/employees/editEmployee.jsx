import React, { useState, Fragment, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, Table, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from 'react-i18next';


const PopupEditEmployee = (props) => {
  const { t } = useTranslation();

    console.log("jere");
    console.log(props);


    return (
        <Modal isOpen={props.controlModalEditEmployee} toggle={props.changeStatusModalEmployee} centered>
            <ModalHeader toggle={props.changeStatusModalEmployee}>
                {t("editInfo")}
            </ModalHeader>
            <ModalBody>
                <p>{"Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."}</p>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.changeStatusModalEmployee} >{t('close')}</Button>
                <Button color="primary"  >{t('update')}</Button>
            </ModalFooter>
        </Modal>
    );
}

export default PopupEditEmployee;