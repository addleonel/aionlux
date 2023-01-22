import * as React from "react";
import "../assets/styles/Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <React.Fragment>
      <div className="home-footer">
        <ul className="home-footer__ul">
            <li className="home-footer__li"><Link  to="/about/" className="home-footer__link">Sobre Nosotros</Link></li>
            <li className="home-footer__li"><Link  to="/contact/" className="home-footer__link" >Contacto</Link></li>
        </ul>
    </div>
    <p className="home-footer__copyright">
      2023 &#169; Aionlux - Todos los derechos reservados
    </p>
    </React.Fragment>
  );
}

export default Footer;