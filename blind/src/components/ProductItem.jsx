import React, 
{ 
    // useState
    // ,useEffect 
} from "react";
import "../assets/styles/Main.scss";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import axios from "axios";
// import { Button, Modal} from "react-bootstrap";

const ProductItem= (props) => {
    const class_= "c-item" + ` ${props.in_}`;
    
    return (
        <React.Fragment>
            <div className={class_}>
                <div className="c-image">
                    <Link to={"/" + props.name + "/"}>
                    <img src={props.image} alt="" />
                    </Link>
                    
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProductItem;