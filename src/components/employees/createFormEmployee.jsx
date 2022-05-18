import React, { useState, Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import axios from "axios";
import { Col, Button, Form, Label, Input, FormGroup, InputGroup, InputGroupText, Row } from 'reactstrap'
import { FirstName, LastName, CountryEmployee, Username, State, City, Zip, SubmitForm, PhoneNumberEmployee, Dui, Address, Email, Cargo, Municipio, Departamento } from '../../constant'
import { Typeahead } from 'react-bootstrap-typeahead';
import { useTranslation } from 'react-i18next';

const CreateFormEmployee = () => {

  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const [validateClass, setValidateClass] = useState(false);
  const [roles, setRoles] = useState([]);
  const [country, setCountry] = useState([]);
  const [department, setDepartment] = useState([]);
  const [municipio, setMunicipio] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [dui, setDui] = useState([]);
  const [telefono, setTelefono] = useState([]);
  const [email, setEmail] = useState([]);
  const [idCountry, setIdCountry] = useState([]);
  const [selectedRol, setSelectedRol] = useState('');




  const refDepto = React.useRef();
  const refMunicipio = React.useRef();
  const refRol = React.useRef();
  const refRolInput = React.useRef();



  const { t } = useTranslation();


  const multiple = false
  // const onSubmit = (e, data) => {
  //   if (data !== '') {
  //     // console.log(data);

  //     alert('You submitted the form and stuff!');
  //   } else {
  //     console.log(errors);
  //     errors.showMessages();
  //   }
  // };

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
  }

  // const onError = (errors) => console.log(errors);



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
    console.log(event);
    if (event.length > 0) {
      // Get the departments by id country
      axios
        .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/departments/${event[0].id}`)
        .then((payload) => {
          // If everything is good, load the array of departments in the Typeahead or select
          setDepartment(payload.data);
        })
        .catch((error) => {
          console.log(error);
        });

    } else {

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
      setSelectedRol(event[0].id);
    } else {
      setSelectedRol("");
    }

  }

  // const createUser = () => {
  //   setLoading(true);
  //   const data = { userName: userName, email: email, password:password, passConfirm:passConfirm, idEmployee:idEmployee };
  //   axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}api/users`, data)
  //   .then((res)=>{
  //     navigate(`${process.env.PUBLIC_URL}/app/users/userList/${layout}`);
  //   })
  //   .catch((err)=>{
  //     console.log(err);
  //     setLoading(false);
  //     setError(err.response.data.messages);
  //   });
  // };


  const handleSelectedChangeMunicipio = (event) => {
    if (event.length > 0) {
      // Get the departments by id country
      axios
        .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/municipios/${event[0].id}`)
        .then((payload) => {
          setMunicipio(payload.data);
        })
        .catch((error) => {
          console.log(error);
        });

    } else {

      // If there isn't deparment selected we have to clear the municipio value
      refMunicipio.current.clear();

      // Set up the array of municipio to empty
      setMunicipio([]);
    }
  }

  return (
    <Fragment>
      <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6 mb-2">
            <Label>{t("firstName")}</Label>
            <input className="form-control" name="firstName" type="text" placeholder="Nombres" {...register('firstName', { required: true })} onChange={e=>setFirstName(e.target.value)} />
            <span>{errors.firstName && t("errorFirstName")}</span>
            {/* <div className="valid-feedback">{"Looks good!"}</div> */}
          </Col>
          <Col md="6 mb-2">
            <Label>{t("lastName")}</Label>
            <input className="form-control" name="lastName" type="text" placeholder="Apellidos" {...register('lastName', { required: true })} />
            <span>{errors.lastName && t("errorLastName")}</span>
            <div className="valid-feedback">{"Looks good!"}</div>
          </Col>
        </Row>

        <Row>
          <Col md="6 mb-2">
            <Label>{Dui}</Label>
            <input className="form-control" name="dui" type="text" placeholder="Dui" {...register('dui', { required: true })} />
          </Col>
          <Col md="6 mb-2">
            <Label>{t("phoneNumber")}</Label>
            <input className="form-control" name="phoneNumber" type="text" placeholder="Teléfono" {...register('phoneNumber', { required: true })} />
            <span>{errors.phoneNumber && t("errorPhoneNumber")}</span>
            <div className="valid-feedback">{"Looks good!"}</div>
          </Col>
        </Row>

        <Row>
          <Col md="6 mb-2">
            <Label>{t("email")}</Label>
            <input className="form-control" name="email" type="text" placeholder={t('email')} {...register('email', { required: true })} />
          </Col>
          <Col md="6 mb-2">
            <Label>{t("positionCompany")}</Label>

            <Typeahead
              id="id"
              labelKey="rol"
              multiple={false}
              options={roles}
              onChange={handleSelectRol}
            />
            <input type="hidden" />
            <span>{(errors.setSelectedRol!='' && validateClass) && t("errorPositionCompany")}</span>
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
              placeholder={t("placeHolderCountry")}
            />
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
              placeholder={t("placeHolderMunicipio")}
            />
          </Col>
          <Col md="6 mb-2">
            <Label>{t("address")}</Label>
            <input className="form-control" name="city" type="text" placeholder={t("address")} {...register('address', { required: true })} />
            <span>{errors.address && t("address")}</span>
            <div className="invalid-feedback">{"Ingrese una dirección por favor."}</div>
          </Col>
        </Row>

        <Button color="primary" type="submit" onClick={() => setValidateClass(!validateClass)}>{t("create")}</Button>
      </Form>
    </Fragment>
  );
};

export default CreateFormEmployee;