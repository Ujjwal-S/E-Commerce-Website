import React from "react";
import { Card } from "react-bootstrap";
import Rating from './Rating'
import { Link } from 'react-router-dom'

// function Product(props) {
//  <SomeComponent src={props.product.image}> </SomeComponent>
// }
function Product({ product }) {
    // here we directly destructred product from props instead of doing it indivisually everytime
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div"> {/* by default yeh ek 'p' tag ho jata, toh hamne usse change karke div lar diya */}
                    <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                    </div>
                </Card.Text>

                <Card.Text as="h3">
                <img src={'./images/money.png'} style={{height:"40px", width:"38px", paddingBottom: "5px"}} alt="Rupees" /> {product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;
