import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {Row, Col, ListGroup, Image, Form, Button, Card} from "react-bootstrap"
import Message from "../components/Message"
import { addToCart, removeFromCart } from "../actions/cartActions"

function CartScreen({match, location, history}) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split("=")[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    console.log(cartItems)


    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))   // dispatch defined above
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                                            <Message variant="info">
                                                Your Cart is empty <Link to="/">Go Back</Link>
                                            </Message>
                                    )   : (
                                            <ListGroup variant="flush">
                                                {cartItems.map(item => (
                                                    <ListGroup.Item  key={item.product}>   {/* remember this product is id */}
                                                        <Row>
                                                            <Col md={2}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Col>
                                                            <Col md={3}>
                                                                <Link to={`/product/${item.product}/`}>{item.name}</Link>
                                                            </Col>
                                                            <Col md={2}>
                                                                &#x20b9; {item.price}
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Control as="select" 
                                                                    value={item.qty} 
                                                                    onChange={(event) => dispatch(addToCart(item.product, Number(event.target.value))) }
                                                                >   {/* so when we change this value we want to dispatch that action */}
                                                                    
                                                                    {/* we created an array out of countInStock and then we map through that array (x+1) because array index start at 0 but we want to show it starting from 1 */}
                                                                    {
                                                                        [...Array(item.countInStock).keys()].map((x) => (
                                                                            <option key={x + 1} value={x + 1}>
                                                                                {x + 1}
                                                                            </option>
                                                                        ))
                                                                        
                                                                    }

                                                                </Form.Control>
                                                            </Col>
                                                            <Col md={1}>
                                                                <Button 
                                                                    type="button" 
                                                                    variant="danger"
                                                                    onClick = {() => removeFromCartHandler(item.product)}
                                                                >
                                                                    <i className="fas fa-trash"></i>
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            Total  :  &#x20b9; {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} {/* toFixed is to set max number of descimal places */}
                        </ListGroup.Item>
                              
                    </ListGroup>

                    <ListGroup>
                        <ListGroup.Item>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled = {cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
