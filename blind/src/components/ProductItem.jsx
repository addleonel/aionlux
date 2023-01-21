import React, { useState,useEffect } from "react";
import "../assets/styles/Main.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { Button, Modal} from "react-bootstrap";

const ProductItem= (props) => {
    const [likes, setLikes] = useState(props.likes);
    const class_= "c-item" + ` ${props.in_}`;

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsAuth(true);
        }
    }, []);

    const makeLike = () => {
        axios.get(process.env.REACT_APP_BACKEND_URL +'api/products/' + props.id + '/like/')
            .then(res => {
                console.log(res.data);
                if (res.data.liked) {
                    setLikes(likes + 1);
                }else {
                    if (likes > 0) {
                        setLikes(likes - 1);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });      
    }

    
    return (
        <React.Fragment>
            <div className={class_}>
                <div className="c-image">
                    <Link to={"/" + props.name + "/"}>
                    <img src={props.image} alt="" />
                    </Link>
                    
                </div>
                    {/* {isAuth ? <button className="heart " onClick={makeLike}>
                                <FontAwesomeIcon className="heart-scale" icon="fa-solid fa-heart" />
                                <span style={{marginLeft:'12px'}} >{likes}</span>
                            </button>
                        :<button className="heart" onClick={() => window.location.href = "/login/"}>
                            <FontAwesomeIcon icon="fa-solid fa-heart" />
                            <span style={{marginLeft:'12px'}}>{likes}</span>    
                        </button>
                    } */}
            </div>
        </React.Fragment>
    );
}

export default ProductItem;