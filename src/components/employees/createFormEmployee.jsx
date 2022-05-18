import React, { useState, Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import axios from "axios";
import { Col, Button, Form, Label, Input, FormGroup, InputGroup, InputGroupText, Row } from 'reactstrap'
import { FirstName, LastName, CountryEmployee,  Username, State, City, Zip, SubmitForm, PhoneNumberEmployee, Dui, Address, Email, Cargo, Municipio, Departamento } from '../../constant'
import { Typeahead } from 'react-bootstrap-typeahead';
import { useTranslation } from 'react-i18next';

const CreateFormEmployee = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [validateClass, setValidateClass] = useState(false);
  const [roles, setRoles]=useState([]);
  const [country, setCountry]=useState([]);
  const [department, setDepartment]=useState([]);
  const [municipio, setMunicipio]=useState([]);
  const refDepto = React.useRef();
  const refMunicipio = React.useRef();
  const { t } = useTranslation();



  const multiple = false
  // const onSubmit = (e, data) => {
  //   e.preventDefault();
  //   if (data !== '') {
  //     // console.log(data);
      
  //     alert('You submitted the form and stuff!');
  //   } else {
  //     errors.showMessages();
  //   }
  // };

  const onSubmit = (data: FormInputs) => console.log(data);


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

  const handleSelectedChangeDepartment=event=>{
    console.log(event);
    if(event.length>0){
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

    }else{

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

  const handleSelectedChangeMunicipio=(event)=>{
    if(event.length>0){
    // Get the departments by id country
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/municipios/${event[0].id}`)
      .then((payload) => {
        setMunicipio(payload.data);
      })
      .catch((error) => {
        console.log(error);
      });

    }else{

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
            <input className="form-control" name="firstName" type="text" placeholder="Nombres" {...register('firstName', { required: true })} />
            <span>{errors.firstName && t("errorFirstName")}</span>
            {/* <div className="valid-feedback">{"Looks good!"}</div> */}
          </Col>
          <Col md="6 mb-2">
            <Label>{t("lastName")}</Label>
            <input className="form-control" name="lastName" type="text" placeholder="Apellidos" {...register('lastName', { required: true })} />
            <span>{errors.lastName && t("errorLastName")}</span>
            <div className="valid-feedback">{"Looks good!"}</div>
          </Col>
          {/* <Col md="4 mb-3">
            <Label>{Username}</Label>
            <InputGroup>
              <InputGroupText >{"@"}</InputGroupText>
              <input className="form-control" name="userName" type="text" placeholder="Username" aria-describedby="inputGroupPrepend" {...register('userName', { required: true })} />
              <span>{errors.lastName && 'User name is required'}</span>
              <div className="invalid-feedback">{"Please choose a username."}</div>
            </InputGroup>
          </Col> */}

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
                  name="roles"
                  id="id"
                  labelKey="rol"
                  multiple={multiple}
                  options={roles}
                  placeholder={t("placeHolderPositionCompany")}
                  // {...register('roles')}
                  rules={{ required: true }}
              />
            <span>{errors.errorPositionCompany && t("errorPositionCompany")}</span>
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