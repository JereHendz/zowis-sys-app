import React, { useState, useEffect } from 'react';
import man from '../assets/images/dashboard/profile.jpg';
import { Container, Row, Col, Form, Input, Label, Button, NavItem, NavLink, Nav, TabContent, TabPane } from 'reactstrap'
import { firebase_app, googleProvider, facebookProvider, githubProvider, Jwt_token } from '../data/config'
import { handleResponse } from '../services/fack.backend'
import { useAuth0 } from '@auth0/auth0-react'
import { toast } from 'react-toastify';
import { Facebook, GitHub } from 'react-feather'
import firebaseImg from '../assets/images/firebase.svg'
import jwtImg from '../assets/images/jwt.svg'
import authImg from '../assets/images/auth0.svg'
import { Password, SignIn, EmailAddress, RememberPassword, ForgotPassword, CreateAccount, FIREBASE, AUTH0, JWT, LoginWithJWT, LoginNormal } from '../constant';
import { useNavigate } from 'react-router';
import { classes } from '../data/layouts';
import axios from "axios"; 
import { useTranslation } from 'react-i18next'; 


const Logins = (props) => {

  const { loginWithRedirect } = useAuth0()
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test123");
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState("jwt");
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();
  const { t } = useTranslation();

  const [value, setValue] = useState(
    localStorage.getItem('profileURL' || man)
  );
  const [name, setName] = useState(
    localStorage.getItem('Name')
  );

  const [loginAccess, setLogingAccess] = useState(
    localStorage.getItem('loginAccess')
  );

  const [infoUserLogin, setInfoUserLogin] = useState(
    localStorage.getItem('infoUserLogin')
  );

  useEffect(() => {
    localStorage.setItem('profileURL', value);
    localStorage.setItem('Name', name);
    localStorage.setItem("loginAccess", loginAccess);
  }, [value, name, loginAccess]);

  const loginAuth = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await firebase_app.auth().signInWithEmailAndPassword(email, password).then(function () {
        setValue(man);
        setName("Emay Walter");
        localStorage.setItem('token', Jwt_token);
        setTimeout(() => {
          history(`${process.env.PUBLIC_URL}/dashboard/default/${layout}`);
        }, 200);
      })
    } catch (error) {
      setTimeout(() => {
        toast.error("Oppss.. The password is invalid or the user does not have a password.");
      }, 200);
    }
  }

  const googleAuth = async () => {

    try {
      firebase_app.auth().signInWithPopup(googleProvider).then(function (result) {
        setName(result.user.displayName);
        setValue(result.user.photoURL)
        localStorage.setItem('token', Jwt_token);
        setTimeout(() => {
          history(`${process.env.PUBLIC_URL}/dashboard/default/${layout}`);
        }, 200);

      });
    } catch (error) {
      setTimeout(() => {
        toast.error("Oppss.. The password is invalid or the user does not have a password.");
      }, 200);
    }
  };

  const facebookAuth = async () => {

    try {
      firebase_app.auth().signInWithPopup(facebookProvider).then(function (result) {
        setValue(result.user.photoURL);
        setName(result.user.displayName)
        localStorage.setItem('token', Jwt_token);
        setTimeout(() => {
          history(`${process.env.PUBLIC_URL}/dashboard/default/${layout}`);
        }, 200);
      });
    } catch (error) {
      setTimeout(() => {
        toast.error("Oppss.. The password is invalid or the user does not have a password.");
      }, 200);
    }
  }

  const githubAuth = async () => {

    try {
      firebase_app.auth().signInWithPopup(githubProvider).then(function (result) {
        setValue(result.user.photoURL);
        setName(result.additionalUserInfo.username)
        localStorage.setItem('token', Jwt_token);
        setTimeout(() => {
          history(`${process.env.PUBLIC_URL}/dashboard/default/${layout}`);
        }, 200);
      });
    } catch (error) {
      setTimeout(() => {
        toast.error("Oppss.. The password is invalid or the user does not have a password.");
      }, 200);
    }
  }

  const loginWithJwt = (e) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: ({ email, password })
    };

    return fetch('/users/authenticate', requestOptions)
      .then(handleResponse)
      .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        setValue(man);
        setName('Emay Walter');
        localStorage.setItem('token', Jwt_token);
        window.location.href = `${process.env.PUBLIC_URL}/dashboard/default/${layout}`;
        return user;
      });
  };

  const loginNormal = (e) => {
    const credentialAuth={ email: email, password:password };

      axios.post(`${process.env.REACT_APP_DOMAIN_SERVER}/api/login`, credentialAuth)
    .then((payload)=>{
      // Get the info of user
      const infoUser=payload.data.response;
      console.log(infoUser);
      setValue(man);
      setName(infoUser[0].userName);
      localStorage.setItem('loginAccess', true);
      localStorage.setItem('infoUserLogin', JSON.stringify(infoUser[0]));
      setTimeout(() => {
        history(`${process.env.PUBLIC_URL}/dashboard/default/${layout}`);
      }, 200);

    })
    .catch((errors)=>{
      console.log(errors);
      setTimeout(() => {
        toast.error(t("errorSingIn"));
      }, 200);
    });

      
  };

  return (
    <Container fluid={true} className="p-0">
      <Row>
        <Col xs="12">
          <div className="login-card">
            <div>
              <div>
                <a className="logo" href="index.html">
                  <img className="img-fluid for-light" src={require("../assets/images/logo/login.png")} alt="" />
                  <img className="img-fluid for-dark" src={require("../assets/images/logo/logo_dark.png")} alt="" />
                </a>
              </div>
              <div className="login-main login-tab">
                {/* <Nav className="border-tab flex-column" tabs>
                  <NavItem>
                    <NavLink className={selected === 'firebase' ? 'active' : ''} onClick={() => setSelected('firebase')}>
                      <img src={firebaseImg} alt="" />
                      <span>{FIREBASE}</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={selected === 'jwt' ? 'active' : ''} onClick={() => setSelected('jwt')}>
                      <img src={jwtImg} alt="" />
                      <span>{JWT}</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={selected === 'auth0' ? 'active' : ''} onClick={() => setSelected('auth0')}>
                      <img src={authImg} alt="" />
                      <span>{AUTH0}</span>
                    </NavLink>
                  </NavItem>
                </Nav> */}
                <TabContent activeTab={selected} className="content-login">
                  <TabPane className="fade show" tabId={selected === "firebase" ? "firebase" : "jwt"}>
                    <Form className="theme-form">
                      <h4>{selected === "firebase" ? "Sign In With Firebase" : "Sign Up"}</h4>
                      <p>{"Enter your email & password to login"}</p>
                      <div className="mb-3">
                        <Label className="col-form-label">{EmailAddress}</Label>
                        <Input className="form-control" type="email" required="" onChange={e => setEmail(e.target.value)} defaultValue={""} />
                      </div>
                      <div className="mb-3 position-relative">
                        <Label className="col-form-label">{Password}</Label>
                        <Input className="form-control" type={togglePassword ? "text" : "password"} onChange={e => setPassword(e.target.value)} defaultValue={""} required="" />
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                      </div>
                      <div className="login-btn mb-0">
                        <div className="checkbox ms-3">
                          <Input id="checkbox1" type="checkbox" />
                          <Label className="text-muted" for="checkbox1">{RememberPassword}</Label>
                        </div><a className="link" href="#javascript">{ForgotPassword}</a>
                        {selected === "firebase" ?
                          <Button color="primary" disabled={loading ? loading : loading} onClick={(e) => loginAuth(e)}>{loading ? "LOADING..." : SignIn}</Button>
                          :
                          <Button color="primary" onClick={() => loginNormal(email, password)}>{LoginNormal}</Button>
                        }
                      </div>
                      {/* <h6 className="text-muted mt-4 or">{"Or Sign in with"}</h6>
                      <div className="social mt-4">
                        <div className="btn-showcase">
                          <Button color="light" onClick={facebookAuth} >
                            <Facebook className="txt-fb" />
                          </Button>
                          <Button color="light" onClick={googleAuth} >
                            <i className="fa fa-google txt-googleplus"></i>
                          </Button>
                          <Button color="light" onClick={githubAuth} >
                            <GitHub />
                          </Button>
                        </div>
                      </div> */}
                      {/* <p className="mt-4 mb-0">{"Don't have account?"}<a className="ms-2" href="#javascript">{CreateAccount}</a></p> */}
                    </Form>
                  </TabPane>
                  {/* <TabPane className="fade show" tabId="auth0">
                    <div className="auth-content">
                      <img src={require("../assets/images/auth-img.svg")} alt="" />
                      <h4>{"Welcome to login with Auth0"}</h4>
                      <p>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"}</p>
                      <Button color="info" onClick={loginWithRedirect}>{AUTH0}</Button>
                    </div>
                  </TabPane> */}
                </TabContent>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

// export default withRouter(Logins);
export default Logins;