import React, { useEffect } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'


const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1 

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart

    console.log(cartItems)

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <div>
            <Row>
                <Col md={8}>
                    <h2>Shopping Cart</h2>
                    {cartItems.length === 0 ? <h5>Your Cart is Empty. <Link to='/'> Go to Main Page</Link></h5> : 
                        <ListGroup variant='flush'>
                            {
                                cartItems.map(item => (
                                    <ListGroup.Item key={item.productId}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col md={4}>
                                                <Link to={`/product/${item.productId}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>${item.price}</Col>
                                            <Col md={2}>
                                                <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.productId, Number(e.target.value)))}>
                                                        {[...Array(item.countInStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1} >{x + 1}</option>    
                                                        ))}
                                                </Form.Control>
                                            </Col>
                                            <Col>
                                                <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.productId)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    }
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>Subtotal ({ cartItems.reduce((acc, currentItem) => acc + currentItem.qty, 0 )}) items</h3>
                                ${cartItems.reduce((acc, currentItem) => acc + currentItem.qty * currentItem.price, 0).toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>Move to Checkout</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartScreen
