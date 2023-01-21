import React, { useState, useEffect } from "react";
import { Container} from "react-bootstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../assets/styles/Main.scss";
import ProductItem from "./ProductItem";
// import { HashLink } from "react-router-hash-link";
// import {results
// } from "../resultList.js";
import axios from "axios";

const Products = () => {
    const [productList, setProductList] = useState([]);
    useEffect(()=>{
		axios.get(process.env.REACT_APP_BACKEND_URL + 'api/products/')
			.then((res) => {
				console.log(res.data);
				setProductList(res.data);
			})
			.catch(err => {
				console.erro(err);
			})
		
	}, [])

    const resultList =  productList.map((link) =>{
        return( 
            <React.Fragment>
                <ProductItem 
                    id={link.id}
                    key={link.id}
                    name={link.name}
                    likes={link.likes.length}
                    image={link.image}
                    in_="in-products"
                />
            </React.Fragment>
        )
    });

    
    return (
    <React.Fragment>
        {/* <section className="section-p section-1">
            <Container fluid="xxl">
                <div className="portal-phrase">
                    <h1 className="portal-title">
              
                    </h1>
                    <p className="portal-subtitle">
                    
                    </p>
                </div>
            </Container>
        </section> */}

        <Container fluid="xxl" >
            <div className="products" style={{marginTop: "100px"}}>   
                {resultList}
            </div>
                     
        </Container>
    </React.Fragment>
  );
}

export default Products;