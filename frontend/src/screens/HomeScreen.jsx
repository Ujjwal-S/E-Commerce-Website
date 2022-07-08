import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from "react-bootstrap";
import { listProducts } from '../actions/productActions'

import Product from "../components/Product";
import Loader from '../components/Loader'
import Message from '../components/Message'


function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)  // useSelector takes an arrow function to get product from redux
    const { error, loading, products } = productList

    useEffect(() => {

        dispatch(listProducts()) // variable defined above

    }, [dispatch])

    return (
        <div>
            <h1 className="text-center mb-5 ">
                <mark>
                    <u>Latest Products</u>
                </mark>
            </h1>
            {loading    ? <Loader />
                        : error ?   <Message variant="danger">{error}</Message>  // agar error hoga toh yeh true hota par agar koi error nahi hai toh yeh undefined hoga (falsy value)
                                :   <Row>
                                        {products.map((product) => (
                                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                                <Product product={product} />
                                            </Col>
                                        ))}
                                    </Row>
            }
        </div>
    );
}

export default HomeScreen;
