import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message";
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    
    const redirect = location.search ? location.search.split('=')[1] : '/';
    
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister
    
    useEffect(() => {
        // if userInfo exists then just redirect them to whatever was inside redirect.
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])
    

    const submitHandler = (event) => {
        event.preventDefault();
        
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }
        else{
            dispatch(register(name, email, password))
        }
    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {/* if we have message (empty string is falsy) then display message */}
            { message && <Message variant='danger'>{message}</Message>}
            {/* if we have error then display error */}
            { error && <Message variant='danger'>{error}</Message> }

            {/* if we are loading (loading is set to true) loading component */}
            {loading &&  <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId="name" className="mb-4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name" 
                        placeholder="Enter Name" 
                        value={name} 
                        onChange={(event) => setName(event.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>

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

                <Form.Group controlId="passwordConfirm" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmPassword} 
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant='primary'>Register</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an Account? 
                    <Link
                        to={redirect ? `/login?redirect=${redirect}`: '/login'}
                    >
                        Sign In
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default RegisterScreen
