import React, {Fragment, useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  Container, 
  Dropdown
} from "react-bootstrap";
import { Link } from "react-router-dom";
import '../assets/styles/Header.scss';

const Header = () => {
  
  const [isAuth, setIsAuth] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsAuth(true);
    }
  }, []);

  // Change background color on scroll
  const changeBackground = () => {
    if (window.scrollY >= 66){
      let nb = document.getElementById('navbarroot-id');
      nb.style.background = '#fff';
      nb.style.boxShadow = '0px 3px 3px rgba(27, 51, 78, 0.09)';
    }else {
      let nb = document.getElementById('navbarroot-id');
      nb.style.background = 'transparent';
      nb.style.boxShadow = 'none';
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeBackground); 
  })
  
  // reponsive options
  const displayResponsive = (e) => {
    e.preventDefault();
    let responsiveBlock = document.getElementById("nav-bar__responsive");
    if (responsiveBlock.className === "nav-bar__responsive--none") {
        responsiveBlock.className = "nav-bar__responsive--block";
    } else if (responsiveBlock.className === "nav-bar__responsive--block") {
        responsiveBlock.className = "nav-bar__responsive--none";
    }
  }

  const disableMenu = (e) => {

      let responsiveBlock = document.getElementById("nav-bar__responsive");
      if (responsiveBlock.className === "nav-bar__responsive--block") {
          responsiveBlock.className = "nav-bar__responsive--none";
      }
  }

  const enableMenu = (e) => {
      e.stopPropagation();
      let menu = document.getElementById("nav-bar__responsive-list-id");
      menu.style.display = "block";
  }

  return (
    <React.Fragment>
      <nav id="navbarroot-id" className="navbarroot">
        <Container fluid="xxl" className="nav-bar"> 
            <Link className="nav-bar__logo" to={isAuth ? '/begin/':'/'}>
              <img className="nav-bar__logo-image" src="https://raw.githubusercontent.com/addleonel/aionlux/main/redocs/logo5.png" alt=""/>
              <span className="nav-bar__logo-text">Ailook</span>
            </Link>
            <Link className="nav-bar__button-item nav-bar__buttons-item--contact nav-bar__buttons-item--contact-responsive" to="/contact/">Contactar</Link>
            <div className="nav-bar__display" id="nav-bar__display-id" onClick={ displayResponsive }>
                <img className="nav-bar__display-icon" src="https://raw.githubusercontent.com/addleonel/ghcenter/59ef2cad24ca811449366d46ee576a8100de17a8/homewc/src/assets/static/icons/bars.svg" alt=""/> 
            </div>
            <div className="nav-bar__buttons">
              <Link className="nav-bar__buttons-item nav-bar__buttons-item--basic"  to=''></Link>                                                                                                  
              {isAuth === true ? (
                <Fragment>
                  <Dropdown>
                    <Dropdown.Toggle className="nav-bar__dropdown-button">
                      <FontAwesomeIcon className="nav-bar__dropdown-image" icon="fa-solid fa-user" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="nav-bar__dropdown-menu">
                      <Dropdown.Item>
                        <Link className="nav-bar__dropdown-link" to='/logout/'>Cerrar Sesión</Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Fragment>
                ) : (
                <Fragment>
                  <Link className="nav-bar__buttons-item nav-bar__buttons-item--basic" to='/login/'>Iniciar sesión</Link>
                  <Link className="nav-bar__buttons-item nav-bar__buttons-item--basic" to='/signup/'>Registrase</Link>
                </Fragment>
              )}
            </div>
        </Container>         
      </nav>
      
      <section id="nav-bar__responsive" className="nav-bar__responsive--none"  onClick={ disableMenu }>
        <ul id="nav-bar__responsive-list-id" className="nav-bar__responsive-list" onClick={ enableMenu }>
          <li className="nav-bar__responsive-li" ><Link id="about-res"  onClick={ disableMenu } className="nav-bar__responsive-item" to="/about/">Sobre Nosotros</Link></li>
          <li className="nav-bar__responsive-li" ><Link id="contact-res" onClick={ disableMenu }  className="nav-bar__responsive-item" to="/contact/">Contacto</Link></li>
          <hr/>
          {isAuth === true ? (
            <li className="nav-bar__responsive-li" >
              <Link className="nav-bar__responsive-item" onClick={ disableMenu } to='/logout/'>Cerrar Sesión</Link>
            </li>
            ) : (
            <Fragment>
              <li className="nav-bar__responsive-li" >
                <Link className="nav-bar__responsive-item" onClick={ disableMenu } to='/login/'>Iniciar sesión</Link>
              </li>
              <li className="nav-bar__responsive-li" >
                <Link className="nav-bar__responsive-item" onClick={ disableMenu } to='/signup/'>Registrase</Link>
              </li>
            </Fragment>
          )}
        
        </ul>                                                       
      </section>
    </React.Fragment>
  );
}

export default Header;