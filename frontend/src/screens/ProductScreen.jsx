import React,{ useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
// import products from '../products'
import { listProductDetails } from '../actions/productActions'

import Loader from '../components/Loader'
import Message from '../components/Message'


function ProductScreen({match, history}){
    // const product = products.find((p) => p._id == props.match.params.id)   <-- if we did not destructure match from props (always sent by default by react)
    // const product = products.find((p) => p._id === match.params.id)
    // const [product, setProduct] = useState([])
    
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])


    const [qty, setQty] = useState(1)

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-outline-dark my-3'>Go Back</Link>
            {
                loading ? <Loader />
                        : error ? <Message variant="danger">{error}</Message>
                                : <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>
                
                                <Col md={3}>
                                    <ListGroup variant="flush">
                
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>
                
                                        <ListGroup.Item>
                                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                        </ListGroup.Item>
                
                                        <ListGroup.Item>
                                            Price : <img src={'../images/money.png'} style={{height:"40px", width:"38px", paddingBottom: "5px"}} alt="Rupees" /> {product.price}
                                        </ListGroup.Item>
                
                                        <ListGroup.Item>
                                            Description : {product.description}
                                        </ListGroup.Item>
                
                                    </ListGroup>
                                </Col>
                                
                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant="flush">
                
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price :</Col>
                                                    <Col>&#x20B9; {product.price}</Col>
                                                </Row>
                                            </ListGroup.Item>
                
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status :</Col>
                                                    <Col>
                                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col className="mt-1">Qty</Col>
                                                        <Col xs="auto" className="my-1">
                                                            <Form.Control as="select" custom value={qty} onChange={(event) => setQty(event.target.value) }>  {/* remove this custom and see the change */}
                                                                {/* we created an array put of countInStocks and then we map through that array (x+1) because array index start at 0 but we want to show it starting from 1 */}
                                                                {
                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}
                
                                            <ListGroup.Item>
                                                <Button className='btn-block' onClick={addToCartHandler} type="button" disabled={product.countInStock === 0}>Add to Cart</Button>
                                            </ListGroup.Item>
                
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
            }
        </div>
    )
}

export default ProductScreen
