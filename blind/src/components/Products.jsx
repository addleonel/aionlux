import React, { useState, useEffect } from "react";
import { Container} from "react-bootstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../assets/styles/Main.scss";
import ProductItem from "./ProductItem";
// import { HashLink } from "react-router-hash-link";
import axios from "axios";

const Products = () => {
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
        setIsAuth(true);
        }
    }, []);
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
        {
            isAuth === true ? (
                <Container fluid="xxl" >
                    <div className="products" style={{marginTop: "100px"}}>   
                        {resultList}
                    </div>
                            
                </Container>
            ): (
               <div></div>
            )
        }

        
    </React.Fragment>
  );
}

export default Products;