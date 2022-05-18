import React, { useState, Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import axios from "axios";
import { Col, Button, Form, Label, Input, FormGroup, InputGroup, InputGroupText, Row } from 'reactstrap'
import { Typeahead } from 'react-bootstrap-typeahead';
import { useTranslation } from 'react-i18next';
import { classes } from '../../data/layouts';
import { useNavigate } from "react-router-dom";

const CreateFormEmployee = () => {

  const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const [validateClass, setValidateClass] = useState(false);
  const [roles, setRoles] = useState([]);
  const [country, setCountry] = useState([]);
  const [department, setDepartment] = useState([]);
  const [municipio, setMunicipio] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dui, setDui] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [idRol, setIdRol] = useState('');
  const [idCountry, setIdCountry] = useState('');
  const [idDepartment, setIdDepartment] = useState('');
  const [idMunicipio, setIdMunicipio] = useState('');
  const [address, setAddress] = useState('');

  // References to control Typeahead
  const refCountry = React.useRef();
  const refDepto = React.useRef();
  const refMunicipio = React.useRef();
  const refRol = React.useRef();
  const refRolInput = React.useRef();


  // Constant that allow traslate
  const { t } = useTranslation();

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


  const multiple = false

  const onSubmit: SubmitHandler<FormValues> = data => {
    // If all validations are met we'll call register method
    createEmployee(data);


  }

  // UseEfecct is launched just opening the page
  useEffect(() => {

    // Get the list of roles and countries
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}api/roles`)
      .then((response) => {
        setRoles(response.data.roles);
        setCountry(response.data.countries);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  // Function that executed when the deparment change value

  const handleSelectedChangeDepartment = event => {
    if (event.length > 0) {
      // Set the id of country
      setIdCountry(event[0].id);
      // Get the departments by id country
      axios
        .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/departments/${event[0].id}`)
        .then((payload) => {
          // If everything is good, load the array of departments in the Typeahead or select
          setDepartment(payload.data);
        })
        .catch((error) => {
          setDepartment([]);
          console.log(error);
        });

    } else {
      // Clear the information of country
      setIdCountry("");
      refCountry.current.clear();

      // Clear the value of the Typeahead that control departments
      refDepto.current.clear();

      // Reset department's array
      setDepartment([]);

      // Clear the value of Municipios 
      refMunicipio.current.clear();

      // Set up the array of municipio to empty
      setMunicipio([]);
    }
  }

  const handleSelectRol = event => {
    console.log(refRolInput);

    if (event.length > 0) {
      setIdRol(event[0].id);
    } else {
      setIdRol("");
    }

  }

  const handleSelectedChangeMunicipio = (event) => {
    if (event.length > 0) {
      // Set the id
      setIdDepartment(event[0].id);
      // Get the departments by id country
      axios
        .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/municipios/${event[0].id}`)
        .then((payload) => {
          setMunicipio(payload.data);
        })
        .catch((error) => {
          console.log(error);
          setMunicipio([]);
        });

    } else {
      // Clear the information of department
      setIdDepartment("");
      refDepto.current.clear();


      // If there isn't deparment selected we have to clear the municipio value
      refMunicipio.current.clear();

      // Set up the array of municipio to empty
      setMunicipio([]);
    }
  }


  const handleChangeMunicipio = (event) => {
    if (event.length > 0) {
      // Set the id
      setIdMunicipio(event[0].id);

    } else {
      // Clear the information of municipio
      setIdMunicipio("");
      refMunicipio.current.clear();
    }
  }

  // Function that allow save the record
  const createEmployee = (data) => {
    if (idRol != "" && idCountry != "") {
      setLoading(true);
      const info = { firstName: data.firstName, lastName: data.lastName, dui, phoneNumber: data.phoneNumber, email: data.email, idRol, idCountry, idDepartment, idMunicipio, address: data.address };

      axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/employees`, info)
        .then((res) => {
          // navigate(`${process.env.PUBLIC_URL}/app/employees/userList/${layout}`);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data.messages);
        });
    }

  };

  return (
    <Fragment>
      <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6 mb-2">
            <Label>{t("firstName")}</Label>
            <input className="form-control" name="firstName" type="text" placeholder="Nombres" onChange={e => setFirstName(e.target.value)} {...register('firstName', { required: true })} />
            <span>{errors.firstName && t("errorFirstName")}</span>
            {/* <div className="valid-feedback">{"Looks good!"}</div> */}
          </Col>
          <Col md="6 mb-2">
            <Label>{t("lastName")}</Label>
            <input className="form-control" name="lastName" type="text" placeholder="Apellidos" onChange={e => setLastName(e.target.value)} {...register('lastName', { required: true })} />
            <span>{errors.lastName && t("errorLastName")}</span>
            <div className="valid-feedback">{"Looks good!"}</div>
          </Col>
        </Row>

        <Row>
          <Col md="6 mb-2">
            <Label>{"Dui"}</Label>
            <input className="form-control" name="dui" type="text" placeholder="Dui" onChange={e => setDui(e.target.value)} />
          </Col>
          <Col md="6 mb-2">
            <Label>{t("phoneNumber")}</Label>
            <input className="form-control" name="phoneNumber" type="text" placeholder="Teléfono" onChange={e => setPhoneNumber(e.target.value)} {...register('phoneNumber', { required: true })} />
            <span>{errors.phoneNumber && t("errorPhoneNumber")}</span>
            <div className="valid-feedback">{"Looks good!"}</div>
          </Col>
        </Row>

        <Row>
          <Col md="6 mb-2">
            <Label>{t("email")}</Label>
            <input className="form-control" name="email" type="text" placeholder={t('email')} onChange={e => setEmail(e.target.value)} {...register('email', {
              required: true,
              pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            })} />
            <span>{errors.email && t("errorEmail") ||error.email }</span>

          </Col>
          <Col md="6 mb-2">
            <Label>{t("positionCompany")}</Label>

            <Typeahead
              id="id"
              labelKey="rol"
              multiple={multiple}
              options={roles}
              onChange={handleSelectRol}
              placeholder={t("placeHolderPositionCompany")}
            />
            <input type="hidden" />
            <span>{(idRol == '' && validateClass) && t("errorPositionCompany")}</span>
            <div className="valid-feedback">{"Looks good!"}</div>
          </Col>
        </Row>
        <Row>
          <Col md="6 mb-2">
            <Label>{t("selectCountry")}</Label>
            <Typeahead
              id="id"
              labelKey="name"
              multiple={multiple}
              options={country}
              onChange={handleSelectedChangeDepartment}
              ref={refCountry}
              placeholder={t("placeHolderCountry")}
            />
            <input type="hidden" />
            <span>{(idCountry == '' && validateClass) && t("errorCountry")}</span>

          </Col>
          <Col md="6 mb-2">
            <Label>{t("selectDepartment")}</Label>
            <Typeahead
              id="id"
              labelKey="name"
              multiple={multiple}
              options={department}
              ref={refDepto}
              onChange={handleSelectedChangeMunicipio}
              placeholder={t("placeHolderDepartment")}
            />
          </Col>

        </Row>

        <Row>
          <Col md="6 mb-2">
            <Label>{t("selectMunicipio")}</Label>
            <Typeahead
              id="id"
              labelKey="name"
              multiple={multiple}
              options={municipio}
              ref={refMunicipio}
              onChange={handleChangeMunicipio}
              placeholder={t("placeHolderMunicipio")}
            />
          </Col>
          <Col md="6 mb-2">
            <Label>{t("address")}</Label>
            <input className="form-control" name="city" type="text" placeholder={t("address")} onChange={e => setAddress(e.target.value)}  {...register('address', { required: true })} />
            <span>{errors.address && t("address")}</span>
            <div className="invalid-feedback">{"Ingrese una dirección por favor."}</div>
          </Col>
        </Row>

        <Button color="primary" type="submit" onClick={() => setValidateClass(true)}>{t("create")}</Button>
      </Form>
    </Fragment>
  );
};

export default CreateFormEmployee;