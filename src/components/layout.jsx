import React, { Fragment } from 'react';
import Loader from "../layout/loader";
import Taptop from "../layout/tap-top";
import Header from '../layout/header'
import Sidebar from '../layout/sidebar'
import Footer from '../layout/footer'
import ThemeCustomize from "../layout/theme-customizer";
import { ToastContainer } from 'react-toastify'
import { Outlet, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ConfigDB from '../data/customizer/config';


const AppLayout = ({ children, classNames, ...rest }) => {
  const location = useLocation();
  const animationTheme =
    localStorage.getItem('animation') || ConfigDB.data.router_animation;

  return (
    <Fragment>
      <Loader />
      <Taptop />
      <div className="page-wrapper compact-wrapper" id="pageWrapper">
        <Header />
        <div className="page-body-wrapper">
          <Sidebar />
          <div className="page-body">
            {/* <TransitionGroup {...rest}>
              <CSSTransition
                key={location.key}
                timeout={1000}
                classNames={animationTheme}
                unmountOnExit
              > */}
                <div>
                  <Outlet />
                </div>
              {/* </CSSTransition>
            </TransitionGroup> */}
          </div>
          <Footer />
        </div>
      </div>
      <ThemeCustomize />
      <ToastContainer />
    </Fragment>
  );
}

export default AppLayout;