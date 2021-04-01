import React, { useEffect, useState } from 'react'
import { Col, Row, Image, ListGroup, Container, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { singleProductDetails, createProductReviewAction } from '../actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { Alert } from 'react-bootstrap'
import HelmetTitles from '../components/HelmetTitles'


const ProductScreen = ({ match, history }) => {
    const productId = match.params.id
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin

    const createProductReview = useSelector(state => state.createProductReview);
    const { error: errorReview, success: successReview } = createProductReview

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    useEffect(() => {
        if(successReview) {
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({ type:  PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(singleProductDetails(match.params.id)) 
    }, [dispatch, match, successReview])

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(createProductReviewAction(productId, { rating, comment }))
    }

    return (
        <div>
            <Link className='btn my-4' to='/'>Go Back to Main Page</Link>
            <Container>
            {
                loading ? <Loader /> : error ? <Message /> : (
                    <>
                        <HelmetTitles title={product.name} />
                        <Row>
                            <Col className='mx-3' md={7}>
                                <Image style={{ 'width': '640px' , 'height': '510px' }} src={product.image} />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h5><strong>Price:</strong> ${product.price}</h5>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h6><strong>Description:</strong> {product.description}</h6>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Status:</strong> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </ListGroup.Item>
                                    {
                                        product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                            {[...Array(product.countInStock).keys()].map(x => (
                                                                <option key={x + 1} value={x + 1} >{x + 1}</option>    
                                                            ))}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    }
                                    <Row>   
                                        <Col className='my-2'>
                                            <Button onClick={addToCartHandler} className='btn-block' disabled={product.countInStock === 0} >
                                                Add to Cart
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={5} className="mx-3">
                                <h2 className="my-4">Reviews</h2>
                                {product.reviews.length === 0 && <Alert variant='primary'>No Reviews Yet</Alert>}
                                <ListGroup>
                                    {product.reviews.map(review => (
                                        <ListGroup.Item>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                    <ListGroup.Item>
                                         <h2>Write a Review</h2>
                                         {errorReview && <Alert variant='danger'>{errorReview}</Alert>}
                                         {
                                             !userInfo ? <strong>Please <Link to='/login'>Login</Link> to write a review</strong>
                                             :
                                             <Form onSubmit={submitHandler}>
                                                 <Form.Group controlId='rating'>
                                                     <Form.Label>Rating</Form.Label>
                                                     <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                         <option value=''>Select</option>
                                                         <option value='1'>1 - Poor</option>
                                                         <option value='2'>2 - Fair</option>
                                                         <option value='3'>3 - Good</option>
                                                         <option value='4'>4 - Very Good</option>
                                                         <option value='5'>5 - Excellent</option>
                                                     </Form.Control>
                                                 </Form.Group>
                                                 <Form.Group>
                                                     <Form.Label>Comment</Form.Label>
                                                     <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)} ></Form.Control>
                                                 </Form.Group>
                                                 <Button type='submit' variant='primary'>Submit</Button>
                                             </Form>
                                         }
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row> 
                    </>
                )
            }
          </Container>
        </div>
    )
}

export default ProductScreen