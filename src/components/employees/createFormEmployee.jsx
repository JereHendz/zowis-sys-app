import React, { useState, Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import axios from "axios";
import { Col, Button, Form, Label, Input, FormGroup, InputGroup, InputGroupText, Row } from 'reactstrap'
import { FirstName, LastName, CountryEmployee,  Username, State, City, Zip, SubmitForm, PhoneNumberEmployee, Dui, Address, Email, Cargo, Municipio, Departamento } from '../../constant'
import { Typeahead } from 'react-bootstrap-typeahead';


const CreateFormEmployee = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [validateClass, setValidateClass] = useState(false);
  const [roles, setRoles]=useState([]);
  const [country, setCountry]=useState([]);
  const [department, setDepartment]=useState([]);


  const multiple = false
  const onSubmit = (e, data) => {
    e.preventDefault();
    if (data !== '') {
      // console.log(data);
      
      alert('You submitted the form and stuff!');
    } else {
      errors.showMessages();
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DOMAIN_SERVER}api/roles`)
      .then((response) => {
        console.log(response);
        setRoles(response.data.roles);
        setCountry(response.data.countries);
        // setNotes(payload.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <Fragment>
      <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6 mb-2">
            <Label>{FirstName}</Label>
            <input className="form-control" name="firstName" type="text" placeholder="Nombres" {...register('firstName', { required: true })} />
            <span>{errors.firstName && 'El campo nombre es requerido'}</span>
            {/* <div className="valid-feedback">{"Looks good!"}</div> */}
          </Col>
          <Col md="6 mb-2">
            <Label>{LastName}</Label>
            <input className="form-control" name="lastName" type="text" placeholder="Apellidos" {...register('lastName', { required: true })} />
            <span>{errors.lastName && 'El campo apellidos es requerido'}</span>
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
            <Label>{PhoneNumberEmployee}</Label>
            <input className="form-control" name="phoneNumber" type="text" placeholder="Teléfono" {...register('phoneNumber', { required: true })} />
            <span>{errors.lastName && 'El número de teléfono es requerido'}</span>
            <div className="valid-feedback">{"Looks good!"}</div>
          </Col>
        </Row>

        <Row>
          <Col md="6 mb-2">
            <Label>{Email}</Label>
            <input className="form-control" name="email" type="text" placeholder="Email" {...register('email', { required: true })} />
          </Col>
          <Col md="6 mb-2">
            <Label>{Cargo}</Label>
            <Typeahead
                  id="id"
                  labelKey="rol"
                  multiple={multiple}
                  options={roles}
                  placeholder="Elija un cargo"
              />
            {/* <input className="form-control" name="idRol" type="text" placeholder="Seleccione un cargo" {...register('idRol', { required: true })} /> */}
            <span>{errors.lastName && 'El cargo es requerido'}</span>
            <div className="valid-feedback">{"Looks good!"}</div>
          </Col>
        </Row>
        <Row>
        <Col md="6 mb-2">
            <Label>{CountryEmployee}</Label>
            <Typeahead
                  id="id"
                  labelKey="name"
                  multiple={multiple}
                  options={country}
                  placeholder="Elija un cargo"
              />
          </Col>
          <Col md="6 mb-2">
            <Label>{Departamento}</Label>
            <Typeahead
                  id="id"
                  labelKey="name"
                  multiple={multiple}
                  options={department}
                  placeholder="Elija un cargo"
              />
          </Col>        
          
        </Row>

        <Row>
        <Col md="6 mb-2">
            <Label>{Municipio}</Label>
            <input className="form-control" name="zip" type="text" placeholder="Municipio" {...register('idMunucipio', { required: true })} />
          </Col>
          <Col md="6 mb-2">
            <Label>{Address}</Label>
            <input className="form-control" name="city" type="text" placeholder="City" {...register('city', { required: true })} />
            <span>{errors.city && 'Ingrese una dirección, por favor'}</span>
            <div className="invalid-feedback">{"Ingrese una dirección por favor."}</div>
          </Col>
        </Row>
      
        <Button color="primary" type="submit" onClick={() => setValidateClass(!validateClass)}>{SubmitForm}</Button>
      </Form>
    </Fragment>
  );
};

export default CreateFormEmployee;