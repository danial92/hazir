import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserProfile, updateProfileAction } from '../actions/userActions'
import { getMyOrdersAction } from '../actions/orderActions'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)


  const dispatch = useDispatch()


  const userProfile = useSelector((state) => state.userProfile)
  const { loading, error, user } = userProfile

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const updateProfile = useSelector((state) => state.updateProfile)
  const { success } = updateProfile

  const getMyOrders = useSelector((state) => state.getMyOrders)
  const { loading: loadingOrders, error: errorOrders, orders } = getMyOrders

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
        if(!user.name) { 
            dispatch(getUserProfile('profile'))
            dispatch(getMyOrdersAction())
        } else { 
            setName(user.name)
            setEmail(user.email)
        }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
        setMessage('Passwords do not match')
      } else {
        dispatch(updateProfileAction({ id: user._id, name, email, password }))
      }
  }
  
  return (
    <Row>
        <Col md={3}>
            <h2>My Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Updated. Reload the page to See Changes Below!</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    type='name'
                    placeholder='Enter full name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='confirmPassword'
                    placeholder='Enter Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                Update
                </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
              <Table striped bordered hover responsive class='table-sm' >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Order Date</th>
                            <th>Price</th>
                            <th>Payment Date</th>
                            <th>Delivered</th>
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                        {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : 
                        orders.map(order => (
                                <tr key={order._id}>
                                    <td>
                                        {order._id}
                                    </td>
                                    <td>
                                      {order.createdAt && order.createdAt.substring(0,10)}
                                    </td>
                                    <td>
                                        ${order.totalPrice}
                                    </td>
                                    <td>
                                      {order.paidAt && order.paidAt.substring(0,10)}
                                    </td>
                                    <td>
                                      {order.isDelivered ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>}
                                    </td>
                                    <td>
                                        <Link to={`/order/${order._id}`}>
                                            <Button>Details</Button>
                                        </Link>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                    </Table>
        </Col>
    </Row>
  )
}

export default ProfileScreen
