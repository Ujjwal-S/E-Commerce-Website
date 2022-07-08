import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message";
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

function LoginScreen({location, history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    
    const redirect = location.search ? location.search.split('=')[1] : '/';
    
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin
    
    useEffect(() => {
        // if userInfo exists then just redirect them to whatever was inside redirect.
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])
    

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(login(email, password))
    }
    
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {/* if we have error then display error */}
            { error && <Message variant='danger'>{error}</Message> }

            {/* if we are loading (loading is set to true) loading component */}
            {loading &&  <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId="email" className="mb-4">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email" 
                        placeholder="Enter Email" 
                        value={email} 
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password" 
                        placeholder="Enter Password" 
                        value={password} 
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant='primary'>Sign In</Button>
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer? 
                    <Link
                        to={redirect ? `/register?redirect=${redirect}`: '/register'}
                    >
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
