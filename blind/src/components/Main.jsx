import React , { useState, useEffect } from "react";
// import Slider from "react-slick";
import axios from "axios";
import { Container } from "react-bootstrap";
import "../assets/styles/Main.scss";
// import { Link } from "react-router-dom";
// import { HashLink } from "react-router-hash-link";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// products
import ProductItem from "./ProductItem";
// import { results
//  } from "../resultList.js";

const Main = () => {
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

	const resultList = productList.slice(0, 9).map((link) =>{
		return( 
			<React.Fragment>
				<div>
					<ProductItem 
						id={link.id}
						likes={link.likes.length}
						key={link.id}
						image={link.image}
						in_="in-products"
					/>
				</div>
			</React.Fragment>
		)
	});

    
	return (
		<React.Fragment>
			<section className="section-m section-1">
				<Container>
					<div className="section-1-content">
						<div className="portal-phrase">
							<h1 className="portal-title">
								Proyecto Aionlux
							</h1>
							<p className="portal-subtitle">
								Es un sistema de gestión de datos en seguridad.
							</p>
							<button 
                                className="principal__message-button"
                                onClick={() => window.location.href = "/begin/"}
                            >
								Ver avances
                            </button>
						</div>
						<div className="portal-media">
							{/* <img className="portal-image pimage-1" src="" alt="" />
							<img className="portal-image pimage-2"src="" alt="" /> */}
							
						</div>
					</div>
				</Container>
			</section>
			{/* <section className="section-m section-2">
				<Container fluid="xxl">
					
				</Container>
			</section> */}
		</React.Fragment>
  );
}

export default Main;